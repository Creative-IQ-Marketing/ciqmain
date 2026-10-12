/**
 * Blog data. Order of preference:
 *   1. JSON embedded by scripts/prerender-blog.mjs (first paint, no request)
 *   2. /blog-data/*.json written at build from GHL
 *   3. /api/blog — live GHL, for posts published since the last build
 */

const cache = { index: null, posts: new Map(), embedded: undefined };

function readEmbedded() {
  if (cache.embedded !== undefined) return cache.embedded;
  cache.embedded = null;
  if (typeof document === "undefined") return null;
  const el = document.getElementById("blog-ssr");
  if (el) {
    try {
      cache.embedded = JSON.parse(el.textContent);
    } catch {
      cache.embedded = null;
    }
  }
  return cache.embedded;
}

async function getJson(url) {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) return null;
  const type = res.headers.get("content-type") || "";
  if (!type.includes("json")) return null;
  return res.json();
}

/** Synchronous read for first render (avoids a loading flash). */
export function peekIndex() {
  return cache.index || readEmbedded()?.index || null;
}

export function peekPost(slug) {
  if (cache.posts.has(slug)) return cache.posts.get(slug);
  const post = readEmbedded()?.post;
  return post?.slug === slug ? post : null;
}

export async function loadIndex() {
  const peeked = peekIndex();
  if (peeked) return (cache.index = peeked);
  const data = await getJson("/blog-data/index.json").catch(() => null);
  cache.index = data?.posts || [];
  return cache.index;
}

/** Merge in anything published in GHL after the last build. */
export async function loadLiveIndex(current) {
  if (import.meta.env.DEV) return null; // /api/blog is a Netlify function
  const live = await getJson("/api/blog").catch(() => null);
  if (!live?.posts?.length) return null;
  const known = new Set(current.map((p) => p.slug));
  const fresh = live.posts.filter((p) => !known.has(p.slug));
  const liveSlugs = new Set(live.posts.map((p) => p.slug));
  const kept = current.filter((p) => liveSlugs.has(p.slug));
  if (!fresh.length && kept.length === current.length) return null;
  cache.index = [...fresh, ...kept].sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
  );
  return cache.index;
}

export async function loadPost(slug) {
  const peeked = peekPost(slug);
  if (peeked) {
    cache.posts.set(slug, peeked);
    return peeked;
  }
  const fromBuild = await getJson(`/blog-data/posts/${encodeURIComponent(slug)}.json`).catch(
    () => null,
  );
  const fromLive = fromBuild
    ? null
    : (await getJson(`/api/blog?slug=${encodeURIComponent(slug)}`).catch(() => null))?.post;
  const post = fromBuild || fromLive || null;
  if (post) cache.posts.set(slug, post);
  return post;
}

/* ── Helpers shared by blog pages ─────────────────────────────────────── */

const IMAGE_HOSTS = /^https:\/\/(storage\.googleapis\.com\/msgsndr|assets\.cdn\.filesafe\.space)\//;
export const IMAGE_WIDTHS = [480, 800, 1200, 1600];

/** GHL media → Netlify Image CDN (resized WebP). Originals in dev. */
export function blogImage(url, width) {
  if (!url || import.meta.env.DEV || !IMAGE_HOSTS.test(url)) return url;
  return `/.netlify/images?url=${encodeURIComponent(url)}&w=${width}&fm=webp&q=72`;
}

export function blogSrcSet(url) {
  if (!url || import.meta.env.DEV || !IMAGE_HOSTS.test(url)) return undefined;
  return IMAGE_WIDTHS.map((w) => `${blogImage(url, w)} ${w}w`).join(", ");
}

/** Same treatment for images inside the article body. */
export function optimizeBodyImages(html) {
  if (import.meta.env.DEV) return html;
  return html.replace(/<img src="([^"]+)"/g, (m, src) =>
    IMAGE_HOSTS.test(src.replace(/&amp;/g, "&"))
      ? `<img src="${blogImage(src.replace(/&amp;/g, "&"), 1200)}" srcset="${blogSrcSet(
          src.replace(/&amp;/g, "&"),
        )}" sizes="(min-width: 768px) 44rem, 100vw"`
      : m,
  );
}

export const BLOG_URL = "https://creativeiqmarketing.com/blog";

export function formatDate(iso, opts = { month: "short", day: "numeric", year: "numeric" }) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { ...opts, timeZone: "America/Chicago" });
}

const CATEGORY_TERMS = {
  seo: ["seo", "search", "google", "rank", "local service ads", "visibility"],
  crm: ["crm", "pipeline", "automation", "missed call", "text back", "lead", "portal"],
  "email-marketing": ["email", "newsletter"],
  "social-media": ["social", "instagram", "facebook", "tiktok", "likes"],
  video: ["video"],
  ai: ["ai", "chatgpt", "artificial intelligence"],
  branding: ["brand"],
  strategy: ["strategy", "funnel", "growth", "ppc", "ads", "scale"],
};

/**
 * GHL posts carry 3–5 loosely assigned categories. Show the one the post is
 * actually about: most term hits in title + description + tags; ties keep the
 * rarer category (more specific).
 */
export function primaryCategory(post, counts) {
  if (!post?.categories?.length) return null;
  const text = ` ${[post.title, post.description, ...(post.tags || [])].join(" ").toLowerCase()} `;
  const hits = (c) =>
    (CATEGORY_TERMS[c.slug] || [c.label.toLowerCase()]).reduce(
      (n, term) => n + (text.includes(term.length <= 3 ? ` ${term} ` : term) ? 1 : 0),
      0,
    );
  return [...post.categories].sort(
    (a, b) => hits(b) - hits(a) || (counts?.[a.slug] ?? 0) - (counts?.[b.slug] ?? 0),
  )[0];
}

export function categoryCounts(posts) {
  const counts = {};
  for (const p of posts) for (const c of p.categories || []) counts[c.slug] = (counts[c.slug] || 0) + 1;
  return counts;
}

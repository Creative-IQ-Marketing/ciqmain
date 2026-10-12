/**
 * Blog core — shared by the build (scripts/fetch-blog.mjs) and the runtime
 * Netlify functions (blog.mjs, blog-sync.mjs).
 *
 * Source of truth: GoHighLevel → Sites → Blogs → "Blogs CreativeIQ".
 * Chelsea writes / pastes the email-campaign article there and hits Publish.
 */

export const GHL_API_BASE = "https://services.leadconnectorhq.com";
export const DEFAULT_BLOG_ID = "6dvluCVmM0ZTHRRvD04Y";
export const SITE_URL = "https://creativeiqmarketing.com";

/** GHL category urlSlug → public slug + label (GHL labels are messy). */
const CATEGORY_MAP = {
  seo: { slug: "seo", label: "SEO" },
  crm: { slug: "crm", label: "CRM" },
  emailmarketing: { slug: "email-marketing", label: "Email Marketing" },
  "-social-media": { slug: "social-media", label: "Social Media" },
  videomarketing: { slug: "video", label: "Video" },
  ia: { slug: "ai", label: "AI & ChatGPT" },
  rsc: { slug: "social-responsibility", label: "Social Responsibility" },
  strategy: { slug: "strategy", label: "Strategy" },
  branding: { slug: "branding", label: "Branding" },
};

export function ghlConfig(env = process.env) {
  const clean = (v) => String(v || "").trim().replace(/^["']|["']$/g, "");
  return {
    apiKey: clean(env.GHL_API_KEY || env.VITE_GHL_API_KEY),
    locationId: clean(env.GHL_LOCATION_ID || env.VITE_GHL_LOCATION_ID),
    blogId: clean(env.GHL_BLOG_ID) || DEFAULT_BLOG_ID,
  };
}

async function ghlGet(path, { apiKey }) {
  const res = await fetch(`${GHL_API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Version: "2021-07-28",
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    const err = new Error(`GHL ${res.status} on ${path.split("?")[0]}: ${body.slice(0, 200)}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

/** All published post summaries (no body). */
export async function listPublished(cfg) {
  const out = [];
  const limit = 50;
  for (let offset = 0; offset < 2000; offset += limit) {
    const q = new URLSearchParams({
      locationId: cfg.locationId,
      blogId: cfg.blogId,
      limit: String(limit),
      offset: String(offset),
    });
    const json = await ghlGet(`/blogs/posts/all?${q}`, cfg);
    const page = json.blogs || [];
    out.push(...page);
    if (page.length < limit) break;
  }
  return out.filter(
    (p) => p.status === "PUBLISHED" && !p.deleted && !p.archived && p.urlSlug,
  );
}

/** One post including rawHTML, tags and author. */
export async function getPostBody(id, cfg) {
  const q = new URLSearchParams({ locationId: cfg.locationId });
  const json = await ghlGet(`/blogs/posts/${id}?${q}`, cfg);
  return json.blogPost;
}

/** Fetch everything and return normalized, sanitized posts (newest first). */
export async function fetchAllPosts(cfg) {
  const summaries = await listPublished(cfg);
  const posts = [];
  for (const summary of summaries) {
    const full = await getPostBody(summary._id, cfg);
    posts.push(normalizePost(summary, full));
  }
  return sortPosts(posts);
}

/**
 * Change signature for a set of posts. Same result for raw GHL summaries
 * ({ _id, updatedAt }) and normalized posts ({ id, updatedAt }) so the sync
 * job can compare live GHL against what is deployed.
 */
export function postsSignature(posts) {
  const parts = posts
    .map((p) => `${p._id || p.id}:${p.updatedAt || ""}`)
    .sort()
    .join("|");
  let h = 2166136261;
  for (let i = 0; i < parts.length; i++) {
    h ^= parts.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return `${posts.length}-${(h >>> 0).toString(36)}`;
}

export function sortPosts(posts) {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
  );
}

/* ── Slugs ─────────────────────────────────────────────────────────────── */

/**
 * Older posts were given URLs as slugs ("httpscreativeiqmarketingblogvideo-…",
 * "wwwcreativeiqmarketingcomblog…"). Strip that noise and lowercase.
 */
export function cleanSlug(raw = "") {
  let s = String(raw).trim().toLowerCase();
  s = s.replace(
    /^(https?)?(www)?(creativeiq(marketing)?(com)?)?(blog(?=[a-z]))?/,
    "",
  );
  s = s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
  return s || "post";
}

export function slugifyText(text = "") {
  return (
    String(text)
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/<[^>]+>/g, "")
      .replace(/&[a-z#0-9]+;/gi, " ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 64) || "section"
  );
}

/* ── Normalize ─────────────────────────────────────────────────────────── */

function mapCategory(cat) {
  if (!cat || typeof cat !== "object" || cat.deleted) return null;
  const key = String(cat.urlSlug || "").trim().toLowerCase();
  if (CATEGORY_MAP[key]) return CATEGORY_MAP[key];
  const label = String(cat.label || "").trim();
  if (!label) return null;
  return {
    slug: slugifyText(label),
    label: label.replace(/\b\w/g, (c) => c.toUpperCase()),
  };
}

function cleanText(s = "") {
  return String(s).replace(/\s+/g, " ").trim();
}

function decodeEntities(s = "") {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&rsquo;|&lsquo;/g, "’")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&hellip;/g, "…");
}

export function plainText(html = "") {
  return cleanText(decodeEntities(html.replace(/<[^>]+>/g, " ")));
}

function makeDescription(raw, html) {
  let d = cleanText(raw).replace(/^new blog post description\s*/i, "");
  if (d.length < 40) {
    const firstP = (html.match(/<p>([\s\S]*?)<\/p>/) || [])[1] || "";
    d = plainText(firstP) || d;
  }
  if (d.length > 160) d = `${d.slice(0, 157).replace(/\s+\S*$/, "")}…`;
  return d;
}

export function normalizePost(summary, full = {}) {
  const raw = full.rawHTML || "";
  const { html, toc } = sanitizeArticle(raw);
  const words = full.wordCount || plainText(html).split(" ").length;
  const categories = (summary.categories || [])
    .map(mapCategory)
    .filter(Boolean)
    .filter((c, i, arr) => arr.findIndex((x) => x.slug === c.slug) === i);

  return {
    id: summary._id,
    slug: cleanSlug(summary.urlSlug),
    legacySlug: summary.urlSlug,
    title: cleanText(full.title || summary.title),
    description: makeDescription(full.description || summary.description, html),
    image: summary.imageUrl || full.imageUrl || null,
    // GHL alt text is often one word ("crm") — too thin for image SEO / screen readers.
    imageAlt: (() => {
      const alt = cleanText(summary.imageAltText || full.imageAltText || "");
      return alt.length >= 15 ? alt : cleanText(full.title || summary.title);
    })(),
    publishedAt: summary.publishedAt || full.publishedAt || full.createdAt,
    updatedAt: summary.updatedAt || full.updatedAt || summary.publishedAt,
    categories,
    tags: (full.tags || []).map(cleanText).filter(Boolean),
    readMinutes: Math.max(1, Math.round(full.readTimeInMinutes || words / 230)),
    wordCount: words,
    toc,
    html,
  };
}

/** Card/index shape — everything except the body. */
export function toSummary(post) {
  const { html: _h, toc: _t, ...rest } = post;
  return rest;
}

/* ── Sanitizer ─────────────────────────────────────────────────────────── */

const VOID = new Set(["br", "hr", "img", "source"]);
const KEEP = new Set([
  "p", "h2", "h3", "h4", "h5", "h6", "strong", "b", "em", "i", "u", "s",
  "mark", "a", "ul", "ol", "li", "blockquote", "hr", "br", "img", "figure",
  "figcaption", "code", "pre", "video", "source", "iframe", "sup", "sub",
  "table", "thead", "tbody", "tr", "th", "td", "div",
]);
const EMBED_HOSTS =
  /^https:\/\/(www\.)?(youtube\.com|youtube-nocookie\.com|player\.vimeo\.com|www\.loom\.com|fast\.wistia\.net)\//i;

function escAttr(v) {
  return String(v)
    .replace(/&(?!(?:[a-z]+|#\d+|#x[0-9a-f]+);)/gi, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function parseAttrs(src = "") {
  const attrs = {};
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
  let m;
  while ((m = re.exec(src))) {
    attrs[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? "";
  }
  return attrs;
}

function safeUrl(url, { images = false } = {}) {
  const u = decodeEntities(String(url || "")).trim();
  if (!u) return null;
  if (/^(javascript|data|vbscript):/i.test(u)) return null;
  if (images) return /^https?:\/\//i.test(u) ? u : null;
  if (/^(https?:|mailto:|tel:|#|\/)/i.test(u)) return u;
  return null;
}

/** Rewrite links that point at the old GHL-hosted blog to the new routes. */
export function rewriteInternalLink(href) {
  const m = href.match(
    /^https?:\/\/(?:www\.)?creativeiq(?:marketing\.com|\.marketing)\/(?:post|blog)\/([^/?#]+)/i,
  );
  if (m) return `/blog/${cleanSlug(m[1])}`;
  const home = href.match(/^https?:\/\/(?:www\.)?creativeiqmarketing\.com(\/[^#]*)?$/i);
  if (home) return home[1] || "/";
  return href;
}

function buildTag(name, attrs) {
  const out = {};
  if (name === "a") {
    const href = safeUrl(attrs.href);
    if (!href) return null;
    const finalHref = rewriteInternalLink(href);
    out.href = finalHref;
    if (/^https?:\/\//i.test(finalHref)) {
      out.target = "_blank";
      out.rel = "noopener noreferrer";
    }
  } else if (name === "img") {
    const src = safeUrl(attrs.src, { images: true });
    if (!src) return null;
    out.src = src;
    out.alt = attrs.alt || "";
    if (/^\d+$/.test(attrs.width || "")) out.width = attrs.width;
    if (/^\d+$/.test(attrs.height || "")) out.height = attrs.height;
    out.loading = "lazy";
    out.decoding = "async";
  } else if (name === "video") {
    const src = safeUrl(attrs.src, { images: true });
    if (src) out.src = src;
    out.controls = "";
    out.playsinline = "";
    out.preload = "metadata";
  } else if (name === "source") {
    const src = safeUrl(attrs.src, { images: true });
    if (!src) return null;
    out.src = src;
    if (attrs.type) out.type = attrs.type;
  } else if (name === "iframe") {
    const src = safeUrl(attrs.src, { images: true });
    if (!src || !EMBED_HOSTS.test(src)) return null;
    out.src = src;
    out.title = attrs.title || "Embedded video";
    out.loading = "lazy";
    out.allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen";
    out.allowfullscreen = "";
  } else if (/^h[2-6]$/.test(name)) {
    const id = attrs.id || attrs["data-toc-id"];
    if (id) out.id = id.replace(/[^a-zA-Z0-9_-]/g, "");
  } else if (name === "td" || name === "th") {
    if (/^\d+$/.test(attrs.colspan || "")) out.colspan = attrs.colspan;
  }
  const attrStr = Object.entries(out)
    .map(([k, v]) => (v === "" ? ` ${k}` : ` ${k}="${escAttr(v)}"`))
    .join("");
  return `<${name}${attrStr}>`;
}

/**
 * Turn GHL editor HTML (or email HTML pasted into it) into clean, styled-by-us
 * article markup. Also returns a table of contents.
 */
export function sanitizeArticle(input = "") {
  let html = String(input)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|noscript|head|title|xml|o:p)[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<\/?(html|body|meta|link)[^>]*>/gi, "");

  // Email layout tables (no header cells) → unwrap so the copy flows.
  html = html.replace(/<table[\s\S]*?<\/table>/gi, (table) =>
    /<th[\s>]/i.test(table)
      ? table
      : table
          .replace(/<\/?(table|tbody|thead|tfoot|tr)[^>]*>/gi, "")
          .replace(/<td[^>]*>/gi, "<div>")
          .replace(/<\/td>/gi, "</div>"),
  );

  // Rebuild every tag from an allowlist.
  html = html.replace(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*)>/g, (_m, close, rawName, rest) => {
    let name = rawName.toLowerCase();
    if (name === "h1") name = "h2";
    if (name === "b") name = "strong";
    if (name === "i") name = "em";
    if (!KEEP.has(name)) return "";
    if (close) return VOID.has(name) ? "" : `</${name}>`;
    return buildTag(name, parseAttrs(rest)) ?? "";
  });

  html = html
    // headings are already bold — unwrap <strong> inside them
    .replace(/<(h[2-6])([^>]*)>([\s\S]*?)<\/\1>/g, (_m, tag, attrs, inner) =>
      `<${tag}${attrs}>${inner.replace(/<\/?strong>/g, "").trim()}</${tag}>`,
    )
    // drop empty blocks and spacer paragraphs
    .replace(/<(p|div|h[2-6]|li|strong|em)[^>]*>(\s|&nbsp;|<br>)*<\/\1>/g, "")
    .replace(/(<br>\s*){3,}/g, "<br><br>")
    .replace(/<p>(\s|&nbsp;)*<br>/g, "<p>")
    .replace(/<br>(\s|&nbsp;)*<\/p>/g, "</p>")
    // collapse <hr> runs
    .replace(/(<hr>\s*){2,}/g, "<hr>")
    .replace(/^(\s*<hr>)+|(<hr>\s*)+$/g, "")
    .trim();

  // Email-campaign kicker ("01 — Discovery") right before a heading.
  html = html.replace(
    /<p>((?:\d{1,2}|[IVX]{1,4})\s*(?:—|–|-|&mdash;|&ndash;|·)\s*[^<]{1,40})<\/p>(\s*<h[23])/g,
    '<p class="kicker">$1</p>$2',
  );

  // Make sure every h2/h3 has a unique id; build TOC.
  const used = new Set();
  const heads = [];
  html = html.replace(/<(h[23])([^>]*)>([\s\S]*?)<\/\1>/g, (_m, tag, attrs, inner) => {
    let id = (attrs.match(/id="([^"]+)"/) || [])[1];
    const text = plainText(inner);
    if (!id || /^[0-9a-f-]{20,}$/i.test(id)) id = slugifyText(text);
    let unique = id;
    for (let n = 2; used.has(unique); n++) unique = `${id}-${n}`;
    used.add(unique);
    heads.push({ level: Number(tag[1]), id: unique, text });
    return `<${tag} id="${unique}">${inner}</${tag}>`;
  });

  const h2s = heads.filter((h) => h.level === 2);
  // Prefer h2s; otherwise all headings minus numbered sub-steps ("1. Setup").
  const toc = (h2s.length >= 3 ? h2s : heads.filter((h) => !/^\d+\s*[.)]/.test(h.text)))
    // skip "📈 +60% more…" style stat lines — they read as noise in a TOC
    .filter((h) => h.text.length > 1 && /^[\p{L}\p{N}"“'‘¿¡]/u.test(h.text))
    .slice(0, 8)
    .map(({ id, text }) => ({ id, text }));

  return { html, toc };
}

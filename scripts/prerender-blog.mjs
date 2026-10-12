/**
 * Prerender /blog and every /blog/:slug into dist/ with full article HTML,
 * JSON-LD and social meta, then append the blog rules to dist/_redirects.
 * Runs after prerender-routes.mjs. Data comes from public/blog-data (fetch-blog.mjs).
 */
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { EMAIL, LEGAL_NAME, LOGO, OG_IMAGE, PHONE_TEL, SITE_NAME, SITE_URL } from "./seo-catalog.mjs";
import { escapeAttr, setLink, setMeta } from "./html-seo.mjs";
import { cleanSlug } from "../netlify/functions/lib/blog-core.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const dataDir = join(dist, "blog-data");

if (!existsSync(join(dataDir, "index.json"))) {
  console.warn("[blog] dist/blog-data missing — skipping blog prerender.");
  process.exit(0);
}

const shell = readFileSync(join(dist, "index.html"), "utf8").replace(
  /<script type="application\/ld\+json" data-prerender="page">[\s\S]*?<\/script>\s*/i,
  "",
);
const index = JSON.parse(readFileSync(join(dataDir, "index.json"), "utf8")).posts;
const BLOG = `${SITE_URL}/blog`;
const IMAGE_HOSTS = /^https:\/\/(storage\.googleapis\.com\/msgsndr|assets\.cdn\.filesafe\.space)\//;
const cdn = (url, w) => `/.netlify/images?url=${encodeURIComponent(url)}&w=${w}&fm=webp&q=72`;
const srcset = (url) => [480, 800, 1200, 1600].map((w) => `${cdn(url, w)} ${w}w`).join(", ");
const optimizeBody = (html) =>
  html.replace(/<img src="([^"]+)"/g, (m, raw) => {
    const src = raw.replace(/&amp;/g, "&");
    return IMAGE_HOSTS.test(src)
      ? `<img src="${escapeAttr(cdn(src, 1200))}" srcset="${escapeAttr(srcset(src))}" sizes="(min-width: 768px) 44rem, 100vw"`
      : m;
  });
const ROBOTS = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

const esc = (s) =>
  String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const embed = (data) =>
  `<script id="blog-ssr" type="application/json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Chicago",
  });

const publisher = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: LEGAL_NAME,
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: LOGO },
  email: EMAIL,
  telephone: PHONE_TEL,
};

function head(html, page) {
  let next = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttr(page.title)}</title>`);
  const image = page.image || OG_IMAGE;
  const robots = page.noindex ? "noindex, nofollow" : ROBOTS;
  const metas = [
    ["name", "description", page.description],
    ["name", "keywords", page.keywords],
    ["name", "robots", robots],
    ["name", "googlebot", robots],
    ["name", "bingbot", robots],
    ["name", "DC.title", page.title],
    ["property", "og:title", page.title],
    ["property", "og:description", page.description],
    ["property", "og:type", page.type],
    ["property", "og:url", page.url],
    ["property", "og:image", image],
    ["property", "og:image:secure_url", image],
    ["property", "og:image:alt", page.imageAlt || page.title],
    ["property", "og:site_name", SITE_NAME],
    ["name", "twitter:title", page.title],
    ["name", "twitter:description", page.description],
    ["name", "twitter:image", image],
    ["name", "twitter:image:alt", page.imageAlt || page.title],
  ];
  for (const [attr, key, content] of metas) next = setMeta(next, attr, key, content);
  // GHL images aren't always 1200×630 JPEGs — drop the shell's fixed values.
  if (page.image) {
    next = next.replace(/\s*<meta property="og:image:(type|width|height)"[^>]*>/gi, "");
  }
  next = setLink(next, "canonical", page.url);
  for (const lang of ["en", "en-US", "x-default"]) next = setLink(next, "alternate", page.url, lang);

  const extra = [
    `<link rel="alternate" type="application/rss+xml" title="CreativeIQ Blog" href="${BLOG}/rss.xml" />`,
    ...(page.preloadImage && IMAGE_HOSTS.test(page.preloadImage)
      ? [
          `<link rel="preload" as="image" href="${escapeAttr(cdn(page.preloadImage, 1200))}" imagesrcset="${escapeAttr(srcset(page.preloadImage))}" imagesizes="(min-width: 1320px) 1320px, 100vw" fetchpriority="high" />`,
        ]
      : []),
    ...(page.articleMeta || []),
    `<script type="application/ld+json" data-prerender="page">${JSON.stringify(page.jsonLd).replace(/</g, "\\u003c")}</script>`,
  ];
  return next.replace("</head>", `    ${extra.join("\n    ")}\n  </head>`);
}

function body(html, staticHtml, data) {
  return html.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${staticHtml}</div>\n    ${embed(data)}`,
  );
}

function write(path, html) {
  const dir = join(dist, path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html, "utf8");
}

const crumbs = (...items) => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", item: `${SITE_URL}/` }, ...items].map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: c.item,
  })),
});

/* ── /blog ─────────────────────────────────────────────────────────────── */

const indexTitle = "Blog | Websites, CRM & SEO for Texas Businesses | CreativeIQ";
const indexDescription =
  "Straight answers on websites, CRM automation, local SEO, paid ads, and social media — written by the CreativeIQ team in San Antonio for businesses that want to be found.";

const indexHtml = head(shell, {
  title: indexTitle,
  description: indexDescription,
  keywords:
    "CreativeIQ blog, digital marketing blog San Antonio, local SEO Texas, CRM automation tips, missed call text back, Google Local Service Ads, PPC strategy, website conversion, GoHighLevel CRM",
  url: BLOG,
  type: "website",
  imageAlt: "CreativeIQ Blog — websites, CRM and SEO insights",
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${BLOG}#blog`,
        url: BLOG,
        name: "CreativeIQ Blog",
        description: indexDescription,
        inLanguage: "en-US",
        publisher,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        blogPost: index.slice(0, 30).map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: `${BLOG}/${p.slug}`,
          datePublished: p.publishedAt,
          dateModified: p.updatedAt,
          ...(p.image ? { image: p.image } : {}),
        })),
      },
      crumbs({ name: "Blog", item: BLOG }),
    ],
  },
});

const indexStatic = `<main class="blog-static">
  <p class="blog-static-meta">CreativeIQ Blog</p>
  <h1>Straight answers for businesses that want to be found.</h1>
  <p>Websites, CRM, local SEO, ads, and social — what works for San Antonio and Texas businesses, from the team that builds it.</p>
  <ul class="blog-static-list">
${index
  .map(
    (p) => `    <li><article><h2><a href="/blog/${p.slug}">${esc(p.title)}</a></h2><p class="blog-static-meta"><time datetime="${p.publishedAt}">${fmtDate(p.publishedAt)}</time> · ${p.readMinutes} min read</p><p>${esc(p.description)}</p></article></li>`,
  )
  .join("\n")}
  </ul>
</main>`;

write("blog", body(indexHtml, indexStatic, { index }));

/* ── /blog/:slug ───────────────────────────────────────────────────────── */

for (const summary of index) {
  const post = JSON.parse(readFileSync(join(dataDir, "posts", `${summary.slug}.json`), "utf8"));
  const url = `${BLOG}/${post.slug}`;
  const section = post.categories[0]?.label;
  const keywords = [...post.tags, ...post.categories.map((c) => c.label), "CreativeIQ", "San Antonio"].join(", ");

  const articleMeta = [
    `<meta property="article:published_time" content="${post.publishedAt}" />`,
    `<meta property="article:modified_time" content="${post.updatedAt}" />`,
    `<meta property="article:author" content="${SITE_URL}/about/creativeiq" />`,
    ...(section ? [`<meta property="article:section" content="${escapeAttr(section)}" />`] : []),
    ...post.tags.slice(0, 6).map((t) => `<meta property="article:tag" content="${escapeAttr(t)}" />`),
  ];

  const html = head(shell, {
    title: `${post.title} | CreativeIQ Blog`,
    description: post.description,
    keywords,
    url,
    type: "article",
    image: post.image,
    imageAlt: post.imageAlt,
    preloadImage: post.image,
    articleMeta,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          "@id": `${url}#article`,
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          headline: post.title.slice(0, 110),
          description: post.description,
          ...(post.image
            ? { image: { "@type": "ImageObject", url: post.image, caption: post.imageAlt } }
            : {}),
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          author: { "@type": "Organization", name: "CreativeIQ Team", url: `${SITE_URL}/about/creativeiq` },
          publisher,
          isPartOf: { "@id": `${BLOG}#blog` },
          articleSection: post.categories.map((c) => c.label),
          keywords: post.tags.join(", "),
          wordCount: post.wordCount,
          timeRequired: `PT${post.readMinutes}M`,
          inLanguage: "en-US",
        },
        crumbs(
          { name: "Blog", item: BLOG },
          { name: post.title, item: url },
        ),
      ],
    },
  });

  const staticHtml = `<main class="blog-static">
  <article>
    <p class="blog-static-meta"><a href="/blog">CreativeIQ Blog</a>${section ? ` · ${esc(section)}` : ""}</p>
    <h1>${esc(post.title)}</h1>
    <p class="blog-static-meta">By CreativeIQ Team · <time datetime="${post.publishedAt}">${fmtDate(post.publishedAt)}</time> · ${post.readMinutes} min read</p>
    <div class="ciq-prose">${optimizeBody(post.html)}</div>
  </article>
</main>`;

  write(`blog/${post.slug}`, body(html, staticHtml, { post, index }));
}

/* ── Fallback for posts published after this build (served with 404) ──── */

write(
  "blog/_shell",
  head(shell, {
    title: "CreativeIQ Blog",
    description: indexDescription,
    keywords: "CreativeIQ blog",
    url: BLOG,
    type: "website",
    noindex: true,
    jsonLd: { "@context": "https://schema.org", "@type": "WebPage", name: "CreativeIQ Blog" },
  }),
);

/* ── Redirects ─────────────────────────────────────────────────────────── */

const rules = [
  "",
  "# ── Blog (generated by scripts/prerender-blog.mjs) ──",
  "/blog/                           /blog                           301",
  "/blog                            /blog/index.html                200",
  "/post                            /blog                           301",
];
for (const p of index) {
  rules.push(`/blog/${p.slug}/   /blog/${p.slug}   301`);
  rules.push(`/blog/${p.slug}    /blog/${p.slug}/index.html   200`);
  // Old GHL-hosted URLs (creativeiq.marketing/post/<slug> → this domain via the host rule).
  rules.push(`/post/${p.legacySlug}   /blog/${p.slug}   301`);
  if (p.legacySlug.toLowerCase() !== p.slug) {
    rules.push(`/blog/${p.legacySlug}   /blog/${p.slug}   301`);
  }
}
rules.push("/post/*                          /blog                           301");
rules.push("/blog/*                          /blog/_shell/index.html         404");

const redirectsPath = join(dist, "_redirects");
const existing = existsSync(redirectsPath) ? readFileSync(redirectsPath, "utf8") : "";
if (!existing.includes("# ── Blog (generated")) appendFileSync(redirectsPath, `${rules.join("\n")}\n`);

console.log(`[blog] prerendered /blog + ${index.length} posts, ${rules.length} redirect rules`);

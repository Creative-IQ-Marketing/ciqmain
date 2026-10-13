import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { FAQ_GROUPS, LLMS_FAQ_PICKS } from "../src/data/faqs.js";
import {
  IMAGE_SITEMAP,
  SEO_PAGES,
  SITE_URL,
  toCanonical,
} from "./seo-catalog.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const today = new Date().toISOString().slice(0, 10);
const sitemapPages = SEO_PAGES.filter((page) => page.sitemap !== false);

// Blog posts come from GHL via scripts/fetch-blog.mjs (runs first in prebuild).
const blogIndexPath = join(publicDir, "blog-data", "index.json");
const blogPosts = existsSync(blogIndexPath)
  ? JSON.parse(readFileSync(blogIndexPath, "utf8")).posts
  : [];
const latestPost = blogPosts[0]?.updatedAt?.slice(0, 10) || today;

const sitemapEntries = sitemapPages.map(
  (page) => `  <url>
    <loc>${toCanonical(page.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
);

if (blogPosts.length) {
  sitemapEntries.push(`  <url>
    <loc>${SITE_URL}/blog</loc>
    <lastmod>${latestPost}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
  for (const post of blogPosts) {
    sitemapEntries.push(`  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${(post.updatedAt || post.publishedAt).slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join("\n")}
</urlset>
`;

writeFileSync(join(publicDir, "sitemap.xml"), sitemap, "utf8");

const blogImageEntries = blogPosts
  .filter((post) => post.image)
  .map((post) => ({
    path: `/blog/${post.slug}`,
    images: [{ loc: post.image, title: post.imageAlt || post.title }],
  }));

const imageEntries = [...IMAGE_SITEMAP, ...blogImageEntries].map((entry) => {
  const images = entry.images
    .map(
      (image) => `    <image:image>
      <image:loc>${escapeXml(image.loc)}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
    </image:image>`,
    )
    .join("\n");
  return `  <url>
    <loc>${toCanonical(entry.path)}</loc>
${images}
  </url>`;
}).join("\n");

const imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imageEntries}
</urlset>
`;

writeFileSync(join(publicDir, "sitemap-images.xml"), imageSitemap, "utf8");

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-images.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`;

writeFileSync(join(publicDir, "sitemap-index.xml"), sitemapIndex, "utf8");

const robots = `User-agent: *
Allow: /
Disallow: /newsletter/unsubscribed
Disallow: /admin/
Disallow: /.env
Disallow: /api/
Disallow: /*.json$

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: CCBot
Allow: /

Sitemap: ${SITE_URL}/sitemap-index.xml
Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/sitemap-images.xml
`;

writeFileSync(join(publicDir, "robots.txt"), robots, "utf8");

// llms.txt — generated "Frequently asked questions" section (AI answer engines).
function llmsFaqSection() {
  const lines = LLMS_FAQ_PICKS.map(([group, i]) => FAQ_GROUPS[group]?.items[i])
    .filter(Boolean)
    .map((item) => `### ${item.q}\n${item.a}`);
  return `## Frequently asked questions\n${lines.join("\n\n")}\n\nMore answers: ${SITE_URL}/services#faq · ${SITE_URL}/bundles#faq\n`;
}

// llms.txt — keep the generated "Blog" and "Frequently asked questions" sections current.
const llmsPath = join(publicDir, "llms.txt");
if (existsSync(llmsPath)) {
  let llms = readFileSync(llmsPath, "utf8")
    .replace(/\r\n/g, "\n")
    .replace(/\n## Blog\n[\s\S]*?(?=\n## |$)/g, "\n")
    .replace(/\n## Frequently asked questions\n[\s\S]*?(?=\n## |$)/g, "\n");
  const sections = [llmsFaqSection()];
  if (blogPosts.length) {
    sections.push(`## Blog
- Index: ${SITE_URL}/blog
- RSS: ${SITE_URL}/blog/rss.xml
${blogPosts.map((p) => `- [${p.title.replace(/[[\]]/g, "")}](${SITE_URL}/blog/${p.slug}): ${p.description}`).join("\n")}
`);
  }
  const block = sections.join("\n");
  llms = llms.includes("\n## About")
    ? llms.replace("\n## About", `\n${block}\n## About`)
    : `${llms.trimEnd()}\n\n${block}`;
  writeFileSync(llmsPath, llms.replace(/\n{3,}/g, "\n\n"), "utf8");
}

console.log(
  `SEO files: ${sitemapEntries.length} URLs (${blogPosts.length} blog posts), image sitemap, sitemap index`,
);

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

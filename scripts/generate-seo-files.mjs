import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
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

const sitemapEntries = sitemapPages.map(
  (page) => `  <url>
    <loc>${toCanonical(page.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join("\n")}
</urlset>
`;

writeFileSync(join(publicDir, "sitemap.xml"), sitemap, "utf8");

const imageEntries = IMAGE_SITEMAP.map((entry) => {
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

console.log(
  `SEO files: ${sitemapPages.length} URLs, image sitemap, sitemap index`,
);

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

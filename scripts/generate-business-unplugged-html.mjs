import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Prerender SEO shell for the active event RSVP page.
 * Reads slug/title/description from the same values as ACTIVE_EVENT
 * (kept inlined here so the build script stays Node-native without Vite).
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const sourceIndex = path.join(distDir, "index.html");

const EVENT = {
  slug: "carshow",
  title: "Car Show | Dominion Rotary — Oct 10",
  description:
    "RSVP for the 3rd Annual Dominion Rotary Car Show & Blood Drive. Saturday, October 10, 2026, 8:00 AM–2:00 PM at South Texas Blood & Tissue, San Antonio.",
  image: "https://creativeiqmarketing.com/og-showandshine.jpg",
  imageAlt:
    "3rd Annual Dominion Rotary Car Show & Blood Drive — October 10, 2026",
  aliases: ["showandshine", "lets-connect", "live-music", "business-unplugged"],
};

const SEO = {
  title: EVENT.title,
  description: EVENT.description,
  image: EVENT.image,
  imageAlt: EVENT.imageAlt,
  url: `https://creativeiqmarketing.com/${EVENT.slug}`,
};

function replaceMeta(html, attr, key, value) {
  const pattern = new RegExp(
    `<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/>`,
    "i",
  );
  return html.replace(
    pattern,
    `<meta ${attr}="${key}" content="${value}" />`,
  );
}

function replaceTitle(html, title) {
  return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
}

function replaceCanonical(html, url) {
  return html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${url}" />`,
  );
}

function writeShell(slug, seo) {
  if (!fs.existsSync(sourceIndex)) {
    console.warn(`[event-html] dist/index.html not found — skipping ${slug}.`);
    return;
  }

  let html = fs.readFileSync(sourceIndex, "utf8");
  html = replaceTitle(html, seo.title);
  html = replaceMeta(html, "name", "description", seo.description);
  html = replaceMeta(html, "name", "DC.title", seo.title);
  html = replaceMeta(html, "property", "og:title", seo.title);
  html = replaceMeta(html, "property", "og:description", seo.description);
  html = replaceMeta(html, "property", "og:image", seo.image);
  html = replaceMeta(html, "property", "og:image:secure_url", seo.image);
  html = replaceMeta(html, "property", "og:image:alt", seo.imageAlt);
  html = replaceMeta(html, "property", "og:url", seo.url);
  html = replaceMeta(html, "name", "twitter:title", seo.title);
  html = replaceMeta(html, "name", "twitter:description", seo.description);
  html = replaceMeta(html, "name", "twitter:image", seo.image);
  html = replaceMeta(html, "name", "twitter:image:alt", seo.imageAlt);
  html = replaceCanonical(html, seo.url);

  const targetDir = path.join(distDir, slug);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, "index.html"), html);
  console.log(`[event-html] Generated dist/${slug}/index.html`);
}

writeShell(EVENT.slug, SEO);
for (const alias of EVENT.aliases) {
  writeShell(alias, {
    ...SEO,
    url: `https://creativeiqmarketing.com/${alias}`,
  });
}

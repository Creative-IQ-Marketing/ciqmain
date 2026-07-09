import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const sourceIndex = path.join(distDir, "index.html");
const targetDir = path.join(distDir, "business-unplugged");
const targetIndex = path.join(targetDir, "index.html");

const SEO = {
  title: "Business Unplugged | You're Invited — Aug 6 at Hotel Valencia",
  description:
    "RSVP for Business Unplugged — August 6 at Hotel Valencia Riverwalk, San Antonio. An evening of connection, conversation, and cocktails. First 20 guests receive complimentary VIP parking.",
  image: "https://creativeiq.marketing/og-business-unplugged.jpg",
  imageAlt: "Business Unplugged — August 6 at Hotel Valencia Riverwalk, San Antonio",
  url: "https://creativeiq.marketing/business-unplugged",
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

if (!fs.existsSync(sourceIndex)) {
  console.warn("[business-unplugged] dist/index.html not found — skipping.");
  process.exit(0);
}

let html = fs.readFileSync(sourceIndex, "utf8");

html = replaceTitle(html, SEO.title);
html = replaceMeta(html, "name", "description", SEO.description);
html = replaceMeta(html, "name", "DC.title", SEO.title);
html = replaceMeta(html, "property", "og:title", SEO.title);
html = replaceMeta(html, "property", "og:description", SEO.description);
html = replaceMeta(html, "property", "og:image", SEO.image);
html = replaceMeta(html, "property", "og:image:secure_url", SEO.image);
html = replaceMeta(html, "property", "og:image:alt", SEO.imageAlt);
html = replaceMeta(html, "property", "og:url", SEO.url);
html = replaceMeta(html, "name", "twitter:title", SEO.title);
html = replaceMeta(html, "name", "twitter:description", SEO.description);
html = replaceMeta(html, "name", "twitter:image", SEO.image);
html = replaceMeta(html, "name", "twitter:image:alt", SEO.imageAlt);
html = replaceCanonical(html, SEO.url);

fs.mkdirSync(targetDir, { recursive: true });
fs.writeFileSync(targetIndex, html);

console.log("[business-unplugged] Generated dist/business-unplugged/index.html");

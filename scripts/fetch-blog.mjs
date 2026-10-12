/**
 * Pull published posts from GoHighLevel Blogs and write the static blog data.
 *
 * - content/blog/posts.json      committed snapshot; used when GHL is unreachable
 * - public/blog-data/*.json      what the SPA reads at runtime
 * - public/blog/rss.xml          RSS feed
 *
 * Runs in `prebuild`. Locally: `npm run blog:sync`.
 */
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  SITE_URL,
  fetchAllPosts,
  ghlConfig,
  postsSignature,
  sortPosts,
  toSummary,
} from "../netlify/functions/lib/blog-core.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const snapshotPath = join(root, "content", "blog", "posts.json");
const dataDir = join(root, "public", "blog-data");
const feedDir = join(root, "public", "blog");

function loadDotEnv() {
  const file = join(root, ".env");
  if (!existsSync(file)) return {};
  const env = {};
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2];
  }
  return env;
}

function readSnapshot() {
  if (!existsSync(snapshotPath)) return [];
  try {
    return JSON.parse(readFileSync(snapshotPath, "utf8")).posts || [];
  } catch {
    return [];
  }
}

async function loadPosts() {
  const cfg = ghlConfig({ ...loadDotEnv(), ...process.env });
  if (!cfg.apiKey || !cfg.locationId) {
    console.warn("[blog] GHL credentials missing — using committed snapshot.");
    return { posts: readSnapshot(), source: "snapshot" };
  }
  try {
    const posts = await fetchAllPosts(cfg);
    mkdirSync(dirname(snapshotPath), { recursive: true });
    writeFileSync(
      snapshotPath,
      `${JSON.stringify({ fetchedAt: new Date().toISOString(), posts }, null, 2)}\n`,
    );
    return { posts, source: "ghl" };
  } catch (err) {
    console.warn(`[blog] GHL fetch failed (${err.message}) — using committed snapshot.`);
    return { posts: readSnapshot(), source: "snapshot" };
  }
}

function xml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function rss(posts) {
  const items = posts
    .slice(0, 30)
    .map(
      (p) => `    <item>
      <title>${xml(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      <description>${xml(p.description)}</description>
${p.categories.map((c) => `      <category>${xml(c.label)}</category>`).join("\n")}
    </item>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CreativeIQ Blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Websites, CRM, SEO and growth systems for San Antonio and Texas businesses — from the CreativeIQ team.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

const { posts: loaded, source } = await loadPosts();
const posts = sortPosts(loaded);

rmSync(dataDir, { recursive: true, force: true });
mkdirSync(join(dataDir, "posts"), { recursive: true });
mkdirSync(feedDir, { recursive: true });

const summaries = posts.map(toSummary);
writeFileSync(join(dataDir, "index.json"), JSON.stringify({ posts: summaries }));
for (const post of posts) {
  writeFileSync(join(dataDir, "posts", `${post.slug}.json`), JSON.stringify(post));
}
writeFileSync(
  join(dataDir, "manifest.json"),
  JSON.stringify({
    signature: postsSignature(posts),
    count: posts.length,
    generatedAt: new Date().toISOString(),
  }),
);
writeFileSync(join(feedDir, "rss.xml"), rss(posts));

console.log(`[blog] ${posts.length} posts from ${source}`);

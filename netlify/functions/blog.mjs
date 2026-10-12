/**
 * Live blog API — lets a post published in GHL appear on the site before the
 * next build has prerendered it.
 *
 *   GET /api/blog              → { posts: [summary…] }
 *   GET /api/blog?slug=<slug>  → { post } | 404
 */
import {
  cleanSlug,
  getPostBody,
  ghlConfig,
  listPublished,
  normalizePost,
  sortPosts,
  toSummary,
} from "./lib/blog-core.mjs";

const headers = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=60",
  "Netlify-CDN-Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
  "X-Robots-Tag": "noindex",
};

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers });

export default async (req) => {
  const cfg = ghlConfig();
  if (!cfg.apiKey || !cfg.locationId) return json({ error: "not_configured" }, 503);

  const slug = new URL(req.url).searchParams.get("slug");
  try {
    const summaries = await listPublished(cfg);
    if (!slug) {
      const posts = sortPosts(summaries.map((s) => normalizePost(s))).map(toSummary);
      return json({ posts });
    }
    const wanted = cleanSlug(slug);
    const match = summaries.find((s) => cleanSlug(s.urlSlug) === wanted);
    if (!match) return json({ error: "not_found" }, 404);
    const full = await getPostBody(match._id, cfg);
    return json({ post: normalizePost(match, full) });
  } catch (err) {
    console.error("[blog api]", err.message);
    return json({ error: "upstream" }, 502);
  }
};

export const config = { path: "/api/blog" };

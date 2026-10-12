/**
 * Hourly: compare GHL's published posts with what is deployed. If anything
 * was published, edited or unpublished, trigger a Netlify build so the new
 * post is prerendered, added to the sitemap and RSS feed.
 *
 * Needs BLOG_BUILD_HOOK (Netlify → Site configuration → Build hooks).
 */
import { ghlConfig, listPublished, postsSignature } from "./lib/blog-core.mjs";

export default async () => {
  const hook = process.env.BLOG_BUILD_HOOK;
  const siteUrl = process.env.URL || "https://creativeiqmarketing.com";
  const cfg = ghlConfig();
  if (!hook || !cfg.apiKey || !cfg.locationId) {
    console.warn("[blog-sync] BLOG_BUILD_HOOK or GHL credentials missing — skipping.");
    return new Response("skipped", { status: 200 });
  }

  try {
    const live = postsSignature(await listPublished(cfg));
    const res = await fetch(`${siteUrl}/blog-data/manifest.json`, {
      headers: { "Cache-Control": "no-cache" },
    });
    const deployed = res.ok ? (await res.json()).signature : null;

    if (live === deployed) {
      console.log(`[blog-sync] up to date (${live})`);
      return new Response("up to date", { status: 200 });
    }

    await fetch(`${hook}?trigger_title=${encodeURIComponent("Blog updated in CRM")}`, {
      method: "POST",
    });
    console.log(`[blog-sync] rebuild triggered: ${deployed} → ${live}`);
    return new Response("rebuild triggered", { status: 200 });
  } catch (err) {
    console.error("[blog-sync]", err.message);
    return new Response("error", { status: 500 });
  }
};

export const config = { schedule: "@hourly" };

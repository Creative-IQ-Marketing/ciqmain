# Blog — how it works

**Source of truth:** GoHighLevel → Sites → Blogs → **Blogs CreativeIQ**.
Nothing is edited in this repo. `posts.json` here is an automatic snapshot,
used only if GHL is unreachable during a build.

## Publishing (Chelsea)

1. In GHL open **Blogs CreativeIQ** → New post (or duplicate a recent one).
2. Paste the email campaign article. Map the email blocks like this:

   | Email block                       | In the GHL editor                         |
   | --------------------------------- | ----------------------------------------- |
   | Section kicker "01 — Discovery"   | Its own paragraph right above the heading |
   | Section title                     | Heading 2 (Heading 3 for sub-points)      |
   | Tinted box ("Where it breaks")    | Quote / blockquote                        |
   | Divider                           | Horizontal line                           |
   | Bullet / numbered list            | Bullet / numbered list                    |

   Fonts, colours and spacing from the editor are ignored on purpose — the site
   applies its own typography so every post looks consistent.
3. Fill in **SEO** before publishing:
   - **URL slug** — short, lowercase, keyword-first (`missed-call-text-back`).
     Do not paste a full URL into the slug field.
   - **Description** — 140–160 characters; it becomes the Google snippet.
   - **Featured image** + alt text.
   - **Tags** — the 2–4 searches this article should answer. They show on the
     site as "This article answers …" and feed the meta keywords.
   - **Categories** — pick the 1–2 that actually fit.
4. **Publish.** The post appears on `/blog` within ~5 minutes, and is fully
   prerendered (sitemap, RSS, Google-ready HTML) within the hour.

## Under the hood

| Piece                                   | What it does                                                                       |
| --------------------------------------- | ---------------------------------------------------------------------------------- |
| `scripts/fetch-blog.mjs` (prebuild)     | Pulls published posts from GHL, sanitizes HTML, writes `public/blog-data` + RSS    |
| `scripts/prerender-blog.mjs` (build)    | Static HTML per post with full article text, JSON-LD, OG tags; blog redirect rules |
| `scripts/generate-seo-files.mjs`        | Adds `/blog` + every post to `sitemap.xml`, image sitemap, `llms.txt`              |
| `netlify/functions/blog.mjs`            | `/api/blog` — live GHL read, shows brand-new posts before the next build           |
| `netlify/functions/blog-sync.mjs`       | Hourly: if GHL changed, triggers a Netlify build                                   |
| `netlify/functions/lib/blog-core.mjs`   | Shared GHL client, slug cleanup, sanitizer, email-block transforms                 |

Old GHL blog URLs (`creativeiq.marketing/post/<slug>`) 301 to `/blog/<slug>`.

## Netlify environment

| Variable          | Value                                                                  |
| ----------------- | ---------------------------------------------------------------------- |
| `BLOG_BUILD_HOOK` | Netlify → Site configuration → Build & deploy → Build hooks → "Blog"   |
| `GHL_API_KEY`     | Optional server-only token (falls back to `VITE_GHL_API_KEY`)          |
| `GHL_LOCATION_ID` | Optional (falls back to `VITE_GHL_LOCATION_ID`)                        |
| `GHL_BLOG_ID`     | Optional (defaults to `6dvluCVmM0ZTHRRvD04Y`, "Blogs CreativeIQ")      |

Local refresh: `npm run blog:sync`.

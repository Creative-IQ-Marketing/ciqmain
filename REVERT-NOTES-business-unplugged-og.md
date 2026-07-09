# Business Unplugged — Link Preview (OG) Changes

**Date:** 2026-07-09  
**Purpose:** Fix iMessage / Google / social link previews for `https://creativeiq.marketing/business-unplugged` so they show event info instead of the default homepage agency text.

## Problem
Crawlers read static HTML, not React. `/business-unplugged` was serving the same `index.html` meta tags as the homepage (“AI SEO, Social Media Marketing, Websites, CRM Automation”).

## What was added/changed

### New files
- `public/og-business-unplugged.jpg` — flyer image copied from `src/assets/rsvp.jpeg` for OG preview
- `src/constants/businessUnpluggedSeo.js` — shared title, description, ogImage, canonical
- `scripts/generate-business-unplugged-html.mjs` — post-build script; writes `dist/business-unplugged/index.html` with event OG tags

### Modified files
- `src/pages/BusinessUnpluggedPage.jsx` — uses `BUSINESS_UNPLUGGED_SEO` constants
- `src/components/SEO.jsx` — added optional `ogImageAlt` prop
- `public/_redirects` — `/business-unplugged` → `/business-unplugged/index.html` (before catch-all)
- `public/sitemap.xml` — added `/business-unplugged` URL entry
- `package.json` — build script: `vite build && node scripts/generate-business-unplugged-html.mjs`

### Build output (generated, not committed)
- `dist/business-unplugged/index.html` — prerendered HTML with event OG meta tags

## Event preview content
- **Title:** Business Unplugged | You're Invited — Aug 6 at Hotel Valencia
- **Description:** RSVP for Business Unplugged — August 6 at Hotel Valencia Riverwalk…
- **Image:** `https://creativeiq.marketing/og-business-unplugged.jpg`
- **URL:** `https://creativeiq.marketing/business-unplugged`

## How to revert
1. Delete: `public/og-business-unplugged.jpg`, `src/constants/businessUnpluggedSeo.js`, `scripts/generate-business-unplugged-html.mjs`, this file
2. Restore `BusinessUnpluggedPage.jsx` to inline SEO props (title + description + canonical only, no ogImage)
3. Remove `ogImageAlt` from `SEO.jsx` if unused elsewhere
4. Restore `public/_redirects` to: `/* /index.html 200`
5. Remove `/business-unplugged` entry from `public/sitemap.xml`
6. Restore `package.json` build to: `"build": "vite build"`

Say: **“revert the business unplugged OG preview changes”** to undo all of the above.

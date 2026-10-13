import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  AREA_SERVED,
  EMAIL,
  LEGAL_NAME,
  OG_IMAGE,
  ORG_TYPE,
  PHONE_TEL,
  SEO_PAGES,
  SITE_NAME,
  SITE_URL,
  toCanonical,
} from "./seo-catalog.mjs";
import { escapeAttr, setLink, setMeta } from "./html-seo.mjs";
import { faqItemsForPage } from "../src/data/faqs.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(root, "dist");
const shell = readFileSync(join(distDir, "index.html"), "utf8");

function breadcrumbJsonLd(page) {
  if (!page.breadcrumbs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: toCanonical("/"),
      },
      ...page.breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: crumb.label,
        item: toCanonical(crumb.href),
      })),
    ],
  };
}

function pageJsonLd(page) {
  const url = toCanonical(page.path);
  const graph = [
    {
      "@type": page.schemaType === "Service" ? "WebPage" : page.schemaType || "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
    },
  ];

  if (page.schemaType === "Service") {
    graph.push({
      "@type": "Service",
      name: page.title.replace(/\s*\|\s*.*$/, ""),
      description: page.description,
      url,
      provider: {
        "@type": ORG_TYPE,
        name: LEGAL_NAME,
        url: SITE_URL,
        telephone: PHONE_TEL,
        email: EMAIL,
      },
      areaServed: { "@type": "AdministrativeArea", name: AREA_SERVED },
    });
  }

  if (page.schemaType === "ContactPage") {
    graph.push({
      "@type": "ContactPage",
      name: page.title,
      url,
      mainEntity: {
        "@type": ORG_TYPE,
        name: LEGAL_NAME,
        telephone: PHONE_TEL,
        email: EMAIL,
      },
    });
  }

  // FAQPage — same data as the visible FAQ section (src/data/faqs.js).
  const faqItems = faqItemsForPage(page.path);
  if (faqItems.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      url,
      isPartOf: { "@id": `${url}#webpage` },
      about: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  const breadcrumbs = breadcrumbJsonLd(page);
  if (breadcrumbs) graph.push(breadcrumbs);

  return { "@context": "https://schema.org", "@graph": graph };
}

function injectPageSeo(html, page) {
  const canonical = toCanonical(page.path);
  const image = page.ogImage || OG_IMAGE;
  const robots = page.noindex
    ? "noindex, nofollow"
    : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";
  let next = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeAttr(page.title)}</title>`,
  );

  next = setMeta(next, "name", "description", page.description);
  next = setMeta(next, "name", "keywords", page.keywords);
  next = setMeta(next, "name", "robots", robots);
  next = setMeta(next, "name", "googlebot", robots);
  next = setMeta(next, "name", "bingbot", robots);
  next = setMeta(next, "property", "og:title", page.title);
  next = setMeta(next, "property", "og:description", page.description);
  next = setMeta(
    next,
    "property",
    "og:type",
    page.pageType === "article" ? "article" : "website",
  );
  next = setMeta(next, "property", "og:url", canonical);
  next = setMeta(next, "property", "og:image", image);
  next = setMeta(next, "property", "og:image:secure_url", image);
  next = setMeta(next, "property", "og:image:alt", page.ogImageAlt || page.title);
  next = setMeta(next, "property", "og:site_name", SITE_NAME);
  next = setMeta(next, "name", "twitter:title", page.title);
  next = setMeta(next, "name", "twitter:description", page.description);
  next = setMeta(next, "name", "twitter:image", image);
  next = setMeta(next, "name", "twitter:image:alt", page.ogImageAlt || page.title);
  next = setLink(next, "canonical", canonical);
  next = setLink(next, "alternate", canonical, "en");
  next = setLink(next, "alternate", canonical, "en-US");
  next = setLink(next, "alternate", canonical, "x-default");

  const jsonLd = `<script type="application/ld+json" data-prerender="page">${JSON.stringify(pageJsonLd(page))}</script>`;
  next = next.replace(
    /<script type="application\/ld\+json" data-prerender="page">[\s\S]*?<\/script>\s*/i,
    "",
  );
  return next.replace("</head>", `    ${jsonLd}\n  </head>`);
}

for (const page of SEO_PAGES) {
  const html = injectPageSeo(shell, page);
  if (page.path === "/") {
    writeFileSync(join(distDir, "index.html"), html, "utf8");
  } else {
    const dir = join(distDir, page.path.replace(/^\//, ""));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), html, "utf8");
  }
}

console.log(`Prerendered ${SEO_PAGES.length} route HTML shells into dist/`);

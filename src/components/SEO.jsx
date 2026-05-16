import { useEffect, useMemo } from "react";

export default function SEO({
  title = "CreativeIQ Digital Marketing | AI SEO, Social Media, Websites & CRM Automation",
  description = "Are you showing up on AI platforms—not just Google? Is your website converting leads? Does your social media marketing + positioning help you win? CreativeIQ builds AI-ready SEO ecosystems that drive real growth. San Antonio's top digital marketing agency.",
  keywords = "AI SEO, AI search optimization, ChatGPT SEO, Gemini SEO, Claude SEO, Perplexity SEO, GEO optimization, generative engine optimization, search engine optimization, technical SEO, local SEO, conversion rate optimization, CRO, website development, landing pages, CRM automation, GoHighLevel CRM, email marketing, social media marketing, Facebook ads, Google ads, PPC advertising, pay-per-click San Antonio, Google Business Profile optimization, digital marketing agency San Antonio TX, marketing agency San Antonio, SEO agency San Antonio, AI-ready marketing, digital marketing strategy, content marketing, lead generation San Antonio",
  ogImage = "/og-image.jpg",
  canonical = null,
  pageType = "website",
}) {
  // Compute canonical and window-dependent URLs in useMemo to avoid SSR issues
  const { canonicalUrl, ogImageUrl, ogImageSecureUrl, currentUrl, hostname } =
    useMemo(() => {
      if (typeof window === "undefined") {
        return {
          canonicalUrl: "",
          ogImageUrl: "",
          ogImageSecureUrl: "",
          currentUrl: "",
          hostname: "",
        };
      }
      return {
        canonicalUrl:
          canonical || window.location.origin + window.location.pathname,
        ogImageUrl: window.location.origin + ogImage,
        ogImageSecureUrl: window.location.origin + ogImage,
        currentUrl: window.location.href,
        hostname: window.location.hostname,
      };
    }, [canonical, ogImage]);
  useEffect(() => {
    if (typeof window === "undefined") return;

    document.title = title;

    const metaTags = [
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { name: "author", content: "CreativeIQ Marketing" },
      {
        name: "robots",
        content:
          "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      {
        name: "googlebot",
        content:
          "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      {
        name: "bingbot",
        content:
          "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      // AI Agent crawlers
      { name: "OAI-SearchBot", content: "index, follow" },
      { name: "CCBot", content: "index, follow" },
      { name: "PerplexityBot", content: "index, follow" },
      { name: "ClaudeBot", content: "index, follow" },
      { name: "revisit-after", content: "7 days" },
      { name: "rating", content: "general" },
      { name: "referrer", content: "strict-origin-when-cross-origin" },
      // Geo / Local SEO
      { name: "geo.region", content: "US-TX" },
      { name: "geo.placename", content: "San Antonio, Texas" },
      { name: "geo.position", content: "29.4241;-98.4936" },
      { name: "ICBM", content: "29.4241, -98.4936" },
      // Dublin Core
      { name: "DC.title", content: title },
      { name: "DC.language", content: "en-US" },
      // Page classification
      {
        name: "classification",
        content: "Digital Marketing, SEO, Advertising",
      },
      {
        name: "category",
        content:
          "Digital Marketing Agency, SEO, PPC, CRM Automation, San Antonio TX",
      },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { name: "theme-color", content: "#ffffff" },
      // Open Graph
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "CreativeIQ Marketing" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: pageType },
      { property: "og:image", content: ogImageUrl },
      {
        property: "og:image:secure_url",
        content: ogImageSecureUrl,
      },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: title },
      { property: "og:url", content: currentUrl },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImageUrl },
      { name: "twitter:image:alt", content: title },
      { name: "twitter:domain", content: hostname },
      // Mobile
      { name: "apple-mobile-web-app-capable", content: "yes" },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black-translucent",
      },
      { name: "format-detection", content: "telephone=no" },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const attribute = name ? "name" : "property";
      const value = name || property;
      let element = document.querySelector(`meta[${attribute}="${value}"]`);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    });

    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonicalUrl);
    }

    let langLink = document.querySelector(
      'link[rel="alternate"][hreflang="en"]',
    );
    if (!langLink) {
      langLink = document.createElement("link");
      langLink.setAttribute("rel", "alternate");
      langLink.setAttribute("hreflang", "en");
      langLink.setAttribute("href", currentUrl);
      document.head.appendChild(langLink);
    }
  }, [
    title,
    description,
    keywords,
    canonicalUrl,
    currentUrl,
    ogImageUrl,
    ogImageSecureUrl,
    hostname,
    pageType,
  ]);

  return null;
}

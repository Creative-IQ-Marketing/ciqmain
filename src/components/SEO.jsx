import { useEffect } from "react";

export default function SEO({
  title = "CreativeIQ Marketing - San Antonio's #1 Digital Marketing Agency",
  description = "Award-winning digital marketing agency in San Antonio, TX with 8+ years experience. Specializing in SEO, PPC, Social Media Marketing, CRM solutions, and Web Development for 500+ satisfied clients.",
  keywords = "digital marketing San Antonio, SEO agency, PPC advertising, social media marketing, web development, CRM solutions, digital marketing agency Texas, marketing services, SEO company, paid advertising, local SEO, content marketing, CreativeIQ, San Antonio marketing",
  ogImage = "/og-image.jpg",
  canonical = "",
  pageType = "website",
}) {
  useEffect(() => {
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
      { name: "googlebot", content: "index, follow" },
      { name: "bingbot", content: "index, follow" },
      { name: "revisit-after", content: "7 days" },
      { name: "rating", content: "general" },
      { name: "geo.region", content: "US-TX" },
      { name: "geo.placename", content: "San Antonio" },
      { name: "geo.position", content: "29.4241;-98.4936" },
      { name: "ICBM", content: "29.4241, -98.4936" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { name: "theme-color", content: "#ffffff" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "CreativeIQ Marketing" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: pageType },
      { property: "og:image", content: window.location.origin + ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: title },
      { property: "og:url", content: window.location.href },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: window.location.origin + ogImage },
      { name: "twitter:domain", content: "creativeiq.marketing" },
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

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

    // Add language link
    let langLink = document.querySelector(
      'link[rel="alternate"][hreflang="en"]',
    );
    if (!langLink) {
      langLink = document.createElement("link");
      langLink.setAttribute("rel", "alternate");
      langLink.setAttribute("hreflang", "en");
      langLink.setAttribute("href", window.location.href);
      document.head.appendChild(langLink);
    }
  }, [title, description, keywords, ogImage, canonical, pageType]);

  return null;
}

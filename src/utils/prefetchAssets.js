/**
 * Prefetch images / route chunks for faster page switches.
 */
const prefetched = new Set();

export function prefetchImage(url) {
  if (!url || typeof document === "undefined" || prefetched.has(url)) return;
  prefetched.add(url);
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.as = "image";
  link.href = url;
  document.head.appendChild(link);
}

export function preloadImage(url, { priority = "low" } = {}) {
  if (!url || typeof document === "undefined" || prefetched.has(`preload:${url}`))
    return;
  prefetched.add(`preload:${url}`);
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = url;
  link.fetchPriority = priority;
  document.head.appendChild(link);
}

/** Warm likely next-route assets on idle / hover */
export function warmRoute(path) {
  if (typeof window === "undefined") return;
  if (path.startsWith("/services")) {
    import("../pages/ServicesPage");
    import("../assets/generated/services-hero-systems.webp").then((m) =>
      prefetchImage(m.default),
    );
  } else if (path.startsWith("/about/vilma")) {
    import("../pages/AboutVilmaPage");
    import("../assets/vilma/vilma-creative.webp").then((m) =>
      prefetchImage(m.default),
    );
  } else if (path.startsWith("/about/creativeiq")) {
    import("../pages/AboutCiqPage");
  } else if (path.startsWith("/free-ai-seo-audit")) {
    import("../pages/FreeSeoAuditPage");
  } else if (path === "/contact" || path.startsWith("/contact")) {
    import("../pages/ContactPage");
  } else if (path === "/book") {
    import("../pages/BookPage");
  }
}

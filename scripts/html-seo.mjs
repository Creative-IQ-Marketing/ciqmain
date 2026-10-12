/** Head-tag helpers shared by the prerender scripts. */

export function setMeta(html, attr, key, content) {
  const re = new RegExp(
    `<meta\\s+[^>]*${attr}=["']${escapeReg(key)}["'][^>]*>`,
    "i",
  );
  const tag = `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

export function setLink(html, rel, href, hreflang) {
  const selector = hreflang
    ? `rel=["']alternate["'][^>]*hreflang=["']${escapeReg(hreflang)}["']`
    : `rel=["']${escapeReg(rel)}["'](?![^>]*hreflang)`;
  const re = new RegExp(`<link\\s+[^>]*${selector}[^>]*>`, "i");
  const tag = hreflang
    ? `<link rel="alternate" hreflang="${hreflang}" href="${escapeAttr(href)}" />`
    : `<link rel="${rel}" href="${escapeAttr(href)}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

export function escapeAttr(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");
}

export function escapeReg(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

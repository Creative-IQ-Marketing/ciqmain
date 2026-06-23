export const SERVICE_FORM_OPTIONS = [
  {
    value: "bundle-essential",
    label: "Bundle 1 — Essential Visibility ($999/m)",
  },
  { value: "bundle-growth", label: "Bundle 2 — Growth Operations ($2,222/m)" },
  { value: "bundle-elite", label: "Bundle 3 — Elite Automation ($3,888/m)" },
  { value: "social-starter", label: "Social Starter — 30-Day Trial ($589/m)" },
  { value: "social-classic", label: "The Classic — Social Package ($999/m)" },
  { value: "social-refined", label: "The Refined — Social Package ($1,469/m)" },
  {
    value: "social-signature",
    label: "The Signature — Social Package ($2,369/m)",
  },
  {
    value: "social-elite",
    label: "Elite Social System ($2,999/m)",
  },
  { value: "video-production", label: "Video Production (à la carte)" },
  { value: "consulting-hourly", label: "Consulting — $199/hr" },
  {
    value: "consulting-699",
    label: "Consulting — Strategy Sessions ($699/yr)",
  },
  {
    value: "consulting-999",
    label: "Consulting — Implementation Support ($999/yr)",
  },
  {
    value: "consulting-unlimited",
    label: "Consulting — Unlimited Access ($499/mo)",
  },
  { value: "crm-automation", label: "CRM Solutions & Automation" },
  { value: "audit", label: "Conversion Intelligence Audit" },
  { value: "retainer", label: "Conversion Optimization Retainer" },
  { value: "tier-foundation", label: "Tier 1 — Foundation System" },
  { value: "tier-growth-engine", label: "Tier 2 — Growth Engine" },
  { value: "tier-brand-authority", label: "Tier 3 — Brand Authority System" },
  { value: "tier-revenue", label: "Tier 4 — Revenue Maximizer" },
  { value: "tier-enterprise", label: "Tier 5 — Enterprise Growth Partner" },
  { value: "other", label: "Not sure yet — let's talk" },
];

/** Default interest when landing on a services section via hash nav */
export const SECTION_INTEREST_MAP = {
  "website-seo": "bundle-growth",
  "content-creation": "social-starter",
  consulting: "consulting-hourly",
  "crm-solutions": "crm-automation",
};

/** Maps legacy / short query values to form option values */
export const INTEREST_ALIASES = {
  social: "social-starter",
  consulting: "consulting-hourly",
  crm: "crm-automation",
  seo: "bundle-essential",
  web: "bundle-essential",
  ppc: "bundle-growth",
  gmb: "bundle-essential",
  content: "video-production",
  other: "other",
  ai: "consulting-hourly",
};

export function getServiceFormLabel(value) {
  const option = SERVICE_FORM_OPTIONS.find((o) => o.value === value);
  return option?.label ?? value;
}

export function isValidFormInterest(value) {
  return SERVICE_FORM_OPTIONS.some((o) => o.value === value);
}

export function normalizeFormInterest(value) {
  if (!value) return "";
  if (isValidFormInterest(value)) return value;
  return INTEREST_ALIASES[value] || "";
}

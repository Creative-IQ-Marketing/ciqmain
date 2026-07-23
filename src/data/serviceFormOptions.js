export const SERVICE_FORM_OPTIONS = [
  {
    value: "bundle-launch",
    label: "CIQ Launch System ($1,198/m)",
  },
  { value: "bundle-growth", label: "CIQ Growth System ($1,999/m)" },
  { value: "bundle-authority", label: "CIQ Authority System ($2,999/m)" },
  { value: "bundle-dominance", label: "CIQ Dominance System ($4,997+/m)" },
  { value: "social-starter", label: "Social Starter — 30-Day Trial ($569/m)" },
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
  { value: "seo-foundation", label: "SEO Foundation (from $299/m)" },
  { value: "seo-growth", label: "SEO Growth (from $499/m)" },
  { value: "seo-authority", label: "SEO Authority (from $799/m)" },
  { value: "seo-dominance", label: "SEO Dominance (from $999+/m)" },
  { value: "crm-starter", label: "DIY CRM Starter ($97/m)" },
  { value: "crm-pro", label: "CRM Pro ($397/m)" },
  { value: "crm-elite", label: "CRM Elite ($497/m)" },
  { value: "brand-identity", label: "Brand Identity ($550 one-time)" },
  { value: "paid-ads", label: "Paid Advertising (from $599 setup)" },
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
  { value: "other", label: "Not sure yet — let's talk" },
];

/** Default interest when landing on a services section via hash nav */
export const SECTION_INTEREST_MAP = {
  "website-seo": "bundle-growth",
  bundles: "bundle-growth",
  "growth-infra": "seo-growth",
  "high-level": "paid-ads",
  "content-creation": "social-starter",
  consulting: "consulting-hourly",
  "crm-solutions": "crm-pro",
};

/** Maps legacy / short query values to form option values */
export const INTEREST_ALIASES = {
  social: "social-starter",
  consulting: "consulting-hourly",
  crm: "crm-pro",
  "crm-automation": "crm-pro",
  seo: "seo-growth",
  web: "bundle-launch",
  ppc: "paid-ads",
  gmb: "seo-foundation",
  content: "video-production",
  other: "other",
  ai: "crm-elite",
  audit: "seo-foundation",
  retainer: "paid-ads",
  "bundle-essential": "bundle-launch",
  "bundle-elite": "bundle-dominance",
  "tier-foundation": "seo-foundation",
  "tier-growth-engine": "seo-growth",
  "tier-brand-authority": "seo-authority",
  "tier-revenue": "seo-dominance",
  "tier-enterprise": "bundle-dominance",
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

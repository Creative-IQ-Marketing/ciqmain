/** The three systems CreativeIQ leads with. À la carte lives on /services. */

export const GROWTH_LOOP = [
  { id: "found", label: "Get found", detail: "SEO, AI search, social, Google Business, ads" },
  { id: "capture", label: "Capture", detail: "Site, forms, and a pipeline that holds the lead" },
  { id: "nurture", label: "Nurture", detail: "Follow-up, booking, and reviews on autopilot" },
  { id: "prove", label: "Prove", detail: "Reporting that shows what the system returned" },
];

export const MAIN_BUNDLES = [
  {
    id: "launch",
    index: "01",
    name: "Launch",
    full: "CIQ Launch",
    interest: "bundle-launch",
    stage: "Get found",
    badge: null,
    outcome: "A presence that captures leads from day one.",
    monthly: "$1,198",
    monthlyLabel: "$1,198/mo",
    value: "$1,332/mo value",
    savings: "Save $154/mo",
    structure: "6-month structure",
    preview: [
      "1 coded website page",
      "SEO setup, speed, and mobile",
      "Social Starter — 8 posts/mo",
      "CRM starter, forms, and pipeline",
    ],
    features: [
      "1 fully coded website page (+$999 per additional page)",
      "SEO setup: indexing, speed, mobile",
      "Social Starter — 8 posts per month",
      "CRM lead capture with forms on the site",
      "Contact database and a basic pipeline",
      "Missed-call text-back and chat widget",
    ],
    bestFor: "Businesses putting a complete digital foothold in place.",
  },
  {
    id: "growth",
    index: "02",
    name: "Growth",
    full: "CIQ Growth",
    interest: "bundle-growth",
    stage: "Capture & nurture",
    badge: "Most chosen",
    outcome: "Inbound that gets answered and booked.",
    monthly: "$1,999",
    monthlyLabel: "$1,999/mo",
    value: "$2,294/mo value",
    savings: "Save $295/mo",
    structure: null,
    preview: [
      "2–3 coded website pages",
      "SEO Growth and Core Web Vitals",
      "The Classic — 12+ posts",
      "CRM Pro: funnels, booking, automation",
    ],
    features: [
      "2–3 fully coded website pages",
      "SEO Growth, crawl and index fixes, Core Web Vitals",
      "The Classic social system — 12–18 posts plus a production day",
      "CRM funnels, booking, and automation",
      "Lead tracking and tagging",
    ],
    bestFor: "Teams ready for a steady flow of leads that actually convert.",
  },
  {
    id: "authority",
    index: "03",
    name: "Authority",
    full: "CIQ Authority",
    interest: "bundle-authority",
    stage: "Prove",
    badge: null,
    outcome: "Visibility, trust, and a record of the work.",
    monthly: "$2,999",
    monthlyLabel: "$2,999/mo",
    value: "$3,497/mo value",
    savings: "Save $498/mo",
    structure: null,
    preview: [
      "4–6 coded website pages",
      "SEO Authority — schema and AI search",
      "The Refined social system",
      "CRM automation, AI chat, reviews",
    ],
    features: [
      "4–6 fully coded website pages",
      "Advanced SEO: schema, AEO, technical optimization",
      "The Refined social system — 12–18 posts plus production days",
      "CRM automation, AI chat, and a review system",
    ],
    bestFor: "Brands building trust and a predictable inbound engine.",
  },
];

export const BUNDLE_COMPARE_TIERS = MAIN_BUNDLES.map((bundle, id) => ({
  id,
  key: bundle.id,
  name: bundle.name,
  full: bundle.full,
  monthly: bundle.monthlyLabel,
  popular: bundle.id === "growth",
}));

export const BUNDLE_COMPARE_ROWS = [
  {
    group: "Website",
    label: "Coded website pages",
    values: ["1 page", "2–3 pages", "4–6 pages"],
  },
  {
    group: "Website",
    label: "Additional pages",
    values: ["+$999", "+$999", "+$999"],
  },
  {
    group: "SEO",
    label: "SEO tier included",
    values: ["SEO Growth", "SEO Growth", "SEO Authority"],
  },
  {
    group: "SEO",
    label: "Indexing, speed, mobile",
    values: [true, true, true],
  },
  {
    group: "SEO",
    label: "Core Web Vitals",
    values: [false, true, true],
  },
  {
    group: "SEO",
    label: "Schema and AI search",
    values: [false, false, true],
  },
  {
    group: "Social",
    label: "Social package",
    values: ["Starter", "Classic", "Refined"],
  },
  {
    group: "Social",
    label: "Posts / month",
    values: ["8", "12–18", "12–18"],
  },
  {
    group: "CRM",
    label: "CRM tier",
    values: ["DIY Starter", "CRM Pro", "CRM Pro"],
  },
  {
    group: "CRM",
    label: "Lead capture and pipeline",
    values: [true, true, true],
  },
  {
    group: "CRM",
    label: "Funnels and booking",
    values: [false, true, true],
  },
  {
    group: "CRM",
    label: "AI chat and reviews",
    values: [false, false, true],
  },
  {
    group: "Value",
    label: "Bought separately",
    values: ["$1,332/mo", "$2,294/mo", "$3,497/mo"],
  },
  {
    group: "Value",
    label: "You save",
    values: ["$154/mo", "$295/mo", "$498/mo"],
  },
];

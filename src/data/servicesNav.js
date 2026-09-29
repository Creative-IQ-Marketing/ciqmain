export const BUNDLES_NAV = {
  id: "bundles",
  label: "Bundles",
  href: "/bundles",
  overviewLabel: "All three systems",
  children: [
    { label: "Launch", href: "/bundles#launch" },
    { label: "Growth", href: "/bundles#growth" },
    { label: "Authority", href: "/bundles#authority" },
  ],
};

export const SERVICE_SECTIONS = [
  {
    id: "website-seo",
    label: "SEO",
  },
  {
    id: "content-creation",
    label: "Social",
  },
  {
    id: "consulting",
    label: "Consulting",
  },
  {
    id: "crm-solutions",
    label: "CRM",
  },
];

export const SERVICES_NAV = {
  id: "services",
  label: "Services",
  href: "/services",
  overviewLabel: "All services",
  children: SERVICE_SECTIONS.map(({ id, label }) => ({
    label,
    href: `/services#${id}`,
  })),
};

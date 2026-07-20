export const SERVICE_SECTIONS = [
  {
    id: "website-seo",
    label: "Growth systems",
  },
  {
    id: "content-creation",
    label: "Social packages",
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

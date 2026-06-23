export const SERVICE_SECTIONS = [
  { id: "website-seo", label: "Website & SEO" },
  { id: "content-creation", label: "Content Creation" },
  { id: "consulting", label: "Consulting" },
  { id: "crm-solutions", label: "CRM Solutions" },
];

export const SERVICES_NAV = {
  label: "Services",
  href: "/services",
  children: SERVICE_SECTIONS.map(({ id, label }) => ({
    label,
    href: `/services#${id}`,
  })),
};

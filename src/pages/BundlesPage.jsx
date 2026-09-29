import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../components/SEO";
import PageHeader, { PageCtaPrimary, PageCtaSecondary } from "../components/layout/PageHeader";
import BundleRows from "../components/services/BundleRows";
import BundleTable from "../components/services/BundleTable";
import ServicesContact from "../components/services/ServicesContact";
import { scrollToSection } from "../utils/scrollToSection";
import { trackButtonClick } from "../services/analytics";

export default function BundlesPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return undefined;
    const id = hash.replace("#", "");
    const timer = window.setTimeout(() => scrollToSection(id), 180);
    return () => window.clearTimeout(timer);
  }, [hash]);

  useEffect(() => {
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://creativeiqmarketing.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Bundles",
          item: "https://creativeiqmarketing.com/bundles",
        },
      ],
    };
    const offers = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "CreativeIQ growth bundles",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "CIQ Launch — $1,198/mo",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "CIQ Growth — $1,999/mo",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "CIQ Authority — $2,999/mo",
        },
      ],
    };
    const schemas = [breadcrumb, offers];
    const scripts = schemas.map((schema, i) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.schema = `bundles-${i}`;
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
      return script;
    });
    return () => scripts.forEach((s) => s.remove());
  }, []);

  return (
    <main>
      <SEO
        title="Growth Bundles | Launch, Growth, Authority | CreativeIQ"
        description="Three CreativeIQ growth systems: Launch at $1,198/mo, Growth at $1,999/mo, and Authority at $2,999/mo. Website, SEO, social, and CRM in one loop."
        keywords="CIQ Launch, CIQ Growth, CIQ Authority, marketing bundles, SEO social CRM package, CreativeIQ pricing"
        canonical="https://creativeiqmarketing.com/bundles"
      />

      <PageHeader
        eyebrow="Bundles"
        title="Three systems."
        titleAccent="One loop."
        description="Get found, capture the lead, nurture it, and prove the work. Launch, Growth, and Authority are the three we lead with — not a menu of disconnected services."
      >
        <PageCtaPrimary
          to="/bundles#launch"
          onClick={() => trackButtonClick("See the systems", "bundles_hero", "Bundles")}
        >
          See the systems
        </PageCtaPrimary>
        <PageCtaSecondary
          to="/services"
          onClick={() => trackButtonClick("À la carte", "bundles_hero", "Bundles")}
        >
          Build it à la carte
        </PageCtaSecondary>
      </PageHeader>

      <BundleRows
        showScaleNote
        eyebrow="Find your system"
        title="Pick the"
        titleAccent="right system."
        lede="Each system includes the website, the SEO, the social, and the CRM for that stage. À la carte pricing stays on the services page."
      />
      <BundleTable />
      <ServicesContact />
    </main>
  );
}

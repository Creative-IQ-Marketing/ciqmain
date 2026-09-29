import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../components/SEO";
import PageHeader, { PageCtaPrimary, PageCtaSecondary } from "../components/layout/PageHeader";
import BundleOffers from "../components/services/BundleOffers";
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
        description="Get found, capture the lead, nurture it, and prove the work. Launch, Growth, and Authority are the three we lead with."
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
      <BundleOffers
        eyebrow="Launch · Growth · Authority"
        title="Pick a"
        titleAccent="system."
        lede="Each one includes the website, the SEO, the social, and the CRM for that stage. If you only need a single piece, the à la carte menu is on the services page."
      />
      <BundleTable />
      <ServicesContact />
    </main>
  );
}

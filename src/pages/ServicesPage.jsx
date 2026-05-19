import SEO from "../components/SEO";
import ServicesHero from "../components/services/ServicesHero";
import BundlePricing from "../components/services/BundlePricing";
import BundleTable from "../components/services/BundleTable";
import HighLevelOffers from "../components/services/HighLevelOffers";
import GrowthInfra from "../components/services/GrowthInfra";
import ServicesContact from "../components/services/ServicesContact";
import GHLValueTable from "../components/landing/GHLValueTable";

export default function ServicesPage() {
  return (
    <main>
      <SEO
        title="Digital Marketing Services | SEO, CRM, Web Design | CreativeIQ"
        description="Full-service digital marketing agency offering SEO, PPC, social media, web development, and CRM automation in San Antonio. Expert services for growing businesses."
        keywords="digital marketing services, SEO services, PPC management, web design, CRM automation, social media marketing, marketing agency San Antonio"
        canonical="https://creativeiq.marketing/services"
      />

      {/* 1. Hero — headline + stats */}
      <ServicesHero />

      {/* 2. Pricing cards — 3 bundles side by side */}
      <BundlePricing />

      {/* 3. Full feature comparison table */}
      <BundleTable />

      {/* 4. What's included — GHL-style value table */}
      <GHLValueTable />

      {/* 5. High-level strategic offers */}
      <HighLevelOffers />

      {/* 6. 5-tier growth infrastructure */}
      <GrowthInfra />

      {/* 7. Contact / inquiry form */}
      <ServicesContact />
    </main>
  );
}

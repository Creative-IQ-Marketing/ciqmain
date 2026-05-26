import { useEffect } from "react";
import SEO from "../components/SEO";
import GuideInlineCTA from "../components/ui/GuideInlineCTA";
import ServicesHero from "../components/services/ServicesHero";
import BundlePricing from "../components/services/BundlePricing";
import BundleTable from "../components/services/BundleTable";
import HighLevelOffers from "../components/services/HighLevelOffers";
import GrowthInfra from "../components/services/GrowthInfra";
import ServicesContact from "../components/services/ServicesContact";
import GHLValueTable from "../components/landing/GHLValueTable";

export default function ServicesPage() {
  useEffect(() => {
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://creativeiq.marketing/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: "https://creativeiq.marketing/services",
        },
      ],
    };
    const faq = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What digital marketing services does CreativeIQ offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CreativeIQ offers SEO, PPC, social media management, web design, and CRM automation for businesses in San Antonio and beyond.",
          },
        },
        {
          "@type": "Question",
          name: "How much do digital marketing services cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CreativeIQ offers tiered packages starting from $999/mo to enterprise-level engagements. Contact us for a custom quote tailored to your goals.",
          },
        },
        {
          "@type": "Question",
          name: "Does CreativeIQ offer CRM automation services?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. CreativeIQ builds GoHighLevel CRM systems with automated pipelines, appointment scheduling, email sequences, and SMS follow-ups for San Antonio businesses.",
          },
        },
      ],
    };
    const schemas = [breadcrumb, faq];
    const scripts = schemas.map((schema, i) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.schema = `services-${i}`;
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
      return script;
    });
    return () => scripts.forEach((s) => s.remove());
  }, []);

  return (
    <main>
      <SEO
        title="Digital Marketing Services San Antonio | CreativeIQ"
        description="Full-service digital marketing agency offering SEO, PPC, social media, web development, and CRM automation in San Antonio. Grow your business with CreativeIQ."
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

      {/* Guide resource — shown between value table and offers */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <GuideInlineCTA source="services_page" />
      </div>

      {/* 5. High-level strategic offers */}
      <HighLevelOffers />

      {/* 6. 5-tier growth infrastructure */}
      <GrowthInfra />

      {/* 7. Contact / inquiry form */}
      <ServicesContact />
    </main>
  );
}

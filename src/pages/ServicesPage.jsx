import { useEffect } from "react";
import SEO from "../components/SEO";
import { useLocation } from "react-router-dom";
import { scrollToSection } from "../utils/scrollToSection";
import { publishFormInterest, SECTION_INTEREST_MAP } from "../utils/formInterest";
import GuideInlineCTA from "../components/ui/GuideInlineCTA";
import ServicesHero from "../components/services/ServicesHero";
import BundlePricing from "../components/services/BundlePricing";
import BundleTable from "../components/services/BundleTable";
import SocialMediaPackages from "../components/services/SocialMediaPackages";
import ConsultingSection from "../components/services/ConsultingSection";
import HighLevelOffers from "../components/services/HighLevelOffers";
import GrowthInfra from "../components/services/GrowthInfra";
import ServicesContact from "../components/services/ServicesContact";
import GHLValueTable from "../components/landing/GHLValueTable";

export default function ServicesPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const timer = window.setTimeout(() => {
      scrollToSection(id);
      if (id !== "services-contact") {
        const interest = SECTION_INTEREST_MAP[id];
        if (interest) {
          publishFormInterest(interest, { source: `section:${id}` });
        }
      }
    }, 300);
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
            text: "CreativeIQ offers website & SEO, social media content creation, CRM automation, and strategic consulting for businesses worldwide.",
          },
        },
        {
          "@type": "Question",
          name: "How much do digital marketing services cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CreativeIQ offers tiered packages from $589/mo for social starter through enterprise-level engagements. Contact us for a custom quote.",
          },
        },
        {
          "@type": "Question",
          name: "Does CreativeIQ offer a social media free trial?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. CreativeIQ offers a 30-day free trial on the Social Starter package — consistent posting across up to 2 platforms with no long-term commitment.",
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
        title="Digital Marketing Services | CreativeIQ"
        description="Website & SEO, content creation, CRM automation, and strategic consulting. Tiered growth systems for brands ready to scale — worldwide."
        keywords="digital marketing services, SEO services, social media marketing, CRM automation, videography, marketing consulting"
        canonical="https://creativeiq.marketing/services"
      />

      <ServicesHero />

      <div id="website-seo" className="scroll-mt-32">
        <BundlePricing />
        <BundleTable />
        <GrowthInfra />
      </div>

      <SocialMediaPackages />

      <ConsultingSection />

      <HighLevelOffers />

      <div id="crm-solutions" className="scroll-mt-32">
        <GHLValueTable
          showTopTrialBanner={false}
          showBottomTrialCta={false}
          sectionId="crm-solutions"
        />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <GuideInlineCTA source="services_page" />
      </div>

      <ServicesContact />
    </main>
  );
}

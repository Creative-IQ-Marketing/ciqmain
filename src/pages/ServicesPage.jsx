import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import { publishFormInterest, SECTION_INTEREST_MAP } from "../utils/formInterest";
import ServicesHero from "../components/services/ServicesHero";
import ServicesLaneSwitch from "../components/services/ServicesLaneSwitch";
import BundlePricing from "../components/services/BundlePricing";
import BundleTable from "../components/services/BundleTable";
import SocialMediaPackages from "../components/services/SocialMediaPackages";
import ConsultingSection from "../components/services/ConsultingSection";
import HighLevelOffers from "../components/services/HighLevelOffers";
import GrowthInfra from "../components/services/GrowthInfra";
import ServicesContact from "../components/services/ServicesContact";
import CrmPackages from "../components/services/CrmPackages";

export const SERVICE_LANES = [
  {
    id: "website-seo",
    label: "Growth systems",
    aliases: ["website-seo", "bundles", "growth-infra", "high-level"],
  },
  {
    id: "content-creation",
    label: "Social packages",
    aliases: ["content-creation"],
  },
  {
    id: "consulting",
    label: "Consulting",
    aliases: ["consulting"],
  },
  {
    id: "crm-solutions",
    label: "CRM",
    aliases: ["crm-solutions"],
  },
];

const DEFAULT_LANE = "website-seo";

function resolveLane(hashId) {
  if (!hashId) return DEFAULT_LANE;
  const match = SERVICE_LANES.find((lane) => lane.aliases.includes(hashId));
  return match?.id ?? DEFAULT_LANE;
}

export default function ServicesPage() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [lane, setLane] = useState(() =>
    resolveLane(hash ? hash.replace("#", "") : ""),
  );

  const syncHash = useCallback(
    (nextLane) => {
      navigate(`/services#${nextLane}`, { replace: true });
    },
    [navigate],
  );

  const selectLane = useCallback(
    (nextLane, { scroll = true } = {}) => {
      setLane(nextLane);
      syncHash(nextLane);
      const interest = SECTION_INTEREST_MAP[nextLane];
      if (interest) {
        publishFormInterest(interest, { source: `lane:${nextLane}` });
      }
      if (scroll) {
        window.requestAnimationFrame(() => {
          document
            .getElementById("services-lanes")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    },
    [syncHash],
  );

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    if (id === "services-contact" || id === "contact") return;
    const next = resolveLane(id);
    setLane(next);
    const interest = SECTION_INTEREST_MAP[next];
    if (interest) {
      publishFormInterest(interest, { source: `section:${id}` });
    }
    const timer = window.setTimeout(() => {
      document
        .getElementById("services-lanes")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => window.clearTimeout(timer);
  }, [hash]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.refresh();
      });
    }, 200);
    return () => window.clearTimeout(id);
  }, [lane]);

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
          name: "Services",
          item: "https://creativeiqmarketing.com/services",
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
            text: "CreativeIQ offers tiered packages from $97/mo CRM starter and $569/mo social starter through full CIQ Dominance systems. Contact us for a custom quote.",
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

  const panelMotion = useMemo(
    () =>
      reduceMotion
        ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 1 } }
        : {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -6 },
            transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
          },
    [reduceMotion],
  );

  return (
    <main>
      <SEO
        title="Digital Marketing Services | SEO, Social, CRM | CreativeIQ"
        description="Choose a growth lane: website & SEO systems, social content packages, consulting, or CRM automation. Clear tiers for brands ready to scale."
        keywords="digital marketing services, SEO services San Antonio, social media packages, CRM automation GoHighLevel, marketing consulting, CreativeIQ services"
        canonical="https://creativeiqmarketing.com/services"
      />

      <ServicesHero />

      <ServicesLaneSwitch
        lanes={SERVICE_LANES}
        value={lane}
        onChange={(id) => selectLane(id, { scroll: false })}
      />

      <div className="relative min-h-[40vh]">
        <AnimatePresence mode="wait">
          {lane === "website-seo" ? (
            <motion.div
              key="website-seo"
              id="services-panel-website-seo"
              role="tabpanel"
              aria-labelledby="services-tab-website-seo"
              {...panelMotion}
            >
              <div id="website-seo">
                <div id="bundles">
                  <BundlePricing />
                </div>
                <BundleTable />
                <div id="growth-infra">
                  <GrowthInfra />
                </div>
                <div id="high-level">
                  <HighLevelOffers />
                </div>
              </div>
            </motion.div>
          ) : null}

          {lane === "content-creation" ? (
            <motion.div
              key="content-creation"
              id="services-panel-content-creation"
              role="tabpanel"
              aria-labelledby="services-tab-content-creation"
              {...panelMotion}
            >
              <SocialMediaPackages />
            </motion.div>
          ) : null}

          {lane === "consulting" ? (
            <motion.div
              key="consulting"
              id="services-panel-consulting"
              role="tabpanel"
              aria-labelledby="services-tab-consulting"
              {...panelMotion}
            >
              <ConsultingSection />
            </motion.div>
          ) : null}

          {lane === "crm-solutions" ? (
            <motion.div
              key="crm-solutions"
              id="services-panel-crm-solutions"
              role="tabpanel"
              aria-labelledby="services-tab-crm-solutions"
              {...panelMotion}
            >
              <div id="crm-solutions">
                <CrmPackages />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <ServicesContact />
    </main>
  );
}

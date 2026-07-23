import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowRight, ChevronDown } from "lucide-react";
import { scrollToServicesContact } from "../../utils/formInterest";
import { Button } from "../ui/button";
import PlanRail from "./PlanRail";
import DesktopOnlyImage from "../ui/DesktopOnlyImage";
import { IconSeo } from "../../assets/icons/ServiceIcons";
import imgSeo from "../../assets/generated/services-seo-structure.webp";

const BUNDLES = [
  {
    id: "launch",
    badge: null,
    name: "CIQ Launch System",
    interest: "bundle-launch",
    outcome: "Lead capture foundation",
    tagline:
      "Website + SEO + social + CRM starter — a functional presence that captures leads from day one.",
    monthly: "$1,198",
    structure: "6-month structure",
    value: "$1,332/mo value",
    savings: "Save $154/mo",
    preview: [
      "1 coded website page (+$999 each extra)",
      "SEO Growth setup",
      "Social Starter (8 posts/mo)",
      "DIY CRM Starter",
    ],
    features: [
      "1 fully coded website page (+$999 per additional page)",
      "SEO setup (indexing, speed, mobile optimization)",
      "Social media system (8 posts per month)",
      "CRM lead capture (forms embedded on site)",
      "Contact database + basic pipeline",
      "Missed call text-back + chat widget",
    ],
    bestFor: "Businesses establishing a complete digital foothold.",
  },
  {
    id: "growth",
    badge: "Most chosen",
    name: "CIQ Growth System",
    interest: "bundle-growth",
    outcome: "Lead generation + conversion",
    tagline:
      "Multi-page site, SEO Growth, Classic social, and CRM Pro — inbound that converts.",
    monthly: "$1,999",
    structure: null,
    value: "$2,294/mo value",
    savings: "Save $295/mo",
    preview: [
      "2–3 coded website pages",
      "SEO Growth + Core Web Vitals",
      "The Classic social (12+ posts)",
      "CRM Pro funnels + booking",
    ],
    features: [
      "2–3 fully coded website pages",
      "SEO optimization + crawl/index fixes + Core Web Vitals",
      "Social media system (12–18 posts + production days)",
      "CRM funnels + booking + automation",
      "Lead tracking + tagging",
    ],
    bestFor: "Teams ready for consistent lead generation and capture.",
  },
  {
    id: "authority",
    badge: null,
    name: "CIQ Authority System",
    interest: "bundle-authority",
    outcome: "Visibility + trust + content",
    tagline:
      "Larger site, SEO Authority, Refined social, and CRM Pro — inbound with authority.",
    monthly: "$2,999",
    structure: null,
    value: "$3,497/mo value",
    savings: "Save $498/mo",
    preview: [
      "4–6 coded website pages",
      "SEO Authority (schema + AEO)",
      "The Refined social",
      "CRM automation + AI chat",
    ],
    features: [
      "4–6 fully coded website pages",
      "Advanced SEO (schema, AEO, technical optimization)",
      "Social media system (12–18 posts + production days)",
      "CRM automation + AI chat + review system",
    ],
    bestFor: "Brands building trust and predictable inbound leads.",
  },
  {
    id: "dominance",
    badge: null,
    name: "CIQ Dominance System",
    interest: "bundle-dominance",
    outcome: "Full growth engine",
    tagline:
      "Full site, SEO Dominance, Elite social, CRM, and ads — marketing that scales revenue.",
    monthly: "$4,997+",
    structure: null,
    value: "$6,728+/mo value",
    savings: "Save $1,731+/mo",
    preview: [
      "7–10+ coded website pages",
      "SEO Dominance + AI search",
      "Elite social + content engine",
      "CRM + Google & Meta ads",
    ],
    features: [
      "7–10+ fully coded website pages",
      "Full SEO + AI search optimization",
      "Elite social media + content engine",
      "CRM automation + AI agents + membership portal",
      "Google Ads + Meta Ads management",
      "Retargeting + revenue tracking",
    ],
    bestFor: "Businesses ready to run marketing and scale revenue as one system.",
  },
];

function BundlePanel({ bundle, featured = false }) {
  const [open, setOpen] = useState(false);
  const visible = open ? bundle.features : bundle.preview;

  return (
    <div
      className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-[var(--radius-card)] transition-[box-shadow,background-color] duration-300 lg:hover:shadow-[var(--shadow-soft)] ${
        featured ? "bg-white" : "bg-[var(--c-surface-2)] hover:bg-white"
      }`}
    >
      <div
        className={`px-5 pb-5 pt-5 sm:px-6 sm:pt-6 ${
          featured ? "bg-[var(--c-ink)] text-white" : ""
        }`}
      >
        {bundle.badge ? (
          <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--c-accent)]">
            {bundle.badge}
          </p>
        ) : (
          <div className="mb-3 h-[1.05rem]" aria-hidden />
        )}

        <h3
          className={`font-sans text-lg font-bold tracking-[-0.02em] sm:text-xl ${
            featured ? "text-white" : "text-[var(--c-ink)]"
          }`}
        >
          {bundle.name}
        </h3>
        <p
          className={`mt-2 max-w-[36ch] font-sans text-sm leading-relaxed ${
            featured ? "text-white/70" : "text-[var(--c-text-secondary)]"
          }`}
        >
          {bundle.tagline}
        </p>

        <div className="mt-5 flex flex-wrap items-end gap-1.5 sm:mt-6">
          <span
            className={`font-sans text-[2rem] font-extrabold leading-none tracking-[-0.04em] tabular-nums sm:text-4xl ${
              featured ? "text-white" : "text-[var(--c-ink)]"
            }`}
          >
            {bundle.monthly}
          </span>
          <span
            className={`pb-0.5 font-sans text-sm sm:pb-1 ${
              featured ? "text-white/55" : "text-[var(--c-text-muted)]"
            }`}
          >
            /mo
          </span>
        </div>
        <p className="mt-2 font-sans text-xs font-medium uppercase tracking-[0.12em] text-[var(--c-accent)]">
          {bundle.outcome}
        </p>
        <p
          className={`mt-2 font-sans text-xs tabular-nums ${
            featured ? "text-white/55" : "text-[var(--c-text-muted)]"
          }`}
        >
          {bundle.value}
          {bundle.savings ? (
            <>
              <span className="mx-1.5 opacity-40">·</span>
              <span
                className={
                  featured ? "text-[var(--c-accent)]" : "text-[var(--c-accent)]"
                }
              >
                {bundle.savings}
              </span>
            </>
          ) : null}
        </p>
        {bundle.structure ? (
          <p
            className={`mt-1.5 font-sans text-xs font-medium ${
              featured ? "text-white/80" : "text-[var(--c-text-secondary)]"
            }`}
          >
            {bundle.structure}
          </p>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col px-5 py-5 sm:px-6">
        <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--c-text-muted)]">
          Includes
        </p>
        <ul className="space-y-3">
          {visible.map((feat) => (
            <li key={feat} className="flex items-start gap-2.5">
              <Check
                className="mt-0.5 size-4 shrink-0 text-[var(--c-accent)]"
                strokeWidth={2.25}
                aria-hidden
              />
              <span className="font-sans text-sm leading-snug text-[var(--c-text-secondary)]">
                {feat}
              </span>
            </li>
          ))}
        </ul>

        {bundle.features.length > bundle.preview.length ? (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="mt-4 inline-flex items-center gap-1.5 self-start font-sans text-sm font-semibold text-[var(--c-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] focus-visible:ring-offset-2"
            aria-expanded={open}
          >
            {open ? "Show less" : `See all ${bundle.features.length} inclusions`}
            <ChevronDown
              className={`size-4 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
              aria-hidden
            />
          </button>
        ) : null}

        <p className="mt-5 font-sans text-sm leading-relaxed text-[var(--c-text-muted)]">
          <span className="font-semibold text-[var(--c-ink)]">Best for: </span>
          {bundle.bestFor}
        </p>
      </div>

      <div className="px-6 pb-6 sm:px-7">
        <Button
          variant={featured ? "accent" : "secondary"}
          className="w-full"
          onClick={() =>
            scrollToServicesContact(bundle.interest, `bundle:${bundle.interest}`)
          }
        >
          Get started <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}

const SHORT_LABELS = {
  launch: "Launch",
  growth: "Growth",
  authority: "Authority",
  dominance: "Dominance",
};

export default function BundlePricing() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState("growth");
  const active = BUNDLES.find((b) => b.id === activeId) ?? BUNDLES[1];

  return (
    <section
      id="bundles"
      className="scroll-mt-32 border-t border-[var(--c-border)] bg-white py-[var(--section-pad)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)]">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--c-accent)]">
              <IconSeo className="size-3.5" />
              Website · SEO · Social · CRM
            </p>
            <h2 className="font-sans text-[clamp(1.85rem,3.5vw,2.85rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-[var(--c-ink)] text-balance">
              CIQ{" "}
              <span className="text-[var(--c-accent)]">growth systems</span>
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-[var(--c-text-secondary)] lg:text-lg">
              Built as one system. Priced to scale. Website starting at $799 for
              one SEO-coded page; additional pages from $999.
            </p>
          </div>
          <div className="hidden overflow-hidden rounded-[var(--radius-card)] border border-[var(--c-border)] lg:block">
            <DesktopOnlyImage
              src={imgSeo}
              width={1100}
              height={733}
              imgClassName="aspect-[16/10] w-full object-cover"
              sizes="(min-width: 1024px) 40vw, 1px"
            />
          </div>
        </div>

        <div className="mt-10 md:hidden">
          <PlanRail
            ariaLabel="Growth system plans"
            value={activeId}
            onChange={setActiveId}
            options={BUNDLES.map((b) => ({
              id: b.id,
              label: SHORT_LABELS[b.id],
              meta: `${b.monthly}/mo`,
            }))}
          />
          <motion.div
            key={active.id}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5"
          >
            <BundlePanel bundle={active} featured={active.id === "growth"} />
          </motion.div>
        </div>

        <div className="mt-12 hidden gap-5 md:grid md:grid-cols-2 xl:grid-cols-4">
          {BUNDLES.map((bundle, i) => (
            <motion.div
              key={bundle.id}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <BundlePanel
                bundle={bundle}
                featured={bundle.id === "growth"}
              />
            </motion.div>
          ))}
        </div>

        <p className="mt-8 font-sans text-sm text-[var(--c-text-muted)] md:text-center">
          Prices in USD. Ad spend billed separately. Payment plans available for
          apps, websites, and portals.
        </p>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { scrollToServicesContact } from "../../utils/formInterest";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import DesktopOnlyImage from "../ui/DesktopOnlyImage";
import imgSystems from "../../assets/generated/services-hero-systems.webp";

const TIERS = [
  {
    id: "foundation",
    number: "01",
    name: "SEO Foundation",
    interest: "seo-foundation",
    subtitle: "Technical visibility setup",
    bestFor: "Sites that are not properly indexed or structured",
    price: "Starting at $299/mo",
    goal: "Get your website readable, crawlable, and visible on Google.",
    features: [
      "XML sitemap structuring",
      "Basic indexation setup (Search Console)",
      "Crawl error + broken link fixes",
      "Basic redirect cleanup",
      "Page speed baseline fixes",
      "Image compression + lazy loading",
      "Mobile-first optimization",
    ],
  },
  {
    id: "growth",
    number: "02",
    name: "SEO Growth",
    interest: "seo-growth",
    subtitle: "Search optimization + performance",
    bestFor: "Businesses ready to improve rankings and site health",
    price: "Starting at $499/mo",
    goal: "Improve rankings, site health, and performance signals Google uses.",
    features: [
      "Everything in Foundation",
      "Crawl budget optimization",
      "Indexation control (no-index, canonicals)",
      "Advanced redirect chain cleanup",
      "Core Web Vitals (INP, LCP, CLS)",
      "Server performance enhancements",
    ],
  },
  {
    id: "authority",
    number: "03",
    name: "SEO Authority",
    interest: "seo-authority",
    subtitle: "Structured data + AI search",
    bestFor: "Brands that want Google and AI platforms to understand them",
    price: "Starting at $799/mo",
    goal: "Position for Google and AI tools like ChatGPT, Gemini, and Claude.",
    features: [
      "Everything in Growth",
      "Schema map development",
      "Advanced schema (services, FAQs, reviews)",
      "AI-search optimized answers (AEO)",
      "Featured snippet optimization",
      "FAQ + answer engine structuring",
      "GEO tracking (location keyword visibility)",
    ],
  },
  {
    id: "dominance",
    number: "04",
    name: "SEO Dominance",
    interest: "seo-dominance",
    subtitle: "Full search + AI ecosystem",
    bestFor: "Businesses competing at the highest level in their market",
    price: "Starting at $999+/mo",
    goal: "Long-term search dominance, AI visibility, and competitive edge.",
    features: [
      "Everything in Authority",
      "Full site crawl budget sculpting",
      "Advanced indexation strategy",
      "Ongoing technical SEO audits + fixes",
      "Continuous AEO optimization",
      "Entity & topical authority mapping",
      "Continuous Core Web Vitals monitoring",
      "Advanced GEO + competitor visibility tracking",
    ],
  },
];

export default function GrowthInfra() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState("growth");

  return (
    <section
      id="growth-infra"
      className="scroll-mt-32 border-t border-[var(--c-border)] bg-[var(--c-ink)] py-[var(--section-pad)] text-white"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)]">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
          <div className="max-w-2xl">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--c-accent)]">
              SEO growth systems
            </p>
            <h2 className="mt-3 font-sans text-[clamp(1.85rem,3.5vw,2.85rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-balance">
              Built for search.{" "}
              <span className="text-[var(--c-accent)]">Structured for AI.</span>
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-white/65 lg:text-lg">
              From technical visibility to full search and AI ecosystem control.
              Website infrastructure starts at $799 for one SEO-coded page.
            </p>
          </div>
          <div className="hidden overflow-hidden rounded-[var(--radius-card)] border border-white/10 lg:block">
            <DesktopOnlyImage
              src={imgSystems}
              width={1280}
              height={853}
              imgClassName="aspect-[16/10] w-full object-cover opacity-80"
              sizes="(min-width: 1024px) 36vw, 1px"
            />
          </div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 max-w-xl border-l-2 border-[var(--c-accent)] pl-5"
        >
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--c-accent)]">
            Positioning
          </p>
          <p className="mt-2 font-sans text-base font-semibold leading-snug text-white sm:text-lg">
            We build search infrastructure so Google and AI platforms can
            understand, trust, and recommend your business.
          </p>
        </motion.div>

        <div className="mt-10 overflow-hidden rounded-[var(--radius-card)] border border-white/12 bg-[#161616]">
          <Accordion
            type="single"
            collapsible
            value={open}
            onValueChange={setOpen}
            className="w-full"
          >
            {TIERS.map((tier) => {
              const isOpen = open === tier.id;
              return (
                <AccordionItem
                  key={tier.id}
                  value={tier.id}
                  className={`relative border-b border-white/10 px-5 last:border-b-0 sm:px-7 ${
                    isOpen ? "bg-[#1c1c1c]" : "bg-[#161616]"
                  }`}
                >
                  <span
                    className="pointer-events-none absolute right-4 top-3 font-sans text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-none tracking-[-0.06em] text-white/[0.05] tabular-nums"
                    aria-hidden
                  >
                    {tier.number}
                  </span>
                  <AccordionTrigger className="py-6 text-white hover:text-white hover:no-underline [&_svg]:text-white/50">
                    <span className="flex min-w-0 flex-1 flex-col gap-2 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                      <span className="min-w-0">
                        <span className="flex items-center gap-3">
                          <span className="font-sans text-xs font-bold tabular-nums text-[var(--c-accent)]">
                            {tier.number}
                          </span>
                          <span className="font-sans text-base font-bold tracking-[-0.02em] sm:text-lg">
                            {tier.name}
                          </span>
                        </span>
                        <span className="mt-1 block font-sans text-sm text-white/50 sm:pl-8">
                          {tier.subtitle}
                        </span>
                      </span>
                      <span className="shrink-0 font-sans text-sm font-semibold tabular-nums text-[var(--c-accent)] sm:text-right">
                        {tier.price}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70">
                    <div className="grid gap-6 pb-2 sm:grid-cols-[1.2fr_0.8fr] sm:gap-10">
                      <div>
                        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
                          Includes
                        </p>
                        <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                          {tier.features.map((f) => (
                            <li
                              key={f}
                              className="flex items-start gap-2 font-sans text-sm leading-relaxed text-white/70"
                            >
                              <Check
                                className="mt-0.5 size-3.5 shrink-0 text-[var(--c-accent)]"
                                strokeWidth={2.5}
                                aria-hidden
                              />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4 rounded-[var(--radius-control)] border border-white/10 bg-[#111] p-4 sm:p-5">
                        <div>
                          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
                            Best for
                          </p>
                          <p className="mt-1.5 font-sans text-sm text-white">
                            {tier.bestFor}
                          </p>
                        </div>
                        <div>
                          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
                            Goal
                          </p>
                          <p className="mt-1.5 font-sans text-sm text-white/70">
                            {tier.goal}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            scrollToServicesContact(
                              tier.interest,
                              `seo-tier:${tier.interest}`,
                            )
                          }
                          className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-white transition-colors hover:text-[var(--c-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--c-ink)]"
                        >
                          Discuss this tier
                          <ArrowRight className="size-4" aria-hidden />
                        </button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

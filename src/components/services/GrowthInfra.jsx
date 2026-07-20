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
    name: "Foundation",
    interest: "tier-foundation",
    subtitle: "Digital authority build",
    bestFor: "New businesses, local clinics, startups",
    price: "$2,500 - $5,000 setup",
    goal: "Establish digital credibility and lead capture.",
    features: [
      "Custom conversion-optimized website",
      "Technical SEO setup",
      "Google Business Profile optimization",
      "Basic local SEO",
      "CRM setup (pipeline + booking calendar)",
      "Email capture funnel",
      "1 automated email sequence",
      "Monthly analytics report",
    ],
  },
  {
    id: "growth",
    number: "02",
    name: "Growth Engine",
    interest: "tier-growth-engine",
    subtitle: "Lead generation and conversion",
    bestFor: "Clinics, law firms, med spas, home services",
    price: "$3,500 - $6,500/mo",
    note: "Ad spend separate",
    goal: "Predictable lead flow with automated follow-up.",
    features: [
      "Everything in Foundation",
      "Google Ads management",
      "Meta Ads management",
      "Retargeting funnel",
      "Landing page A/B testing",
      "SEO content (2-4 blogs/month)",
      "Advanced CRM automations",
      "Missed-call text-back system",
      "SMS follow-up sequences",
      "Reputation management system",
    ],
  },
  {
    id: "authority",
    number: "03",
    name: "Brand Authority",
    interest: "tier-brand-authority",
    subtitle: "Omnipresence and positioning",
    bestFor: "Established brands scaling visibility",
    price: "$6,500 - $10,000/mo",
    goal: "Position as market leader, not just advertiser.",
    features: [
      "Everything in Growth Engine",
      "70+ social posts/month (multi-platform)",
      "Short-form video production",
      "Brand photoshoot quarterly",
      "Podcast production support",
      "Influencer collaborations",
      "LinkedIn authority blogging",
      "Advanced YouTube SEO",
      "Brand storytelling campaigns",
    ],
  },
  {
    id: "revenue",
    number: "04",
    name: "Revenue Maximizer",
    interest: "tier-revenue",
    subtitle: "Automation and AI scale",
    bestFor: "Multi-location, high-volume businesses",
    price: "$8,000 - $15,000/mo",
    goal: "Raise LTV and cut lost leads without growing payroll.",
    features: [
      "Everything in Brand Authority",
      "AI chat widget",
      "AI voice assistant for inbound calls",
      "Full pipeline automation",
      "Sales team tracking dashboard",
      "Heatmaps and conversion tracking",
      "Advanced attribution reporting",
      "Customer reactivation campaigns",
      "Loyalty and referral automation",
      "Revenue forecasting model",
    ],
  },
  {
    id: "enterprise",
    number: "05",
    name: "Enterprise Partner",
    interest: "tier-enterprise",
    subtitle: "Fractional CMO + full digital division",
    bestFor: "Developers, franchises, healthcare groups, investors",
    price: "$15,000 - $40,000/mo",
    note: "By application",
    goal: "Operate as your marketing department without internal overhead.",
    features: [
      "Everything from previous tiers",
      "Multi-location marketing management",
      "Full brand repositioning",
      "Investor pitch deck support",
      "Quarterly strategic planning retreats",
      "Dedicated account strategist + media team",
      "Custom web/app development",
      "API integrations",
      "Executive-level KPI reporting",
      "Competitive intelligence research",
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
              Infrastructure ladder
            </p>
            <h2 className="mt-3 font-sans text-[clamp(1.85rem,3.5vw,2.85rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-balance">
              Growth infrastructure{" "}
              <span className="text-[var(--c-accent)]">tiers</span>
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-white/65 lg:text-lg">
              A ladder from first foothold to enterprise command. Open a tier only
              when you want the details.
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
            Most agencies sell services. We build growth infrastructure.
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
                        {tier.note ? (
                          <p className="font-sans text-xs font-medium text-[var(--c-accent)]">
                            {tier.note}
                          </p>
                        ) : null}
                        <button
                          type="button"
                          onClick={() =>
                            scrollToServicesContact(
                              tier.interest,
                              `growth-tier:${tier.interest}`,
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

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "../ui/button";
import DesktopOnlyImage from "../ui/DesktopOnlyImage";
import crmVisual from "../../assets/generated/services-crm-pipeline.webp";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ROWS = [
  {
    feature: "CRM & Pipeline",
    replaces: ["HubSpot", "ActiveCampaign", "Keap"],
    cost: "$800",
  },
  {
    feature: "SEO insights",
    replaces: ["Semrush", "Ahrefs", "Moz"],
    cost: "$2,500",
  },
  {
    feature: "Google Ads tools",
    replaces: ["Google Ads", "PPC Agency"],
    cost: "$2,000",
  },
  {
    feature: "Meta Ads tools",
    replaces: ["Meta Ads", "AdEspresso"],
    cost: "$1,500",
  },
  {
    feature: "Website / funnels",
    replaces: ["Webflow", "WordPress", "Wix"],
    cost: "$1,200",
  },
  {
    feature: "Email & SMS",
    replaces: ["Mailchimp", "Klaviyo", "Twilio"],
    cost: "$600",
  },
  {
    feature: "Social scheduling",
    replaces: ["Hootsuite", "Later", "Buffer"],
    cost: "$1,800",
  },
  {
    feature: "Reputation",
    replaces: ["Birdeye", "Podium"],
    cost: "$350",
  },
  {
    feature: "Analytics",
    replaces: ["GA4", "Looker Studio"],
    cost: "$800",
  },
  {
    feature: "Strategy support",
    replaces: ["Consultant"],
    cost: "$1,500",
  },
];

function TableRow({ feature, replaces, cost, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="crm-row grid w-full grid-cols-[minmax(0,1.7fr)_minmax(0,1.7fr)_minmax(0,1fr)_56px] items-center gap-3 rounded-[var(--radius-control)] border border-white/10 bg-white/[0.03] px-4 py-3.5 text-left transition-colors hover:border-[var(--c-accent)]/45 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] sm:gap-4 sm:px-[18px] sm:py-4"
    >
      <span className="truncate font-sans text-xs font-bold uppercase tracking-[0.06em] text-white">
        {feature}
      </span>
      <span className="truncate font-sans text-xs font-medium text-white/70">
        {replaces.join(", ")}
      </span>
      <span className="truncate text-right font-sans text-xs font-semibold uppercase tracking-[0.04em] text-white/80">
        {cost}/mo
      </span>
      <span className="flex items-center justify-center">
        <Check size={18} className="text-white" strokeWidth={2.5} aria-hidden />
      </span>
    </button>
  );
}

/**
 * Value comparison: buying tools a la carte vs CIQ CRM stack.
 */
export default function GHLValueTable({
  sectionId = "ciq-crm-value",
  showPackagesCta = true,
}) {
  const [activeRow, setActiveRow] = useState(null);
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".crm-row", {
          autoAlpha: 0,
          y: 16,
          duration: 0.45,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 75%",
            once: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      id={sectionId}
      ref={rootRef}
      className="relative overflow-hidden bg-[var(--c-footer)]"
    >
      <div className="relative z-[2] mx-auto max-w-[1100px] px-4 py-14 sm:px-6 sm:py-16">
        <div className="mb-10 grid items-end gap-8 lg:mb-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-10">
          <div className="max-w-2xl text-left">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--c-accent)]">
              The stack, not the sprawl
            </p>
            <h2 className="mt-3 font-sans text-[clamp(1.85rem,4.5vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-white text-balance">
              One CRM instead of{" "}
              <span className="text-[var(--c-accent)]">ten subscriptions</span>
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-white/65">
              Most teams buy these tools separately. CIQ CRM includes the
              channels in one system — so you pay for outcomes, not a tool zoo.
            </p>
          </div>
          <div className="hidden overflow-hidden rounded-[var(--radius-card)] border border-white/10 lg:block">
            <DesktopOnlyImage
              src={crmVisual}
              width={1100}
              height={733}
              imgClassName="aspect-[16/10] w-full object-cover opacity-90"
              sizes="(min-width: 1024px) 36vw, 1px"
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="mb-4 grid grid-cols-[minmax(0,1.7fr)_minmax(0,1.7fr)_minmax(0,1fr)_56px] gap-3 border-b border-white/10 px-4 pb-3 sm:gap-4 sm:px-[18px]">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-white/65">
                Capability
              </span>
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-white/65">
                Buying separately
              </span>
              <span className="text-right font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-white/65">
                Their cost
              </span>
              <span className="text-center font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-white/65">
                CIQ
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {ROWS.map((row) => (
                <TableRow
                  key={row.feature}
                  {...row}
                  onSelect={() => setActiveRow(row)}
                />
              ))}
            </div>

            <div className="mt-4 grid grid-cols-[minmax(0,1.7fr)_minmax(0,1.7fr)_minmax(0,1fr)_56px] items-center gap-3 rounded-[var(--radius-control)] border border-[var(--c-accent)]/35 bg-[var(--c-accent)]/12 px-4 py-4 sm:gap-4 sm:px-[18px]">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--c-accent)]">
                Overall
              </span>
              <span className="font-sans text-sm font-semibold text-white/70 line-through">
                ~$13,050/mo
              </span>
              <div className="col-span-2 flex flex-col items-center justify-center sm:col-span-1 sm:col-start-3">
                <span className="font-sans text-[22px] font-extrabold leading-none tracking-[-0.03em] text-white">
                  From $97
                </span>
                <span className="mt-1 font-sans text-[10px] uppercase tracking-[0.06em] text-white/60">
                  /mo · up to $497 Elite
                </span>
              </div>
            </div>
          </div>
        </div>

        {showPackagesCta ? (
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild variant="accent">
              <Link to="/services#crm-solutions">
                See CRM packages
                <ArrowRight size={15} aria-hidden />
              </Link>
            </Button>
            <p className="font-sans text-sm text-white/55">
              Starter $97 · Pro $397 · Elite $497
            </p>
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {activeRow ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/65 p-[18px]"
            onClick={() => setActiveRow(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-[min(560px,100%)] overflow-hidden rounded-[var(--radius-card)] border border-[var(--c-accent)]/18 bg-white text-[var(--c-footer)] shadow-[0_24px_70px_rgba(0,0,0,0.35)]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="crm-feature-title"
            >
              <div className="flex items-center justify-between gap-3 border-b border-black/[0.08] px-[18px] py-4">
                <div className="min-w-0">
                  <p className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--c-accent)]">
                    Included in CIQ CRM
                  </p>
                  <p
                    id="crm-feature-title"
                    className="mt-1.5 font-sans text-lg font-extrabold tracking-[-0.02em] text-[var(--c-ink)]"
                  >
                    {activeRow.feature}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setActiveRow(null)}
                >
                  Close
                </Button>
              </div>
              <div className="space-y-2.5 p-[18px]">
                <div className="rounded-[var(--radius-control)] border border-black/10 bg-black/[0.03] p-3">
                  <p className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-black/55">
                    Replaces
                  </p>
                  <p className="mt-1.5 font-sans text-sm font-semibold">
                    {activeRow.replaces.join(", ")}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-[var(--radius-control)] border border-black/10 bg-black/[0.03] p-3">
                  <div>
                    <p className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-black/55">
                      Typical separate cost
                    </p>
                    <p className="mt-1.5 font-sans text-sm font-extrabold">
                      {activeRow.cost}/mo
                    </p>
                  </div>
                  <span className="rounded-[var(--radius-pill)] bg-[var(--c-accent)] px-3 py-2 font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-white">
                    In CIQ
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

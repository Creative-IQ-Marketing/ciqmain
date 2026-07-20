import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { scrollToServicesContact } from "../../utils/formInterest";
import { Button } from "../ui/button";
import PlanRail from "./PlanRail";
import DesktopOnlyImage from "../ui/DesktopOnlyImage";
import { IconSocial } from "../../assets/icons/ServiceIcons";
import imgSocial from "../../assets/generated/services-social-content.webp";

const PACKAGES = [
  {
    id: "starter",
    index: "01",
    name: "Social Starter",
    interest: "social-starter",
    subtitle: "Presence",
    monthly: "$589",
    biweekly: "$299",
    trial: true,
    preview: ["Up to 2 platforms", "8 posts/month", "Captions + hashtags"],
    features: [
      "Monthly strategy meeting",
      "Up to 2 platforms",
      "8 posts/month (2 per week)",
      "Captions + hashtags",
      "Cross-platform formatting",
      "Monthly engagement summary",
    ],
    buying: "Reliable posting without a full in-house team.",
  },
  {
    id: "classic",
    index: "02",
    name: "The Classic",
    interest: "social-classic",
    subtitle: "Foundation",
    monthly: "$999",
    biweekly: "$599",
    featured: true,
    preview: [
      "Everything in Starter",
      "3 platforms",
      "12 posts/month + short-form",
    ],
    features: [
      "Everything in Starter",
      "1 content production day/month",
      "3 platforms",
      "12 posts/month (video + static)",
      "Short-form video integration",
      "1 LinkedIn blog (if applicable)",
    ],
    buying: "Stronger creative quality across three platforms.",
  },
  {
    id: "refined",
    index: "03",
    name: "The Refined",
    interest: "social-refined",
    subtitle: "Authority",
    monthly: "$1,469",
    biweekly: "$799",
    preview: [
      "Everything in Classic",
      "15 posts/month",
      "Branded content calendar",
    ],
    features: [
      "Everything in Classic",
      "2 content production days/month",
      "15 posts/month",
      "Branded content calendar",
      "Automated scheduling",
      "Monthly analytics report",
    ],
    buying: "Cadence plus strategy for teams past ad-hoc posting.",
  },
  {
    id: "signature",
    index: "04",
    name: "The Signature",
    interest: "social-signature",
    subtitle: "Multi-channel",
    monthly: "$2,369",
    biweekly: "$1,199",
    preview: ["Up to 4 platforms", "18 posts/month", "Cross-platform repurposing"],
    features: [
      "Up to 4 platforms",
      "18 posts/month",
      "Cross-platform repurposing",
      "Deeper performance insights",
      "Trend + creative direction",
      "Up to 2 LinkedIn blogs",
    ],
    buying: "Broader reach when one channel is no longer enough.",
  },
  {
    id: "elite",
    index: "05",
    name: "Elite Social",
    interest: "social-elite",
    subtitle: "Authority infrastructure",
    monthly: "$2,999",
    biweekly: null,
    preview: ["Up to 5 platforms", "27 posts/month", "Social SEO + DM flows"],
    features: [
      "Up to 5 platforms",
      "27 posts/month",
      "Google Business Profile optimization",
      "Social SEO + metadata",
      "Automated DM & inquiry flows",
      "Advanced analytics dashboard",
    ],
    buying: "Authority, lead capture, and system-driven social growth.",
  },
];

const VIDEO_PACKAGES = [
  { count: 1, price: "$399", label: "Single brand cut" },
  { count: 2, price: "$599", label: "Pair for A/B or series" },
  { count: 3, price: "$999", label: "Campaign set" },
];

function PackagePanel({ pkg }) {
  const [open, setOpen] = useState(false);
  const visible = open ? pkg.features : pkg.preview;

  return (
    <article
      className={`relative flex h-full min-w-0 flex-col overflow-hidden rounded-[var(--radius-card)] transition-[box-shadow,background-color] duration-300 lg:hover:shadow-[var(--shadow-soft)] ${
        pkg.featured
          ? "bg-white"
          : pkg.trial
            ? "bg-[var(--c-accent-dim)]/50"
            : "bg-[var(--c-surface-2)] hover:bg-white"
      }`}
    >
      <div
        className={`px-5 pb-4 pt-5 ${
          pkg.featured ? "bg-[var(--c-ink)] text-white" : ""
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <span
            className={`font-sans text-[11px] font-bold tabular-nums ${
              pkg.featured ? "text-[var(--c-accent)]" : "text-[var(--c-text-muted)]"
            }`}
          >
            {pkg.index}
          </span>
          {pkg.trial ? (
            <Link
              to="/social-media-free-trial"
              className="rounded-[var(--radius-pill)] border border-[var(--c-accent)]/40 bg-white/80 px-2.5 py-1 font-sans text-[10px] font-semibold text-[var(--c-accent)] transition hover:bg-white"
            >
              30-day trial
            </Link>
          ) : pkg.featured ? (
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--c-accent)]">
              Most chosen
            </span>
          ) : null}
        </div>

        <p
          className={`mt-4 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] ${
            pkg.featured ? "text-white/50" : "text-[var(--c-text-muted)]"
          }`}
        >
          {pkg.subtitle}
        </p>
        <h3
          className={`mt-1 font-sans text-lg font-bold tracking-[-0.02em] ${
            pkg.featured ? "text-white" : "text-[var(--c-ink)]"
          }`}
        >
          {pkg.name}
        </h3>

        <div className="mt-4 flex flex-wrap items-baseline gap-1">
          <span
            className={`font-sans text-2xl font-extrabold tracking-[-0.03em] tabular-nums ${
              pkg.featured ? "text-white" : "text-[var(--c-ink)]"
            }`}
          >
            {pkg.monthly}
          </span>
          <span
            className={`font-sans text-xs ${
              pkg.featured ? "text-white/55" : "text-[var(--c-text-muted)]"
            }`}
          >
            /mo
          </span>
        </div>
        {pkg.biweekly ? (
          <p
            className={`mt-1 font-sans text-[11px] tabular-nums ${
              pkg.featured ? "text-white/50" : "text-[var(--c-text-muted)]"
            }`}
          >
            {pkg.biweekly} bi-weekly
          </p>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col px-5 py-4">
        <ul className="space-y-2">
          {visible.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 font-sans text-sm leading-snug text-[var(--c-text-secondary)]"
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

        {pkg.features.length > pkg.preview.length ? (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="mt-3 inline-flex items-center gap-1.5 self-start font-sans text-sm font-semibold text-[var(--c-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] focus-visible:ring-offset-2"
            aria-expanded={open}
          >
            {open ? "Show less" : "Full inclusions"}
            <ChevronDown
              className={`size-4 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
              aria-hidden
            />
          </button>
        ) : null}

        <p className="mt-4 font-sans text-xs leading-relaxed text-[var(--c-text-muted)]">
          {pkg.buying}
        </p>
      </div>

      <div className="px-5 pb-5">
        <Button
          variant={pkg.featured ? "accent" : "secondary"}
          size="sm"
          className="w-full"
          onClick={() =>
            scrollToServicesContact(pkg.interest, `social-package:${pkg.interest}`)
          }
        >
          Get started <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    </article>
  );
}

export default function SocialMediaPackages() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState("classic");
  const active = PACKAGES.find((p) => p.id === activeId) ?? PACKAGES[1];

  return (
    <section
      id="content-creation"
      className="scroll-mt-32 border-t border-[var(--c-border)] bg-[var(--c-surface-2)] py-[var(--section-pad)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)]">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--c-accent)]">
              <IconSocial className="size-3.5" />
              Content systems
            </p>
            <h2 className="font-sans text-[clamp(1.85rem,3.5vw,2.85rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-[var(--c-ink)] text-balance">
              Social{" "}
              <span className="text-[var(--c-accent)]">growth systems</span>
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-[var(--c-text-secondary)] lg:text-lg">
              From consistent presence to full digital authority. Pick a cadence,
              then expand inclusions if you need them.
            </p>
          </div>
          <div className="hidden overflow-hidden rounded-[var(--radius-card)] border border-[var(--c-border)] lg:block">
            <DesktopOnlyImage
              src={imgSocial}
              width={1100}
              height={733}
              imgClassName="aspect-[16/10] w-full object-cover"
              sizes="(min-width: 1024px) 40vw, 1px"
            />
          </div>
        </div>

        <div className="mt-10 2xl:hidden">
          <PlanRail
            ariaLabel="Social packages"
            value={activeId}
            onChange={setActiveId}
            options={PACKAGES.map((p) => ({
              id: p.id,
              label: p.name.replace(/^The\s/, ""),
              meta: `${p.monthly}/mo`,
            }))}
          />
          <motion.div
            key={active.id}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5"
          >
            <PackagePanel pkg={active} />
          </motion.div>
        </div>

        <div className="relative mt-12 hidden 2xl:block">
          <div
            className="pointer-events-none absolute left-0 right-0 top-[4.25rem] h-px bg-[var(--c-border-strong)]"
            aria-hidden
          />
          <div className="grid min-w-0 grid-cols-5 gap-3">
            {PACKAGES.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative min-w-0"
              >
                <span
                  className="absolute left-1/2 top-[4.25rem] z-10 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--c-accent)] ring-4 ring-[var(--c-surface-2)]"
                  aria-hidden
                />
                <PackagePanel pkg={pkg} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-14 overflow-hidden rounded-[var(--radius-card)] border border-[var(--c-border)] bg-white">
          <div className="border-b border-[var(--c-border)] px-6 py-6 sm:px-8">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--c-accent)]">
              À la carte
            </p>
            <h3 className="mt-2 font-sans text-xl font-bold tracking-[-0.02em] text-[var(--c-ink)]">
              Video production
            </h3>
            <p className="mt-2 max-w-2xl font-sans text-sm leading-relaxed text-[var(--c-text-secondary)]">
              Filmed brand videos with raw footage delivered. Under 60 seconds;
              add $100 per additional minute.
            </p>
          </div>
          <div className="grid sm:grid-cols-3">
            {VIDEO_PACKAGES.map((v, i) => (
              <div
                key={v.count}
                className={`px-6 py-7 sm:px-8 ${
                  i < VIDEO_PACKAGES.length - 1
                    ? "border-b border-[var(--c-border)] sm:border-b-0 sm:border-r"
                    : ""
                }`}
              >
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--c-text-muted)]">
                  {v.count} video{v.count > 1 ? "s" : ""}
                </p>
                <p className="mt-3 font-sans text-3xl font-extrabold tracking-[-0.04em] tabular-nums text-[var(--c-ink)]">
                  {v.price}
                </p>
                <p className="mt-2 font-sans text-sm text-[var(--c-text-secondary)]">
                  {v.label}
                </p>
                <p className="mt-1 font-sans text-xs text-[var(--c-text-muted)]">
                  One-time
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

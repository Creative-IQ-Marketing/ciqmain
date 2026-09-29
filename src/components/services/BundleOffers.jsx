import { motion, useReducedMotion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { MAIN_BUNDLES } from "../../data/growthBundles";
import { scrollToContactForm } from "../../utils/formInterest";
import { trackButtonClick } from "../../services/analytics";
import { Button } from "../ui/button";

function BundleCard({ bundle, featured, index, reduceMotion }) {
  const start = () => {
    trackButtonClick(bundle.name, "bundle_card", "Bundles");
    scrollToContactForm(bundle.interest, `bundle:${bundle.interest}`);
  };

  return (
    <motion.article
      id={bundle.id}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className={`relative flex h-full flex-col scroll-mt-28 rounded-[1.75rem] p-7 sm:p-8 ${
        featured
          ? "bg-[var(--c-ink)] text-white shadow-[0_28px_60px_-28px_rgba(15,15,15,0.55)]"
          : "border border-[var(--c-border)] bg-white text-[var(--c-ink)] shadow-[0_18px_40px_-28px_rgba(15,15,15,0.2)]"
      }`}
    >
      {featured ? (
        <motion.span
          className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full bg-[var(--c-accent)] text-white shadow-[0_10px_24px_-8px_rgba(59,111,240,0.7)]"
          animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Most chosen"
        >
          <Star className="size-4 fill-current" aria-hidden />
        </motion.span>
      ) : null}

      <p
        className={`font-sans text-[11px] font-semibold uppercase tracking-[0.16em] ${
          featured ? "text-white/55" : "text-[var(--c-text-muted)]"
        }`}
      >
        {bundle.stage}
      </p>
      <h3 className="mt-3 font-sans text-[2rem] font-extrabold tracking-[-0.04em] sm:text-[2.15rem]">
        {bundle.name}
      </h3>
      <p className={`mt-3 flex items-baseline gap-1.5 ${featured ? "text-white" : "text-[var(--c-accent)]"}`}>
        <span className="font-sans text-[1.65rem] font-extrabold tabular-nums tracking-[-0.03em]">
          {bundle.monthly}
        </span>
        <span className={`text-sm font-medium ${featured ? "text-white/60" : "text-[var(--c-text-muted)]"}`}>
          /month
        </span>
      </p>
      {bundle.structure ? (
        <p className={`mt-1 text-xs ${featured ? "text-white/50" : "text-[var(--c-text-muted)]"}`}>
          {bundle.structure}
        </p>
      ) : null}
      <p className={`mt-4 text-sm leading-relaxed ${featured ? "text-white/70" : "text-[var(--c-text-secondary)]"}`}>
        {bundle.outcome}
      </p>

      <ul className="mt-7 flex-1 space-y-3.5">
        {bundle.preview.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
                featured ? "bg-white/15 text-white" : "bg-[var(--c-accent-dim)] text-[var(--c-accent)]"
              }`}
            >
              <Check className="size-3" strokeWidth={2.75} aria-hidden />
            </span>
            <span className={`text-sm leading-snug ${featured ? "text-white/90" : "text-[var(--c-ink)]"}`}>
              {item}
            </span>
          </li>
        ))}
      </ul>

      <p className={`mt-5 text-xs font-semibold tabular-nums ${featured ? "text-[var(--c-accent)]" : "text-[var(--c-accent)]"}`}>
        {bundle.savings}
      </p>

      <Button
        className={`mt-6 w-full ${
          featured
            ? "bg-white text-[var(--c-ink)] hover:bg-white/90"
            : ""
        }`}
        variant={featured ? "secondary" : "primary"}
        onClick={start}
      >
        Start {bundle.name}
      </Button>
    </motion.article>
  );
}

/**
 * Pricing-card layout for the three growth systems.
 * Matches the soft three-card plan pattern with CreativeIQ ink + blue.
 */
export default function BundleOffers({
  id = "bundles",
  variant = "page",
  eyebrow = "Find your system",
  title = "Pick the",
  titleAccent = "right system.",
  lede = "Website, SEO, social, and CRM wired as one loop. Three systems — priced to start.",
  showLoop = true,
}) {
  const reduceMotion = useReducedMotion();
  const closer = variant === "closer";
  void showLoop;

  return (
    <section
      id={id}
      className={`scroll-mt-28 border-t border-[var(--c-border)] bg-[var(--c-cream)] ${
        closer ? "py-16 sm:py-20" : "py-[clamp(3.5rem,7vw,6rem)]"
      }`}
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--c-text-muted)]">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-sans text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[var(--c-ink)] text-balance">
            {title}{" "}
            <span className="relative inline-block text-[var(--c-accent)]">
              {titleAccent}
              <span
                className="absolute inset-x-0 -bottom-1 h-[0.18em] rounded-full bg-[var(--c-accent)]/25"
                aria-hidden
              />
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-base leading-relaxed text-[var(--c-text-secondary)]">
            {lede}
          </p>
          <div className="mt-7 inline-flex items-center rounded-full border border-[var(--c-border)] bg-white px-4 py-2 shadow-[0_10px_30px_-20px_rgba(15,15,15,0.35)]">
            <span className="font-sans text-sm font-semibold text-[var(--c-ink)]">Billed monthly</span>
            <span className="mx-3 h-4 w-px bg-[var(--c-border)]" aria-hidden />
            <span className="font-sans text-sm text-[var(--c-text-muted)]">USD · ad spend separate</span>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3 md:items-stretch lg:gap-6">
          {MAIN_BUNDLES.map((bundle, i) => (
            <BundleCard
              key={bundle.id}
              bundle={bundle}
              featured={bundle.id === "growth"}
              index={i}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="max-w-xl text-sm leading-relaxed text-[var(--c-text-muted)]">
            Prices in USD. Ad spend is separate. Need ads, AI agents, and a full content engine? Ask about Dominance — from $4,997/mo.
          </p>
          <Link
            to={closer ? "/bundles" : "/services"}
            className="shrink-0 text-sm font-semibold text-[var(--c-ink)] underline underline-offset-4 hover:text-[var(--c-accent)]"
          >
            {closer ? "Open the bundles page" : "Build it à la carte"}
          </Link>
        </div>
      </div>
    </section>
  );
}

import { motion, useReducedMotion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { MAIN_BUNDLES } from "../../data/growthBundles";
import { scrollToContactForm } from "../../utils/formInterest";
import { trackButtonClick } from "../../services/analytics";

function BundleCard({ bundle, featured, index, reduceMotion, ink }) {
  const start = () => {
    trackButtonClick(bundle.name, "bundle_card", ink ? "Home bundles" : "Bundles");
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
      className={`relative flex h-full flex-col scroll-mt-32 rounded-[1.75rem] p-7 sm:p-8 ${
        featured
          ? "bg-[var(--s-signal-deep)] text-white shadow-[0_28px_60px_-24px_rgba(59,111,240,0.55)]"
          : ink
            ? "border border-[var(--s-line)] bg-[var(--s-ink-2)] text-[var(--s-paper)] shadow-[0_18px_40px_-28px_rgba(0,0,0,0.45)]"
            : "border border-[var(--c-border)] bg-white text-[var(--s-ink)] shadow-[0_18px_40px_-28px_rgba(15,15,15,0.18)]"
      }`}
    >
      {featured ? (
        <motion.span
          className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full bg-[var(--s-paper)] text-[var(--s-signal-deep)] shadow-[0_10px_24px_-8px_rgba(241,240,235,0.45)]"
          animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Most chosen"
        >
          <Star className="size-4 fill-current" aria-hidden />
        </motion.span>
      ) : null}

      <p
        className={`s-label ${
          featured
            ? "text-white/60"
            : ink
              ? "text-[var(--s-paper-ghost)]"
              : "text-[var(--c-text-muted)]"
        }`}
      >
        {bundle.stage}
      </p>
      <h3
        className={`mt-3 s-display text-[clamp(1.9rem,3vw,2.35rem)] leading-none ${
          featured ? "text-white" : ink ? "text-[var(--s-paper)]" : "text-[var(--s-ink)]"
        }`}
      >
        {bundle.name}
      </h3>
      <p className="mt-4 flex items-baseline gap-1.5">
        <span
          className={`font-semibold tabular-nums tracking-[-0.03em] text-[1.7rem] ${
            featured ? "text-white" : "text-[var(--s-signal)]"
          }`}
        >
          {bundle.monthly}
        </span>
        <span
          className={`text-sm ${
            featured
              ? "text-white/60"
              : ink
                ? "text-[var(--s-paper-dim)]"
                : "text-[var(--c-text-muted)]"
          }`}
        >
          /month
        </span>
      </p>
      {bundle.structure ? (
        <p
          className={`mt-1 text-xs ${
            featured
              ? "text-white/50"
              : ink
                ? "text-[var(--s-paper-ghost)]"
                : "text-[var(--c-text-muted)]"
          }`}
        >
          {bundle.structure}
        </p>
      ) : null}
      <p
        className={`mt-4 text-sm leading-relaxed ${
          featured
            ? "text-white/75"
            : ink
              ? "text-[var(--s-paper-dim)]"
              : "text-[var(--c-text-secondary)]"
        }`}
      >
        {bundle.outcome}
      </p>

      <ul className="mt-7 flex-1 space-y-3.5">
        {bundle.preview.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
                featured
                  ? "bg-white/20 text-white"
                  : "bg-[rgba(91,134,255,0.15)] text-[var(--s-signal)]"
              }`}
            >
              <Check className="size-3" strokeWidth={2.75} aria-hidden />
            </span>
            <span
              className={`text-sm leading-snug ${
                featured
                  ? "text-white/90"
                  : ink
                    ? "text-[var(--s-paper)]"
                    : "text-[var(--s-ink)]"
              }`}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-xs font-semibold tabular-nums text-[var(--s-signal-hot)]">
        {bundle.savings}
      </p>

      <button
        type="button"
        onClick={start}
        className={`mt-6 inline-flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-signal)] focus-visible:ring-offset-2 active:scale-[0.98] ${
          featured
            ? "bg-[var(--s-paper)] text-[var(--s-ink)] hover:bg-white"
            : ink
              ? "bg-[var(--s-signal-deep)] text-white hover:bg-[var(--s-signal)]"
              : "bg-[var(--s-signal-deep)] text-white hover:bg-[var(--s-signal)]"
        } ${ink ? "focus-visible:ring-offset-[var(--s-ink)]" : "focus-visible:ring-offset-[var(--c-cream,#f7f6f1)]"}`}
      >
        Start {bundle.name}
      </button>
    </motion.article>
  );
}

/**
 * Soft three-card plan UI for Launch / Growth / Authority.
 * tone "ink" sits on the dark homepage. tone "paper" sits on inner pages.
 */
export default function BundleRows({
  tone = "paper",
  id = "bundles",
  eyebrow = "Find your system",
  title = "Pick the",
  titleAccent = "right system.",
  lede = "Website, SEO, social, and CRM wired as one loop. Three systems — priced to start.",
  compact = false,
  showLoop = true,
  showScaleNote = true,
}) {
  const reduceMotion = useReducedMotion();
  const ink = tone === "ink";
  void showLoop;

  return (
    <section
      id={id}
      className={`scroll-mt-28 ${
        ink
          ? "s-dark border-t border-[var(--s-line)]"
          : "border-t border-[var(--c-border)] bg-[var(--c-cream,#f7f6f1)]"
      } ${compact ? "py-16 sm:py-20" : "py-[clamp(4.5rem,9vw,8rem)]"}`}
    >
      <div className="s-container">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`s-label ${
              ink ? "text-[var(--s-paper-ghost)]" : "text-[var(--c-text-muted)]"
            }`}
          >
            {eyebrow}
          </p>
          <h2
            className={`s-display mt-4 text-[clamp(2.4rem,5.5vw,4rem)] text-balance ${
              ink ? "text-[var(--s-paper)]" : "text-[var(--s-ink)]"
            }`}
          >
            {title}{" "}
            <span className="relative inline-block s-serif font-normal tracking-[-0.03em] text-[var(--s-signal)]">
              {titleAccent}
              <span
                className="absolute inset-x-0 -bottom-1 h-[0.18em] rounded-full bg-[var(--s-signal)]/30"
                aria-hidden
              />
            </span>
          </h2>
          <p
            className={`mx-auto mt-5 max-w-lg text-[1.05rem] leading-relaxed ${
              ink ? "text-[var(--s-paper-dim)]" : "text-[var(--c-text-secondary)]"
            }`}
          >
            {lede}
          </p>
          <div
            className={`mt-7 inline-flex items-center rounded-full px-4 py-2 ${
              ink
                ? "border border-[var(--s-line)] bg-[var(--s-ink-2)]"
                : "border border-[var(--c-border)] bg-white shadow-[0_10px_30px_-20px_rgba(15,15,15,0.35)]"
            }`}
          >
            <span
              className={`text-sm font-semibold ${
                ink ? "text-[var(--s-paper)]" : "text-[var(--s-ink)]"
              }`}
            >
              Billed monthly
            </span>
            <span
              className={`mx-3 h-4 w-px ${ink ? "bg-[var(--s-line)]" : "bg-[var(--c-border)]"}`}
              aria-hidden
            />
            <span
              className={`text-sm ${
                ink ? "text-[var(--s-paper-dim)]" : "text-[var(--c-text-muted)]"
              }`}
            >
              USD · ad spend separate
            </span>
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
              ink={ink}
            />
          ))}
        </div>

        <div
          className={`mt-10 flex flex-col items-center gap-4 border-t pt-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left ${
            ink ? "border-[var(--s-line)]" : "border-[var(--c-border)]"
          }`}
        >
          <p
            className={`max-w-xl text-sm leading-relaxed ${
              ink ? "text-[var(--s-paper-dim)]" : "text-[var(--c-text-muted)]"
            }`}
          >
            Prices in USD. Ad spend is separate.
            {showScaleNote
              ? " Need ads, AI agents, and a full content engine? Ask about Dominance — from $4,997/mo."
              : ""}
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold">
            {ink ? (
              <Link
                to="/bundles"
                className="text-[var(--s-paper)] underline decoration-[var(--s-line-strong)] underline-offset-4 hover:text-[var(--s-signal)]"
                onClick={() => trackButtonClick("Compare bundles", "bundle_card", "Home bundles")}
              >
                Compare the three
              </Link>
            ) : null}
            <Link
              to={ink || !compact ? "/services" : "/bundles"}
              className={`underline underline-offset-4 ${
                ink
                  ? "text-[var(--s-paper-dim)] decoration-[var(--s-line)] hover:text-[var(--s-paper)]"
                  : "text-[var(--s-ink)] decoration-[var(--c-border-strong)] hover:text-[var(--s-signal-deep)]"
              }`}
              onClick={() =>
                trackButtonClick(
                  compact ? "Full bundles" : "À la carte",
                  "bundle_card",
                  ink ? "Home bundles" : "Services",
                )
              }
            >
              {ink ? "Or build it à la carte" : compact ? "Open the bundles page" : "Build it à la carte"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

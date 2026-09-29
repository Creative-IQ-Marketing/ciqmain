import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GROWTH_LOOP, MAIN_BUNDLES } from "../../data/growthBundles";
import { scrollToContactForm } from "../../utils/formInterest";
import { trackButtonClick } from "../../services/analytics";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The three growth systems as editorial rows.
 * tone "ink" sits on the dark homepage. tone "paper" sits on inner pages.
 */
export default function BundleRows({
  tone = "paper",
  id = "bundles",
  eyebrow = "Growth systems",
  title = "Three bundles.",
  titleAccent = "One loop.",
  lede = "Get found, capture the lead, nurture it, and prove the work. Sold as three systems — website, SEO, social, and CRM wired together.",
  compact = false,
  showLoop = true,
  showScaleNote = true,
}) {
  const root = useRef(null);
  const ink = tone === "ink";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(root.current.querySelectorAll("[data-bundle-row]"), {
          y: 24,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const start = (bundle) => {
    trackButtonClick(bundle.name, "bundle_row", ink ? "Home bundles" : "Bundles");
    scrollToContactForm(bundle.interest, `bundle:${bundle.interest}`);
  };

  return (
    <section
      ref={root}
      id={id}
      className={`scroll-mt-28 ${
        ink
          ? "s-dark border-t border-[var(--s-line)]"
          : "border-t border-[var(--c-border)] bg-[var(--c-surface)]"
      } ${compact ? "py-16 sm:py-20" : "py-[clamp(4.5rem,9vw,8rem)]"}`}
    >
      <div className="s-container">
        <div className="max-w-4xl">
          <div>
            <p
              className={`s-label flex items-center gap-3 ${
                ink ? "text-[var(--s-paper-ghost)]" : "text-[var(--c-text-muted)]"
              }`}
            >
              <span className="text-[var(--s-signal)]">CIQ</span>
              <span className="h-px w-8 bg-current opacity-50" />
              {eyebrow}
            </p>
            <h2
              className={`s-display mt-5 text-[clamp(2.6rem,6vw,5.4rem)] text-balance ${
                ink ? "text-[var(--s-paper)]" : "text-[var(--s-ink)]"
              }`}
            >
              {title}{" "}
              <span className="s-serif font-normal tracking-[-0.03em] text-[var(--s-signal)]">
                {titleAccent}
              </span>
            </h2>
          </div>
          <p
            className={`mt-6 max-w-xl text-[1.05rem] leading-relaxed ${
              ink ? "text-[var(--s-paper-dim)] lg:pb-2" : "text-[var(--c-text-secondary)] lg:pb-2"
            }`}
          >
            {lede}
          </p>
        </div>

        {showLoop ? (
          <ol
            className={`mt-10 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 ${
              ink
                ? "border-[var(--s-line)] bg-[var(--s-line)]"
                : "border-[var(--c-border)] bg-[var(--c-border)]"
            }`}
          >
            {GROWTH_LOOP.map((step, i) => (
              <li
                key={step.id}
                className={`px-5 py-4 ${ink ? "bg-[var(--s-ink-2)]" : "bg-[#faf9f6]"}`}
              >
                <p className="s-mono text-[11px] text-[var(--s-signal)]">0{i + 1}</p>
                <p
                  className={`mt-2 font-semibold tracking-[-0.02em] ${
                    ink ? "text-[var(--s-paper)]" : "text-[var(--s-ink)]"
                  }`}
                >
                  {step.label}
                </p>
                <p
                  className={`mt-1 text-sm leading-snug ${
                    ink ? "text-[var(--s-paper-dim)]" : "text-[var(--c-text-secondary)]"
                  }`}
                >
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        ) : null}

        <div className={showLoop ? "mt-6 lg:mt-10" : "mt-10"}>
          {MAIN_BUNDLES.map((bundle) => {
            const featured = bundle.id === "growth";
            return (
              <article
                key={bundle.id}
                id={compact ? undefined : bundle.id}
                data-bundle-row
                className={`scroll-mt-32 grid gap-6 border-t py-8 sm:py-10 lg:grid-cols-[3.5rem_minmax(0,1fr)_12.5rem] lg:items-start lg:gap-8 ${
                  ink ? "border-[var(--s-line)]" : "border-[var(--c-border)]"
                } ${
                  featured
                    ? ink
                      ? "bg-[linear-gradient(90deg,rgba(91,134,255,0.14),transparent_55%)]"
                      : "bg-[linear-gradient(90deg,rgba(59,111,240,0.08),transparent_50%)]"
                    : ""
                }`}
              >
                <p className="s-mono text-[13px] text-[var(--s-signal)]">{bundle.index}</p>

                <div className="min-w-0 max-w-full">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3
                      className={`s-display text-[clamp(2rem,4vw,3.4rem)] leading-none ${
                        ink ? "text-[var(--s-paper)]" : "text-[var(--s-ink)]"
                      }`}
                    >
                      {bundle.name}
                    </h3>
                    <span
                      className={`s-serif text-[1.35rem] ${
                        ink ? "text-[var(--s-paper-dim)]" : "text-[var(--c-text-secondary)]"
                      }`}
                    >
                      {bundle.stage}
                    </span>
                    {bundle.badge ? (
                      <span className="s-label rounded-full bg-[var(--s-signal-deep)] px-2.5 py-1 text-white">
                        {bundle.badge}
                      </span>
                    ) : null}
                  </div>
                  <p
                    className={`mt-3 max-w-xl text-[15px] leading-relaxed ${
                      ink ? "text-[var(--s-paper-dim)]" : "text-[var(--c-text-secondary)]"
                    }`}
                  >
                    {bundle.outcome}
                  </p>
                  <ul className="mt-4 max-w-xl space-y-1.5">
                    {bundle.preview.map((item) => (
                      <li
                        key={item}
                        className={`text-sm ${
                          ink ? "text-[var(--s-paper)]" : "text-[var(--s-ink)]"
                        }`}
                      >
                        <span className="mr-2 text-[var(--s-signal)]" aria-hidden>
                          —
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex min-w-0 flex-wrap items-end justify-between gap-4 lg:block lg:text-right">
                  <div>
                    <p
                      className={`s-display text-[clamp(2rem,3vw,2.8rem)] leading-none tabular-nums ${
                        ink ? "text-[var(--s-paper)]" : "text-[var(--s-ink)]"
                      }`}
                    >
                      {bundle.monthly}
                    </p>
                    <p
                      className={`s-label mt-2 ${
                        ink ? "text-[var(--s-paper-ghost)]" : "text-[var(--c-text-muted)]"
                      }`}
                    >
                      / month
                      {bundle.structure ? ` · ${bundle.structure}` : ""}
                    </p>
                    <p className="mt-1 text-xs tabular-nums text-[var(--s-signal)]">
                      {bundle.savings}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => start(bundle)}
                    className={`mt-0 inline-flex h-11 items-center rounded-full px-5 text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-signal)] focus-visible:ring-offset-2 active:scale-[0.98] lg:mt-5 ${
                      featured
                        ? "bg-[var(--s-signal-deep)] text-white hover:bg-[var(--s-signal)]"
                        : ink
                          ? "text-[var(--s-paper)] shadow-[inset_0_0_0_1px_var(--s-line-strong)] hover:bg-[var(--s-paper)] hover:text-[var(--s-ink)]"
                          : "text-[var(--s-ink)] shadow-[inset_0_0_0_1px_var(--c-border-strong)] hover:bg-[var(--s-ink)] hover:text-[var(--s-paper)]"
                    } ${ink ? "focus-visible:ring-offset-[var(--s-ink)]" : "focus-visible:ring-offset-[var(--c-surface)]"}`}
                  >
                    Start {bundle.name}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div
          className={`mt-8 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-end sm:justify-between ${
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
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            {ink ? (
              <Link
                to="/bundles"
                className="text-[var(--s-paper)] underline decoration-[var(--s-line-strong)] underline-offset-4 hover:text-[var(--s-signal)]"
                onClick={() => trackButtonClick("Compare bundles", "bundle_row", "Home bundles")}
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
                  "bundle_row",
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

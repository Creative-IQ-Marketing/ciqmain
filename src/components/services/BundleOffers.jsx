import { Link } from "react-router-dom";
import { GROWTH_LOOP, MAIN_BUNDLES } from "../../data/growthBundles";
import { scrollToContactForm } from "../../utils/formInterest";
import { trackButtonClick } from "../../services/analytics";
import { Button } from "../ui/button";

/**
 * The three growth systems, in the main site's type and color.
 * `home` sits under the hero. `page` is the bundles page. `closer` ends à la carte.
 */
export default function BundleOffers({
  id = "bundles",
  variant = "page",
  eyebrow = "Growth systems",
  title = "Three bundles.",
  titleAccent = "One loop.",
  lede = "Get found, capture the lead, nurture it, and prove the work. Sold as three systems — website, SEO, social, and CRM wired together.",
  showLoop = true,
}) {
  const home = variant === "home";
  const closer = variant === "closer";

  const start = (bundle) => {
    trackButtonClick(bundle.name, "bundle_row", home ? "Home bundles" : "Bundles");
    scrollToContactForm(bundle.interest, `bundle:${bundle.interest}`);
  };

  return (
    <section
      id={id}
      className={`scroll-mt-28 border-t border-[var(--c-border)] ${
        home ? "bg-[var(--c-ink)] text-white" : "bg-[var(--c-surface)]"
      } ${closer ? "py-16 sm:py-20" : "py-[clamp(3.5rem,7vw,6rem)]"}`}
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)]">
        <div className="max-w-3xl">
          <p
            className={`font-sans text-[11px] font-semibold uppercase tracking-[0.16em] ${
              home ? "text-white/55" : "text-[var(--c-text-muted)]"
            }`}
          >
            {eyebrow}
          </p>
          <h2
            className={`mt-3 font-sans text-[clamp(2rem,4.5vw,3.4rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-balance ${
              home ? "text-white" : "text-[var(--c-ink)]"
            }`}
          >
            {title}{" "}
            <span className="text-[var(--c-accent)]">{titleAccent}</span>
          </h2>
          <p
            className={`mt-4 max-w-xl font-sans text-base leading-relaxed ${
              home ? "text-white/70" : "text-[var(--c-text-secondary)]"
            }`}
          >
            {lede}
          </p>
        </div>

        {showLoop ? (
          <ol className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-[var(--c-border)] bg-[var(--c-border)] sm:grid-cols-2 lg:grid-cols-4">
            {GROWTH_LOOP.map((step, i) => (
              <li
                key={step.id}
                className={`px-5 py-4 ${home ? "bg-[#161616]" : "bg-white"}`}
              >
                <p className="font-sans text-[11px] font-semibold tabular-nums text-[var(--c-accent)]">
                  0{i + 1}
                </p>
                <p className={`mt-2 font-sans font-semibold ${home ? "text-white" : "text-[var(--c-ink)]"}`}>
                  {step.label}
                </p>
                <p className={`mt-1 text-sm leading-snug ${home ? "text-white/65" : "text-[var(--c-text-secondary)]"}`}>
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        ) : null}

        <div className={showLoop ? "mt-8" : "mt-10"}>
          {MAIN_BUNDLES.map((bundle) => {
            const featured = bundle.id === "growth";
            return (
              <article
                key={bundle.id}
                id={closer ? undefined : bundle.id}
                className={`scroll-mt-28 grid gap-6 border-t py-8 lg:grid-cols-[3rem_minmax(0,1fr)_11rem] lg:items-start ${
                  home ? "border-white/10" : "border-[var(--c-border)]"
                } ${featured && !home ? "bg-[var(--c-accent-dim)]" : ""} ${
                  featured && home ? "bg-white/[0.04]" : ""
                }`}
              >
                <p className="font-sans text-sm font-semibold tabular-nums text-[var(--c-accent)]">
                  {bundle.index}
                </p>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3
                      className={`font-sans text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold tracking-[-0.03em] ${
                        home ? "text-white" : "text-[var(--c-ink)]"
                      }`}
                    >
                      {bundle.name}
                    </h3>
                    <span className={home ? "text-white/60" : "text-[var(--c-text-secondary)]"}>
                      {bundle.stage}
                    </span>
                    {bundle.badge ? (
                      <span className="rounded-full bg-[var(--c-accent)] px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                        {bundle.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className={`mt-2 max-w-xl text-sm leading-relaxed ${home ? "text-white/70" : "text-[var(--c-text-secondary)]"}`}>
                    {bundle.outcome}
                  </p>
                  <ul className="mt-4 max-w-xl space-y-1.5">
                    {bundle.preview.map((item) => (
                      <li key={item} className={`text-sm ${home ? "text-white" : "text-[var(--c-ink)]"}`}>
                        <span className="mr-2 text-[var(--c-accent)]" aria-hidden>
                          —
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap items-end justify-between gap-4 lg:block lg:text-right">
                  <div>
                    <p className={`font-sans text-3xl font-extrabold tabular-nums tracking-[-0.04em] ${home ? "text-white" : "text-[var(--c-ink)]"}`}>
                      {bundle.monthly}
                    </p>
                    <p className={`mt-1 font-sans text-xs uppercase tracking-[0.12em] ${home ? "text-white/50" : "text-[var(--c-text-muted)]"}`}>
                      / month{bundle.structure ? ` · ${bundle.structure}` : ""}
                    </p>
                    <p className="mt-1 text-xs font-semibold tabular-nums text-[var(--c-accent)]">
                      {bundle.savings}
                    </p>
                  </div>
                  <Button
                    className="lg:mt-4"
                    variant={featured ? "primary" : "secondary"}
                    onClick={() => start(bundle)}
                  >
                    Start {bundle.name}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        <div
          className={`mt-8 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-end sm:justify-between ${
            home ? "border-white/10" : "border-[var(--c-border)]"
          }`}
        >
          <p className={`max-w-xl text-sm leading-relaxed ${home ? "text-white/55" : "text-[var(--c-text-muted)]"}`}>
            Prices in USD. Ad spend is separate. Need ads, AI agents, and a full content engine? Ask about Dominance — from $4,997/mo.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
            {home ? (
              <Link to="/bundles" className="text-white underline underline-offset-4 hover:text-[var(--c-accent)]">
                Compare the three
              </Link>
            ) : null}
            <Link
              to={closer ? "/bundles" : "/services"}
              className={`underline underline-offset-4 ${
                home ? "text-white/70 hover:text-white" : "text-[var(--c-ink)] hover:text-[var(--c-accent)]"
              }`}
            >
              {home ? "Or build it à la carte" : closer ? "Open the bundles page" : "Build it à la carte"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

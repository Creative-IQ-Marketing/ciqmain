import { Link } from "react-router-dom";
import { ArrowUpRight, Plus } from "lucide-react";
import Reveal from "../primitives/Reveal";
import { trackButtonClick } from "../../services/analytics";

/**
 * FAQ section for service pages. Native <details> so every answer is in the
 * DOM (crawlers and AI readers see it) while staying collapsed for people.
 * Content comes from src/data/faqs.js — the same data that feeds the FAQPage
 * JSON-LD in the prerendered HTML, so the visible text and schema always match.
 */
export default function ServiceFaq({
  groups,
  id = "faq",
  eyebrow = "FAQ",
  heading = "Questions we get",
  headingAccent = "asked every week.",
  lede,
}) {
  if (!groups?.length) return null;
  const multi = groups.length > 1;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-28 border-t border-[var(--c-border)] bg-[var(--c-cream)]/60"
    >
      <div className="mx-auto grid max-w-[var(--container-max)] gap-10 px-[var(--container-pad)] py-[var(--section-pad)] lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-sans text-sm font-medium text-[var(--c-text-muted)]">{eyebrow}</p>
          <h2
            id={`${id}-heading`}
            className="mt-3 font-sans text-[clamp(1.85rem,3.6vw,2.9rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[var(--c-ink)] text-balance"
          >
            {heading} <span className="text-[var(--c-accent)]">{headingAccent}</span>
          </h2>
          {lede ? (
            <p className="mt-5 max-w-sm font-sans text-base leading-relaxed text-[var(--c-text-secondary)]">
              {lede}
            </p>
          ) : null}
          {multi ? (
            <nav aria-label="FAQ topics" className="mt-8 hidden flex-col gap-1 lg:flex">
              {groups.map((g) => (
                <a
                  key={g.id}
                  href={`#${id}-${g.id}`}
                  className="w-fit border-b border-transparent py-1 font-sans text-sm font-semibold text-[var(--c-text-secondary)] transition hover:border-[var(--c-accent)] hover:text-[var(--c-ink)]"
                >
                  {g.title}
                </a>
              ))}
            </nav>
          ) : null}
        </Reveal>

        <div className="min-w-0 space-y-14">
          {groups.map((group) => (
            <div key={group.id} id={`${id}-${group.id}`} className="scroll-mt-28">
              {multi ? (
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-sans text-lg font-extrabold tracking-[-0.02em] text-[var(--c-ink)]">
                    {group.title}
                  </h3>
                  <Link
                    to={group.href}
                    className="inline-flex items-center gap-1 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[var(--c-accent)] transition hover:text-[var(--c-ink)]"
                  >
                    Explore <ArrowUpRight className="size-3.5" aria-hidden />
                  </Link>
                </div>
              ) : null}
              <div className="border-t border-[var(--c-border-strong)]">
                {group.items.map((item) => (
                  <details
                    key={item.q}
                    name={`${id}-${group.id}`}
                    className="group border-b border-[var(--c-border)]"
                  >
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left font-sans text-[1.0625rem] font-semibold leading-snug text-[var(--c-ink)] transition-colors hover:text-[var(--c-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                      <span className="text-balance">{item.q}</span>
                      <Plus
                        className="mt-1 size-4 shrink-0 text-[var(--c-text-muted)] transition-transform duration-300 group-open:rotate-45"
                        aria-hidden
                      />
                    </summary>
                    <div className="pb-6 pr-10">
                      <p className="max-w-2xl font-sans text-[15px] leading-relaxed text-[var(--c-text-secondary)]">
                        {item.a}
                      </p>
                      {item.link ? (
                        <Link
                          to={item.link.href}
                          onClick={() => trackButtonClick(item.link.label, "faq_link", "FAQ")}
                          className="mt-3 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-[var(--c-accent)] underline-offset-4 transition hover:text-[var(--c-ink)] hover:underline"
                        >
                          {item.link.label} <ArrowUpRight className="size-3.5" aria-hidden />
                        </Link>
                      ) : null}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

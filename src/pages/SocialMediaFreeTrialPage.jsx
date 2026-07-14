import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import PageHeader, {
  PageCtaPrimary,
  PageCtaSecondary,
} from "../components/layout/PageHeader";

const STARTER_FEATURES = [
  "Monthly strategy meeting",
  "Up to 2 platforms",
  "8 posts per month (2 per week)",
  "Platform-optimized captions and hashtags",
  "Cross-platform formatting",
  "Monthly engagement summary",
];

export default function SocialMediaFreeTrialPage() {
  return (
    <main className="bg-white">
      <SEO
        title="30-Day Social Media Free Trial | CreativeIQ"
        description="Try CreativeIQ's Social Starter package free for 30 days."
        keywords="social media free trial, social media management"
        canonical="https://creativeiq.marketing/social-media-free-trial"
      />

      <PageHeader
        align="left"
        title="Social Starter Presence System"
        description="Consistency before growth. Professional posting, captions, and cross-platform formatting for 30 days free, then $589/mo if you continue."
      >
        <PageCtaPrimary to="/services?interest=social-starter#services-contact">
          Start free trial
        </PageCtaPrimary>
        <PageCtaSecondary to="/services#content-creation">
          Compare packages
        </PageCtaSecondary>
      </PageHeader>

      <section className="border-t border-[var(--c-border)] bg-white">
        <div className="mx-auto grid max-w-[var(--container-max)] lg:grid-cols-[1.2fr_0.8fr]">
          <div className="border-b border-[var(--c-border)] px-[var(--container-pad)] py-14 lg:border-b-0 lg:border-r lg:py-16">
            <h2 className="font-sans text-2xl font-extrabold tracking-[-0.03em] text-[var(--c-ink)]">
              Full Social Starter package
            </h2>
            <ul className="mt-8 divide-y divide-[var(--c-border)] border-y border-[var(--c-border)]">
              {STARTER_FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 py-4 font-sans text-[15px] text-[var(--c-text-secondary)]"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--c-accent)]"
                    strokeWidth={2}
                    aria-hidden
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <aside className="flex flex-col justify-between bg-[var(--c-surface-2)] px-[var(--container-pad)] py-14 lg:py-16">
            <div>
              <p className="font-sans text-sm text-[var(--c-text-muted)]">
                After your trial
              </p>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-sans text-5xl font-extrabold tracking-[-0.04em] text-[var(--c-ink)]">
                  $589
                </span>
                <span className="font-sans text-sm text-[var(--c-text-muted)]">
                  /month
                </span>
              </div>
              <p className="mt-2 font-sans text-sm text-[var(--c-text-muted)]">
                or $299 bi-weekly
              </p>
              <p className="mt-6 max-w-xs font-sans text-sm leading-relaxed text-[var(--c-text-secondary)]">
                30 days free. Cancel anytime during the trial. No obligation.
              </p>
            </div>

            <div className="mt-10 space-y-3">
              <Link
                to="/services?interest=social-starter#services-contact"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--c-cta)] py-3.5 font-sans text-sm font-semibold text-white transition hover:bg-[var(--c-cta-hover)]"
              >
                Start free trial
                <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden />
              </Link>
              <Link
                to="/services#content-creation"
                className="flex w-full items-center justify-center rounded-full border border-[var(--c-border-strong)] bg-white py-3.5 font-sans text-sm font-medium text-[var(--c-ink)] transition hover:border-[var(--c-ink)]/40"
              >
                Compare all packages
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

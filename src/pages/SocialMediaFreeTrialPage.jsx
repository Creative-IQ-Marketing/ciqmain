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
        align="center"
        eyebrow="30-day free trial"
        title="Social Starter"
        titleAccent="Presence System"
        description="For brands that need consistency before growth. Professional posting, captions, and cross-platform formatting — no long-term commitment to start."
      >
        <PageCtaPrimary to="/services?interest=social-starter#services-contact">
          Start free trial
        </PageCtaPrimary>
        <PageCtaSecondary to="/services#content-creation">
          Compare packages
        </PageCtaSecondary>
      </PageHeader>

      <section className="border-t border-black/[0.05] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:items-start">
            <div className="rounded-[22px] border border-black/[0.06] bg-white p-8 sm:p-10">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3B6FF0]">
                What&apos;s included
              </p>
              <h2 className="mt-3 font-sans text-2xl font-extrabold tracking-[-0.03em] text-[#0f0f0f]">
                Full Social Starter package
              </h2>
              <ul className="mt-8 space-y-3.5">
                {STARTER_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#3B6FF0]"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span className="font-sans text-sm text-[#5c5c5c]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="rounded-[22px] border border-black/[0.06] bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.04)] lg:sticky lg:top-28">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#737373]">
                After your trial
              </p>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-sans text-3xl font-extrabold text-[#0f0f0f]">$589</span>
                <span className="font-sans text-sm text-[#737373]">/month</span>
              </div>
              <p className="mt-1 font-sans text-xs text-[#737373]">or $299 bi-weekly</p>

              <div className="mt-6 space-y-3">
                <Link
                  to="/services?interest=social-starter#services-contact"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#18181b] py-3.5 font-sans text-sm font-semibold text-white transition hover:bg-[#2a2a2a]"
                >
                  Start free trial
                  <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden />
                </Link>
                <Link
                  to="/services#content-creation"
                  className="flex w-full items-center justify-center rounded-full border border-[#d4d4d4] py-3.5 font-sans text-sm font-medium text-[#252525] transition hover:border-[#aaa]"
                >
                  Compare all packages
                </Link>
              </div>

              <p className="mt-5 font-sans text-xs leading-relaxed text-[#737373]">
                30 days free. Cancel anytime during the trial — no obligation.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

import { motion } from "framer-motion";
import { ArrowRight, Check, Instagram, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

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
        description="Try CreativeIQ's Social Starter package free for 30 days. Consistent posting, platform optimization, and monthly strategy — built for brands ready to establish visibility."
        keywords="social media free trial, social media management, social starter package"
        canonical="https://creativeiq.marketing/social-media-free-trial"
      />

      <section className="border-b border-slate-100 bg-slate-50 pt-28 pb-16 lg:mt-20 sm:pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#3B6FF0]/20 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#3B6FF0]">
              30-day free trial
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Social Starter
              <span className="block text-2xl font-semibold text-slate-500 sm:text-3xl">
                Presence System
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              For brands that need consistency before growth. Establish your
              presence with professional posting, captions, and cross-platform
              formatting — no long-term commitment to start.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3B6FF0]/10">
                  <Instagram className="h-5 w-5 text-[#3B6FF0]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    What&apos;s included
                  </p>
                  <p className="text-sm font-medium text-slate-900">
                    Full Social Starter package
                  </p>
                </div>
              </div>

              <ul className="space-y-3.5">
                {STARTER_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#3B6FF0]"
                      strokeWidth={2.5}
                    />
                    <span className="text-sm text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">
                  What you&apos;re buying
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Consistency and basic visibility — the foundation every growth
                  system needs.
                </p>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm lg:sticky lg:top-28"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                After your trial
              </p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900">$589</span>
                <span className="text-sm text-slate-500">/month</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                or $299 bi-weekly
              </p>

              <div className="mt-6 space-y-3">
                <Link
                  to="/services?interest=social-starter#services-contact"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3B6FF0] py-3.5 text-sm font-semibold text-white transition hover:bg-[#2f5ad4]"
                >
                  Start free trial <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/services#content-creation"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Compare all packages
                </Link>
              </div>

              <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-slate-500">
                <MessageCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                30 days free. Cancel anytime during the trial — no obligation.
              </p>
            </motion.aside>
          </div>
        </div>
      </section>
    </main>
  );
}

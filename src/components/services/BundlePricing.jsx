import { motion } from "framer-motion";
import { Check, ArrowRight, Zap, TrendingUp, Rocket } from "lucide-react";
import { scrollToServicesContact } from "../../utils/formInterest";

const BUNDLES = [
  {
    badge: null,
    icon: TrendingUp,
    name: "Essential Visibility",
    interest: "bundle-essential",
    tagline: "Get found with a clean site, SEO foundation, and steady social.",
    monthly: "$999",
    biweekly: "$499.50",
    oneTime: "$299",
    features: [
      "SEO-Coded Website (1 Page)",
      "Website Maintenance",
      "HR SEO PRO PLAN",
      "Starter Social Media (8 posts/mo)",
      "2 platforms",
      "1 carousel + 1 reel / week",
      "Insights + repurposing strategy",
    ],
    bestFor: "Teams building visibility and credibility before automating HR.",
  },
  {
    badge: "Popular",
    icon: Zap,
    name: "Growth Operations",
    interest: "bundle-growth",
    tagline: "Visibility plus hiring ops and stronger multi-platform content.",
    monthly: "$2,222",
    biweekly: "$1,122",
    oneTime: "$699",
    features: [
      "Everything in Essential Visibility",
      "CORE HR CRM System",
      "Applicant Tracking & Pipelines",
      "Interview Scheduling + Reminders",
      "Onboarding Automations",
      "Growth Social Media (12 posts/mo)",
      "3 platforms (story + carousel + reel/wk)",
      "Analytics + content calendar",
    ],
    bestFor:
      "Teams wanting visibility and organized hiring systems running together.",
  },
  {
    badge: null,
    icon: Rocket,
    name: "Elite Automation",
    interest: "bundle-elite",
    tagline: "Automation, AI assists, and multi-platform social at full cadence.",
    monthly: "$3,888",
    biweekly: "$1,950",
    oneTime: "$699",
    afterNote: "Then $3,500/mo after AI setup",
    features: [
      "Everything in Growth Operations",
      "AI Chat Widget ★",
      "AI HR Automation Suite ★",
      "Email Marketing Automation ★",
      "Elite Social Media (24 posts/mo)",
      "4 platforms (2 reels + 2 carousels/wk)",
      "Social SEO (metadata + alt-text)",
      "Automated DMs + Hashtag rotation",
      "Advanced analytics dashboard",
    ],
    bestFor:
      "Teams ready for maximum visibility and a fully automated HR ecosystem.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
  }),
};

export default function BundlePricing() {
  const scrollToContact = (interest) => {
    scrollToServicesContact(interest, `bundle:${interest}`);
  };

  return (
    <section
      id="bundles"
      className="scroll-mt-32 border-t border-black/[0.05] bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-sans text-[clamp(1.75rem,3vw,2.75rem)] font-extrabold tracking-[-0.03em] text-[#0f0f0f]">
            Choose your growth system
          </h2>
          <p className="mx-auto max-w-xl font-sans text-base leading-relaxed text-[#5c5c5c] lg:text-lg">
            Each bundle is a complete operating stack, not a menu of add-ons.
            Pick the stage that matches where you are today.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {BUNDLES.map((bundle, i) => {
            const Icon = bundle.icon;
            const isPopular = bundle.badge === "Popular";

            return (
              <motion.div
                key={bundle.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border transition-[border-color,background-color] duration-300 ${
                  isPopular
                    ? "border-[var(--c-accent)] bg-white"
                    : "border-black/[0.08] bg-white hover:border-black/[0.16]"
                }`}
              >
                {bundle.badge && (
                  <div className="border-b border-[var(--c-accent)]/15 bg-[var(--c-accent)]/[0.04] px-7 py-2 text-center text-xs font-semibold tracking-wide text-[var(--c-accent)]">
                    {bundle.badge}
                  </div>
                )}

                {/* Header */}
                <div className="bg-white px-7 pb-7 pt-7">
                  <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-md border border-black/[0.08]">
                    <Icon className="h-4 w-4 text-[var(--c-ink)]" strokeWidth={1.75} />
                  </div>

                  <h3 className="mb-1 text-xl font-bold text-[#0f0f0f]">
                    {bundle.name}
                  </h3>
                  <p className="mb-5 text-sm text-[#737373]">{bundle.tagline}</p>

                  <div className="mb-1 flex items-end gap-1">
                    <span className="text-4xl font-extrabold text-[#0f0f0f]">
                      {bundle.monthly}
                    </span>
                    <span className="pb-1 text-sm text-[#737373]">/mo</span>
                  </div>

                  <p className="text-xs text-[#737373]">
                    Bi-weekly: {bundle.biweekly} · One-time: {bundle.oneTime}
                  </p>

                  {bundle.afterNote && (
                    <p className="mt-1 text-xs font-medium text-[#3B6FF0]">
                      {bundle.afterNote}
                    </p>
                  )}
                </div>

                <div className="h-px bg-black/[0.05]" />

                <div className="flex-1 bg-white px-7 py-6">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#737373]">
                    What&apos;s included
                  </p>
                  <ul className="space-y-3">
                    {bundle.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#3B6FF0]" />
                        <span className="text-sm text-[#5c5c5c]">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 rounded-xl border border-black/[0.06] bg-[#fafafa] p-3">
                    <p className="text-xs text-[#737373]">
                      <span className="font-semibold text-[#0f0f0f]">
                        Best for:{" "}
                      </span>
                      {bundle.bestFor}
                    </p>
                  </div>
                </div>

                <div className="bg-white px-7 pb-7">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => scrollToContact(bundle.interest)}
                    className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all duration-200 ${
                      isPopular
                        ? "bg-[#18181b] text-white hover:bg-[#2a2a2a]"
                        : "border border-[#d4d4d4] text-[#252525] hover:border-[#aaa]"
                    }`}
                  >
                    Get Started <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footnote */}
        <p className="mt-10 text-center font-sans text-sm text-[#737373]">
          All packages include onboarding support. Prices in USD. Ad spend
          billed separately.
        </p>
      </div>
    </section>
  );
}

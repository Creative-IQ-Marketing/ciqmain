import { motion } from "framer-motion";
import { Check, ArrowRight, Zap, TrendingUp, Rocket } from "lucide-react";

const BUNDLES = [
  {
    badge: null,
    icon: TrendingUp,
    name: "Essential Visibility",
    tagline: "Visibility & credibility",
    monthly: "$1,777",
    biweekly: "$888.50",
    oneTime: "$699",
    color: "border-slate-200",
    headerBg: "bg-white",
    headerText: "text-slate-900",
    subText: "text-slate-500",
    btnClass:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
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
    badge: "MOST POPULAR",
    icon: Zap,
    name: "Growth Operations",
    tagline: "Organized hiring + stronger content",
    monthly: "$2,222",
    biweekly: "$1,122",
    oneTime: "$699",
    color: "border-blue-600",
    headerBg: "bg-blue-700",
    headerText: "text-white",
    subText: "text-blue-100",
    btnClass: "bg-white text-blue-700 hover:bg-blue-50 font-bold",
    features: [
      "Everything in Essential Visibility",
      "CORE HR CRM System",
      "Applicant Tracking & Pipelines",
      "Interview Scheduling + Reminders",
      "Onboarding Automations",
      "Growth Social Media (12 posts/mo)",
      "3 platforms — story + carousel + reel/wk",
      "Analytics + content calendar",
    ],
    bestFor:
      "Teams wanting visibility and organized hiring systems running together.",
  },
  {
    badge: null,
    icon: Rocket,
    name: "Elite Automation",
    tagline: "Full automation + multi-platform dominance",
    monthly: "$3,888",
    biweekly: "$1,950",
    oneTime: "$699",
    afterNote: "→ $3,500/m after AI setup",
    color: "border-slate-200",
    headerBg: "bg-white",
    headerText: "text-slate-900",
    subText: "text-slate-500",
    btnClass:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    features: [
      "Everything in Growth Operations",
      "AI Chat Widget ★",
      "AI HR Automation Suite ★",
      "Email Marketing Automation ★",
      "Elite Social Media (24 posts/mo)",
      "4 platforms — 2 reels + 2 carousels/wk",
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
  const scrollToContact = () => {
    document
      .getElementById("services-contact")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="bundles" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-3 block">
            3-Tier Growth Ecosystem
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Choose Your Growth System
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">
            Each bundle is a complete system—not a list of features. Pick the
            stage that matches where you are today.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {BUNDLES.map((bundle, i) => {
            const Icon = bundle.icon;
            const isPopular = bundle.badge === "MOST POPULAR";

            return (
              <motion.div
                key={bundle.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`relative flex flex-col rounded-2xl border-2 ${
                  isPopular
                    ? "border-blue-600 shadow-2xl shadow-blue-200/50 scale-[1.03] md:scale-105 z-10"
                    : `${bundle.color} shadow-md hover:shadow-xl`
                } overflow-hidden transition-shadow duration-300`}
              >
                {bundle.badge && (
                  <div className="text-center py-2 bg-blue-600 text-white text-xs font-bold tracking-widest uppercase">
                    {bundle.badge}
                  </div>
                )}

                {/* Header */}
                <div
                  className={`${bundle.headerBg} px-7 ${bundle.badge ? "pt-7" : "pt-7"} pb-7`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 ${
                      isPopular
                        ? "bg-white/20"
                        : "bg-blue-50 ring-1 ring-blue-200"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${isPopular ? "text-white" : "text-blue-600"}`}
                    />
                  </div>

                  <h3 className={`text-xl font-bold mb-1 ${bundle.headerText}`}>
                    {bundle.name}
                  </h3>
                  <p className={`text-sm mb-5 ${bundle.subText}`}>
                    {bundle.tagline}
                  </p>

                  <div className="flex items-end gap-1 mb-1">
                    <span
                      className={`text-4xl font-extrabold ${bundle.headerText}`}
                    >
                      {bundle.monthly}
                    </span>
                    <span className={`text-sm pb-1 ${bundle.subText}`}>
                      /mo
                    </span>
                  </div>

                  <p className={`text-xs ${bundle.subText}`}>
                    Bi-weekly: {bundle.biweekly} &nbsp;·&nbsp; One-time:{" "}
                    {bundle.oneTime}
                  </p>

                  {bundle.afterNote && (
                    <p
                      className={`text-xs font-semibold mt-1 ${
                        isPopular ? "text-blue-200" : "text-blue-600"
                      }`}
                    >
                      {bundle.afterNote}
                    </p>
                  )}
                </div>

                {/* Divider */}
                <div
                  className={`h-px ${
                    isPopular ? "bg-blue-500/30" : "bg-slate-100"
                  }`}
                />

                {/* Features */}
                <div className="flex-1 px-7 py-6 bg-white">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                    What&apos;s included
                  </p>
                  <ul className="space-y-3">
                    {bundle.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                        <span className="text-sm text-slate-700">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Best for */}
                  <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">
                        Best for:{" "}
                      </span>
                      {bundle.bestFor}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-7 pb-7 bg-white">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={scrollToContact}
                    className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${bundle.btnClass}`}
                  >
                    Get Started <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footnote */}
        <p className="text-center text-sm text-slate-400 mt-10">
          All packages include onboarding support. Prices in USD. Ad spend
          billed separately.
        </p>
      </div>
    </section>
  );
}

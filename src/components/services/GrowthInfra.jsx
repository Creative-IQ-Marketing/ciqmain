import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Flame,
  LineChart,
  Cpu,
  Crown,
} from "lucide-react";

const TIERS = [
  {
    number: "1",
    icon: Building2,
    name: "The Foundation System",
    subtitle: "Digital Authority Build",
    bestFor: "New businesses, local clinics, startups",
    setup: "$2,500 – $5,000 setup",
    monthly: "$1,200 – $1,800/mo",
    goal: "Establish digital credibility + lead capture infrastructure.",
    features: [
      "Custom conversion-optimized website",
      "Technical SEO setup",
      "Google Business Profile optimization",
      "Basic local SEO",
      "CRM setup (pipeline + booking calendar)",
      "Email capture funnel",
      "1 automated email sequence",
      "Monthly analytics report",
    ],
    color: "border-l-slate-500",
    badge: null,
  },
  {
    number: "2",
    icon: Flame,
    name: "The Growth Engine",
    subtitle: "Lead Generation & Conversion System",
    bestFor: "Clinics, law firms, med spas, home services",
    setup: null,
    monthly: "$3,500 – $6,500/mo",
    goal: "Predictable lead flow + automated follow-up. Competes with larger Texas firms.",
    features: [
      "Everything in Foundation",
      "Google Ads management",
      "Meta Ads management",
      "Retargeting funnel",
      "Landing page A/B testing",
      "SEO content (2–4 blogs/month)",
      "Advanced CRM automations",
      "Missed-call text-back system",
      "SMS follow-up sequences",
      "Reputation management system",
    ],
    color: "border-l-blue-500",
    badge: "Ad spend separate",
  },
  {
    number: "3",
    icon: LineChart,
    name: "The Brand Authority System",
    subtitle: "Omnipresence & Market Positioning",
    bestFor: "Established brands scaling visibility",
    setup: null,
    monthly: "$6,500 – $10,000/mo",
    goal: "Position client as market leader, not just advertiser.",
    features: [
      "Everything in Growth Engine",
      "70+ social posts/month (multi-platform)",
      "Short-form video production",
      "Brand photoshoot quarterly",
      "Podcast production support",
      "Influencer collaborations",
      "LinkedIn authority blogging",
      "Advanced YouTube SEO",
      "Brand storytelling campaigns",
    ],
    color: "border-l-blue-600",
    badge: null,
  },
  {
    number: "4",
    icon: Cpu,
    name: "The Revenue Maximizer",
    subtitle: "Automation & AI Scale Suite",
    bestFor: "Multi-location, high-volume businesses",
    setup: null,
    monthly: "$8,000 – $15,000/mo",
    goal: "Increase LTV, reduce lost leads, scale revenue without scaling payroll.",
    features: [
      "Everything in Brand Authority",
      "AI chat widget",
      "AI voice assistant for inbound calls",
      "Full pipeline automation",
      "Sales team tracking dashboard",
      "Heatmaps & conversion tracking",
      "Advanced attribution reporting",
      "Customer reactivation campaigns",
      "Loyalty & referral automation",
      "Revenue forecasting model",
    ],
    color: "border-l-indigo-500",
    badge: null,
  },
  {
    number: "5",
    icon: Crown,
    name: "Enterprise Growth Partner",
    subtitle: "Fractional CMO + Full Digital Division",
    bestFor: "Developers, franchises, healthcare groups, investors",
    setup: null,
    monthly: "$15,000 – $40,000/mo",
    goal: "Act as in-house marketing department without internal overhead. Competes with Houston & Dallas enterprise firms.",
    features: [
      "Everything from previous tiers",
      "Multi-location marketing management",
      "Full brand repositioning",
      "Investor pitch deck support",
      "Quarterly strategic planning retreats",
      "Dedicated account strategist + media team",
      "Custom web/app development",
      "API integrations",
      "Executive-level KPI reporting",
      "Competitive intelligence research",
    ],
    color: "border-l-blue-400",
    badge: "By application only",
  },
];

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function GrowthInfra() {
  const scrollToContact = () => {
    document
      .getElementById("services-contact")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="growth-infra" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-3 block">
            Growth Infrastructure
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            5 Elite Growth Tiers
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Where are you in your growth stage? Each tier is designed to scale
            systematically— from first digital impression to full enterprise
            dominance.
          </p>
        </motion.div>

        {/* Context banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-16 p-5 rounded-2xl bg-blue-600 text-white text-center"
        >
          <p className="font-semibold text-lg">
            Most agencies sell services. We build growth infrastructure.
          </p>
          <p className="text-blue-100 text-sm mt-1">
            Average client value moves from $1,200/mo to $5,000–$12,000/mo.
            That&apos;s how agencies scale to 7 figures.
          </p>
        </motion.div>

        {/* Tier cards */}
        <div className="space-y-6">
          {TIERS.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`bg-white rounded-2xl shadow-sm border border-slate-200 border-l-4 ${tier.color} overflow-hidden hover:shadow-md transition-shadow duration-300`}
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                    {/* Tier number + icon */}
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                          Tier {tier.number}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 leading-tight">
                          {tier.name}
                        </h3>
                        <p className="text-sm text-blue-600 font-medium">
                          {tier.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Right section */}
                    <div className="flex-1 grid sm:grid-cols-2 gap-6">
                      {/* Features */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                          Includes
                        </p>
                        <ul className="space-y-1.5">
                          {tier.features.map((f) => (
                            <li
                              key={f}
                              className="flex items-start gap-2 text-sm text-slate-600"
                            >
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Meta */}
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                            Investment
                          </p>
                          {tier.setup && (
                            <p className="text-sm text-slate-700 font-medium">
                              {tier.setup}
                            </p>
                          )}
                          <p className="text-lg font-bold text-blue-700">
                            {tier.monthly}
                          </p>
                          {tier.badge && (
                            <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">
                              {tier.badge}
                            </span>
                          )}
                        </div>

                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                            Best For
                          </p>
                          <p className="text-sm text-slate-600">
                            {tier.bestFor}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <p className="text-xs text-slate-500">
                            <span className="font-semibold text-slate-700">
                              Goal:{" "}
                            </span>
                            {tier.goal}
                          </p>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={scrollToContact}
                          className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          Discuss this tier <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

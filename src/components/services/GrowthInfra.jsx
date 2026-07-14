import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Flame,
  LineChart,
  Cpu,
  Crown,
} from "lucide-react";
import { scrollToServicesContact } from "../../utils/formInterest";

const TIERS = [
  {
    number: "1",
    icon: Building2,
    name: "The Foundation System",
    interest: "tier-foundation",
    subtitle: "Digital Authority Build",
    bestFor: "New businesses, local clinics, startups",
    setup: "$2,500 – $5,000 setup",
    monthly: null,
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
    interest: "tier-growth-engine",
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
    interest: "tier-brand-authority",
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
    interest: "tier-revenue",
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
    interest: "tier-enterprise",
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
  const scrollToContact = (interest) => {
    scrollToServicesContact(interest, `growth-tier:${interest}`);
  };

  return (
    <section id="growth-infra" className="scroll-mt-32 border-t border-black/[0.05] bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center"
        >
          <span className="mb-3 block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3B6FF0]">
            Growth Infrastructure
          </span>
          <h2 className="mb-4 font-sans text-[clamp(1.75rem,3vw,2.75rem)] font-extrabold tracking-[-0.03em] text-[#0f0f0f]">
            5 Elite Growth Tiers
          </h2>
          <p className="mx-auto max-w-2xl font-sans text-base leading-relaxed text-[#5c5c5c] lg:text-lg">
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
          className="mx-auto mb-16 max-w-3xl rounded-[22px] border border-[#3B6FF0]/20 bg-[#3B6FF0]/[0.04] p-6 text-center sm:p-8"
        >
          <p className="font-sans text-lg font-semibold text-[#0f0f0f]">
            Most agencies sell services. We build growth infrastructure.
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
                className="overflow-hidden rounded-[22px] border border-black/[0.06] bg-white transition-colors duration-300 hover:border-black/[0.12]"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                    {/* Tier number + icon */}
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3B6FF0]/10">
                        <Icon className="h-6 w-6 text-[#3B6FF0]" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#737373]">
                          Tier {tier.number}
                        </span>
                        <h3 className="text-xl font-bold leading-tight text-[#0f0f0f]">
                          {tier.name}
                        </h3>
                        <p className="text-sm font-medium text-[#3B6FF0]">
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
                          {tier.monthly && (
                            <p className="text-lg font-bold text-blue-700">
                              {tier.monthly}
                            </p>
                          )}
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

                        <div className="rounded-xl border border-black/[0.06] bg-[#fafafa] p-3">
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
                          onClick={() => scrollToContact(tier.interest)}
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

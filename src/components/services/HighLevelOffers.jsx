import { motion } from "framer-motion";
import { Brain, RefreshCcw, Lightbulb, ArrowRight } from "lucide-react";

const OFFERS = [
  {
    number: "01",
    icon: Brain,
    name: "Conversion Intelligence Audit",
    price: "$2K – $7K",
    tagline:
      "We identify exactly why your traffic isn't converting—and give you a blueprint to fix it within 30 days.",
    pitch: [
      "Website behavior breakdown (why people aren't converting)",
      "Heatmap analysis (where attention goes)",
      "Messaging psychology (what's missing emotionally)",
      "Funnel leaks (where money is lost)",
      "Competitor positioning gaps",
    ],
    example: {
      client: "Med Spa Client",
      problem: "Good traffic, low bookings",
      findings: [
        "No urgency triggers on service pages",
        "Weak trust signals above the fold",
        "No clear transformation messaging",
      ],
      result:
        '"Look refreshed in under 30 minutes—no downtime, natural results" → conversions increased.',
    },
    accent: "bg-[#3B6FF0]",
    iconBg: "bg-white/20",
    iconColor: "text-white",
  },
  {
    number: "02",
    icon: RefreshCcw,
    name: "Conversion Optimization Retainer",
    price: "$3K – $15K/mo",
    tagline:
      "We don't just bring traffic—we turn your existing traffic into paying clients.",
    pitch: [
      "A/B test landing pages monthly",
      "Rewrite messaging using psychology triggers",
      "Optimize booking funnels",
      "Improve CRM workflows and follow-up sequences",
      "Analyze behavior data and adjust strategy",
    ],
    example: {
      client: "Roofing Client",
      problem: "Lead form with zero follow-up",
      findings: [
        "No SMS confirmation after form submit",
        "Zero urgency in follow-up emails",
        "No storm-damage fast-track offer visible",
      ],
      result:
        "Instant SMS + urgency emails added → lead-to-appointment rate doubled.",
    },
    accent: "bg-[#3B6FF0]",
    iconBg: "bg-blue-400/20",
    iconColor: "text-blue-300",
  },
  {
    number: "03",
    icon: Lightbulb,
    name: "High-Level Consulting",
    price: "$5K – $20K",
    tagline:
      "We audit and rebuild your entire customer acquisition system so every dollar you spend works harder.",
    pitch: [
      "Full customer journey audit end-to-end",
      "Align ads, website, CRM, and messaging",
      "Train your team on conversion thinking",
      "Strategic system architecture review",
      "Executive-level KPI reporting",
    ],
    example: null,
    accent: "bg-[#3B6FF0]",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

export default function HighLevelOffers() {
  const scrollToContact = () => {
    document
      .getElementById("services-contact")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="high-level"
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="f-body text-[11px] font-semibold uppercase tracking-[0.22em] text-[#3B6FF0] mb-3 block">
            High-Level Services
          </span>
          <h2 className="f-disp text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Go Beyond the Bundle
          </h2>
          <p className="f-body text-slate-600 max-w-xl mx-auto text-lg">
            For brands ready to work at the strategic level—where psychology
            meets infrastructure and every dollar is accountable.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {OFFERS.map((offer, i) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={offer.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-[#3B6FF0]/30 transition-all duration-300"
              >
                {/* Card header */}
                <div className={`${offer.accent} p-7`}>
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${offer.iconBg}`}
                    >
                      <Icon className={`w-5 h-5 ${offer.iconColor}`} />
                    </div>
                    <span className="text-5xl font-black text-white/20 leading-none">
                      {offer.number}
                    </span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-100 mb-2">
                    {offer.price}
                  </p>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {offer.name}
                  </h3>
                  <p className="text-slate-100 text-sm leading-relaxed italic">
                    &ldquo;{offer.tagline}&rdquo;
                  </p>
                </div>

                {/* What you include */}
                <div className="flex-1 p-7 space-y-6">
                  <div>
                    <p className="f-body text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      What&apos;s included
                    </p>
                    <ul className="space-y-2.5">
                      {offer.pitch.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                          <span className="f-body text-sm text-slate-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Real example */}
                  {offer.example && (
                    <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#3B6FF0] mb-2">
                        Real Example — {offer.example.client}
                      </p>
                      <p className="f-body text-xs text-slate-500 mb-2">
                        <span className="font-semibold text-slate-700">
                          Problem:{" "}
                        </span>
                        {offer.example.problem}
                      </p>
                      <ul className="space-y-1 mb-3">
                        {offer.example.findings.map((f) => (
                          <li
                            key={f}
                            className="f-body text-xs text-slate-500 flex gap-2"
                          >
                            <span className="text-blue-500">→</span> {f}
                          </li>
                        ))}
                      </ul>
                      <p className="f-body text-xs text-[#3B6FF0] font-medium">
                        {offer.example.result}
                      </p>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="px-7 pb-7">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={scrollToContact}
                    className="w-full py-3 rounded-full bg-[#3B6FF0] hover:bg-[#2f5ad4] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    Inquire <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

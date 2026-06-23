import { motion } from "framer-motion";
import { Brain, RefreshCcw, ArrowRight } from "lucide-react";
import { scrollToServicesContact } from "../../utils/formInterest";

const OFFERS = [
  {
    icon: Brain,
    name: "Conversion Intelligence Audit",
    interest: "audit",
    price: "$2K – $7K",
    tagline:
      "We identify exactly why your traffic isn't converting—and give you a blueprint to fix it within 30 days.",
    pitch: [
      "Website behavior breakdown",
      "Heatmap analysis",
      "Messaging psychology review",
      "Funnel leak identification",
      "Competitor positioning gaps",
    ],
    example: {
      client: "Med Spa Client",
      problem: "Good traffic, low bookings",
      result:
        "Reframed service messaging → measurable conversion lift within 30 days.",
    },
  },
  {
    icon: RefreshCcw,
    name: "Conversion Optimization Retainer",
    interest: "retainer",
    price: "$3K – $15K/mo",
    tagline:
      "We don't just bring traffic—we turn your existing traffic into paying clients.",
    pitch: [
      "Monthly landing page A/B tests",
      "Messaging rewrites with psychology triggers",
      "Booking funnel optimization",
      "CRM workflow improvements",
      "Behavior data analysis + strategy adjustments",
    ],
    example: {
      client: "Roofing Client",
      problem: "Lead form with zero follow-up",
      result:
        "Instant SMS + urgency emails → lead-to-appointment rate doubled.",
    },
  },
];

export default function HighLevelOffers() {
  const scrollToContact = (interest) => {
    scrollToServicesContact(interest, `high-level:${interest}`);
  };

  return (
    <section id="high-level" className="border-t border-slate-100 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#3B6FF0]">
            Advanced Services
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Conversion intelligence
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            For brands ready to work at the strategic level—where psychology
            meets infrastructure and every dollar is accountable.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {OFFERS.map((offer, i) => {
            const Icon = offer.icon;
            return (
              <motion.article
                key={offer.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3B6FF0]/10">
                    <Icon className="h-5 w-5 text-[#3B6FF0]" />
                  </div>
                  <p className="text-sm font-semibold text-[#3B6FF0]">
                    {offer.price}
                  </p>
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {offer.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {offer.tagline}
                </p>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {offer.pitch.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-slate-600"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Example — {offer.example.client}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    {offer.example.problem}
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-900">
                    {offer.example.result}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => scrollToContact(offer.interest)}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#3B6FF0] transition hover:text-[#2f5ad4]"
                >
                  Inquire <ArrowRight className="h-4 w-4" />
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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
      "Find exactly why traffic stalls before booking, then leave with a 30-day blueprint to fix the leaks.",
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
        "Reframed service messaging into a measurable conversion lift within 30 days.",
    },
  },
  {
    icon: RefreshCcw,
    name: "Conversion Optimization Retainer",
    interest: "retainer",
    price: "$3K – $15K/mo",
    tagline:
      "Turn the traffic you already have into paying clients through continuous testing and funnel discipline.",
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
        "Instant SMS and urgency emails doubled the lead-to-appointment rate.",
    },
  },
];

export default function HighLevelOffers() {
  const scrollToContact = (interest) => {
    scrollToServicesContact(interest, `high-level:${interest}`);
  };

  return (
    <section
      id="high-level"
      className="scroll-mt-32 border-t border-black/[0.05] bg-[#f5f6f8] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
        <div className="max-w-2xl">
          <h2 className="font-sans text-[clamp(1.75rem,3vw,2.25rem)] font-extrabold tracking-[-0.03em] text-[#0f0f0f] sm:text-4xl">
            Conversion intelligence
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-[#5c5c5c] lg:text-lg">
            For brands ready to work at the strategic layer: psychology, site
            infrastructure, and accountable spend in one workstream.
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
                className="group flex flex-col rounded-[var(--radius-card)] border border-black/[0.08] bg-white p-8 transition-[border-color] duration-300 hover:border-black/[0.16]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md border border-black/[0.08]">
                    <Icon className="h-4 w-4 text-[var(--c-ink)]" strokeWidth={1.75} />
                  </div>
                  <p className="text-sm font-semibold text-[#3B6FF0]">
                    {offer.price}
                  </p>
                </div>
                <h3 className="mt-5 text-xl font-bold text-[#0f0f0f]">
                  {offer.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5c5c5c]">
                  {offer.tagline}
                </p>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {offer.pitch.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[#5c5c5c]"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#3B6FF0]" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl border border-black/[0.06] bg-[#fafafa] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#737373]">
                    Example: {offer.example.client}
                  </p>
                  <p className="mt-2 text-sm text-[#5c5c5c]">
                    {offer.example.problem}
                  </p>
                  <p className="mt-2 text-sm font-medium text-[#0f0f0f]">
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

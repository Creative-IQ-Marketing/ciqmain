import { motion } from "framer-motion";
import { ArrowRight, Clock, Infinity, Layers } from "lucide-react";
import { scrollToServicesContact } from "../../utils/formInterest";

const PACKAGES = [
  {
    name: "Strategy Sessions",
    interest: "consulting-699",
    price: "$699",
    period: "per year",
    detail: "6 one-hour strategy sessions",
    description:
      "Planning, content ideas, execution strategies, and ongoing guidance.",
    icon: Clock,
  },
  {
    name: "Implementation Support",
    interest: "consulting-999",
    price: "$999",
    period: "per year",
    featured: true,
    detail: "12 one-hour strategy sessions",
    description:
      "More hands-on planning, accountability, and implementation support.",
    icon: Layers,
  },
  {
    name: "Unlimited Access",
    interest: "consulting-unlimited",
    price: "$499",
    period: "per month",
    detail: "Ongoing strategic access",
    description:
      "For teams that need consistent strategic guidance without session limits.",
    icon: Infinity,
  },
];

export default function ConsultingSection() {
  const scrollToContact = (interest) => {
    scrollToServicesContact(interest, `consulting-package:${interest}`);
  };

  return (
    <section id="consulting" className="scroll-mt-32 border-t border-black/[0.05] bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#3B6FF0]">
            Consulting
          </p>
          <h2 className="mt-3 font-sans text-[clamp(1.75rem,3vw,2.25rem)] font-extrabold tracking-[-0.03em] text-[#0f0f0f] sm:text-4xl">
            Strategy sessions that move the needle
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-[#5c5c5c] lg:text-lg">
            For consulting and strategy sessions, our standard rate is{" "}
            <span className="font-semibold text-[#0f0f0f]">$199 per hour</span>.
            We also offer consulting packages for teams that want structured,
            ongoing guidance.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PACKAGES.map((pkg, i) => {
            const Icon = pkg.icon;
            return (
              <motion.article
                key={pkg.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`flex flex-col rounded-[22px] border p-7 ${
                  pkg.featured
                    ? "border-[#3B6FF0] bg-white shadow-[0_20px_48px_-20px_rgba(59,111,240,0.2)]"
                    : "border-black/[0.06] bg-white"
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3B6FF0]/10">
                  <Icon className="h-5 w-5 text-[#3B6FF0]" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#0f0f0f]">
                  {pkg.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#3B6FF0]">
                  {pkg.detail}
                </p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[#0f0f0f]">
                    {pkg.price}
                  </span>
                  <span className="text-sm text-[#737373]">{pkg.period}</span>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-[#5c5c5c]">
                  {pkg.description}
                </p>
                <button
                  type="button"
                  onClick={() => scrollToContact(pkg.interest)}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#3B6FF0] transition hover:text-[#2f5ad4]"
                >
                  Book a session <ArrowRight className="h-4 w-4" />
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

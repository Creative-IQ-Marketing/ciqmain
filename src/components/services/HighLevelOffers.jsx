import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { scrollToServicesContact } from "../../utils/formInterest";
import { Button } from "../ui/button";
import { IconScan } from "../../assets/icons/ServiceIcons";
import DesktopOnlyImage from "../ui/DesktopOnlyImage";
import imgSeo from "../../assets/generated/services-seo-structure.webp";
import imgCrm from "../../assets/generated/services-crm-pipeline.webp";

const OFFERS = [
  {
    name: "Conversion Intelligence Audit",
    interest: "audit",
    price: "$2K - $7K",
    tagline:
      "Find why traffic stalls before booking, then leave with a 30-day fix blueprint.",
    pitch: [
      "Website behavior breakdown",
      "Heatmap analysis",
      "Messaging psychology review",
      "Funnel leak identification",
      "Competitor positioning gaps",
    ],
    example: {
      client: "Med spa",
      result:
        "Reframed service messaging into a measurable conversion lift in 30 days.",
    },
    dark: false,
  },
  {
    name: "Conversion Optimization Retainer",
    interest: "retainer",
    price: "$3K - $15K/mo",
    tagline:
      "Turn existing traffic into paying clients through continuous testing and funnel discipline.",
    pitch: [
      "Monthly landing page A/B tests",
      "Messaging rewrites with psychology triggers",
      "Booking funnel optimization",
      "CRM workflow improvements",
      "Behavior data analysis + strategy adjustments",
    ],
    example: {
      client: "Roofing",
      result:
        "Instant SMS and urgency emails doubled lead-to-appointment rate.",
    },
    dark: true,
  },
];

export default function HighLevelOffers() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="high-level"
      className="scroll-mt-32 border-t border-[var(--c-border)] bg-[var(--c-surface-2)] py-[var(--section-pad)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)]">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-10">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--c-accent)]">
              <IconScan className="size-3.5" />
              Conversion layer
            </p>
            <h2 className="font-sans text-[clamp(1.85rem,3.5vw,2.85rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-[var(--c-ink)] text-balance">
              Conversion{" "}
              <span className="text-[var(--c-accent)]">intelligence</span>
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-[var(--c-text-secondary)] lg:text-lg">
              For brands ready to work at the strategic layer: psychology, site
              infrastructure, and accountable spend.
            </p>
          </div>
          <div className="hidden grid-cols-2 gap-3 lg:grid">
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--c-border)]">
              <DesktopOnlyImage
                src={imgSeo}
                width={550}
                height={688}
                imgClassName="aspect-[4/5] w-full object-cover"
                sizes="(min-width: 1024px) 20vw, 1px"
              />
            </div>
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--c-border)]">
              <DesktopOnlyImage
                src={imgCrm}
                width={550}
                height={688}
                imgClassName="aspect-[4/5] w-full object-cover"
                sizes="(min-width: 1024px) 20vw, 1px"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {OFFERS.map((offer, i) => (
            <motion.article
              key={offer.name}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.45,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`flex flex-col rounded-[var(--radius-card)] p-5 sm:p-7 lg:p-8 ${
                offer.dark
                  ? "bg-[var(--c-ink)] text-white"
                  : "bg-white text-[var(--c-ink)]"
              }`}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <h3
                  className={`font-sans text-xl font-bold tracking-[-0.03em] sm:max-w-[16ch] sm:text-2xl ${
                    offer.dark ? "text-white" : "text-[var(--c-ink)]"
                  }`}
                >
                  {offer.name}
                </h3>
                <p className="shrink-0 font-sans text-sm font-semibold tabular-nums text-[var(--c-accent)]">
                  {offer.price}
                </p>
              </div>
              <p
                className={`mt-3 max-w-[42ch] font-sans text-sm leading-relaxed ${
                  offer.dark ? "text-white/70" : "text-[var(--c-text-secondary)]"
                }`}
              >
                {offer.tagline}
              </p>

              <ul className="mt-6 flex-1 space-y-2.5">
                {offer.pitch.map((item) => (
                  <li
                    key={item}
                    className={`flex items-start gap-2.5 font-sans text-sm ${
                      offer.dark
                        ? "text-white/75"
                        : "text-[var(--c-text-secondary)]"
                    }`}
                  >
                    <Check
                      className="mt-0.5 size-3.5 shrink-0 text-[var(--c-accent)]"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div
                className={`mt-6 rounded-[var(--radius-control)] border p-4 ${
                  offer.dark
                    ? "border-white/12 bg-[#161616]"
                    : "border-[var(--c-border)] bg-[var(--c-surface-2)]"
                }`}
              >
                <p
                  className={`font-sans text-[11px] font-semibold uppercase tracking-[0.14em] ${
                    offer.dark ? "text-white/45" : "text-[var(--c-text-muted)]"
                  }`}
                >
                  Example · {offer.example.client}
                </p>
                <p
                  className={`mt-2 font-sans text-sm leading-relaxed ${
                    offer.dark ? "text-white" : "text-[var(--c-ink)]"
                  }`}
                >
                  {offer.example.result}
                </p>
              </div>

              <Button
                variant={offer.dark ? "accent" : "secondary"}
                className="mt-6 self-start"
                onClick={() =>
                  scrollToServicesContact(
                    offer.interest,
                    `high-level:${offer.interest}`,
                  )
                }
              >
                Inquire <ArrowRight className="size-4" aria-hidden />
              </Button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

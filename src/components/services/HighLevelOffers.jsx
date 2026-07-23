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
    name: "Brand Identity",
    interest: "brand-identity",
    price: "$550",
    priceNote: "one-time",
    tagline:
      "A professional logo and brand kit that builds recognition and credibility.",
    pitch: [
      "Custom logo design",
      "Brand discovery + creative direction",
      "Multiple initial concepts",
      "Professional revisions",
      "High-res + social-ready + vector files",
      "Web & print deliverables",
    ],
    dark: false,
  },
  {
    name: "Paid Advertising",
    interest: "paid-ads",
    price: "From $599",
    priceNote: "setup · then $299/mo management",
    tagline:
      "Campaign setup, targeting, creative optimization, and ongoing performance management.",
    pitch: [
      "Campaign setup & optimization",
      "Audience targeting & strategy",
      "Ad creative optimization",
      "Conversion tracking",
      "Ongoing monitoring & adjustments",
      "Ad spend billed separately",
    ],
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
              Branding · Ads
            </p>
            <h2 className="font-sans text-[clamp(1.85rem,3.5vw,2.85rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-[var(--c-ink)] text-balance">
              Identity &{" "}
              <span className="text-[var(--c-accent)]">paid growth</span>
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-[var(--c-text-secondary)] lg:text-lg">
              Stand out with a clear brand system, then accelerate with
              conversion-focused ads.
            </p>
          </div>
          <div className="hidden grid-cols-2 gap-3 lg:grid">
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--c-border)]">
              <DesktopOnlyImage
                src={imgSeo}
                width={900}
                height={600}
                imgClassName="aspect-[3/2] w-full object-cover"
                sizes="(min-width: 1024px) 18vw, 1px"
              />
            </div>
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--c-border)]">
              <DesktopOnlyImage
                src={imgCrm}
                width={900}
                height={600}
                imgClassName="aspect-[3/2] w-full object-cover"
                sizes="(min-width: 1024px) 18vw, 1px"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {OFFERS.map((offer, i) => (
            <motion.article
              key={offer.name}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.45,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`flex flex-col overflow-hidden rounded-[var(--radius-card)] ${
                offer.dark
                  ? "bg-[var(--c-ink)] text-white"
                  : "border border-[var(--c-border)] bg-white"
              }`}
            >
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <h3
                  className={`font-sans text-xl font-bold tracking-[-0.02em] ${
                    offer.dark ? "text-white" : "text-[var(--c-ink)]"
                  }`}
                >
                  {offer.name}
                </h3>
                <div className="mt-4 flex flex-wrap items-baseline gap-2">
                  <span
                    className={`font-sans text-3xl font-extrabold tracking-[-0.03em] tabular-nums ${
                      offer.dark ? "text-white" : "text-[var(--c-ink)]"
                    }`}
                  >
                    {offer.price}
                  </span>
                  {offer.priceNote ? (
                    <span
                      className={`font-sans text-xs ${
                        offer.dark ? "text-white/55" : "text-[var(--c-text-muted)]"
                      }`}
                    >
                      {offer.priceNote}
                    </span>
                  ) : null}
                </div>
                <p
                  className={`mt-3 font-sans text-sm leading-relaxed ${
                    offer.dark ? "text-white/70" : "text-[var(--c-text-secondary)]"
                  }`}
                >
                  {offer.tagline}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {offer.pitch.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-[var(--c-accent)]"
                        strokeWidth={2.25}
                        aria-hidden
                      />
                      <span
                        className={`font-sans text-sm ${
                          offer.dark
                            ? "text-white/75"
                            : "text-[var(--c-text-secondary)]"
                        }`}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button
                    variant={offer.dark ? "accent" : "secondary"}
                    onClick={() =>
                      scrollToServicesContact(
                        offer.interest,
                        `offer:${offer.interest}`,
                      )
                    }
                  >
                    Get started <ArrowRight className="size-4" aria-hidden />
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

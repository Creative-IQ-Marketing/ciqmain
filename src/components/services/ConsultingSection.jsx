import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { scrollToServicesContact } from "../../utils/formInterest";
import { IconConsulting } from "../../assets/icons/ServiceIcons";
import DesktopOnlyImage from "../ui/DesktopOnlyImage";
import imgConsulting from "../../assets/generated/services-consulting.webp";

const PACKAGES = [
  {
    index: "01",
    name: "Strategy Sessions",
    interest: "consulting-699",
    price: "$699",
    period: "/year",
    detail: "6 one-hour sessions",
    description:
      "A sounding board for planning, content, and execution without a full retainer.",
  },
  {
    index: "02",
    name: "Implementation Support",
    interest: "consulting-999",
    price: "$999",
    period: "/year",
    featured: true,
    detail: "12 one-hour sessions",
    description:
      "Denser accountability and hands-on guidance across the year.",
  },
  {
    index: "03",
    name: "Unlimited Access",
    interest: "consulting-unlimited",
    price: "$499",
    period: "/mo",
    detail: "Ongoing strategic access",
    description: "Recurring access without rationing session credits.",
  },
];

export default function ConsultingSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="consulting"
      className="scroll-mt-32 border-t border-[var(--c-border)] bg-white py-[var(--section-pad)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)]">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--c-accent)]">
              <IconConsulting className="size-3.5" />
              Consulting
            </p>
            <h2 className="font-sans text-[clamp(1.85rem,3.5vw,2.85rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-[var(--c-ink)] text-balance">
              Strategy sessions that{" "}
              <span className="text-[var(--c-accent)]">move the needle</span>
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-[var(--c-text-secondary)] lg:text-lg">
              Packages below are for teams that want structured, ongoing
              guidance. Or book by the hour.
            </p>

            <div className="mt-6 hidden overflow-hidden rounded-[var(--radius-card)] border border-[var(--c-border)] lg:block">
              <DesktopOnlyImage
                src={imgConsulting}
                width={1100}
                height={733}
                imgClassName="aspect-[16/10] w-full object-cover"
                sizes="(min-width: 1024px) 36vw, 1px"
              />
            </div>

            <div className="mt-6 inline-flex flex-col rounded-[var(--radius-card)] border border-[var(--c-border)] bg-[var(--c-surface-2)] px-5 py-4">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--c-text-muted)]">
                Hourly baseline
              </p>
              <p className="mt-2 font-sans text-3xl font-extrabold tracking-[-0.04em] tabular-nums text-[var(--c-ink)]">
                $199
                <span className="ml-1 text-base font-semibold text-[var(--c-text-muted)]">
                  /hr
                </span>
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--c-border)]">
            {PACKAGES.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`flex flex-col gap-4 border-b border-[var(--c-border)] p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-6 ${
                  pkg.featured
                    ? "bg-[var(--c-accent-dim)]/50"
                    : "bg-white"
                }`}
              >
                <div className="min-w-0 flex gap-4">
                  <span className="mt-0.5 font-sans text-xs font-bold tabular-nums text-[var(--c-accent)]">
                    {pkg.index}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-sans text-base font-bold tracking-[-0.02em] text-[var(--c-ink)]">
                        {pkg.name}
                      </h3>
                      {pkg.featured ? (
                        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--c-accent)]">
                          Most chosen
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 font-sans text-sm font-medium text-[var(--c-accent)]">
                      {pkg.detail}
                    </p>
                    <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-[var(--c-text-secondary)]">
                      {pkg.description}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-4 sm:flex-col sm:items-end sm:gap-3">
                  <p className="font-sans text-2xl font-extrabold tracking-[-0.03em] tabular-nums text-[var(--c-ink)]">
                    {pkg.price}
                    <span className="ml-1 text-sm font-medium text-[var(--c-text-muted)]">
                      {pkg.period}
                    </span>
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      scrollToServicesContact(
                        pkg.interest,
                        `consulting-package:${pkg.interest}`,
                      )
                    }
                    className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[var(--c-ink)] transition-colors hover:text-[var(--c-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] focus-visible:ring-offset-2"
                  >
                    Book a session
                    <ArrowRight className="size-4" aria-hidden />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

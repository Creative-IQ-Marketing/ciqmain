import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { scrollToServicesContact } from "../../utils/formInterest";
import { Button } from "../ui/button";
import { IconCrm } from "../../assets/icons/ServiceIcons";

const PACKAGES = [
  {
    id: "starter",
    step: "01",
    name: "DIY CRM Starter",
    interest: "crm-starter",
    subtitle: "Lead capture + communication",
    monthly: "$97",
    summary: "You get the tools. You run the playbook.",
    pillars: [
      { label: "Capture", detail: "Forms, contacts, basic pipeline" },
      { label: "Respond", detail: "Missed-call text-back, SMS, email" },
      { label: "Book", detail: "Calendar + 1 funnel page" },
    ],
    features: [
      "Lead capture forms",
      "Contact database",
      "Basic pipeline tracking",
      "Missed call text-back",
      "Call tracking + recording",
      "Manual SMS + email messaging",
      "Basic website chat widget",
      "1 funnel / landing page builder",
      "Calendar integration",
      "Basic payment collection",
      "Manual document sending",
    ],
  },
  {
    id: "pro",
    step: "02",
    name: "CRM Pro",
    interest: "crm-pro",
    subtitle: "Automation + reputation",
    monthly: "$397",
    featured: true,
    summary: "The system starts working while you sleep.",
    pillars: [
      { label: "Automate", detail: "Instant response + workflows" },
      { label: "Convert", detail: "Funnels, deals, tracking" },
      { label: "Trust", detail: "Reviews + ads managers" },
    ],
    features: [
      "Everything in Starter",
      "Basic workflow automation",
      "1 email/SMS campaign per month",
      "Lead tagging + smart lists",
      "Opportunity / deal tracking",
      "Funnel + landing page builds",
      "Conversion tracking",
      "Social / Google / Meta ads managers",
      "GBP review requests + monitoring",
      "Quarterly SEO audit + basic reports",
      "Payment links + e-sign documents",
    ],
  },
  {
    id: "elite",
    step: "03",
    name: "CRM Elite",
    interest: "crm-elite",
    subtitle: "Full automation + AI",
    monthly: "$497",
    summary: "A revenue engine — not a contact list.",
    pillars: [
      { label: "AI", detail: "Agents + chat that qualify leads" },
      { label: "Nurture", detail: "Drips, re-engagement, portals" },
      { label: "Scale", detail: "Attribution + subscriptions" },
    ],
    features: [
      "Everything in Pro",
      "AI agents (response + qualification)",
      "AI chat widget",
      "Multi-step workflows + drip campaigns",
      "Automated SMS + email follow-ups",
      "Pipeline automation",
      "Multi-funnel buildouts",
      "Re-engagement campaigns",
      "Membership client portal",
      "Advanced ads tracking + retargeting",
      "Automated review generation",
      "Ongoing SEO audits + advanced reports",
      "Automated payments + subscriptions",
    ],
  },
];

export default function CrmPackages() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState("pro");
  const active = PACKAGES.find((p) => p.id === activeId) ?? PACKAGES[1];

  return (
    <section
      id="crm-solutions"
      className="scroll-mt-32 border-t border-[var(--c-border)] bg-white py-[var(--section-pad)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--c-accent)]">
              <IconCrm className="size-3.5" />
              CRM growth systems
            </p>
            <h2 className="font-sans text-[clamp(1.85rem,3.5vw,2.85rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-[var(--c-ink)] text-balance">
              Pick the operating layer{" "}
              <span className="text-[var(--c-accent)]">you need</span>
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-[var(--c-text-secondary)] lg:text-lg">
              Three steps from DIY tools to an AI revenue engine. Not sure what
              a CRM actually does?
            </p>
          </div>
          <Link
            to="/services/what-is-crm"
            className="inline-flex shrink-0 items-center gap-2 self-start border-b border-[var(--c-accent)] pb-1 font-sans text-sm font-semibold text-[var(--c-accent)] transition hover:text-[#2f5fd9] lg:self-end"
          >
            What is CRM?
            <ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden />
          </Link>
        </div>

        {/* Desktop: rail + detail — light rail so selection state is obvious */}
        <div className="mt-12 hidden lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)] lg:gap-0 lg:overflow-hidden lg:rounded-[var(--radius-card)] lg:border lg:border-[var(--c-border)]">
          <div
            className="flex flex-col border-r border-[var(--c-border)] bg-[var(--c-surface-2)]"
            role="tablist"
            aria-label="CRM packages"
          >
            {PACKAGES.map((pkg) => {
              const selected = pkg.id === activeId;
              return (
                <button
                  key={pkg.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveId(pkg.id)}
                  className={`relative flex flex-1 flex-col items-start border-b border-[var(--c-border)] cursor-pointer px-7 py-7 text-left transition last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--c-accent)] ${
                    selected
                      ? "bg-[var(--c-ink)] text-white shadow-[inset_0_0_0_1px_rgba(59,111,240,0.35)]"
                      : "bg-transparent text-[var(--c-ink)] hover:bg-white"
                  }`}
                >
                  {selected ? (
                    <span
                      className="absolute inset-y-3 left-0 w-[3px] rounded-r-full bg-[var(--c-accent)]"
                      aria-hidden
                    />
                  ) : null}

                  <div className="flex w-full items-baseline justify-between gap-4">
                    <span
                      className={`font-sans text-[11px] font-bold tabular-nums ${
                        selected
                          ? "text-[var(--c-accent)]"
                          : "text-[var(--c-text-muted)]"
                      }`}
                    >
                      {pkg.step}
                    </span>
                    {selected ? (
                      <span className="rounded-[var(--radius-pill)] bg-[var(--c-accent)] px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                        Viewing
                      </span>
                    ) : pkg.featured ? (
                      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--c-accent)]">
                        Most chosen
                      </span>
                    ) : (
                      <span className="font-sans text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--c-text-muted)]">
                        View
                      </span>
                    )}
                  </div>

                  <span
                    className={`mt-3 font-sans text-xl font-bold tracking-[-0.02em] ${
                      selected ? "text-white" : "text-[var(--c-ink)]"
                    }`}
                  >
                    {pkg.name}
                  </span>
                  <span
                    className={`mt-1 font-sans text-sm ${
                      selected ? "text-white/60" : "text-[var(--c-text-muted)]"
                    }`}
                  >
                    {pkg.subtitle}
                  </span>
                  <span
                    className={`mt-5 font-sans text-3xl font-extrabold tracking-[-0.04em] tabular-nums ${
                      selected ? "text-white" : "text-[var(--c-ink)]"
                    }`}
                  >
                    {pkg.monthly}
                    <span
                      className={`ml-1 text-sm font-medium ${
                        selected
                          ? "text-white/45"
                          : "text-[var(--c-text-muted)]"
                      }`}
                    >
                      /mo
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduceMotion ? false : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col bg-[var(--c-surface-2)] p-8 xl:p-10"
            >
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--c-accent)]">
                {active.subtitle}
              </p>
              <h3 className="mt-2 font-sans text-2xl font-extrabold tracking-[-0.03em] text-[var(--c-ink)] xl:text-3xl">
                {active.name}
              </h3>
              <p className="mt-3 max-w-lg font-sans text-base leading-relaxed text-[var(--c-text-secondary)]">
                {active.summary}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {active.pillars.map((p) => (
                  <div
                    key={p.label}
                    className="border border-[var(--c-border)] bg-white px-4 py-4"
                  >
                    <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--c-accent)]">
                      {p.label}
                    </p>
                    <p className="mt-1.5 font-sans text-sm leading-snug text-[var(--c-ink)]">
                      {p.detail}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-8 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--c-text-muted)]">
                Full inclusions
              </p>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {active.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 font-sans text-sm leading-snug text-[var(--c-text-secondary)]"
                  >
                    <Check
                      className="mt-0.5 size-3.5 shrink-0 text-[var(--c-accent)]"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button
                  variant="accent"
                  onClick={() =>
                    scrollToServicesContact(
                      active.interest,
                      `crm:${active.interest}`,
                    )
                  }
                >
                  Get started with {active.name.replace(/^DIY\s/, "")}
                  <ArrowRight className="size-4" aria-hidden />
                </Button>
                <Link
                  to="/services/what-is-crm"
                  className="font-sans text-sm font-semibold text-[var(--c-ink)] underline-offset-4 hover:underline"
                >
                  Why this beats separate tools
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile: clear open/closed accordion */}
        <div className="mt-10 space-y-2.5 lg:hidden" role="list">
          {PACKAGES.map((pkg) => {
            const open = pkg.id === activeId;
            return (
              <div
                key={pkg.id}
                role="listitem"
                className={`overflow-hidden rounded-[var(--radius-card)] border transition ${
                  open
                    ? "border-[var(--c-ink)] bg-white shadow-[var(--shadow-soft)]"
                    : "border-[var(--c-border)] bg-[var(--c-surface-2)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveId(pkg.id)}
                  className={`flex w-full items-start gap-3 px-4 py-4 text-left sm:px-5 ${
                    open ? "bg-[var(--c-ink)] text-white" : ""
                  }`}
                  aria-expanded={open}
                >
                  <span
                    className={`mt-0.5 font-sans text-[11px] font-bold tabular-nums ${
                      open
                        ? "text-[var(--c-accent)]"
                        : "text-[var(--c-text-muted)]"
                    }`}
                  >
                    {pkg.step}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span
                        className={`font-sans text-base font-bold tracking-[-0.02em] sm:text-lg ${
                          open ? "text-white" : "text-[var(--c-ink)]"
                        }`}
                      >
                        {pkg.name}
                      </span>
                      {open ? (
                        <span className="rounded-[var(--radius-pill)] bg-[var(--c-accent)] px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                          Viewing
                        </span>
                      ) : pkg.featured ? (
                        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--c-accent)]">
                          Most chosen
                        </span>
                      ) : null}
                    </span>
                    <span
                      className={`mt-1 block font-sans text-sm ${
                        open ? "text-white/60" : "text-[var(--c-text-muted)]"
                      }`}
                    >
                      {pkg.subtitle}
                    </span>
                  </span>
                  <span className="flex shrink-0 flex-col items-end gap-2">
                    <span
                      className={`font-sans text-lg font-extrabold tabular-nums sm:text-xl ${
                        open ? "text-white" : "text-[var(--c-ink)]"
                      }`}
                    >
                      {pkg.monthly}
                      <span
                        className={`text-xs font-medium ${
                          open ? "text-white/50" : "text-[var(--c-text-muted)]"
                        }`}
                      >
                        /mo
                      </span>
                    </span>
                    <ChevronDown
                      className={`size-4 transition-transform duration-200 ${
                        open
                          ? "rotate-180 text-white/70"
                          : "text-[var(--c-text-muted)]"
                      }`}
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={
                        reduceMotion ? undefined : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-[var(--c-border)] bg-white px-4 py-5 sm:px-5">
                        <p className="font-sans text-sm leading-relaxed text-[var(--c-text-secondary)]">
                          {pkg.summary}
                        </p>

                        <div className="mt-4 grid grid-cols-3 gap-2">
                          {pkg.pillars.map((p) => (
                            <div
                              key={p.label}
                              className="bg-[var(--c-surface-2)] px-2.5 py-3"
                            >
                              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--c-accent)]">
                                {p.label}
                              </p>
                              <p className="mt-1 font-sans text-[11px] leading-snug text-[var(--c-ink)]">
                                {p.detail}
                              </p>
                            </div>
                          ))}
                        </div>

                        <p className="mt-5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--c-text-muted)]">
                          Includes
                        </p>
                        <ul className="mt-2.5 space-y-2">
                          {pkg.features.map((f) => (
                            <li
                              key={f}
                              className="flex items-start gap-2 font-sans text-sm leading-snug text-[var(--c-text-secondary)]"
                            >
                              <Check
                                className="mt-0.5 size-3.5 shrink-0 text-[var(--c-accent)]"
                                strokeWidth={2.5}
                                aria-hidden
                              />
                              {f}
                            </li>
                          ))}
                        </ul>

                        <Button
                          className="mt-5 w-full"
                          variant="accent"
                          onClick={() =>
                            scrollToServicesContact(
                              pkg.interest,
                              `crm:${pkg.interest}`,
                            )
                          }
                        >
                          Get started
                          <ArrowRight className="size-4" aria-hidden />
                        </Button>
                        <Link
                          to="/services/what-is-crm"
                          className="mt-3 flex items-center justify-center gap-1.5 font-sans text-sm font-semibold text-[var(--c-accent)]"
                        >
                          What is CRM?
                          <ArrowUpRight
                            className="size-3.5"
                            strokeWidth={1.75}
                            aria-hidden
                          />
                        </Link>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

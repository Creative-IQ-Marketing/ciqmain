import { useMemo, useState, Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import PlanRail from "./PlanRail";

const TIERS = [
  { id: 0, name: "Essential", full: "Essential Visibility", monthly: "$999/mo" },
  {
    id: 1,
    name: "Growth",
    full: "Growth Operations",
    monthly: "$2,222/mo",
    popular: true,
  },
  { id: 2, name: "Elite", full: "Elite Automation", monthly: "$3,888/mo" },
];

const ROWS = [
  {
    group: "Website & SEO",
    label: "SEO-Coded Website (1 Page)",
    values: [true, true, true],
  },
  {
    group: "Website & SEO",
    label: "One-Time Website Cost",
    values: ["$699", "$699", "$699"],
  },
  {
    group: "Website & SEO",
    label: "Website Maintenance",
    values: ["$199/mo", "$199/mo", "$199/mo"],
  },
  {
    group: "Website & SEO",
    label: "HR SEO PRO PLAN",
    values: ["$599/mo", "$599/mo", "$599/mo"],
  },
  {
    group: "CRM & Automation",
    label: "CORE HR CRM System",
    values: [false, "$299/mo", true],
  },
  {
    group: "CRM & Automation",
    label: "AI Chat Widget",
    values: [false, false, "Premium"],
  },
  {
    group: "CRM & Automation",
    label: "AI HR Automation Suite",
    values: [false, false, "Premium"],
  },
  {
    group: "CRM & Automation",
    label: "Email Marketing Automation",
    values: [false, false, "Premium"],
  },
  {
    group: "Hiring Workflows",
    label: "Applicant Tracking & Pipelines (ATS)",
    values: [false, true, true],
  },
  {
    group: "Hiring Workflows",
    label: "Interview Scheduling + Reminders",
    values: [false, true, true],
  },
  {
    group: "Hiring Workflows",
    label: "Onboarding Automations",
    values: [false, true, true],
  },
  {
    group: "Hiring Workflows",
    label: "Digital Forms + Document Collection",
    values: [false, true, true],
  },
  {
    group: "Hiring Workflows",
    label: "Team Logins & Permissions",
    values: [false, true, true],
  },
  {
    group: "Social Media",
    label: "Posts / Month",
    values: ["8 posts", "12 posts", "24 posts"],
  },
  { group: "Social Media", label: "Platforms", values: ["2", "3", "4"] },
  {
    group: "Social Media",
    label: "Stories / Week",
    values: ["-", "1/wk", "2/wk"],
  },
  {
    group: "Social Media",
    label: "Carousels / Week",
    values: ["1/wk", "1/wk", "2/wk"],
  },
  {
    group: "Social Media",
    label: "Reels / Week",
    values: ["1/wk", "1/wk", "2/wk"],
  },
  {
    group: "Social Media",
    label: "Cross-Platform Optimization",
    values: [true, true, true],
  },
  {
    group: "Social Media",
    label: "Monthly Analytics Insights",
    values: ["Basic", "Standard", "Advanced"],
  },
  {
    group: "Social Media",
    label: "Social Media SEO",
    values: [false, true, "Premium"],
  },
  {
    group: "Social Media",
    label: "Automated DM Sequences",
    values: [false, false, true],
  },
  {
    group: "Social Media",
    label: "Hashtag Rotation + Story Highlights",
    values: [false, false, true],
  },
];

function CellValue({ value }) {
  if (value === true) {
    return (
      <Check
        className="mx-auto size-5 text-[var(--c-accent)]"
        strokeWidth={2.5}
        aria-label="Included"
      />
    );
  }
  if (value === false) {
    return (
      <span className="font-sans text-sm text-[var(--c-border-strong)]" aria-label="Not included">
        -
      </span>
    );
  }
  if (value === "Premium") {
    return (
      <span className="inline-block rounded-[var(--radius-pill)] bg-[var(--c-accent-dim)] px-2.5 py-1 font-sans text-xs font-semibold text-[var(--c-accent)]">
        Premium
      </span>
    );
  }
  return (
    <span className="font-sans text-sm font-medium tabular-nums text-[var(--c-ink)]">
      {value}
    </span>
  );
}

function MobileValue({ value }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-[var(--c-ink)]">
        <Check className="size-4 text-[var(--c-accent)]" strokeWidth={2.5} />
        Included
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="font-sans text-sm text-[var(--c-text-muted)]">-</span>
    );
  }
  return (
    <span className="font-sans text-sm font-medium tabular-nums text-[var(--c-ink)]">
      {value}
    </span>
  );
}

export default function BundleTable() {
  const reduceMotion = useReducedMotion();
  const [tierId, setTierId] = useState(1);
  const groups = useMemo(() => [...new Set(ROWS.map((r) => r.group))], []);
  const tier = TIERS[tierId];

  return (
    <section
      id="comparison-table"
      className="scroll-mt-32 border-t border-[var(--c-border)] bg-[var(--c-surface-2)] py-[var(--section-pad)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)]">
        <div className="max-w-2xl">
          <h2 className="font-sans text-[clamp(1.85rem,3.5vw,2.85rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-[var(--c-ink)] text-balance">
            Compare{" "}
            <span className="text-[var(--c-accent)]">inclusions</span>
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-[var(--c-text-secondary)] lg:text-lg">
            Pick a plan and scan what ships with it. No side-scrolling
            spreadsheets on your phone.
          </p>
        </div>

        <div className="mt-10 lg:hidden">
          <PlanRail
            ariaLabel="Compare growth systems"
            value={String(tierId)}
            onChange={(id) => setTierId(Number(id))}
            options={TIERS.map((t) => ({
              id: String(t.id),
              label: t.name,
              meta: t.monthly,
            }))}
          />

          <motion.div
            key={tier.id}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 overflow-hidden rounded-[var(--radius-card)] border border-[var(--c-border)] bg-white"
          >
            <div className="bg-[var(--c-ink)] px-5 py-5 text-white">
              <p className="font-sans text-lg font-bold tracking-[-0.02em]">
                {tier.full}
              </p>
              <p className="mt-1 font-sans text-sm tabular-nums text-white/65">
                {tier.monthly} · $699 setup
              </p>
            </div>

            <div className="px-5">
              <Accordion
                type="multiple"
                defaultValue={[groups[0]]}
                className="w-full"
              >
                {groups.map((group) => {
                  const groupRows = ROWS.filter((r) => r.group === group);
                  return (
                    <AccordionItem key={group} value={group}>
                      <AccordionTrigger>{group}</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-4">
                          {groupRows.map((row) => (
                            <li
                              key={row.label}
                              className="flex items-start justify-between gap-4"
                            >
                              <span className="font-sans text-sm text-[var(--c-text-secondary)]">
                                {row.label}
                              </span>
                              <span className="shrink-0 text-right">
                                <MobileValue value={row.values[tierId]} />
                              </span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 hidden overflow-hidden rounded-[var(--radius-card)] border border-[var(--c-border)] bg-white shadow-[var(--shadow-soft)] lg:block">
          <div className="max-h-[70vh] overflow-auto">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 z-10">
                <tr className="border-b border-[var(--c-border)]">
                  <th className="w-[28%] bg-[var(--c-surface-2)] px-6 py-5 text-left font-sans text-sm font-semibold text-[var(--c-text-muted)]">
                    Feature
                  </th>
                  {TIERS.map((t) => (
                    <th
                      key={t.id}
                      className={`px-6 py-5 text-center font-sans ${
                        t.popular
                          ? "bg-[var(--c-ink)] text-white"
                          : "bg-[var(--c-surface-2)] text-[var(--c-ink)]"
                      }`}
                    >
                      <span className="block text-base font-bold tracking-[-0.02em]">
                        {t.full}
                      </span>
                      <span
                        className={`mt-1 block text-xs font-medium tabular-nums ${
                          t.popular
                            ? "text-white/65"
                            : "text-[var(--c-text-muted)]"
                        }`}
                      >
                        {t.monthly}
                      </span>
                      {t.popular ? (
                        <span className="mt-2 inline-block rounded-[var(--radius-pill)] bg-[var(--c-accent)]/20 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-[var(--c-accent)]">
                          Most chosen
                        </span>
                      ) : null}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {groups.map((group) => {
                  const groupRows = ROWS.filter((r) => r.group === group);
                  return (
                    <Fragment key={group}>
                      <tr className="bg-[var(--c-surface-2)]/80">
                        <td
                          colSpan={4}
                          className="px-6 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--c-accent)]"
                        >
                          {group}
                        </td>
                      </tr>
                      {groupRows.map((row) => (
                        <tr
                          key={`${row.group}-${row.label}`}
                          className="border-b border-[var(--c-border)] last:border-b-0"
                        >
                          <td className="px-6 py-3.5 text-left font-sans text-sm text-[var(--c-text-secondary)]">
                            {row.label}
                          </td>
                          {row.values.map((val, vi) => (
                            <td
                              key={vi}
                              className={`px-6 py-3.5 text-center ${
                                vi === 1 ? "bg-[var(--c-ink)]/[0.03]" : ""
                              }`}
                            >
                              <CellValue value={val} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

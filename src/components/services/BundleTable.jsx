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
  { id: 0, name: "Launch", full: "CIQ Launch", monthly: "$1,198/mo" },
  {
    id: 1,
    name: "Growth",
    full: "CIQ Growth",
    monthly: "$1,999/mo",
    popular: true,
  },
  { id: 2, name: "Authority", full: "CIQ Authority", monthly: "$2,999/mo" },
  { id: 3, name: "Dominance", full: "CIQ Dominance", monthly: "$4,997+/mo" },
];

const ROWS = [
  {
    group: "Website",
    label: "Coded website pages",
    values: ["1 page", "2–3 pages", "4–6 pages", "7–10+ pages"],
  },
  {
    group: "Website",
    label: "Additional pages",
    values: ["+$999", "+$999", "+$999", "+$999"],
  },
  {
    group: "SEO",
    label: "SEO tier included",
    values: ["SEO Growth", "SEO Growth", "SEO Authority", "SEO Dominance"],
  },
  {
    group: "SEO",
    label: "Indexing + speed + mobile",
    values: [true, true, true, true],
  },
  {
    group: "SEO",
    label: "Core Web Vitals",
    values: [false, true, true, true],
  },
  {
    group: "SEO",
    label: "Schema + AEO / AI search",
    values: [false, false, true, true],
  },
  {
    group: "Social",
    label: "Social package",
    values: ["Starter", "Classic", "Refined", "Elite"],
  },
  {
    group: "Social",
    label: "Posts / month",
    values: ["8", "12–18", "12–18", "27"],
  },
  {
    group: "CRM",
    label: "CRM tier",
    values: ["DIY Starter", "CRM Pro", "CRM Pro", "CRM Dominance"],
  },
  {
    group: "CRM",
    label: "Lead capture + pipeline",
    values: [true, true, true, true],
  },
  {
    group: "CRM",
    label: "Funnels + booking automation",
    values: [false, true, true, true],
  },
  {
    group: "CRM",
    label: "AI chat + review system",
    values: [false, false, true, true],
  },
  {
    group: "CRM",
    label: "AI agents + membership portal",
    values: [false, false, false, true],
  },
  {
    group: "Ads & scale",
    label: "Google + Meta ads management",
    values: [false, false, false, true],
  },
  {
    group: "Ads & scale",
    label: "Retargeting + revenue tracking",
    values: [false, false, false, true],
  },
  {
    group: "Value",
    label: "Individual value",
    values: ["$1,332/mo", "$2,294/mo", "$3,497/mo", "$6,728+/mo"],
  },
  {
    group: "Value",
    label: "You save",
    values: ["$154/mo", "$295/mo", "$498/mo", "$1,731+/mo"],
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
      <span
        className="font-sans text-sm text-[var(--c-border-strong)]"
        aria-label="Not included"
      >
        -
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
            <span className="text-[var(--c-accent)]">systems</span>
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-[var(--c-text-secondary)] lg:text-lg">
            Pick a system and scan what ships with it.
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
                {tier.monthly}
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
                  <th className="w-[22%] bg-[var(--c-surface-2)] px-5 py-5 text-left font-sans text-sm font-semibold text-[var(--c-text-muted)]">
                    Feature
                  </th>
                  {TIERS.map((t) => (
                    <th
                      key={t.id}
                      className={`px-4 py-5 text-center font-sans ${
                        t.popular
                          ? "bg-[var(--c-ink)] text-white"
                          : "bg-[var(--c-surface-2)] text-[var(--c-ink)]"
                      }`}
                    >
                      <span className="block text-sm font-bold tracking-[-0.02em] lg:text-base">
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
                          colSpan={5}
                          className="px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--c-accent)]"
                        >
                          {group}
                        </td>
                      </tr>
                      {groupRows.map((row) => (
                        <tr
                          key={`${row.group}-${row.label}`}
                          className="border-b border-[var(--c-border)] last:border-b-0"
                        >
                          <td className="px-5 py-3.5 text-left font-sans text-sm text-[var(--c-text-secondary)]">
                            {row.label}
                          </td>
                          {row.values.map((val, vi) => (
                            <td
                              key={vi}
                              className={`px-4 py-3.5 text-center ${
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

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";

const TIERS = ["Essential Visibility", "Growth Operations", "Elite Automation"];

const ROWS = [
  // ─── WEBSITE & SEO ──────────────────────────────────────────────
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
    values: ["$199/m", "$199/m", "$199/m"],
  },
  {
    group: "Website & SEO",
    label: "HR SEO PRO PLAN",
    values: ["$599/m", "$599/m", "$599/m"],
  },

  // ─── CRM & AUTOMATION ────────────────────────────────────────────
  {
    group: "CRM & Automation",
    label: "CORE HR CRM System",
    values: [false, "$299/m", true],
  },
  {
    group: "CRM & Automation",
    label: "AI Chat Widget",
    values: [false, false, "★ Premium"],
  },
  {
    group: "CRM & Automation",
    label: "AI HR Automation Suite",
    values: [false, false, "★ Premium"],
  },
  {
    group: "CRM & Automation",
    label: "Email Marketing Automation",
    values: [false, false, "★ Premium"],
  },

  // ─── HIRING WORKFLOWS ────────────────────────────────────────────
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

  // ─── SOCIAL MEDIA ────────────────────────────────────────────────
  {
    group: "Social Media",
    label: "Posts / Month",
    values: ["8 posts", "12 posts", "24 posts"],
  },
  { group: "Social Media", label: "Platforms", values: ["2", "3", "4"] },
  {
    group: "Social Media",
    label: "Stories / Week",
    values: ["—", "1/wk", "2/wk"],
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
    values: ["Basic", "Standard", "Advanced + Dashboard"],
  },
  {
    group: "Social Media",
    label: "Social Media SEO",
    values: [false, true, "★ Premium"],
  },
  {
    group: "Social Media",
    label: "Automated DM Sequences",
    values: [false, false, true],
  },
  {
    group: "Social Media",
    label: "Hashtag Rotation + Story Highlights",
    values: [false, false, false, true],
  },
];

const TIER_COLORS = ["text-slate-700", "text-blue-700", "text-blue-600"];

const TIER_BG = ["bg-white", "bg-blue-50", "bg-blue-700"];

const TIER_TEXT = ["text-slate-900", "text-blue-900", "text-white"];

function CellValue({ value, isElite }) {
  const trueColor = isElite ? "text-blue-600" : "text-blue-600";
  const falseColor = isElite ? "text-slate-300" : "text-slate-300";

  if (value === true)
    return (
      <Check className={`w-5 h-5 ${trueColor} mx-auto`} strokeWidth={2.5} />
    );
  if (value === false)
    return <Minus className={`w-4 h-4 ${falseColor} mx-auto`} />;
  if (value === "★ Premium")
    return (
      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 whitespace-nowrap">
        ★ Premium
      </span>
    );
  return <span className="text-sm font-medium text-slate-700">{value}</span>;
}

export default function BundleTable() {
  const groups = [...new Set(ROWS.map((r) => r.group))];

  return (
    <section id="comparison-table" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-3 block">
            Side-by-Side Breakdown
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Compare Every Package
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">
            No hidden tiers. See exactly what&apos;s included in each growth
            system before you commit.
          </p>
        </motion.div>

        {/* Table wrapper — horizontal scroll on mobile */}
        <div className="overflow-x-auto rounded-2xl shadow-xl border border-slate-200">
          <table className="w-full min-w-[700px] border-collapse">
            {/* Sticky header */}
            <thead>
              <tr>
                <th className="bg-slate-900 text-left px-6 py-5 text-slate-300 font-semibold text-sm w-64 rounded-tl-2xl">
                  Features
                </th>
                {TIERS.map((tier, i) => (
                  <th
                    key={tier}
                    className={`px-6 py-5 text-center font-bold text-base ${
                      i === 2
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800 text-white"
                    } ${i === 2 ? "rounded-tr-2xl" : ""}`}
                  >
                    <span className="block">{tier}</span>
                    {i === 1 && (
                      <span className="mt-1 inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-white/15 text-slate-200">
                        Most Popular
                      </span>
                    )}
                    {i === 2 && (
                      <span className="mt-1 inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-white/25 text-white">
                        ★ Best Value
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {groups.map((group) => {
                const groupRows = ROWS.filter((r) => r.group === group);
                return groupRows.map((row, ri) => (
                  <tr
                    key={`${row.group}-${row.label}`}
                    className={`border-b border-slate-100 hover:bg-slate-50/80 transition-colors ${
                      ri % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-slate-700 font-medium">
                      {ri === 0 && (
                        <span className="block text-[10px] uppercase tracking-widest text-blue-500 font-bold mb-1">
                          {group}
                        </span>
                      )}
                      {row.label}
                    </td>
                    {row.values.map((val, vi) => (
                      <td
                        key={vi}
                        className={`px-6 py-4 text-center ${
                          vi === 2 ? "bg-blue-50" : ""
                        }`}
                      >
                        <CellValue value={val} isElite={vi === 2} />
                      </td>
                    ))}
                  </tr>
                ));
              })}

              {/* Pricing summary row */}
              <tr>
                <td className="px-6 py-6 bg-slate-900 text-slate-300 font-bold text-sm rounded-bl-2xl">
                  Monthly Total
                </td>
                {[
                  {
                    monthly: "$999/m",
                    oneTime: "$699 one-time",
                    bg: "bg-slate-900",
                  },
                  {
                    monthly: "$2,222/m",
                    oneTime: "$699 one-time",
                    bg: "bg-slate-900",
                  },
                  {
                    monthly: "$3,888/m",
                    oneTime: "$699 one-time",
                    after: "→ $3,500/m after AI setup",
                    bg: "bg-blue-600",
                  },
                ].map((p, i) => (
                  <td
                    key={i}
                    className={`px-6 py-6 text-center ${p.bg} ${
                      i === 2 ? "rounded-br-2xl" : ""
                    }`}
                  >
                    <p className="text-xl font-bold text-white">{p.monthly}</p>
                    <p
                      className={`text-xs mt-1 ${i === 2 ? "text-blue-100" : "text-slate-400"}`}
                    >
                      {p.oneTime}
                    </p>
                    {p.after && (
                      <p className="text-xs mt-1 text-blue-200 font-medium">
                        {p.after}
                      </p>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { scrollToServicesContact } from "../../utils/formInterest";

const PACKAGES = [
  {
    name: "Social Starter",
    interest: "social-starter",
    subtitle: "Presence System",
    monthly: "$589",
    biweekly: "$299",
    trial: true,
    features: [
      "Monthly strategy meeting",
      "Up to 2 platforms",
      "8 posts/month (2 per week)",
      "Captions + hashtags",
      "Cross-platform formatting",
      "Monthly engagement summary",
    ],
    buying: "Consistency + basic visibility",
  },
  {
    name: "The Classic",
    interest: "social-classic",
    subtitle: "Foundation Visibility System",
    monthly: "$999",
    biweekly: "$599",
    features: [
      "Everything in Starter",
      "1 content production day/month",
      "3 platforms",
      "12 posts/month (video + static)",
      "Short-form video integration",
      "1 LinkedIn blog (if applicable)",
    ],
    buying: "Content quality + brand positioning",
    featured: true,
  },
  {
    name: "The Refined",
    interest: "social-refined",
    subtitle: "Authority Building System",
    monthly: "$1,469",
    biweekly: "$799",
    features: [
      "Everything in Classic",
      "2 content production days/month",
      "15 posts/month",
      "Branded content calendar",
      "Automated scheduling",
      "Monthly analytics report",
    ],
    buying: "Consistency + strategy + performance tracking",
  },
  {
    name: "The Signature",
    interest: "social-signature",
    subtitle: "Multi-Channel Growth Engine",
    monthly: "$2,369",
    biweekly: "$1,199",
    features: [
      "Up to 4 platforms",
      "18 posts/month",
      "Cross-platform repurposing",
      "Deeper performance insights",
      "Trend + creative direction",
      "Up to 2 LinkedIn blogs",
    ],
    buying: "Scale + reach + smarter distribution",
  },
  {
    name: "Elite Social System",
    interest: "social-elite",
    subtitle: "Digital Authority Infrastructure",
    monthly: "$2,999",
    biweekly: null,
    features: [
      "Up to 5 platforms",
      "27 posts/month",
      "Google Business Profile optimization",
      "Social SEO + metadata",
      "Automated DM & inquiry flows",
      "Advanced analytics dashboard",
    ],
    buying: "Authority + lead generation + system-driven growth",
  },
];

const VIDEO_PACKAGES = [
  { count: 1, price: "$399" },
  { count: 2, price: "$599" },
  { count: 3, price: "$999" },
];

export default function SocialMediaPackages() {
  const scrollToContact = (interest) => {
    scrollToServicesContact(interest, `social-package:${interest}`);
  };

  return (
    <section
      id="content-creation"
      className="scroll-mt-32 border-t border-black/[0.05] bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3B6FF0]">
            Content Creation
          </p>
          <h2 className="mt-3 font-sans text-[clamp(1.75rem,3vw,2.25rem)] font-extrabold tracking-[-0.03em] text-[#0f0f0f] sm:text-4xl">
            Social growth systems
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-[#5c5c5c] lg:text-lg">
            A tiered content and social ecosystem — from consistent presence to
            full digital authority. Video production available à la carte.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <motion.article
              key={pkg.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`flex flex-col rounded-[22px] border bg-white p-7 ${
                pkg.featured
                  ? "border-[#3B6FF0] shadow-[0_20px_48px_-20px_rgba(59,111,240,0.2)]"
                  : "border-black/[0.06]"
              }`}
            >
              {pkg.trial && (
                <Link
                  to="/social-media-free-trial"
                  className="mb-4 inline-flex w-fit rounded-full bg-[#3B6FF0]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#3B6FF0] transition hover:bg-[#3B6FF0]/15"
                >
                  30-day free trial
                </Link>
              )}
              <p className="text-xs font-semibold uppercase tracking-wider text-[#737373]">
                {pkg.subtitle}
              </p>
              <h3 className="mt-1 text-xl font-bold text-[#0f0f0f]">
                {pkg.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-[#0f0f0f]">
                  {pkg.monthly}
                </span>
                <span className="text-sm text-[#737373]">/mo</span>
              </div>
              {pkg.biweekly && (
                <p className="mt-0.5 text-xs text-[#737373]">
                  {pkg.biweekly} bi-weekly
                </p>
              )}
              <ul className="mt-5 flex-1 space-y-2.5">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[#5c5c5c]">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#3B6FF0]" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-black/[0.06] pt-4 text-xs text-[#737373]">
                <span className="font-medium text-[#0f0f0f]">You get: </span>
                {pkg.buying}
              </p>
              <button
                type="button"
                onClick={() => scrollToContact(pkg.interest)}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#3B6FF0]"
              >
                Get started <ArrowRight className="h-4 w-4" />
              </button>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 rounded-[22px] border border-black/[0.06] bg-white p-8 sm:p-10">
          <h3 className="text-xl font-bold text-[#0f0f0f]">
            Video production à la carte
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5c5c5c]">
            Professional filmed brand videos with raw footage delivered. Under 60
            seconds; add $100 per additional minute.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {VIDEO_PACKAGES.map((v) => (
              <div
                key={v.count}
                className="rounded-xl border border-black/[0.06] bg-[#fafafa] p-5"
              >
                <p className="text-2xl font-bold text-[#0f0f0f]">{v.price}</p>
                <p className="mt-1 text-sm text-[#5c5c5c]">
                  {v.count} professional brand video{v.count > 1 ? "s" : ""}
                </p>
                <p className="mt-2 text-xs text-[#737373]">One-time</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar } from "lucide-react";
import { trackButtonClick } from "../../services/analytics";
import Reveal from "../primitives/Reveal";
import atmosphere from "../../assets/sections/section-about-atmosphere.webp";
import { Button } from "../ui/button";

const POINTS = [
  {
    title: "Proven results",
    body: "Traffic lifts, retention, and custom systems ship because we measure what the business actually feels.",
  },
  {
    title: "AI-era expertise",
    body: "Built for discovery in 2026: Google, ChatGPT, Gemini, Perplexity, and the technical signals they reward.",
  },
  {
    title: "Full-stack execution",
    body: "Web, SEO, CRM, content, and social stay under one roof so strategy never fractures across vendors.",
  },
  {
    title: "Local and nationwide",
    body: "San Antonio rooted, national reach. Local operators and multi-market teams get the same discipline.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-[var(--c-border)] bg-[var(--c-base)]"
    >
          <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[36vh] lg:min-h-[420px]">
          <img
            src={atmosphere}
            alt="San Antonio Riverwalk at dusk"
            className="absolute inset-0 size-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/20" />
          <p className="absolute bottom-8 left-8 max-w-xs font-sans text-sm text-white/85 lg:bottom-12 lg:left-12">
            Based in San Antonio. Building systems that travel.
          </p>
        </div>

        <Reveal className="flex flex-col justify-center px-[var(--container-pad)] py-12 sm:py-14 lg:px-14 xl:px-16">
          <h2 className="max-w-lg font-sans text-[clamp(1.9rem,3.5vw,2.85rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[var(--c-ink)] text-balance">
            Your growth partner in{" "}
            <span className="text-[var(--c-accent)]">the AI era</span>
          </h2>
          <p className="mt-4 max-w-md font-sans text-[15px] leading-relaxed text-[var(--c-text-secondary)]">
            Digital systems for AI-driven discovery. SEO, websites, CRM, and
            social operate as one growth stack rather than a pile of tools.
          </p>

          <div className="mt-8 grid gap-0 sm:grid-cols-2 sm:gap-x-8" data-reveal-group>
            {POINTS.map((p) => (
              <div
                key={p.title}
                data-reveal-item
                className="border-t border-[var(--c-border)] py-5"
              >
                <p className="font-sans text-[15px] font-semibold text-[var(--c-ink)]">
                  {p.title}
                </p>
                <p className="mt-1.5 font-sans text-sm leading-relaxed text-[var(--c-text-muted)]">
                  {p.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Button asChild>
              <Link
                to="/book"
                onClick={() =>
                  trackButtonClick("About CTA", "about_cta", "About")
                }
              >
                <Calendar size={15} strokeWidth={1.75} aria-hidden />
                Book a strategy call
              </Link>
            </Button>
            <Link
              to="/free-ai-seo-audit"
              onClick={() =>
                trackButtonClick("About Audit CTA", "about_audit_cta", "About")
              }
              className="inline-flex items-center gap-1.5 font-sans text-[15px] font-medium text-[var(--c-accent)] transition hover:text-[#2f5ad4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)]"
            >
              Free AI SEO audit
              <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

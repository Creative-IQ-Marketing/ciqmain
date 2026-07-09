import { ArrowUpRight, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { trackButtonClick } from "../../services/analytics";
import FadeUp from "../primitives/FadeUp";

const POINTS = [
  {
    num: "01",
    title: "Proven results",
    body: "300% average increase in organic traffic. Not a projection — our clients live it.",
  },
  {
    num: "02",
    title: "AI-era expertise",
    body: "We build for how search works in 2026: ChatGPT, Gemini, Google AI, and beyond.",
  },
  {
    num: "03",
    title: "Full-stack execution",
    body: "One team handles your web, SEO, CRM, content, and ads. No agency juggling.",
  },
  {
    num: "04",
    title: "Local & nationwide",
    body: "Based in San Antonio, TX — serving businesses across the country.",
  },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <FadeUp
      as="section"
      id="about"
      className="border-t border-black/[0.05] bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-start gap-12 px-5 sm:px-6 lg:gap-20 lg:px-10">
        <div className="w-full lg:w-[min(100%,400px)] lg:shrink-0">
          <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3B6FF0]">
            About CreativeIQ
          </p>
          <h2 className="font-sans text-[clamp(2.2rem,3.8vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#0f0f0f]">
            Your growth
            <br />
            partner in
            <br />
            <span className="text-[#3B6FF0]">the AI era.</span>
          </h2>
          <p className="mt-5 max-w-sm font-sans text-[15px] leading-relaxed text-[#5c5c5c]">
            Digital systems engineered for AI-driven discovery — SEO, websites,
            CRM, and social, built as one cohesive growth stack.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3">
            <button
              type="button"
              onClick={() => {
                trackButtonClick("About CTA", "about_cta", "About");
                navigate("/book");
              }}
              className="inline-flex items-center gap-1.5 font-sans text-[15px] font-medium text-[#0f0f0f] transition hover:text-[#3B6FF0]"
            >
              <Calendar size={15} strokeWidth={1.75} aria-hidden />
              Book a strategy call
              <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => {
                trackButtonClick("About Audit CTA", "about_audit_cta", "About");
                navigate("/free-ai-seo-audit");
              }}
              className="inline-flex items-center gap-1.5 font-sans text-[15px] font-medium text-[#3B6FF0] transition hover:text-[#2f5ad4]"
            >
              Free AI SEO audit
              <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </div>

        <div className="min-w-[260px] flex-1">
          {POINTS.map((p, i) => (
            <div
              key={p.num}
              className={`flex items-start gap-5 py-6 ${
                i < POINTS.length - 1 ? "border-b border-black/[0.06]" : ""
              }`}
            >
              <span className="mt-0.5 shrink-0 font-sans text-[11px] font-bold tracking-[0.08em] text-[#3B6FF0]">
                {p.num}
              </span>
              <div>
                <p className="mb-1 font-sans text-[15px] font-medium text-[#0f0f0f]">
                  {p.title}
                </p>
                <p className="font-sans text-sm leading-relaxed text-[#737373]">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FadeUp>
  );
}

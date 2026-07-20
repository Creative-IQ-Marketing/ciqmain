import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SEO from "../components/SEO";
import PageHeader, {
  PageCtaPrimary,
  PageCtaSecondary,
} from "../components/layout/PageHeader";
import { Button } from "../components/ui/button";
import atmosphere from "../assets/sections/section-about-atmosphere.webp";
import servicesAtmosphere from "../assets/sections/section-services-atmosphere.webp";
import vilmaCreative from "../assets/vilma/vilma-creative.webp";

const CAPABILITIES = [
  "Search Engine Optimization (SEO)",
  "Answer Engine Optimization (AEO)",
  "Google Ads and Local Services Ads",
  "Website Design & Development",
  "Technical SEO & Schema Implementation",
  "AI Integration & Automation",
  "CRM Systems",
  "Reputation Management",
  "Branding & Brand Strategy",
  "Social Media Marketing & Management",
  "Content Creation & Video Production",
  "Email Marketing & Marketing Automation",
  "Business Consulting & Growth Strategy",
];

const INDUSTRIES = [
  "Healthcare",
  "Legal",
  "Nonprofits",
  "Professional services",
  "Home services",
  "Local organizations",
];

export default function AboutCiqPage() {
  return (
    <main>
      <SEO
        title="About CreativeIQ | Growth Systems Built on Trust"
        description="CreativeIQ builds AI-ready marketing ecosystems so businesses earn confidence from customers, search engines, and intelligent systems."
        keywords="about CreativeIQ, AI digital marketing agency, AEO, SEO systems, San Antonio marketing"
        canonical="https://creativeiq.marketing/about/creativeiq"
      />

      <PageHeader
        title="Trust is the new"
        titleAccent="ranking factor"
        description="We do not chase trends. We build marketing systems that earn confidence from people and the AI platforms shaping discovery."
      >
        <PageCtaPrimary to="/services">See our systems</PageCtaPrimary>
        <PageCtaSecondary to="/about/vilma">Meet Vilma</PageCtaSecondary>
      </PageHeader>

      <section className="relative overflow-hidden border-b border-[var(--c-border)]">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[42vh] lg:min-h-[520px]">
            <img
              src={atmosphere}
              alt="CreativeIQ presence in San Antonio"
              width={1280}
              height={853}
              className="absolute inset-0 size-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
            <p className="absolute bottom-6 left-6 max-w-sm font-sans text-sm font-medium text-white/90 sm:bottom-8 sm:left-8">
              Built for a world where customers and machines both decide who to
              trust.
            </p>
          </div>
          <div className="flex flex-col justify-center bg-[var(--c-ink)] px-[var(--container-pad)] py-14 text-white lg:px-12 lg:py-16">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--c-accent)]">
              The philosophy
            </p>
            <h2 className="mt-4 font-sans text-[clamp(1.6rem,3vw,2.35rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-balance">
              The goal is not simply to rank on Google.
            </h2>
            <p className="mt-5 font-sans text-base leading-relaxed text-white/70">
              It is to become the business that AI platforms, search engines,
              voice assistants, and future technologies recognize as the most
              credible, authoritative, and trustworthy answer.
            </p>
            <p className="mt-4 font-sans text-base leading-relaxed text-white/70">
              Businesses no longer compete solely for clicks. They compete for
              confidence from both people and intelligent systems.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--c-border)] bg-white py-[var(--section-pad)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)]">
          <div className="max-w-2xl">
            <h2 className="font-sans text-[clamp(1.75rem,3.2vw,2.6rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[var(--c-ink)] text-balance">
              One principle.{" "}
              <span className="text-[var(--c-accent)]">Every strategy.</span>
            </h2>
            <p className="mt-5 font-sans text-base leading-relaxed text-[var(--c-text-secondary)] lg:text-lg">
              Marketing should function as an integrated system. Every
              touchpoint, from schema markup to a five-star review to a social
              post, reinforces trust, authority, and long-term growth. Nothing
              works in isolation. Everything works together.
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((industry, i) => (
              <div
                key={industry}
                className="flex items-center gap-3 rounded-[var(--radius-control)] border border-[var(--c-border)] bg-[var(--c-surface-2)] px-4 py-4"
              >
                <span className="font-sans text-[11px] font-bold tabular-nums text-[var(--c-accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-sm font-semibold text-[var(--c-ink)]">
                  {industry}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--c-border)] bg-[var(--c-surface-2)] py-[var(--section-pad)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <h2 className="font-sans text-[clamp(1.75rem,3.2vw,2.6rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[var(--c-ink)]">
                Results across industries
              </h2>
              <p className="mt-4 font-sans text-base leading-relaxed text-[var(--c-text-secondary)]">
                CreativeIQ strengthens digital presence through a full growth
                stack. Same discipline for local operators and multi-market
                teams.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[var(--c-ink)] transition hover:text-[var(--c-accent)]"
            >
              Explore packages <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          <ul className="mt-10 columns-1 gap-x-12 sm:columns-2 lg:columns-3">
            {CAPABILITIES.map((item) => (
              <li
                key={item}
                className="mb-3 break-inside-avoid border-b border-[var(--c-border)] pb-3 font-sans text-sm text-[var(--c-text-secondary)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-[var(--c-border)] bg-[var(--c-ink)] py-[var(--section-pad)] text-white">
        <img
          src={servicesAtmosphere}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 size-full object-cover opacity-25"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[var(--c-ink)]/80" />
        <div className="relative mx-auto grid max-w-[var(--container-max)] gap-10 px-[var(--container-pad)] lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--c-accent)]">
              Leadership
            </p>
            <h2 className="mt-3 font-sans text-[clamp(1.75rem,3.2vw,2.6rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-balance">
              Built by a founder who treats marketing as infrastructure.
            </h2>
            <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-white/70">
              CreativeIQ is led by Vilma Tovar, an AI digital marketing
              strategist committed to serving the communities she works in with
              the same dedication she brings to every client relationship.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="accent">
                <Link to="/about/vilma">
                  About Vilma <ArrowUpRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="border-white/20 bg-transparent text-white hover:border-white/40 hover:bg-white/5"
              >
                <Link to="/contact">Start a project</Link>
              </Button>
            </div>
          </div>
          <div className="justify-self-center lg:justify-self-end">
            <div className="relative size-56 overflow-hidden rounded-full border-4 border-white/10 sm:size-64 lg:size-72">
              <img
                src={vilmaCreative}
                alt="Vilma Tovar, Founder and CEO of CreativeIQ"
                width={720}
                height={900}
                className="size-full object-cover object-[center_20%]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

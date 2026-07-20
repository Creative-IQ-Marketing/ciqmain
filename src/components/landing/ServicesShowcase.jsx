import { useState } from "react";
import {
  ArrowUpRight,
  FileText,
  LayoutTemplate,
  Search,
  Share2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  trackButtonClick,
  trackServiceSelection,
} from "../../services/analytics";
import { normalizeFormInterest } from "../../data/serviceFormOptions";
import { Button } from "../ui/button";
import Reveal from "../primitives/Reveal";
import atmosphere from "../../assets/sections/section-services-atmosphere.webp";

const SERVICES = [
  {
    id: "sem",
    index: "01",
    title: "Search Engine Marketing",
    contactValue: "bundle-essential",
    summary:
      "Technical SEO, AI search readiness, and paid search wired to analytics so buyers already looking for you can find and choose you.",
    proof: "Rank + recommend",
    Icon: Search,
  },
  {
    id: "smm",
    index: "02",
    title: "Social Media Marketing",
    contactValue: "social-starter",
    summary:
      "Consistent presence and paid amplification across the platforms your audience already uses, aimed at pipeline rather than vanity.",
    proof: "Presence that converts",
    Icon: Share2,
  },
  {
    id: "content",
    index: "03",
    title: "Content Marketing",
    contactValue: "video-production",
    summary:
      "Editorial calendars, video, email, and long-form that educate buyers and move them from curiosity to a conversation.",
    proof: "Stories with commercial spine",
    Icon: FileText,
  },
  {
    id: "web",
    index: "04",
    title: "Web Design & Development",
    contactValue: "bundle-essential",
    summary:
      "Fast conversion sites with clear offers, clean UX, and the performance foundation SEO and ads need to pay off.",
    proof: "Sites built to close",
    Icon: LayoutTemplate,
  },
];

export default function ServicesShowcase() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  const goToContact = (serviceValue) => {
    trackServiceSelection(serviceValue);
    trackButtonClick(serviceValue, "service_card", "ServicesShowcase");
    const interest = normalizeFormInterest(serviceValue) || serviceValue;
    navigate({
      pathname: "/",
      search: `?interest=${encodeURIComponent(interest)}`,
      hash: "#contact",
    });
  };

  const current = SERVICES[active];

  return (
    <section
      id="services"
      className="relative overflow-hidden border-t border-[var(--c-border)] bg-[var(--c-base)] py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)]">
        <Reveal className="mb-8 max-w-xl">
          <h2 className="font-sans text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-[var(--c-ink)] text-balance">
            One stack.{" "}
            <span className="text-[var(--c-accent)]">Full growth.</span>
          </h2>
          <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-[var(--c-text-secondary)]">
            Search, social, content, and web run as a single system. Open a lane
            to start the conversation.
          </p>
        </Reveal>

        {/* Desktop: hover-accordion slices + detail panel */}
        <Reveal className="hidden lg:grid lg:grid-cols-[1.35fr_0.65fr] lg:gap-5">
          <div className="flex h-[320px] overflow-hidden rounded-[var(--radius-card)] border border-[var(--c-border)] bg-[var(--c-ink)]">
            {SERVICES.map((service, i) => {
              const isActive = active === i;
              return (
                <button
                  key={service.id}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => goToContact(service.contactValue)}
                  className={`group relative flex h-full flex-col justify-between overflow-hidden border-r border-white/10 text-left transition-[flex] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] last:border-r-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--c-accent)] ${
                    isActive ? "flex-[2.4]" : "flex-[0.7]"
                  }`}
                  aria-pressed={isActive}
                >
                  <img
                    src={atmosphere}
                    alt=""
                    className={`absolute inset-0 size-full object-cover transition duration-700 ${
                      isActive ? "opacity-55 scale-105" : "opacity-25 scale-100"
                    }`}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />
                  <div className="relative z-10 flex h-full flex-col justify-between p-5 xl:p-6">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-sans text-xs font-bold tabular-nums text-[var(--c-accent)]">
                        {service.index}
                      </span>
                      <service.Icon
                        size={18}
                        className="text-white/70"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <h3
                        className={`font-sans font-bold tracking-[-0.02em] text-white transition ${
                          isActive
                            ? "text-2xl xl:text-[1.7rem]"
                            : "text-sm [writing-mode:vertical-rl] rotate-180"
                        }`}
                      >
                        {service.title}
                      </h3>
                      {isActive ? (
                        <p className="mt-3 max-w-sm font-sans text-sm leading-relaxed text-white/70">
                          {service.summary}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col justify-between rounded-[var(--radius-card)] border border-[var(--c-border)] bg-white p-7 shadow-[var(--shadow-soft)]">
            <div>
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--c-text-muted)]">
                {current.proof}
              </p>
              <h3 className="mt-3 font-sans text-2xl font-extrabold tracking-[-0.03em] text-[var(--c-ink)]">
                {current.title}
              </h3>
              <p className="mt-4 font-sans text-sm leading-relaxed text-[var(--c-text-secondary)]">
                {current.summary}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Mobile */}
        <div className="space-y-3 lg:hidden">
          {SERVICES.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => goToContact(service.contactValue)}
              className="flex w-full flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--c-border)] bg-white p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)]"
            >
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs font-semibold text-[var(--c-accent)]">
                  {service.index}
                </span>
                <service.Icon
                  size={18}
                  className="text-[var(--c-accent)]"
                  strokeWidth={1.75}
                />
              </div>
              <h3 className="font-sans text-lg font-bold tracking-[-0.02em] text-[var(--c-ink)]">
                {service.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-[var(--c-text-secondary)]">
                {service.summary}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link
              to="/services"
              onClick={() =>
                trackButtonClick(
                  "Browse Services",
                  "services_cta",
                  "ServicesShowcase",
                )
              }
            >
              Browse services
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link
              to="/book"
              onClick={() =>
                trackButtonClick(
                  "Book a call",
                  "services_cta",
                  "ServicesShowcase",
                )
              }
            >
              Book a call
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

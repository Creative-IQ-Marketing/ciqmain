import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { trackButtonClick, trackServiceSelection } from "../../services/analytics";
import semVideo from "../../assets/svid/seovid.mp4";
import smmVideo from "../../assets/svid/social media.mp4";
import contentVideo from "../../assets/svid/contentmgmt.mp4";
import webVideo from "../../assets/svid/webdev.mp4";

import { normalizeFormInterest } from "../../data/serviceFormOptions";

const SERVICE_GROUPS = [
  {
    id: "sem",
    title: "Search Engine Marketing",
    contactValue: "bundle-essential",
    video: semVideo,
    summary:
      "SEO, paid search, and analytics — built to get you found by buyers who are ready to act.",
    tags: ["SEO", "Google Ads", "Analytics"],
  },
  {
    id: "smm",
    title: "Social Media Marketing",
    contactValue: "social-starter",
    video: smmVideo,
    summary:
      "Campaigns and content that keep your brand top-of-mind across every major platform.",
    tags: ["Content", "Community", "Paid social"],
  },
  {
    id: "content",
    title: "Content Marketing",
    contactValue: "video-production",
    video: contentVideo,
    summary:
      "Blogs, video, email, and copy that turn attention into qualified pipeline.",
    tags: ["Blogging", "Email", "Video"],
  },
  {
    id: "web",
    title: "Web Design & Development",
    contactValue: "bundle-essential",
    video: webVideo,
    summary:
      "Fast, conversion-focused sites — modern stacks, sharp UX, performance included.",
    tags: ["React", "UX", "Conversion"],
  },
];

function normalizeX(value, loopWidth) {
  if (!loopWidth) return value;
  let normalized = value;
  while (normalized <= -loopWidth) normalized += loopWidth;
  while (normalized > 0) normalized -= loopWidth;
  return normalized;
}

function ServiceCard({ service, onSelect, compact }) {
  const handleSelect = () => {
    trackServiceSelection(service.contactValue);
    trackButtonClick(service.title, "service_carousel_card", "ServicesShowcase");
    onSelect(service.contactValue);
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSelect();
        }
      }}
      className={`group flex h-full flex-none cursor-pointer flex-col overflow-hidden rounded-[22px] border border-black/[0.06] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-shadow hover:shadow-[0_12px_36px_rgba(15,23,42,0.1)] ${
        compact
          ? "w-[min(82vw,300px)] sm:w-[320px]"
          : "w-[min(85vw,320px)] sm:w-[340px] lg:w-[360px]"
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-white">
        <video
          src={service.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2.5 px-5 py-5 sm:gap-3 sm:px-6 sm:py-6">
        <h3 className="f-disp text-[1.2rem] font-bold leading-tight tracking-[-0.02em] text-slate-900 sm:text-[1.35rem]">
          {service.title}
        </h3>
        <p className="text-[0.9rem] leading-relaxed text-slate-600 sm:text-[0.95rem]">
          {service.summary}
        </p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 sm:px-3 sm:py-1 sm:text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          <ArrowUpRight
            size={16}
            className="shrink-0 text-[#3B6FF0] opacity-60 transition group-hover:translate-x-0.5 group-hover:opacity-100"
          />
        </div>
      </div>
    </article>
  );
}

export default function ServicesShowcase() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(false);
  const [loopWidth, setLoopWidth] = useState(0);
  const [cardStep, setCardStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const x = useMotionValue(0);
  const trackRef = useRef(null);
  const firstCardRef = useRef(null);

  const desktopCards = useMemo(() => [...SERVICE_GROUPS, ...SERVICE_GROUPS], []);

  const goToContact = (serviceValue) => {
    const interest = normalizeFormInterest(serviceValue) || serviceValue;
    navigate(`/?interest=${interest}#contact`);
  };

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setLoopWidth(trackRef.current.scrollWidth / 2);
      const cardWidth = firstCardRef.current?.getBoundingClientRect().width || 0;
      setCardStep(cardWidth + 20);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isDesktop]);

  useAnimationFrame((_, delta) => {
    if (!isDesktop || paused || !loopWidth) return;
    const speed = 0.034;
    x.set(normalizeX(x.get() - delta * speed, loopWidth));
  });

  const goNext = () => {
    if (!loopWidth || !cardStep) return;
    setPaused(true);
    x.set(normalizeX(x.get() - cardStep, loopWidth));
  };

  const goPrev = () => {
    if (!loopWidth || !cardStep) return;
    setPaused(true);
    x.set(normalizeX(x.get() + cardStep, loopWidth));
  };

  const navBtnClass =
    "absolute top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-md transition hover:bg-slate-50 sm:h-11 sm:w-11";

  return (
    <section
      id="services"
      className="relative overflow-x-clip bg-[#F5F5F7] py-16 sm:py-20 lg:py-28"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(280px,36%)_1fr] lg:gap-10 xl:gap-16">
          <div className="lg:sticky lg:top-28 lg:max-w-md lg:self-start">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#3B6FF0]">
              What we do
            </p>
            <h2 className="f-disp text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-slate-900">
              Marketing systems that actually grow revenue
            </h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-slate-600">
              Search, social, content, and websites — we build the full stack
              San Antonio businesses need to turn attention into customers.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/services"
                onClick={() =>
                  trackButtonClick(
                    "Browse Services",
                    "services_carousel_cta",
                    "ServicesShowcase",
                  )
                }
                className="inline-flex items-center justify-center rounded-full bg-[#3B6FF0] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2f5ad4] sm:px-7 sm:py-3.5"
              >
                Browse services
              </Link>
              <button
                type="button"
                onClick={() => {
                  trackButtonClick(
                    "Get a Demo",
                    "services_carousel_cta",
                    "ServicesShowcase",
                  );
                  goToContact("other");
                }}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 sm:px-7 sm:py-3.5"
              >
                Get a demo
              </button>
            </div>

            <Link
              to="/services"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 transition hover:text-[#3B6FF0]"
            >
              View full service menu
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div
            className="relative min-w-0 w-full lg:mr-[calc(-50vw+50%)] lg:w-[calc(100%+50vw-50%)]"
            onMouseEnter={() => isDesktop && setPaused(true)}
            onMouseLeave={() => isDesktop && setPaused(false)}
          >
            <button
              type="button"
              onClick={goPrev}
              className={`${navBtnClass} left-0 sm:left-1`}
              aria-label="Previous service"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={goNext}
              className={`${navBtnClass} right-2 sm:right-4 lg:right-8`}
              aria-label="Next service"
            >
              <ChevronRight size={20} />
            </button>

            <div className="overflow-hidden px-11 py-2 sm:px-14">
              <motion.div
                ref={trackRef}
                className="flex items-stretch gap-4 sm:gap-5"
                style={{ x }}
              >
                {desktopCards.map((service, index) => (
                  <div
                    key={`${service.id}-${index}`}
                    ref={index === 0 ? firstCardRef : undefined}
                    className="flex-none"
                  >
                    <ServiceCard
                      service={service}
                      onSelect={goToContact}
                      compact={!isDesktop}
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            <p className="mt-3 px-11 text-center text-xs text-slate-500 sm:px-14 lg:text-left">
              {isDesktop
                ? "Hover to pause · use arrows or tap a card"
                : "Swipe or use arrows · tap a card to learn more"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import MagneticButton from "../primitives/MagneticButton";
import {
  panelRevealTransition,
  premiumCardHover,
  premiumCardTap,
  premiumCardTransition,
} from "../primitives/motionTokens";
import semVideo from "../../assets/svid/seovid.mp4";
import smmVideo from "../../assets/svid/social media.mp4";
import contentVideo from "../../assets/svid/contentmgmt.mp4";
import webVideo from "../../assets/svid/webdev.mp4";

const SERVICE_GROUPS = [
  {
    id: "sem",
    title: "Search Engine Marketing",
    subtitle: "Search Engine Marketing",
    video: semVideo,
    summary: "Get found online by the right customers at the right time.",
    subcategories: [
      "Search Engine Optimization (SEO)",
      "On-page SEO",
      "Off-page SEO",
      "Technical SEO",
      "Pay-per-click Advertising (PPC)",
      "Google Ads",
      "Bing Ads",
      "Facebook Ads",
      "Analytics and Data Science",
      "Google Analytics",
      "Data Visualization",
      "A/B Testing",
    ],
  },
  {
    id: "smm",
    title: "Social Media Marketing",
    subtitle: "Social Media Marketing",
    video: smmVideo,
    summary: "Stay top-of-mind and build trust with engaging social campaigns.",
    subcategories: [
      "Facebook Marketing",
      "Instagram Marketing",
      "Twitter Marketing",
      "LinkedIn Marketing",
    ],
  },
  {
    id: "content",
    title: "Content Marketing",
    subtitle: "Drive More Qualified Leads",
    video: contentVideo,
    summary: "Turn attention into demand with high-value, conversion content.",
    subcategories: ["Blogging", "Video Marketing", "Email Marketing", "Copywriting"],
  },
  {
    id: "web",
    title: "Web Design & Development",
    subtitle: "Convert Visitors into Clients",
    video: webVideo,
    summary: "Create beautiful websites engineered for performance and growth.",
    subcategories: [
      "React and Animated Web Design",
      "Responsive Web Design",
      "User Experience (UX) Design",
    ],
  },
];

function normalizeX(value, loopWidth) {
  if (!loopWidth) return value;
  let normalized = value;
  while (normalized <= -loopWidth) normalized += loopWidth;
  while (normalized > 0) normalized -= loopWidth;
  return normalized;
}

function ServiceCard({
  service,
  expanded,
  onOpen,
  onClose,
  mobile,
  pulseDelay,
  onTap,
  cardId,
}) {
  return (
    <motion.article
      onClick={mobile ? onTap : undefined}
      onKeyDown={
        mobile
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onTap?.();
              }
            }
          : undefined
      }
      role={mobile ? "button" : undefined}
      tabIndex={mobile ? 0 : undefined}
      onHoverStart={mobile ? undefined : onOpen}
      onHoverEnd={mobile ? undefined : onClose}
      whileHover={premiumCardHover}
      whileTap={premiumCardTap}
      transition={premiumCardTransition}
      className="relative h-[680px] w-full overflow-hidden rounded-[30px] border border-black/10 bg-[#0F1F54] shadow-[0_28px_70px_rgba(33,60,150,0.18)]"
    >
      <motion.video
        src={service.video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
        animate={{
          scale: [1.04, 1.11, 1.06, 1.1, 1.04],
          x: [0, -10, 8, -6, 0],
          y: [0, 6, -4, 5, 0],
          rotate: [0, 0.4, -0.35, 0.25, 0],
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
          delay: pulseDelay,
        }}
      />

      <div className="absolute inset-0 bg-black/70" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-[linear-gradient(to_top,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.62)_36%,rgba(0,0,0,0.30)_68%,rgba(0,0,0,0)_100%)]" />

      {!expanded && mobile && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <span className="rounded-full border border-white/30 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/95 backdrop-blur-sm">
            Tap to view details
          </span>
        </div>
      )}

      {mobile && expanded && (
        <AnimatePresence>
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.65, y: 12 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => {
              e.stopPropagation();
              onTap?.();
            }}
            className="absolute right-4 top-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-black/65 text-white shadow-lg backdrop-blur-sm"
            aria-label="Close details"
          >
            <X size={20} />
          </motion.button>
        </AnimatePresence>
      )}

      <div className="relative z-10 flex h-full flex-col justify-end">
        <div
          className={`${mobile ? "cursor-pointer" : "cursor-default"} w-full px-8 pb-8 pt-10 text-left`}
          aria-expanded={expanded}
          aria-controls={`service-panel-${cardId}`}
        >
          <motion.div
            animate={{ y: expanded ? -160 : 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[2.2rem] font-extrabold leading-none text-white sm:text-[2.45rem]">
              {service.title}
            </p>
            <p className="hidden mt-2 max-w-[85%] text-[1.9rem] font-semibold leading-[1.04] text-white">
              {service.subtitle}
            </p>
          </motion.div>
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id={`service-panel-${cardId}`}
              initial={{ y: "100%", opacity: 0.95 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0.95 }}
              transition={panelRevealTransition}
              className="absolute inset-x-0 bottom-0 h-[80%] bg-black/90 text-white backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-full flex-col p-7">
                <div className="mb-5 border-b border-white/20 pb-4">
                  <p className="text-[1.45rem] leading-[1.2] font-semibold text-white/95">
                    {service.summary}
                  </p>
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {service.subcategories.map((item) => (
                      <li
                        key={item}
                        className="rounded-xl border border-white/20 bg-white/[0.08] px-4 py-3 text-[0.95rem] font-medium leading-snug text-white/95"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <MagneticButton
                  as="a"
                  href="#contact"
                  strength={0.22}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-extrabold uppercase tracking-[0.08em] text-[#2A4AB8] transition hover:opacity-95"
                >
                  Get a Demo
                </MagneticButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export default function ServicesShowcase() {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredId, setHoveredId] = useState("");
  const [expandedMobileId, setExpandedMobileId] = useState("");
  const [loopWidth, setLoopWidth] = useState(0);
  const [cardStep, setCardStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const x = useMotionValue(0);
  const trackRef = useRef(null);
  const firstCardRef = useRef(null);

  const desktopCards = useMemo(() => [...SERVICE_GROUPS, ...SERVICE_GROUPS], []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const measure = () => {
      if (!trackRef.current) return;
      const nextLoopWidth = trackRef.current.scrollWidth / 2;
      setLoopWidth(nextLoopWidth);
      const cardWidth = firstCardRef.current?.getBoundingClientRect().width || 0;
      setCardStep(cardWidth + 24);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isMobile]);

  useAnimationFrame((_, delta) => {
    if (isMobile || paused || hoveredId || !loopWidth) return;
    const speed = 0.034;
    const nextX = x.get() - delta * speed;
    x.set(normalizeX(nextX, loopWidth));
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

  return (
    <section id="services" className="relative overflow-hidden bg-white py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute -left-44 top-20 h-[420px] w-[420px] rounded-full bg-[#3B6FF0]/14 blur-[110px]" />
      <div className="pointer-events-none absolute -right-40 bottom-8 h-[420px] w-[420px] rounded-full bg-[#3B6FF0]/10 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="mb-10 text-center lg:mb-14">
          <h2 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Our Services
          </h2>
          <p className="text-[1.35rem] leading-[1.2] font-semibold text-slate-900">
            We offer a range of services to help you grow your business.
          </p>
        </div>

        {!isMobile && (
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => {
              setPaused(false);
              setHoveredId("");
            }}
          >
            <button
              type="button"
              onClick={goPrev}
              className="absolute -left-16 top-1/2 z-20 -translate-y-1/2 rounded-full border border-slate-300 bg-white p-3 text-slate-700 shadow-lg transition hover:border-slate-400 hover:bg-slate-50"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute -right-16 top-1/2 z-20 -translate-y-1/2 rounded-full border border-slate-300 bg-white p-3 text-slate-700 shadow-lg transition hover:border-slate-400 hover:bg-slate-50"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>

            <div className="overflow-hidden">
              <motion.div ref={trackRef} className="flex gap-6" style={{ x }}>
                {desktopCards.map((service, index) => {
                  const cardId = `${service.id}-${index}`;
                  return (
                    <div
                      ref={index === 0 ? firstCardRef : undefined}
                      key={cardId}
                      className="flex-none"
                      style={{ width: "calc((100% - 48px) / 3)" }}
                    >
                      <ServiceCard
                        service={service}
                        expanded={hoveredId === cardId}
                        onOpen={() => setHoveredId(cardId)}
                        onClose={() => setHoveredId("")}
                        mobile={false}
                        pulseDelay={(index % 4) * 0.8}
                        cardId={cardId}
                      />
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        )}

        {isMobile && (
          <div className="space-y-5">
            {SERVICE_GROUPS.map((service, index) => {
              const cardId = `${service.id}-mobile`;
              return (
                <ServiceCard
                  key={service.id}
                  service={service}
                  expanded={expandedMobileId === service.id}
                  onOpen={() => {}}
                  onClose={() => {}}
                  mobile
                  pulseDelay={index * 0.85}
                  cardId={cardId}
                  onTap={() =>
                    setExpandedMobileId((prev) => (prev === service.id ? "" : service.id))
                  }
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

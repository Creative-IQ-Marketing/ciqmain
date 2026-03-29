import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Bot, Sparkles } from "lucide-react";
import { trackButtonClick } from "../../services/analytics";

const PLATFORMS = [
  "ChatGPT",
  "Gemini",
  "Claude",
  "Perplexity",
  "Google AI",
  "Voice Search",
];

const AUDIT = [
  {
    id: 1,
    label: "AI Discoverability",
    q: "Are you showing up where your customers are actually searching—on AI platforms, not just Google?",
  },
  {
    id: 2,
    label: "Lead Conversion",
    q: "Is your website built to convert visitors into qualified leads, or just exist online?",
  },
  {
    id: 3,
    label: "Chat Experience",
    q: "Does your chat feel like real, high-level customer service—or a missed opportunity?",
  },
  {
    id: 4,
    label: "Social Positioning",
    q: "Is your social media positioning your brand as the obvious choice, or just adding noise?",
  },
];

const METRICS = [
  { value: "8+", sub: "Years" },
  { value: "300%", sub: "Avg Traffic ↑" },
  { value: "6", sub: "AI Platforms" },
];

function TypewriterText({ texts }) {
  const [displayed, setDisplayed] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    let timeout;
    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 60);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 30);
    } else {
      setDeleting(false);
      setTextIndex((i) => (i + 1) % texts.length);
    }
    setDisplayed(current.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex, texts]);

  return (
    <span>
      {displayed}
      <span className="animate-pulse text-blue-600">|</span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const [activeAudit, setActiveAudit] = useState(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false,
  );
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      ref={ref}
      id="home"
      style={{ fontFamily: "'Syne', sans-serif" }}
      className="relative min-h-[100svh] overflow-hidden bg-white text-slate-950"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        .dm { font-family: 'DM Sans', sans-serif; }
        @keyframes grain {
          0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)}
          20%{transform:translate(3%,2%)} 30%{transform:translate(-1%,4%)}
          40%{transform:translate(4%,-1%)} 50%{transform:translate(-3%,3%)}
          60%{transform:translate(2%,-4%)} 70%{transform:translate(-4%,1%)}
          80%{transform:translate(3%,-2%)} 90%{transform:translate(-2%,4%)}
        }
        .grain::after {
          content:''; position:fixed; inset:-200%; width:400%; height:400%;
          opacity:0.02; pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          animation: grain 0.5s steps(1) infinite;
        }
        .glow-line { background: linear-gradient(90deg,transparent,#3b82f6 40%,#818cf8 60%,transparent); }
        @keyframes pillScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .pill-scroll { animation: pillScroll 22s linear infinite; }
        .audit-item { transition: background 0.22s ease, transform 0.22s ease; }
        .audit-item:hover { background: rgba(15,23,42,0.04); transform: translateX(2px); }
      `}</style>

      <div className="grain pointer-events-none fixed inset-0 z-0" />

      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-blue-600/12 blur-[110px] sm:h-[760px] sm:w-[980px]" />
        <div className="absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-slate-900/[0.06] blur-[90px]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent" />
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="56"
              height="56"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 56 0 L 0 0 0 56"
                fill="none"
                stroke="rgb(15 23 42)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {[480, 720, 980].map((size) => (
          <div
            key={size}
            className="absolute left-1/2 top-1/2 rounded-full border border-slate-900/[0.06]"
            style={{
              width: size,
              height: size,
              marginLeft: -size / 2,
              marginTop: -size / 2,
            }}
          />
        ))}
      </div>

      <motion.div
        style={isMobile ? {} : { y: yHero, opacity: opacityHero }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-32 lg:px-10"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 shadow-sm backdrop-blur-sm sm:tracking-widest">
            <Sparkles className="h-3 w-3 text-blue-600" />
            <span className="text-slate-800">AI + SEO Digital Ecosystems</span>
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
          </div>
        </motion.div>

        {/* Flex: stacked on mobile, side-by-side on lg */}
        <div className="mt-8 flex flex-col gap-10 sm:mt-12 lg:flex-row lg:items-start lg:gap-14">
          {/* LEFT */}
          <div className="flex min-w-0 flex-1 flex-col">
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="text-[2rem] font-extrabold leading-[0.95] tracking-tight sm:text-[3.4rem] lg:text-[4.8rem] xl:text-[5.2rem]"
            >
              <span className="block text-slate-950/90">Be the answer</span>
              <span className="block">
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                    everywhere
                  </span>
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px glow-line opacity-40" />
                </span>
              </span>
              <span className="dm mt-2 block text-[0.95rem] font-light text-slate-600 sm:text-[1.2rem] lg:text-[1.5rem]">
                Google. AI. Social. Conversions.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.28 }}
              className="dm mt-6 max-w-md text-[0.95rem] leading-relaxed text-slate-600 sm:text-base"
            >
              One unified system across your website, socials, and CRM — built
              for{" "}
              <span className="text-slate-900/80">
                <TypewriterText
                  texts={[
                    "AI-driven discovery.",
                    "search dominance.",
                    "real conversions.",
                    "agents that convert.",
                  ]}
                />
              </span>
            </motion.p>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.4 }}
              className="mt-8 flex items-center gap-5 sm:gap-8"
            >
              {METRICS.map((m, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl font-extrabold text-slate-950 sm:text-3xl">
                    {m.value}
                  </span>
                  <span className="dm mt-0.5 text-[10px] uppercase tracking-widest text-slate-500 sm:text-xs">
                    {m.sub}
                  </span>
                </div>
              ))}
              <div className="ml-1 hidden h-9 w-px bg-slate-200 sm:block" />
              <p className="dm hidden text-xs leading-relaxed text-slate-500 sm:block sm:max-w-[130px]">
                Trusted by growing businesses across industries
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.52 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <motion.a
                href="#contact"
                onClick={() =>
                  trackButtonClick("Consultation", "hero_cta_primary", "Hero")
                }
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-400 sm:w-auto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Set a Consultation
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </motion.a>
              <motion.a
                href="#services"
                onClick={() =>
                  trackButtonClick("Services", "hero_cta_secondary", "Hero")
                }
                className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white/70 px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition-all hover:border-slate-300 hover:bg-white hover:text-slate-900 sm:w-auto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Services
              </motion.a>
            </motion.div>

            {/* Platform strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="mt-10 overflow-hidden"
            >
              <p className="dm mb-3 text-[10px] uppercase tracking-widest text-slate-500">
                Visible across
              </p>
              <div className="relative">
                <div className="absolute bottom-0 left-0 top-0 z-10 w-10 bg-gradient-to-r from-white to-transparent" />
                <div className="absolute bottom-0 right-0 top-0 z-10 w-10 bg-gradient-to-l from-white to-transparent" />
                <div className="flex overflow-hidden">
                  <div className="pill-scroll flex shrink-0 items-center gap-2 pr-2">
                    {[...PLATFORMS, ...PLATFORMS].map((p, i) => (
                      <span
                        key={i}
                        className="dm shrink-0 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs text-slate-600 shadow-sm"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Audit Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              delay: 0.38,
              type: "spring",
              stiffness: 70,
            }}
            className="relative w-full overflow-hidden lg:w-[400px] xl:w-[440px] lg:shrink-0 lg:sticky lg:top-28"
          >
            <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-blue-600/[0.08] blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/70 shadow-xl shadow-slate-900/5 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3.5 sm:px-5">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/10">
                    <Bot className="h-3.5 w-3.5 text-blue-700" />
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    Quick Audit
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="dm text-[11px] text-slate-500">
                    AI-Ready Check
                  </span>
                </div>
              </div>

              <div className="divide-y divide-slate-200 p-1.5 sm:p-2">
                {AUDIT.map((item, i) => (
                  <motion.a
                    key={item.id}
                    href="#contact"
                    onClick={() =>
                      trackButtonClick(
                        "Audit Question",
                        `hero_audit_${item.id}`,
                        "Hero",
                      )
                    }
                    className="audit-item group flex items-start gap-3 rounded-xl p-3 sm:p-3.5"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 + i * 0.09 }}
                    onMouseEnter={() => setActiveAudit(item.id)}
                    onMouseLeave={() => setActiveAudit(null)}
                  >
                    <span
                      className={`dm mt-0.5 shrink-0 text-xs font-medium tabular-nums transition-colors duration-200 ${
                        activeAudit === item.id
                          ? "text-blue-700"
                          : "text-slate-300"
                      }`}
                    >
                      0{item.id}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div
                        className={`dm mb-1 text-[10px] font-semibold uppercase tracking-widest transition-colors duration-200 ${
                          activeAudit === item.id
                            ? "text-blue-700"
                            : "text-slate-500"
                        }`}
                      >
                        {item.label}
                      </div>
                      <p className="dm break-words text-[13px] leading-relaxed text-slate-700 transition-colors duration-200 group-hover:text-slate-900 sm:text-sm">
                        {item.q}
                      </p>
                    </div>
                    <ArrowUpRight
                      className={`mt-0.5 h-3.5 w-3.5 shrink-0 transition-all duration-200 ${
                        activeAudit === item.id
                          ? "translate-x-0.5 -translate-y-0.5 text-blue-700 opacity-100"
                          : "text-slate-300 opacity-0"
                      }`}
                    />
                  </motion.a>
                ))}
              </div>

              <div className="border-t border-slate-200 px-4 py-3.5 sm:px-5">
                <p className="dm text-xs leading-relaxed text-slate-600">
                  Answered no to any of these?{" "}
                  <a
                    href="#contact"
                    className="text-blue-700/80 transition-colors hover:text-blue-700"
                  >
                    Let's fix that.
                  </a>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-px bg-slate-200">
                <div className="bg-white/80 px-4 py-3">
                  <div className="dm mb-1.5 text-[10px] uppercase tracking-widest text-slate-500">
                    AI Indexing
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-200">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-400"
                        initial={{ width: 0 }}
                        animate={{ width: "92%" }}
                        transition={{
                          duration: 1.4,
                          delay: 1,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
                    <span className="dm text-xs font-medium text-slate-600">
                      92%
                    </span>
                  </div>
                </div>
                <div className="bg-white/80 px-4 py-3">
                  <div className="dm mb-1.5 text-[10px] uppercase tracking-widest text-slate-500">
                    Lead Capture
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-emerald-400">
                      +38%
                    </span>
                    <span className="dm text-xs text-slate-500">lift</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

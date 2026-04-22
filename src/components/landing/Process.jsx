import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: "01",
    tag: "Intelligence",
    title: "We find what your market hasn't said yet",
    body: "Behavioral signals, search intent, competitor blind spots. We surface the pattern your audience is already broadcasting before rivals turn toward it.",
    outputs: ["Signal mapping", "Intent analysis", "Gap audit"],
    accent: "#3b82f6",
  },
  {
    num: "02",
    tag: "Strategy",
    title: "A system built around your unfair advantage",
    body: "Not a generic funnel. A precise acquisition architecture tuned to your offer, your margin, and the channels that compound instead of just spending.",
    outputs: ["Acquisition blueprint", "Channel stack", "Margin model"],
    accent: "#ef4444",
  },
  {
    num: "03",
    tag: "Execution",
    title: "Launched as one machine, not ten loose parts",
    body: "Copy, creative, campaigns, CRM, and tracking go live as one connected system. Every touchpoint coordinated. Every dollar attributed.",
    outputs: ["Full stack live", "Attribution wired", "Creative deployed"],
    accent: "#10b981",
  },
  {
    num: "04",
    tag: "Compounding",
    title: "The longer we run, the harder you are to beat",
    body: "Weekly intelligence loops feed better creative, tighter targeting, sharper spend — a brand moat that gets deeper and harder to copy every month.",
    outputs: ["Weekly intel loop", "Creative rotation", "Spend optimization"],
    accent: "#8b5cf6",
  },
];

const TOTAL = STEPS.length;

function ProcessCard({ step, index, scrollYProgress }) {
  // Adjusted thresholds to ensure cards "stack" properly
  const start = index / TOTAL;
  const end = (index + 1) / TOTAL;

  // y: Starts below screen, moves to 0, then slightly tucks behind the next card
  const y = useTransform(
    scrollYProgress,
    [start, start + 0.15, end],
    [600, 0, -index * 12],
  );

  const scale = useTransform(
    scrollYProgress,
    [start, start + 0.15, end],
    [0.8, 1, 1 - index * 0.03],
  );

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.05, end - 0.1, end],
    [0, 1, 1, 0.8],
  );

  return (
    <motion.article
      style={{
        position: "absolute",
        left: "50%",
        top: "50%", // Changed to top/translateY for better centering control
        x: "-50%",
        y: "-50%",
        translateY: y,
        scale,
        opacity,
        width: "min(93vw, 1000px)",
        height: "500px",
        transformOrigin: "50% 50%",
        willChange: "transform, opacity",
        zIndex: index,
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: "2.5rem",
          overflow: "hidden",
          background: "#0a0a0a",
          border: "1px solid rgba(255,255,255,0.07)",
          height: "100%",
          padding: "2.8rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "-0.06em",
            bottom: "-0.2em",
            fontFamily: "Syne, sans-serif",
            fontSize: "15rem",
            fontWeight: 800,
            color: "rgba(255,255,255,0.02)",
            pointerEvents: "none",
          }}
        >
          {step.num}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: step.accent,
                boxShadow: `0 0 12px ${step.accent}`,
              }}
            />
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "rgba(255,255,255,0.45)",
                textTransform: "uppercase",
              }}
            >
              {step.tag}
            </span>
          </div>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>
            {step.num} / 04
          </span>
        </div>

        <div style={{ zIndex: 1 }}>
          <h3
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 1rem",
            }}
          >
            {step.title}
          </h3>
          <p
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              color: "rgba(255,255,255,0.4)",
              maxWidth: "50ch",
              lineHeight: 1.6,
            }}
          >
            {step.body}
          </p>
        </div>

        <div style={{ display: "flex", gap: 8, zIndex: 1 }}>
          {step.outputs.map((item) => (
            <span
              key={item}
              style={{
                padding: "6px 14px",
                borderRadius: "99px",
                background: "rgba(255,255,255,0.05)",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Process() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: "#050505",
        height: "400vh", // Section length
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <header style={{ padding: "4rem", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "3rem",
              color: "#fff",
            }}
          >
            Four moves.{" "}
            <span style={{ color: "rgba(255,255,255,0.2)" }}>One system.</span>
          </h2>
        </header>

        <div style={{ position: "relative", height: "100%" }}>
          {STEPS.map((step, i) => (
            <ProcessCard
              key={step.num}
              step={step}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

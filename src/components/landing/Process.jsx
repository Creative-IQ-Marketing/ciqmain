import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const STEPS = [
  {
    num: "01",
    name: "Audit",
    tag: "Discovery",
    body: "We dissect your current digital presence  gaps, wins, missed revenue. No assumptions, just data and sharp eyes.",
    detail: [
      "Deep-dive competitor analysis",
      "Traffic & conversion audit",
      "Messaging + positioning review",
      "Revenue leak identification",
    ],
    proof: "Revenue leaks found in 72 hrs",
    proofSub: "avg. opportunities uncovered",
    orbColor: "#3B6FF0",
    accentRgb: "59,111,240",
    bars: [0.38, 0.61, 0.45],
  },
  {
    num: "02",
    name: "Architect",
    tag: "Strategy",
    body: "We map the exact growth system your business needs. Every channel, every dollar, every sequence  engineered before a single pixel moves.",
    detail: [
      "90-day growth blueprint",
      "Channel stack selection",
      "Funnel & automation design",
      "KPI framework + forecasting",
    ],
    proof: "90-day roadmap delivered",
    proofSub: "with full channel blueprint",
    orbColor: "#5B4FE9",
    accentRgb: "91,79,233",
    bars: [0.62, 0.78, 0.54],
  },
  {
    num: "03",
    name: "Execute",
    tag: "Build",
    body: "We build, deploy, and integrate at speed. No hand-holding required. Craft at every layer  from code to copy to campaign.",
    detail: [
      "Website + landing pages",
      "Ad campaigns live",
      "CRM + automation wired",
      "Content engine launched",
    ],
    proof: "Live & converting in 14 days",
    proofSub: "from kickoff to first lead",
    orbColor: "#7C3AED",
    accentRgb: "124,58,237",
    bars: [0.8, 0.65, 0.88],
  },
  {
    num: "04",
    name: "Compound",
    tag: "Scale",
    body: "We optimize relentlessly. Month after month, results compound. Your growth engine runs 24/7  we keep tuning the dials.",
    detail: [
      "A/B test every touch point",
      "Monthly strategy reviews",
      "Expand to new channels",
      "Revenue forecasting updates",
    ],
    proof: "3x average ROI in 6 months",
    proofSub: "across active clients",
    orbColor: "#2563EB",
    accentRgb: "37,99,235",
    bars: [0.92, 0.85, 0.95],
  },
];

export default function Process() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={sectionRef} style={{ height: "500vh", position: "relative" }}>
      <div
        id="process"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "#f7f6f1",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <style>{`
          @keyframes proc-float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          @keyframes proc-pulse-ring {
            0% { transform: scale(1); opacity: 0.6; }
            100% { transform: scale(1.8); opacity: 0; }
          }
          .proc-proof-card { animation: proc-float 4s ease-in-out infinite; }
          .proc-stage-rail,
          .proc-visual-cluster,
          .proc-scene-frame {
            display: block;
          }
          .proc-step-detail { display: none !important; }
          @media (max-width: 600px) {
            .proc-body-cols { flex-direction: column !important; gap: 1.5rem !important; }
            .proc-proof-card { display: none !important; }
            .proc-stage-rail,
            .proc-visual-cluster,
            .proc-scene-frame { display: none !important; }
          }
        `}</style>

        <PerspectiveGrid scrollYProgress={scrollYProgress} />
        <GlowOrb scrollYProgress={scrollYProgress} />
        <GhostNumber scrollYProgress={scrollYProgress} />
        <SceneFrame />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            maxWidth: 1100,
            margin: "0 auto",
            width: "100%",
            padding: "0 clamp(1.5rem, 5vw, 5rem)",
            position: "relative",
            zIndex: 2,
          }}
        >
          <StepRail scrollYProgress={scrollYProgress} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "clamp(2rem, 5vh, 3.5rem)",
              paddingBottom: "clamp(1.5rem, 3vh, 2.5rem)",
              borderBottom: "1px solid rgba(0,0,0,0.07)",
              marginBottom: "clamp(1.5rem, 3vh, 2rem)",
            }}
          >
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.68rem",
                fontWeight: 600,
                color: "#3B6FF0",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              How we work
            </p>
            <ProgressDots
              scrollYProgress={scrollYProgress}
              steps={STEPS.length}
            />
          </div>

          <div style={{ flex: 1, position: "relative" }}>
            {STEPS.map((step, i) => (
              <StepPanel
                key={step.num}
                step={step}
                index={i}
                total={STEPS.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        <ProgressBar scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}

function PerspectiveGrid({ scrollYProgress }) {
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  return (
    <motion.div
      style={{
        y: gridY,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "55%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.22,
        backgroundImage:
          "linear-gradient(rgba(59,111,240,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(59,111,240,0.18) 1px, transparent 1px)",
        backgroundSize: "clamp(40px,6vw,80px) clamp(40px,6vw,80px)",
        maskImage:
          "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
        transform: "perspective(600px) rotateX(55deg)",
        transformOrigin: "bottom center",
      }}
    />
  );
}

function GlowOrb({ scrollYProgress }) {
  const colors = STEPS.map((s) => s.orbColor);
  const orbX = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ["15%", "55%", "75%", "30%"],
  );
  const orbY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["60%", "40%", "55%"],
  );
  const color1 = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], colors);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: orbX,
        top: orbY,
        width: "clamp(260px, 35vw, 480px)",
        height: "clamp(260px, 35vw, 480px)",
        borderRadius: "50%",
        background: color1,
        filter: "blur(clamp(60px, 10vw, 120px))",
        opacity: 0.09,
        pointerEvents: "none",
        zIndex: 0,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
}

function GhostNumber({ scrollYProgress }) {
  const num = useTransform(scrollYProgress, [0, 0.99], [1, 4]);
  const skewX = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [-10, 4, -4, 10],
  );
  const translateX = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.06, 0.94, 1],
    [0, 0.1, 0.1, 0],
  );
  return (
    <motion.div
      style={{
        position: "absolute",
        right: "-3vw",
        top: "50%",
        translateY: "-50%",
        translateX,
        skewX,
        opacity,
        fontFamily: "Bricolage Grotesque, sans-serif",
        fontSize: "clamp(14rem, 30vw, 28rem)",
        fontWeight: 900,
        lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: "2px rgba(0,0,0,0.08)",
        textShadow:
          "4px 4px 0px rgba(59,111,240,0.05), 8px 8px 0px rgba(59,111,240,0.03), 12px 12px 0px rgba(59,111,240,0.02)",
        userSelect: "none",
        pointerEvents: "none",
        zIndex: 0,
        letterSpacing: "-0.06em",
      }}
    >
      <Counter value={num} />
    </motion.div>
  );
}

function Counter({ value }) {
  const display = useTransform(value, (v) =>
    String(Math.min(4, Math.max(1, Math.round(v)))),
  );
  return <motion.span>{display}</motion.span>;
}

function ProgressDots({ scrollYProgress, steps }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {Array.from({ length: steps }).map((_, i) => {
        const from = i / steps;
        const to = (i + 1) / steps;
        return (
          <ProgressDot
            key={i}
            scrollYProgress={scrollYProgress}
            from={from}
            to={to}
          />
        );
      })}
    </div>
  );
}

function ProgressDot({ scrollYProgress, from, to }) {
  const width = useTransform(scrollYProgress, [from, to], [6, 22]);
  const opacity = useTransform(scrollYProgress, [from, to], [0.3, 1]);
  return (
    <motion.div
      style={{
        width,
        height: 6,
        borderRadius: 3,
        background: "#3B6FF0",
        opacity,
      }}
    />
  );
}

function ProgressBar({ scrollYProgress }) {
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        background: "rgba(0,0,0,0.06)",
        zIndex: 10,
      }}
    >
      <motion.div
        style={{
          scaleX,
          transformOrigin: "left",
          height: "100%",
          background: "linear-gradient(90deg, #3B6FF0, #7C3AED)",
          boxShadow: "0 0 12px rgba(59,111,240,0.5)",
        }}
      />
    </div>
  );
}

function SceneFrame() {
  return (
    <div
      className="proc-scene-frame"
      style={{
        position: "absolute",
        inset: "clamp(2rem, 5vw, 3.5rem)",
        border: "1px solid rgba(59,111,240,0.08)",
        borderRadius: 28,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {[
        { top: 20, left: 20 },
        { top: 20, right: 20 },
        { bottom: 20, left: 20 },
        { bottom: 20, right: 20 },
      ].map((corner, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            width: 28,
            height: 28,
            borderTop:
              corner.top !== undefined
                ? "1px solid rgba(59,111,240,0.28)"
                : "none",
            borderLeft:
              corner.left !== undefined
                ? "1px solid rgba(59,111,240,0.28)"
                : "none",
            borderRight:
              corner.right !== undefined
                ? "1px solid rgba(59,111,240,0.28)"
                : "none",
            borderBottom:
              corner.bottom !== undefined
                ? "1px solid rgba(59,111,240,0.28)"
                : "none",
            ...corner,
          }}
        />
      ))}
    </div>
  );
}

function StepRail({ scrollYProgress }) {
  return (
    <div
      className="proc-stage-rail"
      style={{
        position: "absolute",
        left: "-0.5rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 3,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          padding: "14px 10px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.52)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(59,111,240,0.1)",
          boxShadow: "0 12px 30px rgba(13,13,20,0.06)",
        }}
      >
        {STEPS.map((step, index) => (
          <RailNode
            key={step.num}
            scrollYProgress={scrollYProgress}
            step={step}
            index={index}
            total={STEPS.length}
          />
        ))}
      </div>
    </div>
  );
}

function RailNode({ scrollYProgress, step, index, total }) {
  const start = index / total;
  const mid = start + 1 / (total * 2);
  const scale = useTransform(
    scrollYProgress,
    [start, mid, start + 1 / total],
    [0.9, 1.2, 0.9],
  );
  const opacity = useTransform(
    scrollYProgress,
    [start, mid, start + 1 / total],
    [0.35, 1, 0.45],
  );

  return (
    <motion.div
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: step.orbColor,
        boxShadow: `0 0 0 4px rgba(${step.accentRgb},0.08)`,
        scale,
        opacity,
      }}
    />
  );
}

function ProofCard({ step, accentRgb }) {
  return (
    <div
      className="proc-proof-card"
      style={{
        position: "absolute",
        right: "clamp(1rem, 8vw, 6rem)",
        bottom: "clamp(4rem, 10vh, 7rem)",
        background: "rgba(255,255,255,0.78)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1px solid rgba(" + accentRgb + ",0.18)",
        borderRadius: 16,
        padding: "18px 24px",
        boxShadow:
          "0 24px 60px rgba(" +
          accentRgb +
          ",0.14), 0 4px 16px rgba(0,0,0,0.06)",
        minWidth: 220,
        maxWidth: 260,
        zIndex: 3,
      }}
    >
      <div
        style={{
          position: "relative",
          display: "inline-block",
          marginBottom: 10,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "rgba(" + accentRgb + ",1)",
            position: "relative",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1.5px solid rgba(" + accentRgb + ",0.5)",
            animation: "proc-pulse-ring 1.8s ease-out infinite",
          }}
        />
      </div>
      <p
        style={{
          fontFamily: "Bricolage Grotesque, sans-serif",
          fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
          fontWeight: 800,
          color: "#0d0d14",
          letterSpacing: "-0.02em",
          margin: "0 0 4px",
          lineHeight: 1.2,
        }}
      >
        {step.proof}
      </p>
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.68rem",
          color: "rgba(0,0,0,0.38)",
          margin: 0,
          letterSpacing: "0.02em",
        }}
      >
        {step.proofSub}
      </p>
    </div>
  );
}

function StepPanel({ step, index, total, scrollYProgress }) {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, start - 0.02),
      start + 0.04,
      end - 0.04,
      Math.min(1, end + 0.01),
    ],
    [0, 1, 1, index === total - 1 ? 1 : 0],
  );
  const y = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.03), start + 0.05],
    [50, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.03), start + 0.05],
    [0.97, 1],
  );
  const tagY = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.01), start + 0.06],
    [24, 0],
  );
  const cardOpacity = useTransform(
    scrollYProgress,
    [start + 0.05, start + 0.12, end - 0.08, end],
    [0, 1, 1, index === total - 1 ? 1 : 0],
  );
  const cardY = useTransform(
    scrollYProgress,
    [start + 0.05, start + 0.12],
    [30, 0],
  );
  const clusterOpacity = useTransform(
    scrollYProgress,
    [start + 0.02, start + 0.1, end - 0.08, end],
    [0, 1, 1, index === total - 1 ? 1 : 0],
  );
  const clusterX = useTransform(
    scrollYProgress,
    [start + 0.03, start + 0.1],
    [24, 0],
  );

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingBottom: "clamp(1rem, 3vh, 2rem)",
        pointerEvents: "none",
      }}
    >
      <motion.div style={{ y: tagY }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: "clamp(0.8rem, 2vh, 1.5rem)",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "rgba(" + step.accentRgb + ",0.1)",
              border: "1px solid rgba(" + step.accentRgb + ",0.25)",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.58rem",
              fontWeight: 800,
              color: step.orbColor,
              letterSpacing: "0.06em",
              flexShrink: 0,
            }}
          >
            {step.num}
          </span>
          <span
            style={{
              width: 28,
              height: 1,
              background: "rgba(" + step.accentRgb + ",0.25)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.62rem",
              fontWeight: 600,
              color: "rgba(0,0,0,0.3)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {step.tag}
          </span>
        </div>
      </motion.div>

      <div
        style={{
          overflow: "hidden",
          marginBottom: "clamp(0.8rem, 2vh, 1.5rem)",
        }}
      >
        <motion.h2
          style={{
            fontFamily: "Bricolage Grotesque, sans-serif",
            fontSize: "clamp(3.5rem, 9vw, 8rem)",
            fontWeight: 800,
            letterSpacing: "-0.05em",
            lineHeight: 0.95,
            color: "#0d0d14",
            margin: 0,
            textShadow: "2px 6px 24px rgba(" + step.accentRgb + ",0.12)",
          }}
        >
          {step.name}
        </motion.h2>
      </div>

      <div
        className="proc-body-cols"
        style={{
          display: "flex",
          gap: "clamp(2rem, 6vw, 6rem)",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(0.88rem, 1.25vw, 1.02rem)",
            color: "rgba(0,0,0,0.42)",
            lineHeight: 1.75,
            maxWidth: 380,
            margin: 0,
            flex: "0 1 380px",
          }}
        >
          {step.body}
        </p>
        <ul
          className="proc-step-detail"
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            flex: "1 1 220px",
          }}
        >
          {step.detail.map((d) => (
            <li
              key={d}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(0.78rem, 1vw, 0.88rem)",
                color: "rgba(0,0,0,0.5)",
                lineHeight: 1.5,
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: step.orbColor,
                  flexShrink: 0,
                  boxShadow: "0 0 6px " + step.orbColor + "88",
                }}
              />
              {d}
            </li>
          ))}
        </ul>
      </div>

      <motion.div
        className="proc-visual-cluster"
        style={{
          opacity: clusterOpacity,
          x: clusterX,
          position: "absolute",
          right: "clamp(1rem, 7vw, 5rem)",
          top: "clamp(8rem, 18vh, 10rem)",
          width: "clamp(230px, 26vw, 320px)",
          height: "clamp(230px, 28vw, 340px)",
          pointerEvents: "none",
        }}
      >
        <VisualCluster
          step={step}
          scrollYProgress={scrollYProgress}
          start={start}
          end={end}
        />
      </motion.div>

      <motion.div
        style={{
          opacity: cardOpacity,
          y: cardY,
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <ProofCard step={step} accentRgb={step.accentRgb} />
      </motion.div>
    </motion.div>
  );
}

function AnimatedBar({
  targetWidth,
  scrollYProgress,
  start,
  end,
  accentRgb,
  delay,
}) {
  const clampedEnd = Math.min(end, 1);
  const pct = useTransform(
    scrollYProgress,
    [Math.max(0, start), Math.min(clampedEnd, start + 0.18)],
    ["0%", `${targetWidth * 100}%`],
  );
  return (
    <div
      style={{
        height: 7,
        borderRadius: 999,
        background: `rgba(${accentRgb},0.1)`,
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          width: pct,
          height: "100%",
          borderRadius: 999,
          background: `linear-gradient(90deg, rgba(${accentRgb},0.95), rgba(${accentRgb},0.16))`,
        }}
      />
    </div>
  );
}

function VisualCluster({ step, scrollYProgress, start, end }) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: "18% 8% 8% 18%",
          borderRadius: 22,
          background: "rgba(255,255,255,0.52)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid rgba(${step.accentRgb},0.14)`,
          boxShadow: `0 24px 70px rgba(${step.accentRgb},0.1), 0 8px 24px rgba(13,13,20,0.06)`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(rgba(${step.accentRgb},0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(${step.accentRgb},0.08) 1px, transparent 1px)`,
            backgroundSize: "22px 22px",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "12%",
            top: "14%",
            width: "46%",
            height: "38%",
            borderRadius: "50%",
            border: `1px solid rgba(${step.accentRgb},0.2)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "19%",
            top: "21%",
            width: "32%",
            height: "24%",
            borderRadius: "50%",
            border: `1px solid rgba(${step.accentRgb},0.3)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "12%",
            top: "18%",
            width: 48,
            height: 48,
            borderRadius: 14,
            background: `linear-gradient(135deg, rgba(${step.accentRgb},0.18), rgba(255,255,255,0.5))`,
            border: `1px solid rgba(${step.accentRgb},0.2)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "12%",
            right: "12%",
            bottom: "16%",
            display: "grid",
            gap: 10,
          }}
        >
          {step.bars.map((targetWidth, index) => (
            <AnimatedBar
              key={index}
              targetWidth={targetWidth}
              scrollYProgress={scrollYProgress}
              start={start}
              end={end}
              accentRgb={step.accentRgb}
              delay={index * 0.08}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          top: "16%",
          width: "34%",
          height: "28%",
          borderRadius: 20,
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: `1px solid rgba(${step.accentRgb},0.14)`,
          boxShadow: `0 18px 50px rgba(${step.accentRgb},0.08)`,
          display: "grid",
          placeItems: "center",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(${step.accentRgb},0.95) 0%, rgba(${step.accentRgb},0.18) 58%, transparent 72%)`,
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: "8%",
          width: "28%",
          height: "22%",
          borderRadius: 18,
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: `1px solid rgba(${step.accentRgb},0.14)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        {[0.45, 0.8, 0.6].map((height, index) => (
          <div
            key={index}
            style={{
              width: 10,
              height: `${height * 44}px`,
              borderRadius: 999,
              background: `rgba(${step.accentRgb},${0.28 + index * 0.18})`,
            }}
          />
        ))}
      </div>
    </>
  );
}

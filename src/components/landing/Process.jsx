import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const STEPS = [
  {
    num: "01",
    tag: "Diagnose",
    title: "Audit what is blocking growth",
    body: "We review your website, search visibility, paid traffic, messaging, and follow-up flow to find the exact places revenue is leaking.",
    outputs: ["traffic audit", "offer clarity", "tracking plan"],
    stat: "48-72 hour audit",
    accent: "#2563EB",
    accentRgb: "37,99,235",
    surface: "rgba(232,240,255,0.92)",
  },
  {
    num: "02",
    tag: "Architect",
    title: "Build the right marketing system",
    body: "We turn the findings into a focused acquisition plan across SEO, paid media, content, CRM, and conversion paths that actually support each other.",
    outputs: ["90-day roadmap", "channel priorities", "crm logic"],
    stat: "Roadmap approved fast",
    accent: "#1D4ED8",
    accentRgb: "29,78,216",
    surface: "rgba(238,244,255,0.95)",
  },
  {
    num: "03",
    tag: "Launch",
    title: "Ship assets that move revenue",
    body: "Pages, campaigns, automations, reporting, and follow-up get launched as one connected system instead of separate deliverables that never talk.",
    outputs: ["site live", "ads active", "automation live"],
    stat: "Launch in 14 days",
    accent: "#0F172A",
    accentRgb: "15,23,42",
    surface: "rgba(244,246,249,0.96)",
  },
  {
    num: "04",
    tag: "Optimize",
    title: "Scale what is already winning",
    body: "Once the system is live, we tighten the message, reallocate spend, improve conversion points, and expand what is producing the best return.",
    outputs: ["weekly testing", "clear reporting", "budget shifts"],
    stat: "Monthly compounding gains",
    accent: "#1E40AF",
    accentRgb: "30,64,175",
    surface: "rgba(233,241,255,0.92)",
  },
];

const DOT_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'%3E%3Ccircle cx='1.5' cy='1.5' r='1.1' fill='rgba(15,23,42,0.16)'/%3E%3C/svg%3E\")";

export default function Process() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Fix iOS Safari 100vh — set exact pixel height on mount
  useEffect(() => {
    if (stickyRef.current) {
      stickyRef.current.style.height = `${window.innerHeight}px`;
    }
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{
        position: "relative",
        height: "500vh",
        background: "#f5f1e8",
      }}
    >
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Dot pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.4,
            backgroundImage: DOT_PATTERN,
            backgroundSize: "18px 18px",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <BackdropOrbs scrollYProgress={scrollYProgress} />

        {/* Header */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            flexShrink: 0,
            textAlign: "center",
            padding:
              "clamp(2.5rem, 5vh, 4.5rem) clamp(1rem, 4vw, 3rem) clamp(1rem, 2.5vh, 2rem)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "Inter, sans-serif",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#2563EB",
            }}
          >
            How we work
          </p>
          <h2
            style={{
              margin: "12px 0 0",
              fontFamily: "Bricolage Grotesque, sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 3.75rem)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 1.08,
              color: "#101828",
            }}
          >
            Every service layer earns its place.
          </h2>
        </div>

        {/* 3D Card Stage — flex: 1 fills space between header and progress */}
        <div
          style={{
            position: "relative",
            flex: 1,
            overflow: "hidden",
            zIndex: 3,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              perspective: "1400px",
              perspectiveOrigin: "50% 50%",
            }}
          >
            {STEPS.map((step, index) => (
              <SliderCard
                key={step.num}
                step={step}
                index={index}
                total={STEPS.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Step progress dots */}
        <div
          style={{
            position: "relative",
            zIndex: 4,
            flexShrink: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "clamp(1.5rem, 4vw, 3rem)",
            padding:
              "clamp(1.25rem, 3vh, 2rem) 1rem clamp(1.75rem, 4vh, 3rem)",
          }}
        >
          {STEPS.map((step, index) => (
            <StepDot
              key={step.num}
              step={step}
              index={index}
              total={STEPS.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BackdropOrbs({ scrollYProgress }) {
  const blueX = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const blueY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const darkX = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const darkY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <>
      <motion.div
        style={{
          position: "absolute",
          left: "12%",
          top: "22%",
          x: blueX,
          y: blueY,
          width: "clamp(220px, 32vw, 420px)",
          height: "clamp(220px, 32vw, 420px)",
          borderRadius: "50%",
          background: "rgba(37,99,235,0.1)",
          filter: "blur(100px)",
          translate: "-50% -50%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          left: "80%",
          top: "72%",
          x: darkX,
          y: darkY,
          width: "clamp(200px, 28vw, 360px)",
          height: "clamp(200px, 28vw, 360px)",
          borderRadius: "50%",
          background: "rgba(15,23,42,0.07)",
          filter: "blur(90px)",
          translate: "-50% -50%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    </>
  );
}

function SliderCard({ step, index, total, scrollYProgress }) {
  const seg = 1 / total;
  const segStart = index * seg;
  const segEnd = (index + 1) * seg;
  const segMid = (segStart + segEnd) / 2;
  const t = seg * 0.45;

  // Keyframe points along scrollYProgress
  const pts = [
    Math.max(0, segStart - t),
    segStart + t * 0.4,
    segMid,
    segEnd - t * 0.4,
    Math.min(1, segEnd + t),
  ];

  const x = useTransform(scrollYProgress, pts, [1100, 340, 0, -340, -1100]);
  const rotateY = useTransform(scrollYProgress, pts, [-28, -12, 0, 12, 28]);
  const scale = useTransform(scrollYProgress, pts, [0.82, 0.91, 1, 0.91, 0.82]);
  const opacity = useTransform(scrollYProgress, pts, [0, 0.8, 1, 0.8, 0]);
  const zIndex = useTransform(scrollYProgress, (v) =>
    v >= segStart - 0.01 && v <= segEnd + 0.01 ? 10 : 1
  );

  return (
    <motion.article
      style={{
        // Center in the stage using CSS individual transform + Framer Motion x
        position: "absolute",
        left: "50%",
        top: "50%",
        translate: "-50% -50%",
        width: "min(580px, 88vw)",
        x,
        rotateY,
        scale,
        opacity,
        zIndex,
        transformOrigin: "center center",
        willChange: "transform, opacity",
        // Card visuals
        borderRadius: 28,
        background: step.surface,
        border: `1px solid rgba(${step.accentRgb}, 0.18)`,
        boxShadow:
          "0 32px 80px rgba(16,24,40,0.14), inset 0 1px 0 rgba(255,255,255,0.85)",
        padding: "clamp(1.75rem, 3.5vw, 2.75rem)",
      }}
    >
      {/* Tag + step number */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 18,
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "Inter, sans-serif",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: step.accent,
          }}
        >
          {step.tag}
        </p>
        <span
          style={{
            fontFamily: "Bricolage Grotesque, sans-serif",
            fontSize: "1rem",
            fontWeight: 800,
            color: "rgba(16,24,40,0.22)",
            flexShrink: 0,
          }}
        >
          {step.num}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          margin: "0 0 14px",
          fontFamily: "Bricolage Grotesque, sans-serif",
          fontSize: "clamp(1.55rem, 3vw, 2.3rem)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1.05,
          color: "#101828",
          maxWidth: 480,
        }}
      >
        {step.title}
      </h3>

      {/* Body */}
      <p
        style={{
          margin: "0 0 20px",
          fontFamily: "Inter, sans-serif",
          fontSize: "clamp(0.88rem, 1.4vw, 0.95rem)",
          lineHeight: 1.74,
          color: "rgba(16,24,40,0.64)",
          maxWidth: 520,
        }}
      >
        {step.body}
      </p>

      {/* Output pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {step.outputs.map((item) => (
          <span
            key={item}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "7px 12px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.8)",
              border: `1px solid rgba(${step.accentRgb}, 0.14)`,
              fontFamily: "Inter, sans-serif",
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "#101828",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: step.accent,
                flexShrink: 0,
              }}
            />
            {item}
          </span>
        ))}
      </div>

      {/* Milestone */}
      <div
        style={{
          marginTop: 20,
          paddingTop: 16,
          borderTop: `1px solid rgba(${step.accentRgb}, 0.1)`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(16,24,40,0.38)",
          }}
        >
          milestone
        </span>
        <span
          style={{
            fontFamily: "Bricolage Grotesque, sans-serif",
            fontSize: "0.92rem",
            fontWeight: 800,
            color: step.accent,
            letterSpacing: "-0.02em",
          }}
        >
          {step.stat}
        </span>
      </div>
    </motion.article>
  );
}

function StepDot({ step, index, total, scrollYProgress }) {
  const seg = 1 / total;
  const segStart = index * seg;
  const segEnd = (index + 1) * seg;
  const segMid = (segStart + segEnd) / 2;
  const pad = seg * 0.35;

  const dotScale = useTransform(
    scrollYProgress,
    [Math.max(0, segStart - pad), segMid, Math.min(1, segEnd + pad)],
    [1, 1.6, 1]
  );
  const dotOpacity = useTransform(
    scrollYProgress,
    [Math.max(0, segStart - pad), segMid, Math.min(1, segEnd + pad)],
    [0.28, 1, 0.28]
  );
  const labelOpacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, segStart - pad * 1.2),
      segMid,
      Math.min(1, segEnd + pad * 1.2),
    ],
    [0.35, 1, 0.35]
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <motion.div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: step.accent,
          scale: dotScale,
          opacity: dotOpacity,
        }}
      />
      <motion.p
        style={{
          margin: 0,
          fontFamily: "Inter, sans-serif",
          fontSize: "0.62rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#101828",
          opacity: labelOpacity,
        }}
      >
        {step.tag}
      </motion.p>
    </div>
  );
}

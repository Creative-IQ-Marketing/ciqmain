import { useRef } from "react";
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
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{
        position: "relative",
        height: "330vh",
        background: "#f5f1e8",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <style>{`
          .proc-shell {
            display: grid;
            grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
            gap: clamp(1.5rem, 4vw, 3rem);
            align-items: start;
          }
          .proc-card-stack,
          .proc-system-panel {
            position: relative;
            min-height: clamp(460px, 62vh, 620px);
          }
          @media (max-width: 920px) {
            .proc-shell {
              grid-template-columns: 1fr;
            }
            .proc-card-stack,
            .proc-system-panel {
              min-height: 420px;
            }
          }
          @media (max-width: 640px) {
            .proc-card-stack,
            .proc-system-panel {
              min-height: 380px;
            }
          }
        `}</style>

        <BackdropOrbs scrollYProgress={scrollYProgress} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.45,
            backgroundImage: DOT_PATTERN,
            backgroundSize: "18px 18px",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1200,
            margin: "0 auto",
            padding:
              "clamp(2.5rem, 6vw, 5rem) clamp(1.25rem, 4vw, 4rem) clamp(2rem, 4vw, 3rem)",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              gap: 20,
              flexWrap: "wrap",
              marginBottom: "clamp(1.75rem, 4vw, 2.5rem)",
            }}
          >
            <div style={{ maxWidth: 740 }}>
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
                  margin: "14px 0 0",
                  fontFamily: "Bricolage Grotesque, sans-serif",
                  fontSize: "clamp(2rem, 4.4vw, 4.35rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.05em",
                  lineHeight: 0.96,
                  color: "#101828",
                  maxWidth: 760,
                }}
              >
                Every service layer earns its place.
              </h2>
            </div>

            <p
              style={{
                margin: 0,
                maxWidth: 360,
                fontFamily: "Inter, sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.72,
                color: "rgba(16,24,40,0.62)",
              }}
            >
              We do not sell disconnected tasks. We build one operating system
              for search, ads, website conversion, CRM follow-up, and reporting.
            </p>
          </div>

          <div className="proc-shell">
            <div className="proc-card-stack">
              {STEPS.map((step, index) => (
                <StepCard
                  key={step.num}
                  step={step}
                  index={index}
                  total={STEPS.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>

            <div className="proc-system-panel">
              <SystemPanel scrollYProgress={scrollYProgress} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BackdropOrbs({ scrollYProgress }) {
  const blueX = useTransform(scrollYProgress, [0, 1], ["12%", "56%"]);
  const blueY = useTransform(scrollYProgress, [0, 1], ["18%", "58%"]);
  const darkX = useTransform(scrollYProgress, [0, 1], ["78%", "46%"]);
  const darkY = useTransform(scrollYProgress, [0, 1], ["74%", "30%"]);

  return (
    <>
      <motion.div
        style={{
          position: "absolute",
          left: blueX,
          top: blueY,
          width: "clamp(220px, 30vw, 390px)",
          height: "clamp(220px, 30vw, 390px)",
          borderRadius: "50%",
          background: "rgba(37,99,235,0.12)",
          filter: "blur(92px)",
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          left: darkX,
          top: darkY,
          width: "clamp(210px, 28vw, 340px)",
          height: "clamp(210px, 28vw, 340px)",
          borderRadius: "50%",
          background: "rgba(15,23,42,0.08)",
          filter: "blur(84px)",
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
        }}
      />
    </>
  );
}

function StepCard({ step, index, total, scrollYProgress }) {
  const start = index / total;
  const mid = start + 0.13;
  const end = (index + 1) / total;
  const baseY = index * 76;
  const y = useTransform(
    scrollYProgress,
    [start, mid, end],
    [baseY + 86, baseY, baseY - 18],
  );
  const scale = useTransform(
    scrollYProgress,
    [start, mid, end],
    [0.95, 1, 0.975],
  );
  const rotate = useTransform(
    scrollYProgress,
    [start, mid, end],
    [index % 2 === 0 ? -7 : 7, 0, index % 2 === 0 ? -2 : 2],
  );
  const opacity = useTransform(
    scrollYProgress,
    [start, mid, end],
    [0.5, 1, 0.76],
  );

  return (
    <motion.article
      style={{
        position: "absolute",
        inset: 0,
        y,
        scale,
        rotate,
        opacity,
        zIndex: total - index,
        padding: "clamp(1.25rem, 2.3vw, 1.9rem)",
        borderRadius: 26,
        border: `1px solid rgba(${step.accentRgb}, 0.16)`,
        background: step.surface,
        boxShadow:
          "0 24px 56px rgba(16,24,40,0.1), inset 0 1px 0 rgba(255,255,255,0.72)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          gap: 12,
          marginBottom: 22,
        }}
      >
        <div>
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
          <h3
            style={{
              margin: "10px 0 0",
              fontFamily: "Bricolage Grotesque, sans-serif",
              fontSize: "clamp(1.45rem, 2.1vw, 2.15rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
              color: "#101828",
              maxWidth: 430,
            }}
          >
            {step.title}
          </h3>
        </div>

        <div
          style={{
            minWidth: 64,
            textAlign: "right",
            fontFamily: "Bricolage Grotesque, sans-serif",
            fontSize: "1rem",
            fontWeight: 800,
            color: "rgba(16,24,40,0.28)",
          }}
        >
          {step.num}
        </div>
      </div>

      <p
        style={{
          margin: 0,
          maxWidth: 520,
          fontFamily: "Inter, sans-serif",
          fontSize: "0.95rem",
          lineHeight: 1.76,
          color: "rgba(16,24,40,0.66)",
        }}
      >
        {step.body}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginTop: 24,
        }}
      >
        {step.outputs.map((item) => (
          <span
            key={item}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 12px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.74)",
              border: `1px solid rgba(${step.accentRgb}, 0.14)`,
              fontFamily: "Inter, sans-serif",
              fontSize: "0.74rem",
              fontWeight: 600,
              color: "#101828",
              letterSpacing: "0.02em",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: step.accent,
                boxShadow: `0 0 0 5px rgba(${step.accentRgb}, 0.08)`,
              }}
            />
            {item}
          </span>
        ))}
      </div>

      <div
        style={{
          marginTop: 28,
          paddingTop: 18,
          borderTop: "1px solid rgba(16,24,40,0.08)",
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(16,24,40,0.42)",
          }}
        >
          system milestone
        </span>
        <span
          style={{
            fontFamily: "Bricolage Grotesque, sans-serif",
            fontSize: "1rem",
            fontWeight: 800,
            color: step.accent,
            letterSpacing: "-0.03em",
          }}
        >
          {step.stat}
        </span>
      </div>
    </motion.article>
  );
}

function SystemPanel({ scrollYProgress }) {
  const frameY = useTransform(scrollYProgress, [0, 1], [0, -16]);

  return (
    <motion.div
      style={{
        y: frameY,
        position: "relative",
        height: "100%",
        borderRadius: 32,
        padding: "clamp(1.25rem, 2.2vw, 2rem)",
        background: "rgba(255,255,255,0.72)",
        border: "1px solid rgba(16,24,40,0.08)",
        boxShadow: "0 26px 72px rgba(16,24,40,0.1)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: DOT_PATTERN,
          backgroundSize: "18px 18px",
          opacity: 0.22,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18,
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              fontFamily: "Inter, sans-serif",
              fontSize: "0.66rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(16,24,40,0.45)",
            }}
          >
            system state
          </p>
          <p
            style={{
              margin: "10px 0 0",
              fontFamily: "Bricolage Grotesque, sans-serif",
              fontSize: "clamp(1.35rem, 2vw, 1.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#101828",
            }}
          >
            One connected growth engine.
          </p>
        </div>

        <ProgressLedger scrollYProgress={scrollYProgress} />
      </div>

      <div
        style={{
          position: "relative",
          height: "calc(100% - 110px)",
          minHeight: 280,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "6% 7% 4%",
            borderRadius: 30,
            background: "rgba(16,24,40,0.05)",
            border: "1px solid rgba(16,24,40,0.06)",
          }}
        />

        {STEPS.map((step, index) => (
          <SystemCard
            key={step.num}
            step={step}
            index={index}
            total={STEPS.length}
            scrollYProgress={scrollYProgress}
          />
        ))}

        <div
          style={{
            position: "absolute",
            left: "7%",
            right: "7%",
            bottom: "8%",
            height: "44%",
            borderRadius: 28,
            background: "rgba(16,24,40,0.96)",
            boxShadow: "0 24px 60px rgba(16,24,40,0.3)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(37,99,235,0.08)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 20,
              right: 20,
              top: 18,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.66rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              CIQ system
            </span>
            <span
              style={{
                fontFamily: "Bricolage Grotesque, sans-serif",
                fontSize: "0.95rem",
                fontWeight: 800,
              }}
            >
              4 aligned layers
            </span>
          </div>

          <div
            style={{
              position: "absolute",
              left: 20,
              right: 20,
              bottom: 20,
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 8,
            }}
          >
            {STEPS.map((step) => (
              <div
                key={step.num}
                style={{
                  height: 10,
                  borderRadius: 999,
                  background: `rgba(${step.accentRgb}, 0.24)`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SystemCard({ step, index, total, scrollYProgress }) {
  const start = index / total;
  const mid = start + 0.16;
  const end = (index + 1) / total;
  const x = useTransform(scrollYProgress, [start, mid, end], [46, 0, -10]);
  const y = useTransform(
    scrollYProgress,
    [start, mid, end],
    [30 + index * 14, -10 - index * 8, -20 - index * 6],
  );
  const rotate = useTransform(
    scrollYProgress,
    [start, mid, end],
    [10 - index * 2, 0, -2],
  );
  const opacity = useTransform(
    scrollYProgress,
    [start, mid, end],
    [0.42, 1, 0.72],
  );
  const scale = useTransform(
    scrollYProgress,
    [start, mid, end],
    [0.9, 1, 0.98],
  );

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "11%",
        right: "11%",
        top: `${14 + index * 6}%`,
        height: "31%",
        x,
        y,
        rotate,
        scale,
        opacity,
        zIndex: total - index,
        borderRadius: 24,
        background: step.surface,
        border: `1px solid rgba(${step.accentRgb}, 0.22)`,
        boxShadow: "0 18px 40px rgba(16,24,40,0.12)",
        padding: "1rem 1rem 0.95rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
      >
        <div>
          <p
            style={{
              margin: 0,
              fontFamily: "Inter, sans-serif",
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: step.accent,
            }}
          >
            {step.tag}
          </p>
          <p
            style={{
              margin: "8px 0 0",
              fontFamily: "Bricolage Grotesque, sans-serif",
              fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#101828",
            }}
          >
            {step.title}
          </p>
        </div>
        <span
          style={{
            fontFamily: "Bricolage Grotesque, sans-serif",
            fontSize: "0.9rem",
            fontWeight: 800,
            color: "rgba(16,24,40,0.32)",
          }}
        >
          {step.num}
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 6,
        }}
      >
        {step.outputs.map((item) => (
          <div
            key={item}
            style={{
              borderRadius: 999,
              background: "rgba(255,255,255,0.72)",
              border: `1px solid rgba(${step.accentRgb}, 0.14)`,
              padding: "7px 8px",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.63rem",
              fontWeight: 700,
              color: "rgba(16,24,40,0.7)",
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ProgressLedger({ scrollYProgress }) {
  return (
    <div
      style={{
        display: "grid",
        gap: 8,
        minWidth: 180,
      }}
    >
      {STEPS.map((step, index) => (
        <LedgerRow
          key={step.num}
          step={step}
          index={index}
          total={STEPS.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function LedgerRow({ step, index, total, scrollYProgress }) {
  const start = index / total;
  const end = (index + 1) / total;
  const scaleX = useTransform(scrollYProgress, [start, end], [0.35, 1]);
  const opacity = useTransform(scrollYProgress, [start, end], [0.4, 1]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 6,
          gap: 10,
        }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.66rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(16,24,40,0.55)",
          }}
        >
          {step.tag}
        </span>
        <span
          style={{
            fontFamily: "Bricolage Grotesque, sans-serif",
            fontSize: "0.8rem",
            fontWeight: 800,
            color: step.accent,
          }}
        >
          {step.num}
        </span>
      </div>
      <div
        style={{
          height: 9,
          borderRadius: 999,
          background: "rgba(16,24,40,0.08)",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            scaleX,
            opacity,
            transformOrigin: "left",
            height: "100%",
            borderRadius: 999,
            background: step.accent,
            boxShadow: `0 0 18px rgba(${step.accentRgb}, 0.24)`,
          }}
        />
      </div>
    </div>
  );
}

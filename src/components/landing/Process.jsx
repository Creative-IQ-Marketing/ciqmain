import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const STEPS = [
  {
    num: "01",
    tag: "Intelligence",
    title: "We find what your market has not said yet",
    body: "Behavioral signals, search intent, competitor blind spots. We surface the pattern your audience is already broadcasting before rivals turn toward it.",
    outputs: ["search intent map", "audience signals", "gap analysis"],
    kicker: "The signal before the market moves",
    accent: "#1d4ed8",
    accentSoft: "rgba(29,78,216,0.12)",
    panel: "linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%)",
  },
  {
    num: "02",
    tag: "Strategy",
    title: "A growth system built around your unfair advantage",
    body: "Not a generic funnel. A precise acquisition architecture tuned to your offer, margin, and the channels that can actually compound instead of just spending harder.",
    outputs: ["acquisition blueprint", "channel stack", "margin model"],
    kicker: "Precision over volume",
    accent: "#b91c1c",
    accentSoft: "rgba(185,28,28,0.12)",
    panel: "linear-gradient(180deg, #fff8f8 0%, #fff0f0 100%)",
  },
  {
    num: "03",
    tag: "Execution",
    title: "Launched as one machine, not ten loose parts",
    body: "Copy, creative, campaigns, CRM, and tracking go live as one connected system. Every touchpoint is coordinated. Every dollar has attribution. Every step has a purpose.",
    outputs: ["full stack live", "attribution set", "creative suite"],
    kicker: "Ship in 14 days flat",
    accent: "#047857",
    accentSoft: "rgba(4,120,87,0.12)",
    panel: "linear-gradient(180deg, #f6fffb 0%, #ebfff6 100%)",
  },
  {
    num: "04",
    tag: "Compounding",
    title: "The longer we run, the harder it gets to beat you",
    body: "Weekly intelligence loops feed better creative, tighter targeting, sharper spend allocation, and a brand moat that gets more difficult to copy every month.",
    outputs: ["weekly intel loop", "creative rotation", "spend reallocation"],
    kicker: "Compounding, not maintenance",
    accent: "#6d28d9",
    accentSoft: "rgba(109,40,217,0.12)",
    panel: "linear-gradient(180deg, #fbf8ff 0%, #f3ecff 100%)",
  },
];

const PROCESS_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

  .process-shell {
    position: relative;
    background:
      radial-gradient(circle at 20% 12%, rgba(29,78,216,0.08), transparent 34%),
      radial-gradient(circle at 82% 76%, rgba(109,40,217,0.08), transparent 28%),
      linear-gradient(180deg, #ffffff 0%, #f6f7fb 100%);
  }

  .process-shell::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, rgba(15,23,42,0.055) 1px, transparent 1px);
    background-size: 32px 32px;
    opacity: 0.35;
  }

  .process-card {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(220px, 0.75fr);
    gap: clamp(1.5rem, 2.8vw, 2.5rem);
  }

  @media (max-width: 900px) {
    .process-card {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .process-step-band {
      padding-top: 1.1rem !important;
      padding-bottom: 1.1rem !important;
    }

    .process-stage {
      padding-top: 11.5rem !important;
    }

    .process-step-card {
      width: min(94vw, 760px) !important;
      min-height: 420px !important;
    }
  }
`;

function ProcessCard({ step, index, scrollYProgress, reduceMotion }) {
  const total = STEPS.length;
  const start = index / total;
  const end = (index + 1) / total;
  const localStart = Math.max(0, start - 0.08);
  const localMid = start + 0.11;
  const localEnd = Math.min(1, end + 0.12);

  const y = useTransform(
    scrollYProgress,
    [localStart, localMid, localEnd],
    reduceMotion ? [0, 0, -index * 18] : [360, 0, -index * 22],
  );
  const scale = useTransform(
    scrollYProgress,
    [localStart, localMid, localEnd],
    reduceMotion ? [1, 1, 1 - index * 0.03] : [0.94, 1, 1 - index * 0.045],
  );
  const rotateX = useTransform(
    scrollYProgress,
    [localStart, localMid, localEnd],
    reduceMotion ? [0, 0, 0] : [12, 0, index * 2.2],
  );
  const opacity = useTransform(
    scrollYProgress,
    [localStart, localMid, localEnd],
    [index === 0 ? 1 : 0.6, 1, Math.max(0.32, 1 - index * 0.16)],
  );
  const shadowLift = useTransform(
    scrollYProgress,
    [localStart, localMid, localEnd],
    [0.2, 1, 0.45],
  );

  return (
    <motion.article
      className="process-step-card"
      style={{
        position: "absolute",
        left: "50%",
        bottom: 0,
        x: "-50%",
        y,
        scale,
        rotateX,
        opacity,
        width: "min(92vw, 1080px)",
        minHeight: "min(58vh, 520px)",
        transformStyle: "preserve-3d",
        transformOrigin: "50% 100%",
        willChange: "transform, opacity",
        zIndex: total - index,
      }}
    >
      <motion.div
        style={{
          borderRadius: 30,
          overflow: "hidden",
          background: step.panel,
          border: "1px solid rgba(15,23,42,0.08)",
          boxShadow: useTransform(
            shadowLift,
            (value) =>
              `0 24px 40px rgba(15,23,42,${0.08 + value * 0.06}), 0 70px 110px rgba(15,23,42,${0.08 + value * 0.12})`,
          ),
        }}
      >
        <div
          className="process-step-band"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: "clamp(1rem, 1.8vw, 1.3rem) clamp(1.2rem, 2.8vw, 2rem)",
            background: `linear-gradient(90deg, ${step.accent} 0%, ${step.accent}cc 100%)`,
            color: "#ffffff",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.67rem",
                fontWeight: 700,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                opacity: 0.86,
              }}
            >
              {step.tag}
            </span>
            <span
              style={{
                width: 1,
                height: 14,
                background: "rgba(255,255,255,0.28)",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                opacity: 0.74,
              }}
            >
              Step {step.num}
            </span>
          </div>
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(1.8rem, 4.2vw, 3.8rem)",
              fontWeight: 800,
              lineHeight: 1,
              color: "rgba(255,255,255,0.3)",
              flexShrink: 0,
            }}
          >
            {step.num}
          </span>
        </div>

        <div
          className="process-card"
          style={{
            padding: "clamp(1.4rem, 3vw, 2.4rem)",
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(1rem, 2vw, 1.3rem)",
            }}
          >
            <span
              style={{
                alignSelf: "flex-start",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 14px",
                borderRadius: 999,
                background: step.accentSoft,
                color: step.accent,
                border: `1px solid ${step.accent}26`,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.66rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: step.accent,
                  boxShadow: `0 0 0 4px ${step.accentSoft}`,
                }}
              />
              {step.kicker}
            </span>

            <h3
              style={{
                margin: 0,
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(1.7rem, 3.5vw, 3.2rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.05em",
                color: "#0f172a",
                maxWidth: "16ch",
              }}
            >
              {step.title}
            </h3>

            <p
              style={{
                margin: 0,
                maxWidth: 620,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(0.96rem, 1.45vw, 1.08rem)",
                lineHeight: 1.7,
                color: "rgba(15,23,42,0.68)",
              }}
            >
              {step.body}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 18,
            }}
          >
            <div
              style={{
                padding: "1rem 1.1rem",
                borderRadius: 22,
                background: "rgba(255,255,255,0.72)",
                border: "1px solid rgba(15,23,42,0.08)",
                backdropFilter: "blur(16px)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(15,23,42,0.42)",
                }}
              >
                What ships here
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginTop: 14,
                }}
              >
                {step.outputs.map((item) => (
                  <span
                    key={item}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 13px",
                      borderRadius: 999,
                      background: "#ffffff",
                      border: "1px solid rgba(15,23,42,0.08)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.74rem",
                      fontWeight: 600,
                      color: "#0f172a",
                    }}
                  >
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: step.accent,
                        flexShrink: 0,
                      }}
                    />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <div
                style={{
                  borderRadius: 20,
                  padding: "1rem",
                  background: "rgba(255,255,255,0.66)",
                  border: "1px solid rgba(15,23,42,0.08)",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.58rem",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(15,23,42,0.4)",
                  }}
                >
                  Focus
                </p>
                <p
                  style={{
                    margin: "0.55rem 0 0",
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "0.98rem",
                    lineHeight: 1.15,
                    letterSpacing: "-0.03em",
                    color: "#0f172a",
                  }}
                >
                  {step.tag}
                </p>
              </div>
              <div
                style={{
                  borderRadius: 20,
                  padding: "1rem",
                  background: step.accentSoft,
                  border: `1px solid ${step.accent}24`,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.58rem",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(15,23,42,0.4)",
                  }}
                >
                  Outcome
                </p>
                <p
                  style={{
                    margin: "0.55rem 0 0",
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "0.98rem",
                    lineHeight: 1.15,
                    letterSpacing: "-0.03em",
                    color: step.accent,
                  }}
                >
                  {step.kicker}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

function StepMarkers({ scrollYProgress }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap",
      }}
    >
      {STEPS.map((step, index) => {
        const total = STEPS.length;
        const start = index / total;
        const end = (index + 1) / total;
        const fill = useTransform(scrollYProgress, [start, end], [0, 1]);
        const opacity = useTransform(scrollYProgress, [start, end], [0.35, 1]);

        return (
          <div
            key={step.num}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <motion.div
              style={{
                width: 42,
                height: 42,
                borderRadius: 999,
                background: "rgba(255,255,255,0.82)",
                border: "1px solid rgba(15,23,42,0.08)",
                display: "grid",
                placeItems: "center",
                color: step.accent,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                opacity,
                boxShadow: useTransform(fill, (value) =>
                  value > 0.55
                    ? `0 10px 24px ${step.accentSoft}`
                    : "0 0 0 rgba(0,0,0,0)",
                ),
              }}
            >
              {step.num}
            </motion.div>
            {index < STEPS.length - 1 ? (
              <motion.div
                style={{
                  width: "clamp(24px, 5vw, 52px)",
                  height: 2,
                  borderRadius: 999,
                  background: useTransform(
                    fill,
                    (value) =>
                      `linear-gradient(90deg, ${step.accent} ${Math.max(4, value * 100)}%, rgba(15,23,42,0.12) ${Math.max(4, value * 100)}%)`,
                  ),
                }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default function Process() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const headingY = useTransform(
    scrollYProgress,
    [0, 0.14],
    [0, reduceMotion ? 0 : -16],
  );
  const headingOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0.9]);
  const stageOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 1],
    [0.88, 1, 1],
  );

  return (
    <>
      <style>{PROCESS_STYLES}</style>
      <section
        id="process"
        ref={sectionRef}
        className="process-shell"
        aria-label="CreativeIQ process"
        style={{
          position: "relative",
          height: reduceMotion ? "auto" : "420vh",
        }}
      >
        <div
          style={{
            position: reduceMotion ? "relative" : "sticky",
            top: 0,
            minHeight: "100svh",
            overflow: "hidden",
          }}
        >
          <motion.header
            style={{
              position: "relative",
              zIndex: 30,
              padding: "clamp(2rem, 4vw, 3.25rem) clamp(1rem, 4vw, 2.5rem) 0",
              y: reduceMotion ? undefined : headingY,
              opacity: reduceMotion ? undefined : headingOpacity,
            }}
          >
            <div
              style={{
                maxWidth: 1180,
                margin: "0 auto",
                display: "grid",
                gap: "1.1rem",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(15,23,42,0.42)",
                }}
              >
                CreativeIQ · The Method
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) auto",
                  gap: "1rem",
                  alignItems: "end",
                }}
              >
                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "clamp(2.2rem, 6vw, 5.6rem)",
                      lineHeight: 0.93,
                      letterSpacing: "-0.06em",
                      color: "#0f172a",
                      maxWidth: "10ch",
                    }}
                  >
                    Four big moves. One connected growth system.
                  </h2>
                </div>
                <p
                  style={{
                    margin: 0,
                    maxWidth: 300,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "clamp(0.9rem, 1.3vw, 1rem)",
                    lineHeight: 1.7,
                    color: "rgba(15,23,42,0.56)",
                  }}
                >
                  Each card rises into view, locks into the system, and stays
                  readable while the next layer joins it.
                </p>
              </div>
              {reduceMotion ? null : (
                <StepMarkers scrollYProgress={scrollYProgress} />
              )}
            </div>
          </motion.header>

          <motion.div
            className="process-stage"
            style={{
              position: "relative",
              zIndex: 10,
              height: reduceMotion
                ? "auto"
                : "calc(100svh - clamp(12rem, 18vw, 15rem))",
              minHeight: reduceMotion ? "auto" : 540,
              paddingTop: reduceMotion ? "2rem" : "9rem",
              paddingBottom: reduceMotion ? "2rem" : "2rem",
              opacity: reduceMotion ? undefined : stageOpacity,
              perspective: reduceMotion ? undefined : "1400px",
              perspectiveOrigin: "50% 100%",
            }}
          >
            {reduceMotion ? (
              <div
                style={{
                  maxWidth: 1180,
                  margin: "0 auto",
                  display: "grid",
                  gap: 20,
                  padding: "0 1rem",
                }}
              >
                {STEPS.map((step) => (
                  <article key={step.num} style={{ position: "relative" }}>
                    <div
                      style={{
                        borderRadius: 30,
                        overflow: "hidden",
                        background: step.panel,
                        border: "1px solid rgba(15,23,42,0.08)",
                        boxShadow: "0 24px 48px rgba(15,23,42,0.1)",
                      }}
                    >
                      <div
                        style={{
                          padding: "1rem 1.2rem",
                          background: step.accent,
                          color: "#fff",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.74rem",
                          fontWeight: 700,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                        }}
                      >
                        {step.tag}
                      </div>
                      <div style={{ padding: "1.3rem" }}>
                        <h3
                          style={{
                            margin: 0,
                            fontFamily: "'Syne', sans-serif",
                            fontSize: "1.8rem",
                            lineHeight: 1,
                            letterSpacing: "-0.04em",
                            color: "#0f172a",
                          }}
                        >
                          {step.title}
                        </h3>
                        <p
                          style={{
                            margin: "1rem 0 0",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "1rem",
                            lineHeight: 1.7,
                            color: "rgba(15,23,42,0.66)",
                          }}
                        >
                          {step.body}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              STEPS.map((step, index) => (
                <ProcessCard
                  key={step.num}
                  step={step}
                  index={index}
                  scrollYProgress={scrollYProgress}
                  reduceMotion={reduceMotion}
                />
              ))
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}

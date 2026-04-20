import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "../../hooks/useCountUp";
import ParallaxLayer from "../primitives/ParallaxLayer";
import FadeUp from "../primitives/FadeUp";

const STATS = [
  { value: 120, suffix: "+", label: "Clients Served", decimals: 0 },
  { value: 3.4, suffix: "x", label: "Average Traffic Growth", decimals: 1 },
  { value: 98, suffix: "%", label: "Client Retention", decimals: 0 },
  { value: 50, suffix: "+", label: "Custom Systems Built", decimals: 0 },
];

function StatItem({ value, suffix, label, decimals, inView, index }) {
  const display = useCountUp(value, 1600, inView, decimals);

  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        textAlign: "center",
        padding: "0 clamp(1rem, 3vw, 2rem)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--size-section-title)",
          fontWeight: 800,
          color: "var(--c-accent)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
          gap: 2,
        }}
      >
        {display}
        <span style={{ fontSize: "0.65em", color: "#60a5fa" }}>{suffix}</span>
      </div>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--size-label)",
          letterSpacing: "var(--tracking-label)",
          textTransform: "uppercase",
          color: "#6b7280",
          margin: "10px 0 0",
        }}
      >
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  const countRef = useRef(null);
  const inView = useInView(countRef, { once: true, margin: "-100px" });

  return (
    <FadeUp
      as="section"
      id="stats"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "clamp(5rem, 10vw, 8rem) 0",
        background: "#f0f0f9",
      }}
    >
      {/* Background image � parallax, barely visible through light overlay */}
      <ParallaxLayer
        speed={-50}
        style={{ position: "absolute", inset: "-10% 0" }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat`,
            opacity: 0.07,
          }}
        />
      </ParallaxLayer>

      {/* Accent glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "70vw",
          height: "70vw",
          maxWidth: 700,
          maxHeight: 700,
          background: "rgba(59,130,246,0.1)",
          filter: "blur(80px)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 3,
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "0 var(--container-pad)",
        }}
      >
        {/* Section label */}
        <FadeUp
          style={{
            textAlign: "center",
            marginBottom: "clamp(3rem, 6vw, 5rem)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--size-label)",
              fontWeight: 500,
              color: "var(--c-accent)",
              letterSpacing: "var(--tracking-label)",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            By the numbers
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--size-section-title)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#0d0d14",
              margin: 0,
            }}
          >
            Results that{" "}
            <span
              style={{
                color: "#3b82f6",
              }}
            >
              compound.
            </span>
          </h2>
        </FadeUp>

        {/* Stats row */}
        <div
          ref={countRef}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                alignItems: "center",
                flex: "1 1 160px",
              }}
            >
              <StatItem {...stat} inView={inView} index={i} />
              {/* Vertical divider */}
              {i < STATS.length - 1 && (
                <div
                  style={{
                    width: 1,
                    height: 60,
                    background: "rgba(0,0,0,0.1)",
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </FadeUp>
  );
}

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

// Tool pills: each has a short brand name + brand color
const ROWS = [
  {
    service: "SEO Strategy & Execution",
    tools: [
      { name: "Semrush", color: "#FF6B35" },
      { name: "Ahrefs", color: "#2196F3" },
      { name: "Moz", color: "#00A4BD" },
    ],
    cost: "$2,500",
  },
  {
    service: "Google Ads Management",
    tools: [
      { name: "Google Ads", color: "#4285F4" },
      { name: "PPC Agency", color: "#34A853" },
    ],
    cost: "$2,000",
  },
  {
    service: "Meta Ads Management",
    tools: [
      { name: "Meta Ads", color: "#0866FF" },
      { name: "AdEspresso", color: "#FF6B35" },
    ],
    cost: "$1,500",
  },
  {
    service: "CRM & Pipeline Automation",
    tools: [
      { name: "HubSpot", color: "#FF7A59" },
      { name: "ActiveCampaign", color: "#356AE6" },
      { name: "Keap", color: "#5BBD72" },
    ],
    cost: "$800",
  },
  {
    service: "Website Design & Dev",
    tools: [
      { name: "Webflow", color: "#4353FF" },
      { name: "WordPress", color: "#21759B" },
      { name: "Wix", color: "#FAAD4D" },
    ],
    cost: "$1,200",
  },
  {
    service: "Email & SMS Marketing",
    tools: [
      { name: "Mailchimp", color: "#FFE01B", dark: true },
      { name: "Klaviyo", color: "#356AE6" },
      { name: "Twilio", color: "#F22F46" },
    ],
    cost: "$600",
  },
  {
    service: "Social Media Content",
    tools: [
      { name: "Hootsuite", color: "#1DB954" },
      { name: "Later", color: "#7B61FF" },
      { name: "Buffer", color: "#2C4BFF" },
    ],
    cost: "$1,800",
  },
  {
    service: "Reputation Management",
    tools: [
      { name: "Birdeye", color: "#00BCD4" },
      { name: "Podium", color: "#6C47FF" },
    ],
    cost: "$350",
  },
  {
    service: "Analytics & Reporting",
    tools: [
      { name: "GA4", color: "#F9AB00", dark: true },
      { name: "Looker Studio", color: "#4285F4" },
    ],
    cost: "$800",
  },
  {
    service: "Strategy & Consulting",
    tools: [{ name: "Marketing Consultant", color: "#64748b" }],
    cost: "$1,500",
  },
];

const TOTAL = 13050;

function useReveal(margin) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin });
  return [ref, visible];
}

function ToolPill({ name, color, dark }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 10px",
        borderRadius: 99,
        background: color + "22",
        border: "1px solid " + color + "55",
        color: dark ? "#b8860b" : color,
        fontSize: 11,
        fontWeight: 600,
        fontFamily: "Inter, sans-serif",
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
      }}
    >
      {name}
    </span>
  );
}

function TableRow({ service, tools, cost, index }) {
  const [ref, visible] = useReveal("-20px");
  return (
    <motion.div
      ref={ref}
      className="ciq-table-row"
      initial={{ opacity: 1, y: 14 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 1, y: 14 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease }}
      style={{
        alignItems: "center",
        padding: "14px 20px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 8,
        marginBottom: 4,
      }}
    >
      <span
        className="ciq-row-service"
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "clamp(0.65rem, 0.9vw, 0.78rem)",
          fontWeight: 700,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: "#e2e8f0",
        }}
      >
        {service}
      </span>
      <div
        className="ciq-col-tools"
        style={{ display: "flex", flexWrap: "wrap", gap: 5 }}
      >
        {tools.map((t) => (
          <ToolPill key={t.name} {...t} />
        ))}
      </div>
      <span
        className="ciq-col-cost"
        style={{
          fontFamily: "Bricolage Grotesque, sans-serif",
          fontSize: "clamp(0.75rem, 1vw, 0.88rem)",
          fontWeight: 700,
          color: "#94a3b8",
          textAlign: "right",
          letterSpacing: "-0.01em",
        }}
      >
        {cost}
        <span style={{ fontSize: "0.65em", fontWeight: 400 }}>/mo</span>
      </span>
      <div
        className="ciq-col-check"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "rgba(59,130,246,0.15)",
          border: "1px solid rgba(59,130,246,0.35)",
          margin: "0 auto",
          flexShrink: 0,
        }}
      >
        <Check size={13} color="#3b82f6" strokeWidth={3} />
      </div>
    </motion.div>
  );
}

export default function CIQValueTable() {
  const sectionRef = useRef(null);
  const [headerRef, headerVisible] = useReveal("-40px");
  const [totalRef, totalVisible] = useReveal("-20px");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], ["6%", "-14%"]);

  return (
    <section
      ref={sectionRef}
      id="ciq-value"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#0d1624",
        padding: "clamp(5rem, 10vw, 9rem) 0",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "60vw",
          height: "60vw",
          maxWidth: 700,
          maxHeight: 700,
          background: "rgba(59,130,246,0.09)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />
      {/* Grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.025,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "160px 160px",
        }}
      />
      {/* Ghost wordmark */}
      <motion.div
        style={{
          y: ghostY,
          position: "absolute",
          bottom: "-8%",
          right: "-2%",
          fontFamily: "Bricolage Grotesque, sans-serif",
          fontSize: "clamp(8rem, 20vw, 18rem)",
          fontWeight: 900,
          color: "transparent",
          WebkitTextStroke: "1px rgba(59,130,246,0.05)",
          userSelect: "none",
          pointerEvents: "none",
          lineHeight: 1,
          zIndex: 0,
          letterSpacing: "-0.05em",
        }}
      >
        CIQ
      </motion.div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 clamp(1rem, 5vw, 4rem)",
        }}
      >
        <style>{`
          .ciq-table-row,
          .ciq-table-header,
          .ciq-table-total {
            display: grid;
            grid-template-columns: 1fr 1fr 90px 54px;
            gap: 12px;
          }
          @media (max-width: 640px) {
            /* Hide desktop column headers entirely */
            .ciq-table-header { display: none; }
            /* Each row becomes a card */
            .ciq-table-row {
              display: block;
              position: relative;
              padding: 16px 16px 14px !important;
              margin-bottom: 8px !important;
            }
            .ciq-row-service {
              font-size: 0.72rem !important;
              padding-right: 40px;
              margin-bottom: 8px;
              display: block;
            }
            .ciq-col-tools {
              display: flex !important;
              flex-wrap: wrap !important;
              gap: 5px !important;
            }
            .ciq-col-cost { display: none !important; }
            .ciq-col-check {
              position: absolute !important;
              top: 16px !important;
              right: 16px !important;
              margin: 0 !important;
            }
            /* Total row on mobile */
            .ciq-table-total {
              display: flex !important;
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 12px !important;
            }
            .ciq-total-strikethrough { display: none !important; }
            .ciq-total-ciq-badge { align-self: flex-start !important; }
          }
        `}</style>
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center",
            marginBottom: "clamp(2.5rem, 5vw, 4rem)",
          }}
        >
          <motion.p
            initial={{ opacity: 1, y: 14 }}
            animate={
              headerVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 14 }
            }
            transition={{ duration: 0.55, ease }}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.68rem",
              fontWeight: 600,
              color: "#3b82f6",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            What&apos;s inside every CIQ engagement
          </motion.p>
          <div style={{ overflow: "hidden", marginBottom: 16 }}>
            <motion.h2
              initial={{ y: "22%" }}
              animate={headerVisible ? { y: 0 } : { y: "22%" }}
              transition={{ duration: 0.8, delay: 0.07, ease }}
              style={{
                fontFamily: "Bricolage Grotesque, sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 3.6rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#f1f5f9",
                margin: 0,
                lineHeight: 1.08,
              }}
            >
              One team.{" "}
              <span
                style={{
                  color: "#60a5fa",
                }}
              >
                Everything included.
              </span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.22, ease }}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(0.82rem, 1.2vw, 0.92rem)",
              color: "#64748b",
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            What most businesses cobble together from 10+ vendors CIQ delivers
            as one integrated powerhouse.
          </motion.p>
        </div>

        {/* Column headers */}
        <motion.div
          className="ciq-table-header"
          initial={{ opacity: 1, y: 12 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 12 }}
          transition={{ duration: 0.45, delay: 0.3, ease }}
          style={{
            gap: 12,
            padding: "0 20px 12px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            marginBottom: 8,
          }}
        >
          {[
            { label: "Features", align: "left" },
            { label: "Replaces", align: "left" },
            { label: "Other tools", align: "right" },
            { label: "CIQ", align: "center" },
          ].map(({ label, align }) => (
            <span
              key={label}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#334155",
                textAlign: align,
              }}
            >
              {label}
            </span>
          ))}
        </motion.div>

        {/* Rows */}
        <div>
          {ROWS.map((row, i) => (
            <TableRow key={row.service} {...row} index={i} />
          ))}
        </div>

        {/* Total row */}
        <motion.div
          ref={totalRef}
          className="ciq-table-total"
          initial={{ opacity: 1, y: 16 }}
          animate={totalVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 16 }}
          transition={{ duration: 0.6, ease }}
          style={{
            alignItems: "center",
            padding: "20px 20px",
            marginTop: 8,
            borderRadius: 10,
            background: "rgba(59,130,246,0.08)",
            border: "1px solid rgba(59,130,246,0.22)",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "Bricolage Grotesque, sans-serif",
                fontSize: "clamp(0.68rem, 1vw, 0.78rem)",
                fontWeight: 800,
                color: "#60a5fa",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                margin: 0,
              }}
            >
              Total if sourced separately
            </p>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.62rem",
                color: "#334155",
                margin: "3px 0 0",
              }}
            >
              10 vendors 10 contracts 10 logins
            </p>
          </div>
          <span />
          <div
            style={{ textAlign: "right" }}
            className="ciq-total-strikethrough"
          >
            <span
              style={{
                fontFamily: "Bricolage Grotesque, sans-serif",
                fontSize: "clamp(0.82rem, 1.3vw, 1rem)",
                fontWeight: 800,
                color: "#475569",
                textDecoration: "line-through",
                letterSpacing: "-0.02em",
              }}
            >
              $13,050
              <span style={{ fontSize: "0.65em", fontWeight: 400 }}>/mo</span>
            </span>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="ciq-total-ciq-badge"
          >
            <div
              style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                background: "#2563eb",
                borderRadius: 8,
                padding: "7px 10px",
                boxShadow: "0 8px 24px rgba(59,130,246,0.3)",
              }}
            >
              <span
                style={{
                  fontFamily: "Bricolage Grotesque, sans-serif",
                  fontSize: "clamp(0.8rem, 1.2vw, 1rem)",
                  fontWeight: 900,
                  color: "#fff",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                from $1.8K
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.52rem",
                  color: "rgba(255,255,255,0.65)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginTop: 2,
                }}
              >
                /mo with CIQ
              </span>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 1, y: 16 }}
          animate={totalVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 16 }}
          transition={{ duration: 0.55, delay: 0.18, ease }}
          style={{ textAlign: "center", marginTop: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "15px 40px",
              background: "#3b82f6",
              color: "#fff",
              borderRadius: 99,
              fontFamily: "Inter, sans-serif",
              fontSize: "0.9rem",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 10px 32px rgba(59,130,246,0.32)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 14px 40px rgba(59,130,246,0.44)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow =
                "0 10px 32px rgba(59,130,246,0.32)";
            }}
          >
            Get the full team
          </a>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.7rem",
              color: "#334155",
              marginTop: 12,
              letterSpacing: "0.04em",
            }}
          >
            Growth Engine from $3,500/mo Foundation from $1,800/mo
          </p>
        </motion.div>
      </div>
    </section>
  );
}

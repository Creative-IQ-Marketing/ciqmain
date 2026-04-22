import { motion } from "framer-motion";
import { Check } from "lucide-react";

const ROWS = [
  {
    feature: "CRM & Pipeline Management",
    replaces: ["HubSpot", "ActiveCampaign", "Keap"],
    cost: "$800",
  },
  {
    feature: "SEO Strategy & Execution",
    replaces: ["Semrush", "Ahrefs", "Moz"],
    cost: "$2,500",
  },
  {
    feature: "Google Ads Management",
    replaces: ["Google Ads", "PPC Agency"],
    cost: "$2,000",
  },
  {
    feature: "Meta Ads Management",
    replaces: ["Meta Ads", "AdEspresso"],
    cost: "$1,500",
  },
  {
    feature: "Website Design & Dev",
    replaces: ["Webflow", "WordPress", "Wix"],
    cost: "$1,200",
  },
  {
    feature: "Email & SMS Marketing",
    replaces: ["Mailchimp", "Klaviyo", "Twilio"],
    cost: "$600",
  },
  {
    feature: "Social Media Content",
    replaces: ["Hootsuite", "Later", "Buffer"],
    cost: "$1,800",
  },
  {
    feature: "Reputation Management",
    replaces: ["Birdeye", "Podium"],
    cost: "$350",
  },
  {
    feature: "Analytics & Reporting",
    replaces: ["GA4", "Looker Studio"],
    cost: "$800",
  },
  {
    feature: "Strategy & Consulting",
    replaces: ["Consultant"],
    cost: "$1,500",
  },
];

function TableRow({ feature, replaces, cost, index }) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 2fr 1.5fr 80px",
        alignItems: "center",
        background: "rgba(0,0,0,0.3)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        padding: "18px 24px",
        marginBottom: 10,
        gap: 24,
      }}
    >
      {/* Feature name - bold and bright */}
      <div style={{ minWidth: 0 }}>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            fontWeight: 900,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#ffffff",
            lineHeight: 1.3,
            display: "block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {feature}
        </span>
      </div>

      {/* Replaces - text list */}
      <div style={{ minWidth: 0 }}>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            color: "#cbd5e1",
            lineHeight: 1.5,
            display: "block",
            whiteSpace: "nowrap",
          }}
        >
          {replaces.join(", ")}
        </span>
      </div>

      {/* Other tools cost */}
      <div style={{ minWidth: 0 }}>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            color: "#94a3b8",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            display: "block",
            whiteSpace: "nowrap",
          }}
        >
          {cost}/mo
        </span>
      </div>

      {/* Check column */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Check size={20} color="#00d9ff" strokeWidth={3} />
      </div>
    </motion.div>
  );
}

export default function GHLValueTable() {
  return (
    <section
      id="ciq-value"
      style={{
        background: "#0a0e27",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Responsive adjustments with horizontal scroll */}
      <style>{`
        .ghl-table-scroll-container {
          overflow-x: auto;
          overflow-y: visible;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: rgba(0,217,255,0.3) rgba(255,255,255,0.05);
        }
        .ghl-table-scroll-container::-webkit-scrollbar {
          height: 6px;
        }
        .ghl-table-scroll-container::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 3px;
        }
        .ghl-table-scroll-container::-webkit-scrollbar-thumb {
          background: rgba(0,217,255,0.3);
          border-radius: 3px;
        }
        .ghl-table-scroll-container::-webkit-scrollbar-thumb:hover {
          background: rgba(0,217,255,0.5);
        }
        @media (max-width: 900px) {
          .ghl-table-inner {
            min-width: 800px;
          }
          [data-ghl-row] {
            grid-template-columns: 2fr 2.5fr 1.5fr 80px !important;
            padding: 16px 18px !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 640px) {
          .ghl-table-inner {
            min-width: 700px;
          }
          [data-ghl-row] {
            grid-template-columns: 1.8fr 2.2fr 1.3fr 70px !important;
            padding: 14px 16px !important;
            gap: 12px !important;
          }
        }
      `}</style>

      {/* Glow effect removed - no gradients */}

      {/* Top banner */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: "#1d4ed8",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "14px",
            letterSpacing: "0.02em",
          }}
        >
          Take your marketing to the next level!
        </span>
        <a
          href="#contact"
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#fbbf24",
            color: "#000000",
            fontFamily: "'Inter', sans-serif",
            padding: "10px 24px",
            borderRadius: 6,
            textDecoration: "none",
            flexShrink: 0,
            boxShadow: "0 4px 12px rgba(251,191,36,0.3)",
          }}
        >
          <span
            style={{
              fontWeight: 900,
              fontSize: "13px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            14 Day Free Trial
          </span>
          <span style={{ fontSize: "9px", fontWeight: 500, opacity: 1 }}>
            No obligation, cancel at any time
          </span>
        </a>
      </div>

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1100,
          margin: "0 auto",
          padding: "60px 40px",
        }}
      >
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <motion.h2
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            What&apos;s included with CIQ&apos;s CRM
          </motion.h2>
        </div>

        {/* Scrollable table container */}
        <div className="ghl-table-scroll-container">
          <div className="ghl-table-inner">
            {/* Column headers */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 2fr 1.5fr 80px",
                gap: 24,
                padding: "0 24px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#cbd5e1",
                  whiteSpace: "nowrap",
                }}
              >
                Features
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#cbd5e1",
                  whiteSpace: "nowrap",
                }}
              >
                Replaces
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#cbd5e1",
                  whiteSpace: "nowrap",
                }}
              >
                Cost
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#cbd5e1",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                CIQ&apos;s CRM
              </span>
            </div>

            {/* Data rows */}
            {ROWS.map((row, i) => (
              <div
                key={row.feature}
                data-ghl-row
                style={{ display: "contents" }}
              >
                <TableRow {...row} index={i} />
              </div>
            ))}

            {/* Overall price row */}
            <motion.div
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 2fr 1.5fr 80px",
                alignItems: "center",
                background: "rgba(0,80,200,0.15)",
                border: "2px solid rgba(0,150,255,0.2)",
                borderRadius: 12,
                padding: "22px 24px",
                gap: 24,
                marginTop: 16,
              }}
            >
              <div />
              <div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "11px",
                    fontWeight: 900,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#00d9ff",
                    display: "block",
                  }}
                >
                  Overall Price
                </span>
              </div>
              <div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#cbd5e1",
                    textDecoration: "line-through",
                    display: "block",
                  }}
                >
                  $13,050/mo
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "32px",
                    fontWeight: 900,
                    color: "#00d9ff",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  $99
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "10px",
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginTop: 4,
                  }}
                >
                  /mo
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            textAlign: "center",
            marginTop: "40px",
          }}
        >
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 40px",
              background: "#1e40af",
              color: "#ffffff",
              borderRadius: "50px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 8px 24px rgba(30,64,175,0.4)",
              border: "1px solid rgba(255,255,255,0.1)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            Start Your Free Trial
          </a>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              color: "#64748b",
              marginTop: 14,
              letterSpacing: "0.04em",
            }}
          >
            Starting from $999/mo • No long-term contracts
          </p>
        </motion.div>
      </div>
    </section>
  );
}

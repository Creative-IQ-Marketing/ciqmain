import { AnimatePresence, motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BRAND_BLUE = "#3B6FF0";
const ACCENT_YELLOW = "#F6C343";
const DARK_BG = "#0B0F1A";

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

function TableRow({ feature, replaces, cost, index, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.();
        }
      }}
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0,1.7fr) minmax(0,1.7fr) minmax(0,1fr) 56px",
        alignItems: "center",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 12,
        padding: "16px 18px",
        marginBottom: 10,
        gap: 16,
        cursor: "pointer",
        outline: "none",
      }}
      whileHover={{
        borderColor: "rgba(59,111,240,0.45)",
        background: "rgba(255,255,255,0.03)",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            fontWeight: 900,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#ffffff",
            lineHeight: 1.2,
            display: "block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {feature}
        </span>
      </div>

      <div style={{ minWidth: 0 }}>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.2,
            display: "block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {replaces.join(", ")}
        </span>
      </div>

      <div style={{ minWidth: 0 }}>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            fontWeight: 700,
            color: "rgba(255,255,255,0.85)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            display: "block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "right",
          }}
        >
          {cost}/mo
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Check size={18} color="#ffffff" strokeWidth={3} />
      </div>
    </motion.div>
  );
}

export default function GHLValueTable() {
  const navigate = useNavigate();
  const [activeRow, setActiveRow] = useState(null);
  return (
    <section
      id="ciq-value"
      style={{
        background: DARK_BG,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        .ghl-table-scroll-container {
          overflow-x: visible;
          overflow-y: visible;
          width: 100%;
        }
        .ghl-table-inner {
          width: 100%;
        }
        @media (max-width: 900px) {
          [data-ghl-row] {
            padding: 14px 16px !important;
            gap: 12px !important;
          }
        }
        @media (max-width: 640px) {
          [data-ghl-row] {
            padding: 14px 14px !important;
            gap: 10px !important;
          }
        }
      `}</style>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: BRAND_BLUE,
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
        <button
          onClick={() => navigate("/contact")}
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            background: ACCENT_YELLOW,
            color: "#000000",
            fontFamily: "'Inter', sans-serif",
            padding: "10px 24px",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
            flexShrink: 0,
            boxShadow: "0 4px 12px rgba(246,195,67,0.28)",
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
        </button>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1100,
          margin: "0 auto",
          padding: "56px 16px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <motion.h2
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.75rem, 5vw, 3.4rem)",
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

        <div className="ghl-table-scroll-container">
          <div className="ghl-table-inner">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0,1.7fr) minmax(0,1.7fr) minmax(0,1fr) 56px",
                gap: 16,
                padding: "0 18px 16px",
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
                  color: "rgba(255,255,255,0.72)",
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
                  color: "rgba(255,255,255,0.72)",
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
                  color: "rgba(255,255,255,0.72)",
                  whiteSpace: "nowrap",
                  textAlign: "right",
                }}
              >
                Their Cost
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.72)",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                CIQ&apos;s CRM
              </span>
            </div>

            {ROWS.map((row, i) => (
              <div key={row.feature} data-ghl-row>
                <TableRow
                  {...row}
                  index={i}
                  onSelect={() => setActiveRow(row)}
                />
              </div>
            ))}

            <motion.div
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0,1.7fr) minmax(0,1.7fr) minmax(0,1fr) 56px",
                alignItems: "center",
                background: "rgba(59,111,240,0.12)",
                border: "1px solid rgba(59,111,240,0.35)",
                borderRadius: 12,
                padding: "18px 18px",
                gap: 16,
                marginTop: 16,
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "11px",
                    fontWeight: 900,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: ACCENT_YELLOW,
                    display: "block",
                    whiteSpace: "nowrap",
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
                    color: "rgba(255,255,255,0.75)",
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
                    fontSize: "26px",
                    fontWeight: 900,
                    color: "#ffffff",
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
                    color: "rgba(255,255,255,0.6)",
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

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            textAlign: "center",
            marginTop: "32px",
          }}
        >
          <button
            onClick={() => navigate("/contact")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 28px",
              background: "#ffffff",
              color: DARK_BG,
              borderRadius: "50px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              border: "1px solid rgba(255,255,255,0.26)",
              cursor: "pointer",
              boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            Start Your Free Trial
            <ArrowRight size={15} />
          </button>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              color: "rgba(255,255,255,0.62)",
              marginTop: 14,
              letterSpacing: "0.04em",
            }}
          >
            Starting from $99/mo • No long-term contracts
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeRow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 60,
              background: "rgba(0,0,0,0.65)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 18,
            }}
            onClick={() => setActiveRow(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "min(560px, 100%)",
                borderRadius: 18,
                background: "#ffffff",
                color: DARK_BG,
                border: `1px solid rgba(59,111,240,0.18)`,
                boxShadow: "0 24px 70px rgba(0,0,0,0.35)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "16px 18px",
                  borderBottom: "1px solid rgba(15,23,42,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      fontWeight: 900,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: BRAND_BLUE,
                    }}
                  >
                    Feature
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 18,
                      fontWeight: 900,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.15,
                      color: DARK_BG,
                      wordBreak: "break-word",
                    }}
                  >
                    {activeRow.feature}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveRow(null)}
                  style={{
                    height: 40,
                    padding: "0 14px",
                    borderRadius: 999,
                    border: "1px solid rgba(15,23,42,0.14)",
                    background: "#ffffff",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(15,23,42,0.75)",
                    flexShrink: 0,
                  }}
                >
                  Close
                </button>
              </div>
              <div style={{ padding: "16px 18px" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: 10,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  <div
                    style={{
                      borderRadius: 14,
                      border: "1px solid rgba(0,0,0,0.10)",
                      background: "rgba(0,0,0,0.03)",
                      padding: "12px 12px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 900,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "rgba(0,0,0,0.55)",
                      }}
                    >
                      Replaces
                    </div>
                    <div style={{ marginTop: 6, fontSize: 14, fontWeight: 700 }}>
                      {activeRow.replaces.join(", ")}
                    </div>
                  </div>
                  <div
                    style={{
                      borderRadius: 14,
                      border: "1px solid rgba(0,0,0,0.10)",
                      background: "rgba(0,0,0,0.03)",
                      padding: "12px 12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 900,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "rgba(0,0,0,0.55)",
                        }}
                      >
                        Their Cost
                      </div>
                      <div style={{ marginTop: 6, fontSize: 14, fontWeight: 800 }}>
                        {activeRow.cost}/mo
                      </div>
                    </div>
                    <div
                      style={{
                        borderRadius: 999,
                        padding: "8px 12px",
                        background: BRAND_BLUE,
                        color: "#ffffff",
                        fontSize: 11,
                        fontWeight: 900,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Included
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

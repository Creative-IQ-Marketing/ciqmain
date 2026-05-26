import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { trackButtonClick } from "../../services/analytics";

// One-time background cache on first hover — keeps the click instant
let pdfCached = false;
function warmCache() {
  if (pdfCached) return;
  pdfCached = true;
  fetch("/ciq-ai-seo-growth-guide.pdf", { cache: "force-cache" }).catch(
    () => null,
  );
}

function triggerDownload() {
  trackButtonClick("Download SEO Guide", "guide_download_cta", "GuideDownload");
  const a = document.createElement("a");
  a.href = "/ciq-ai-seo-growth-guide.pdf";
  a.download = "CIQ-AI-SEO-Growth-Guide.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

const CHAPTERS = [
  "AI-ready on-page architecture",
  "Technical SEO — what actually moves rankings",
  "Show up on ChatGPT, Perplexity & Gemini",
  "Conversion: turning traffic into revenue",
];

export default function GuideDownload() {
  return (
    <section
      id="guide-download"
      onMouseEnter={warmCache}
      className="bg-white border-t border-slate-100"
      style={{ padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 5rem)" }}
    >
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
          gap: "clamp(3rem, 7vw, 7rem)",
          alignItems: "center",
        }}
        className="guide-layout"
      >
        {/* ── LEFT: Editorial copy ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#3B6FF0",
              marginBottom: "1rem",
            }}
          >
            Free Download
          </p>

          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(1.75rem, 3.2vw, 2.8rem)",
              fontWeight: 800,
              color: "#0B0F1A",
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              marginBottom: "1.25rem",
            }}
          >
            The AI SEO
            <br />
            Growth Guide
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(0.92rem, 1.1vw, 1rem)",
              color: "#6B7280",
              lineHeight: 1.7,
              marginBottom: "2rem",
              maxWidth: 420,
            }}
          >
            The internal playbook we use to get clients ranking on Google and
            appearing in AI search answers. No tactics recycled from 2019 — this
            is what works now.
          </p>

          {/* Chapter list */}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 2.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
          >
            {CHAPTERS.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.88rem",
                  color: "#374151",
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "#3B6FF0",
                    flexShrink: 0,
                  }}
                />
                {item}
              </motion.li>
            ))}
          </ul>

          {/* CTA row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={triggerDownload}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "11px 24px",
                borderRadius: 6,
                background: "#0B0F1A",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 600,
                letterSpacing: "0.01em",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#1e2740")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#0B0F1A")
              }
            >
              <Download size={15} strokeWidth={2.2} />
              Download PDF
            </button>

            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                color: "#9CA3AF",
                letterSpacing: "0.02em",
              }}
            >
              Free · No sign-up
            </span>
          </div>
        </motion.div>

        {/* ── RIGHT: Minimal book cover ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          {/* The cover itself */}
          <div
            style={{
              width: "clamp(180px, 24vw, 280px)",
              aspectRatio: "3 / 4",
              background: "#0B0F1A",
              borderRadius: 4,
              padding: "clamp(1.4rem, 3vw, 2.2rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow:
                "20px 28px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top-right accent */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: -40,
                right: -40,
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: "rgba(59,111,240,0.12)",
              }}
            />

            {/* Cover content */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  width: 28,
                  height: 3,
                  background: "#3B6FF0",
                  borderRadius: 2,
                  marginBottom: "clamp(1.2rem, 2.5vw, 2rem)",
                }}
              />
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(0.55rem, 0.9vw, 0.65rem)",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                  marginBottom: "0.6em",
                  fontWeight: 500,
                }}
              >
                CreativeIQ
              </p>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(0.95rem, 1.8vw, 1.35rem)",
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.25,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                AI SEO
                <br />
                Growth
                <br />
                Guide
              </h3>
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  height: 1,
                  background: "rgba(255,255,255,0.1)",
                  marginBottom: "clamp(0.8rem, 1.5vw, 1.2rem)",
                }}
              />
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(0.55rem, 0.8vw, 0.62rem)",
                  color: "rgba(255,255,255,0.25)",
                  margin: 0,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                2026 Edition
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .guide-layout {
            grid-template-columns: 1fr !important;
          }
          .guide-layout > *:last-child {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

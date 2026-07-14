import { motion } from "framer-motion";
import { Download } from "lucide-react";
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
      className="border-t border-black/[0.05] bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="guide-layout mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        {/* ── LEFT: Editorial copy ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3B6FF0]">
            Free Download
          </p>

          <h2 className="mb-5 font-sans text-[clamp(1.75rem,3.2vw,2.8rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#0f0f0f]">
            The AI SEO
            <br />
            Growth Guide
          </h2>

          <p className="mb-8 max-w-md font-sans text-base leading-relaxed text-[#5c5c5c]">
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
                  fontFamily: "var(--font-body)",
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
              type="button"
              onClick={triggerDownload}
              className="inline-flex items-center gap-2 rounded-full bg-[#18181b] px-6 py-3 font-sans text-sm font-semibold text-white transition hover:bg-[#2a2a2a]"
            >
              <Download size={15} strokeWidth={1.75} aria-hidden />
              Download PDF
            </button>

            <span
              style={{
                fontFamily: "var(--font-body)",
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
                  fontFamily: "var(--font-body)",
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
                  fontFamily: "var(--font-display)",
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
                  fontFamily: "var(--font-body)",
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

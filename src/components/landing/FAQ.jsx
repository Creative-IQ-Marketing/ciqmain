import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeUp from "../primitives/FadeUp";

const EASE = [0.22, 1, 0.36, 1];

const FAQS = [
  {
    q: "What does Creative IQ do?",
    a: "We're a full-service digital marketing agency that helps businesses build, scale, and optimize their brand. Services span SEO, content creation, social media, website & app development, CRM automation, paid advertising, AI integrations, and data-driven growth strategy. What sets us apart: we apply neuromarketing principles and consumer psychology to build stronger emotional connections that drive trust and conversions—not just attention.",
  },
  {
    q: "Who have you worked with?",
    a: "We've partnered with organizations across Texas, Florida, and beyond—including FYZICAL Therapy & Balance Centers, Morales Padia Law, Cosmetic Dentistry of San Antonio, the South Texas Business Partnership, multiple Chambers of Commerce, and healthcare organizations. Cross-industry experience gives us deep insight into how different audiences search, decide, and convert online.",
  },
  {
    q: "What industries do you serve?",
    a: "Healthcare & wellness, behavioral health, law firms, med spas, dentistry, nonprofits, retail, real estate, hospitality, and professional services. We support both single-location businesses and multi-location organizations—tailoring messaging, visuals, and marketing systems around how each audience thinks and emotionally responds to brands.",
  },
  {
    q: "What makes Creative IQ different from other agencies?",
    a: "We combine creative production, technical development, automation systems, and advanced digital strategy under one roof. Instead of just running ads or managing social, we build complete growth ecosystems: websites, SEO infrastructure, CRM automations, analytics, and AI-driven visibility. The real differentiator is our blend of technology and psychology—neuromarketing, behavioral design, and consumer decision science that helps brands not just attract attention, but influence trust, action, and long-term loyalty.",
  },
  {
    q: "What platforms do you manage?",
    a: "Growth doesn't happen on one platform. We create and optimize across Instagram, Facebook, LinkedIn, TikTok, YouTube, Google, email marketing systems, websites, and CRM platforms. Every strategy is customized based on where your audience spends time and what drives engagement and conversions on each channel.",
  },
  {
    q: "What does onboarding look like?",
    a: "We start with a deep discovery phase—learning about your business, goals, audience, and current challenges. From there, we build a custom growth strategy, then execute: websites, SEO infrastructure, CRM automations, content calendars, advertising campaigns, and reporting dashboards. We also map customer touchpoints to identify where trust or conversion opportunities are being lost. Then we move into ongoing execution, optimization, and performance tracking.",
  },
  {
    q: "How long until we see results?",
    a: "Most clients see measurable improvements within 60–90 days. Stronger long-term growth typically develops over 3–6 months as SEO, content, automations, and systems continue to mature. The businesses that see the best outcomes are those committed to consistency, data-driven decisions, and building a seamless customer experience over time.",
  },
  {
    q: "Can clients review content before it's posted?",
    a: "Always. We customize the approval workflow based on your preference—whether you want to approve every post individually or prefer a hands-off approach with our team fully managing execution. Either way, content is aligned with your brand voice, visual identity, and the psychological messaging that resonates with your audience.",
  },
  {
    q: "Does Creative IQ only handle marketing?",
    a: "No. While marketing is core to what we do, we also help businesses improve operations, lead management, customer experience, automation systems, and overall digital infrastructure. Successful marketing means very little if the systems behind the business can't support or retain the growth being generated.",
  },
  {
    q: "Why does SEO and website infrastructure matter?",
    a: "Your website and SEO foundation are the most overlooked parts of digital growth. Running ads without the technical infrastructure to convert traffic wastes spend and loses conversions. We focus on technical SEO, website performance, mobile optimization, AI visibility, and behavioral design—so you're not just visible online, but positioned to build authority and drive action when visitors arrive.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <FadeUp
      as="section"
      id="faq"
      aria-label="Frequently Asked Questions"
      className="overflow-hidden border-t border-black/[0.05] bg-white py-16 sm:py-20 lg:py-24"
    >
      <style>{`
        .faq-num { transition: color 0.28s; }
        .faq-item:hover .faq-num { color: #3B6FF0; }
        .faq-trigger:focus-visible {
          outline: 2px solid #3B6FF0;
          outline-offset: 4px;
          border-radius: 6px;
        }
        @media (prefers-reduced-motion: reduce) {
          .faq-body * { transition: none !important; animation: none !important; }
        }
        @media (max-width: 640px) {
          .faq-header-grid { flex-direction: column !important; }
        }
      `}</style>

      <div className="mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
        <div className="faq-header-grid mb-12 flex flex-wrap items-end gap-8 sm:mb-14 lg:gap-16">
          <div className="max-w-md shrink-0">
            <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3B6FF0]">
              FAQ
            </p>
            <h2 className="font-sans text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#0f0f0f]">
              Everything you
              <br />
              need to know
            </h2>
          </div>

          <div className="max-w-md flex-1 pb-1">
            <p className="font-sans text-base leading-relaxed text-[#5c5c5c]">
              Answers to the most common questions about our services, process,
              and what it's really like to partner with Creative IQ.
            </p>
          </div>
        </div>

        {/* ── Accordion list ──────────────────────────────────── */}
        <div className="border-t border-black/[0.08]" role="list">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;

            return (
              <div
                key={i}
                role="listitem"
                className="faq-item border-b border-black/[0.08]"
              >
                {/* Trigger */}
                <button
                  className="faq-trigger"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-btn-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    padding: "clamp(1.1rem, 2.5vw, 1.5rem) 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(0.9rem, 2vw, 1.75rem)",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  {/* Index number */}
                  <span
                    className="faq-num"
                    aria-hidden="true"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(0.6rem, 0.9vw, 0.7rem)",
                      fontWeight: 700,
                      color: isOpen ? "#3B6FF0" : "#d1d5db",
                      letterSpacing: "0.12em",
                      flexShrink: 0,
                      width: "2.2rem",
                      lineHeight: 1,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Question text */}
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(0.95rem, 1.7vw, 1.1rem)",
                      fontWeight: 700,
                      color: "var(--c-text-primary)",
                      letterSpacing: "-0.015em",
                      flex: 1,
                      lineHeight: 1.35,
                    }}
                  >
                    {faq.q}
                  </span>

                  {/* Expand indicator */}
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-sans text-xl font-light leading-none text-[#737373]"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* Answer panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: EASE }}
                      style={{ overflow: "hidden" }}
                      className="faq-body"
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "clamp(0.88rem, 1.4vw, 0.98rem)",
                          color: "#4b5563",
                          lineHeight: 1.8,
                          margin: 0,
                          paddingBottom: "clamp(1.1rem, 2.5vw, 1.5rem)",
                          paddingLeft:
                            "calc(2.2rem + clamp(0.9rem, 2vw, 1.75rem))",
                          maxWidth: 760,
                        }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </FadeUp>
  );
}

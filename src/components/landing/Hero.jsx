import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { trackButtonClick } from "../../services/analytics";
import MagneticButton from "../primitives/MagneticButton";

const ease = [0.22, 1, 0.36, 1];

const PHOTOS = [
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=2400&q=88",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2400&q=88",
  "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=2400&q=88",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=2400&q=88",
  "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=2400&q=88",
];

const ROTATING_PHRASES = [
  "Social presence",
  "Turn visibility into trust",
  "Google rankings",
  "AI answers",
  "SEO infrastructure",
  "Own the answer",
  "Drive Growth",
];

export default function Hero() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timerRef = useRef(null);

  const go = (i) => {
    setActive(i);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setActive((c) => (c + 1) % PHOTOS.length),
      5500,
    );
  };

  useEffect(() => {
    timerRef.current = setInterval(
      () => setActive((c) => (c + 1) % PHOTOS.length),
      5500,
    );
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    const currentPhrase = ROTATING_PHRASES[phraseIndex];
    let timeoutId;

    if (!isDeleting && typedText === currentPhrase) {
      timeoutId = setTimeout(() => setIsDeleting(true), 1200);
      return () => clearTimeout(timeoutId);
    }

    if (isDeleting && typedText === "") {
      timeoutId = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
      }, 220);
      return () => clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(
      () => {
        const next = isDeleting
          ? currentPhrase.slice(0, Math.max(typedText.length - 1, 0))
          : currentPhrase.slice(0, typedText.length + 1);
        setTypedText(next);
      },
      isDeleting ? 45 : 80,
    );

    return () => clearTimeout(timeoutId);
  }, [typedText, isDeleting, phraseIndex]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500&display=swap');
        .f-disp { font-family: 'Bricolage Grotesque', sans-serif; }
        .f-hero { font-family: 'Manrope', sans-serif; }
        .f-body { font-family: 'Inter', sans-serif; }
        @keyframes panLR {
          0%   { transform: scale(1.12) translateX(-3%); }
          100% { transform: scale(1.12) translateX(3%); }
        }
        .pan-lr { animation: panLR 9s ease-in-out infinite alternate; }
        .hero-stat-val {
          font-size: clamp(1.2rem, 2vw, 1.8rem);
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.03em;
          color: #0d0d14;
        }
        .hero-stat-label {
          margin: 2px 0 0;
          font-size: clamp(9px, 1.2vw, 11px);
          color: rgba(0,0,0,0.4);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        @media (max-width: 640px) {
          .hero-stats {
            gap: 0.8rem !important;
            padding: 10px 0.75rem !important;
            flex-wrap: nowrap !important;
          }
          .hero-stats > div {
            flex: 1;
            min-width: 0;
          }
          .hero-stat-val {
            font-size: 0.9rem !important;
          }
          .hero-stat-label {
            font-size: 8px !important;
            margin-top: 1px !important;
          }
          .hero-ctas { flex-direction: column !important; align-items: stretch !important; }
          .hero-ctas a { text-align: center; }
          .hero-content-safe { padding-top: 62px !important; padding-bottom: 48px !important; }
        }
        @media (min-width: 641px) and (max-width: 920px) {
          .hero-stats {
            gap: 1rem !important;
            padding: 12px 1rem !important;
          }
          .hero-ctas { flex-direction: column !important; align-items: stretch !important; }
          .hero-ctas a { text-align: center; }
          .hero-content-safe { padding-top: 100px !important; padding-bottom: 120px !important; }
        }
        @media (min-width: 921px) {
          .hero-content-safe { padding-bottom: 0 !important; }
        }
      `}</style>

      <section
        style={{ position: "relative", height: "100dvh", overflow: "hidden" }}
      >
        <motion.div
          style={{
            position: "absolute",
            inset: "-15% 0",
            zIndex: 0,
          }}
        >
          <AnimatePresence>
            {PHOTOS.map((src, i) =>
              i === active ? (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    className="pan-lr"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transformOrigin: "center center",
                    }}
                  />
                </motion.div>
              ) : null,
            )}
          </AnimatePresence>
        </motion.div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background:
              "linear-gradient(115deg, rgba(10,19,52,0.78) 0%, rgba(10,19,52,0.58) 42%, rgba(10,19,52,0.65) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
            opacity: 0.04,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "180px 180px",
          }}
        />

        <motion.div
          className="hero-content-safe"
          style={{
            position: "relative",
            zIndex: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 clamp(1.5rem, 6vw, 5rem)",
          }}
        >
          <motion.p
            className="f-body"
            initial={{ opacity: 1, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            style={{
              fontSize: "clamp(9px, 2vw, 11px)",
              fontWeight: 500,
              color: "rgba(255,255,255,0.7)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            Search and social growth partner
          </motion.p>

          <motion.div
            style={{ marginBottom: 18 }}
            initial="hidden"
            animate="show"
            variants={{
              show: {
                transition: { staggerChildren: 0.11, delayChildren: 0.06 },
              },
            }}
          >
            <div
              style={{
                overflow: "hidden",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "0.5em",
                marginBottom: "0.15em",
              }}
            >
              {["Built", "to", "Rank."].map((word) => (
                <span
                  key={word}
                  style={{ overflow: "hidden", display: "inline-block" }}
                >
                  <motion.span
                    style={{ display: "inline-block" }}
                    variants={{
                      hidden: { y: "110%", opacity: 0 },
                      show: {
                        y: 0,
                        opacity: 1,
                        transition: { duration: 0.75, ease },
                      },
                    }}
                    className="f-hero"
                  >
                    <span
                      style={{
                        fontSize: "clamp(2.2rem, 6vw, 6.1rem)",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.06,
                        color: "#ffffff",
                        textShadow:
                          "0 2px 24px rgba(0,0,0,0.45), 0 1px 4px rgba(0,0,0,0.3)",
                      }}
                    >
                      {word}
                    </span>
                  </motion.span>
                </span>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "0.5em",
              }}
            >
              {[
                { word: "Designed", color: "#ffffff" },
                { word: "to", color: "#ffffff" },
                { word: "Convert.", color: "#3B6FF0" },
              ].map(({ word, color }) => (
                <span key={word} style={{ display: "inline-block" }}>
                  <motion.span
                    style={{ display: "inline-block" }}
                    variants={{
                      hidden: { y: "110%", opacity: 0 },
                      show: {
                        y: 0,
                        opacity: 1,
                        transition: { duration: 0.75, ease },
                      },
                    }}
                    className="f-hero"
                  >
                    <span
                      style={{
                        fontSize: "clamp(2.9rem, 7vw, 6.1rem)",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.06,
                        color,
                        textShadow:
                          color === "#3B6FF0"
                            ? "0 2px 28px rgba(59,111,240,0.5), 0 1px 4px rgba(0,0,0,0.3)"
                            : "0 2px 24px rgba(0,0,0,0.45), 0 1px 4px rgba(0,0,0,0.3)",
                      }}
                    >
                      {word}
                    </span>
                  </motion.span>
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32, ease }}
            style={{
              maxWidth: 900,
              marginBottom: 18,
            }}
          >
            <p
              className="f-body"
              style={{
                fontSize: "clamp(0.8rem, 0.95vw, 0.92rem)",
                color: "rgba(255,255,255,0.72)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              Google • Social • AI platforms
            </p>
            <p
              className="f-body"
              style={{
                fontSize: "clamp(0.95rem, 1.25vw, 1.08rem)",
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.7,
                fontWeight: 500,
                textShadow: "0 1px 2px rgba(0,0,0,0.32)",
                margin: "10px 0 0",
              }}
            >
              From Google search and social media marketing to AI discovery, we
              combine strategy, technical SEO infrastructure, and conversion
              design to help high-intent customers find you first and trust you
              faster.
            </p>
          </motion.div>

          <motion.p
            className="f-body"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.4, ease }}
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.35rem)",
              minHeight: "1.8em",
              color: "#F6C343",
              letterSpacing: "0.01em",
              marginBottom: 44,
              fontWeight: 600,
              textShadow: "0 2px 14px rgba(0,0,0,0.45)",
            }}
          >
            {typedText}
            <span style={{ opacity: 0.9 }}>|</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 1, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.42, ease }}
            className="hero-ctas"
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: 52,
            }}
          >
            <MagneticButton
              onClick={() => {
                trackButtonClick("Start a project", "hero_cta", "Hero");
                navigate("/contact");
              }}
              strength={0.22}
              className="f-body"
              style={{
                fontSize: 14,
                fontWeight: 500,
                background: "#3B6FF0",
                color: "#fff",
                padding: "14px 30px",
                borderRadius: 99,
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              Start a project
            </MagneticButton>
            <MagneticButton
              onClick={() => {
                trackButtonClick(
                  "Try Free SEO Tool",
                  "hero_free_seo_tool",
                  "Hero",
                );
                navigate("/free-ai-seo-audit");
              }}
              strength={0.18}
              className="f-body"
              style={{
                fontSize: 14,
                color: "#0d0d14",
                border: "1px solid rgba(255,255,255,0.55)",
                background: "rgba(255,255,255,0.86)",
                backdropFilter: "blur(12px)",
                padding: "14px 30px",
                borderRadius: 99,
                textDecoration: "none",
              }}
            >
              Try free SEO tool
            </MagneticButton>
          </motion.div>

          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                style={{
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  width: i === active ? 22 : 6,
                  height: 6,
                  borderRadius: 3,
                  background:
                    i === active ? "#3B6FF0" : "rgba(255,255,255,0.38)",
                  transition: "all 0.32s ease",
                }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease }}
          className="hero-stats"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 4,
            borderTop: "1px solid rgba(0,0,0,0.07)",
            background: "rgba(247,246,241,0.88)",
            backdropFilter: "blur(16px)",
            display: "flex",
            justifyContent: "center",
            gap: "clamp(2rem, 6vw, 6rem)",
            padding: "18px clamp(1.5rem, 5vw, 4rem)",
            flexWrap: "wrap",
          }}
        >
          {[
            { val: "8+", label: "Years in business" },
            { val: "300%", label: "Avg traffic growth" },
            { val: "50+", label: "Brands scaled" },
          ].map((st) => (
            <div key={st.label} style={{ textAlign: "center" }}>
              <p className="f-disp hero-stat-val">{st.val}</p>
              <p className="f-body hero-stat-label">{st.label}</p>
            </div>
          ))}
        </motion.div>
      </section>
    </>
  );
}

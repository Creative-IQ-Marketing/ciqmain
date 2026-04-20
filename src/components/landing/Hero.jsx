import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { trackButtonClick } from "../../services/analytics";

const ease = [0.22, 1, 0.36, 1];

const PHOTOS = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=90",
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1920&q=90",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1920&q=90",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1920&q=90",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1920&q=90",
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);
  const sectionRef = useRef(null);

  // Scroll progress from section top-start to section top-at-top-of-viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Spring only on background position (smooth parallax), NOT on opacity
  const bgSpring = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });
  const bgY = useTransform(bgSpring, [0, 1], ["0%", "28%"]);

  // Content parallax — drifts up slightly as you scroll (no opacity gate; section exits naturally)
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.07], [1, 0]);

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
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
        }
        .scroll-bounce { animation: scrollBounce 1.6s ease-in-out infinite; }
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
          .hero-content-safe { padding-top: 80px !important; padding-bottom: 48px !important; }
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
        ref={sectionRef}
        style={{ position: "relative", height: "100dvh", overflow: "hidden" }}
      >
        {/* Background: parallax wrapper — moves slower than the viewport on scroll */}
        <motion.div
          style={{
            y: bgY,
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

        {/* Overlay: flat wash for legibility without gradients */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: "rgba(247,246,241,0.7)",
          }}
        />

        {/* Grain overlay */}
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

        {/* Content — drifts up gently on scroll; section exits viewport naturally */}
        <motion.div
          className="hero-content-safe"
          style={{
            y: contentY,
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
          {/* Label */}
          <motion.p
            className="f-body"
            initial={{ opacity: 1, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: "rgba(0,0,0,0.45)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            San Antonio, TX · Full-service digital agency
          </motion.p>

          {/* Headline */}
          <motion.div
            style={{ marginBottom: 32 }}
            initial="hidden"
            animate="show"
            variants={{
              show: {
                transition: { staggerChildren: 0.11, delayChildren: 0.06 },
              },
            }}
          >
            {/* Line 1 */}
            <div
              style={{
                overflow: "hidden",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "0.25em",
                marginBottom: "0.12em",
              }}
            >
              {["We", "grow", "businesses"].map((word) => (
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
                        fontSize: "clamp(2.9rem, 7vw, 6.1rem)",
                        fontWeight: 700,
                        letterSpacing: "-0.05em",
                        lineHeight: 1.06,
                        color: "#0d0d14",
                      }}
                    >
                      {word}
                    </span>
                  </motion.span>
                </span>
              ))}
            </div>
            {/* Line 2 — accent color, slight delay */}
            <div
              style={{
                overflow: "hidden",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "0.25em",
              }}
            >
              {["that", "mean", "business."].map((word) => (
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
                        fontSize: "clamp(2.9rem, 7vw, 6.1rem)",
                        fontWeight: 700,
                        letterSpacing: "-0.05em",
                        lineHeight: 1.06,
                        color: "#3B6FF0",
                      }}
                    >
                      {word}
                    </span>
                  </motion.span>
                </span>
              ))}
            </div>
          </motion.div>

          {/* Sub-copy */}
          <motion.p
            className="f-body"
            initial={{ opacity: 1, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            style={{
              fontSize: "clamp(0.92rem, 1.3vw, 1.05rem)",
              color: "rgba(0,0,0,0.5)",
              maxWidth: 500,
              lineHeight: 1.65,
              marginBottom: 44,
            }}
          >
            Website development, SEO, AEO, paid ads, CRM automation, and social
            media — all under one roof, all built to drive real revenue.
          </motion.p>

          {/* CTAs */}
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
              marginBottom: 72,
            }}
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="f-body"
              style={{
                fontSize: 14,
                fontWeight: 500,
                background: "#3B6FF0",
                color: "#fff",
                padding: "14px 30px",
                borderRadius: 99,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              Start a project
            </motion.a>
            <motion.a
              href="#services"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="f-body"
              style={{
                fontSize: 14,
                color: "#0d0d14",
                border: "1px solid rgba(0,0,0,0.15)",
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(12px)",
                padding: "14px 30px",
                borderRadius: 99,
                textDecoration: "none",
              }}
            >
              Our services
            </motion.a>
          </motion.div>

          {/* Slide dots */}
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
                  background: i === active ? "#3B6FF0" : "rgba(0,0,0,0.18)",
                  transition: "all 0.32s ease",
                }}
              />
            ))}
          </div>

          {/* Scroll indicator */}
          <motion.div
            style={{
              opacity: scrollHintOpacity,
              position: "absolute",
              bottom: "max(90px, 10%)",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              pointerEvents: "none",
            }}
          >
            <span
              className="f-body"
              style={{
                fontSize: 9,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.3)",
              }}
            >
              Scroll
            </span>
            <div
              className="scroll-bounce"
              style={{
                width: 1,
                height: 28,
                background: "rgba(59,111,240,0.42)",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Bottom stats strip */}
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

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

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
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500&display=swap');
        .f-disp { font-family: 'Bricolage Grotesque', sans-serif; }
        .f-body { font-family: 'Inter', sans-serif; }
        @keyframes panLR {
          0%   { transform: scale(1.08) translateX(-3%); }
          100% { transform: scale(1.08) translateX(3%); }
        }
        .pan-lr { animation: panLR 8s ease-in-out infinite alternate; }
      `}</style>

      <section
        style={{ position: "relative", height: "100svh", overflow: "hidden" }}
      >
        {/* Background: cross-fading photos, each panning left→right */}
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

        {/* Overlay: dark gradient, heavier at bottom */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: "rgba(0, 0, 0, 0.85)",
          }}
        />

        {/* Content — centered */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            San Antonio, TX · Full-service digital agency
          </motion.p>

          {/* Main headline */}
          <div style={{ overflow: "hidden", marginBottom: 8 }}>
            <motion.h1
              className="f-disp"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease }}
              style={{
                margin: 0,
                fontSize: "clamp(3rem, 7vw, 6.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.0,
                color: "#ffffff",
              }}
            >
              We grow businesses
            </motion.h1>
          </div>
          <div style={{ overflow: "hidden", marginBottom: 28 }}>
            <motion.h1
              className="f-disp"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.14, ease }}
              style={{
                margin: 0,
                fontSize: "clamp(3rem, 7vw, 6.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.0,
                color: "#3B6FF0",
              }}
            >
              that mean business.
            </motion.h1>
          </div>

          {/* Sub-copy */}
          <motion.p
            className="f-body"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            style={{
              fontSize: "clamp(0.92rem, 1.3vw, 1.05rem)",
              color: "rgba(255,255,255,0.55)",
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.42, ease }}
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
              Start a project <ArrowUpRight size={15} />
            </motion.a>
            <motion.a
              href="#services"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="f-body"
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(255,255,255,0.25)",
                background: "rgba(255,255,255,0.08)",
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
                  background:
                    i === active ? "#3B6FF0" : "rgba(255,255,255,0.35)",
                  transition: "all 0.32s ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 3,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(16px)",
            display: "flex",
            justifyContent: "center",
            gap: "clamp(2rem, 6vw, 6rem)",
            padding: "18px clamp(1.5rem, 5vw, 4rem)",
          }}
        >
          {[
            { val: "8+", label: "Years in business" },
            { val: "300%", label: "Avg traffic growth" },
            { val: "50+", label: "Brands scaled" },
          ].map((st) => (
            <div key={st.label} style={{ textAlign: "center" }}>
              <p
                className="f-disp"
                style={{
                  margin: 0,
                  fontSize: "clamp(1.4rem, 2vw, 1.8rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "#fff",
                }}
              >
                {st.val}
              </p>
              <p
                className="f-body"
                style={{
                  margin: "2px 0 0",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.45)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {st.label}
              </p>
            </div>
          ))}
        </motion.div>
      </section>
    </>
  );
}

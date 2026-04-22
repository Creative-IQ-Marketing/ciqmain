import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { trackButtonClick } from "../../services/analytics";
import StaggerContainer, { StaggerItem } from "../primitives/StaggerContainer";
import ParallaxLayer from "../primitives/ParallaxLayer";
import FadeUp from "../primitives/FadeUp";

const ease = [0.22, 1, 0.36, 1];

const POINTS = [
  {
    num: "01",
    title: "Proven results",
    body: "300% average increase in organic traffic. Not a projection � our clients live it.",
  },
  {
    num: "02",
    title: "AI-era expertise",
    body: "We build for how search works in 2026: ChatGPT, Gemini, Google AI, and beyond.",
  },
  {
    num: "03",
    title: "Full-stack execution",
    body: "One team handles your web, SEO, CRM, content, and ads. No agency juggling.",
  },
  {
    num: "04",
    title: "Local & nationwide",
    body: "Based in San Antonio, TX � serving businesses across the country.",
  },
];

export default function About() {
  const navigate = useNavigate();
  return (
    <FadeUp
      as="section"
      id="about"
      style={{ background: "#fff", padding: "96px 0", overflow: "hidden" }}
    >
      <style>{`
        .f-disp { font-family: 'Bricolage Grotesque', sans-serif; }
        .f-body { font-family: 'Inter', sans-serif; }
        @media (max-width: 640px) {
          .about-left { width: 100% !important; flex: 1 1 100% !important; }
        }
      `}</style>

      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 5rem)",
          display: "flex",
          gap: "clamp(3rem, 7vw, 8rem)",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* LEFT */}
        <ParallaxLayer
          speed={-20}
          className="about-left"
          style={{ flex: "0 0 auto", width: "clamp(260px, 36%, 400px)" }}
        >
          <div>
            <p
              className="f-body"
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: "#3B6FF0",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              About CreativeIQ
            </p>
            <h2
              className="f-disp"
              style={{
                margin: "0 0 20px",
                lineHeight: 1.05,
                overflow: "hidden",
              }}
            >
              {[
                { text: "Your growth", color: "#0d0d0d" },
                { text: "partner in", color: "#0d0d0d" },
                { text: "the AI era.", color: "#3B6FF0" },
              ].map(({ text, color }, lineIdx) => (
                <div key={lineIdx} style={{ overflow: "hidden" }}>
                  <span
                    style={{
                      display: "block",
                      fontSize: "clamp(2.2rem, 3.8vw, 3.4rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.04em",
                      color,
                    }}
                    className="f-disp"
                  >
                    {text}
                  </span>
                </div>
              ))}
            </h2>
            <p
              className="f-body"
              style={{
                fontSize: 14,
                color: "rgba(0,0,0,0.42)",
                lineHeight: 1.7,
                marginBottom: 36,
                maxWidth: 340,
              }}
            >
              CreativeIQ is a full-service digital agency based in San Antonio,
              TX. We build digital ecosystems designed for AI-driven discovery �
              SEO, web design, CRM automation, and social media all engineered
              to grow your revenue.
            </p>
            <motion.button
              onClick={() => {
                trackButtonClick("About CTA", "about_cta", "About");
                navigate("/contact");
              }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
              className="f-body"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                fontWeight: 500,
                color: "#0d0d0d",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Schedule a free consultation <ArrowUpRight size={15} />
            </motion.button>
          </div>
        </ParallaxLayer>

        {/* RIGHT — numbered rows with coordinated stagger */}
        <StaggerContainer stagger={0.09} style={{ flex: 1, minWidth: 260 }}>
          {POINTS.map((p, i) => (
            <StaggerItem key={p.num}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 20,
                  padding: "24px 0",
                  borderBottom:
                    i < POINTS.length - 1
                      ? "1px solid rgba(0,0,0,0.06)"
                      : "none",
                }}
              >
                <span
                  className="f-disp"
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#3B6FF0",
                    letterSpacing: "0.08em",
                    flexShrink: 0,
                    marginTop: 3,
                  }}
                >
                  {p.num}
                </span>
                <div>
                  <p
                    className="f-body"
                    style={{
                      margin: "0 0 5px",
                      fontSize: 15,
                      fontWeight: 500,
                      color: "#0d0d0d",
                    }}
                  >
                    {p.title}
                  </p>
                  <p
                    className="f-body"
                    style={{
                      margin: 0,
                      fontSize: 14,
                      color: "rgba(0,0,0,0.4)",
                      lineHeight: 1.65,
                    }}
                  >
                    {p.body}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </FadeUp>
  );
}

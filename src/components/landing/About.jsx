import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { trackButtonClick } from "../../services/analytics";

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
  return (
    <section id="about" style={{ background: "#fff", padding: "96px 0" }}>
      <style>{`
        .f-disp { font-family: 'Bricolage Grotesque', sans-serif; }
        .f-body { font-family: 'Inter', sans-serif; }
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          style={{ flex: "0 0 auto", width: "clamp(260px, 36%, 400px)" }}
        >
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
              fontSize: "clamp(2.2rem, 3.8vw, 3.4rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: "#0d0d0d",
            }}
          >
            Your growth
            <br />
            partner in
            <br />
            <span style={{ color: "#3B6FF0" }}>the AI era.</span>
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
            SEO, web design, CRM automation, and social media all engineered to
            grow your revenue.
          </p>
          <motion.a
            href="#contact"
            onClick={() => trackButtonClick("About CTA", "about_cta", "About")}
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
              textDecoration: "none",
            }}
          >
            Schedule a free consultation <ArrowUpRight size={15} />
          </motion.a>
        </motion.div>

        {/* RIGHT � numbered rows */}
        <div style={{ flex: 1, minWidth: 260 }}>
          {POINTS.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 20,
                padding: "24px 0",
                borderBottom:
                  i < POINTS.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import {
  Search,
  MousePointerClick,
  MessageSquare,
  Bot,
  Database,
  MapPin,
  Code,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { trackButtonClick } from "../../services/analytics";
import StaggerContainer, { StaggerItem } from "../primitives/StaggerContainer";
import ParallaxLayer from "../primitives/ParallaxLayer";
import FadeUp from "../primitives/FadeUp";

const ease = [0.22, 1, 0.36, 1];

const SERVICES = [
  {
    icon: Bot,
    num: "01",
    title: "AI Search + Agents",
    value: "ai",
    body: "Get discovered on ChatGPT, Gemini, Perplexity, and Google AI � then convert that attention with custom AI agents.",
  },
  {
    icon: Search,
    num: "02",
    title: "SEO & AEO",
    value: "seo",
    body: "SEO built for AI indexing and long-term authority � technical, on-page, link building, and AI-ready site structure.",
  },
  {
    icon: MousePointerClick,
    num: "03",
    title: "Paid advertising",
    value: "ppc",
    body: "Data-driven Google and Meta campaigns that maximize ROI. Full setup, copy, bid management, and reporting.",
  },
  {
    icon: MessageSquare,
    num: "04",
    title: "Social media & content",
    value: "social",
    body: "Strategy, creation, and community management across Instagram, Facebook, TikTok, and LinkedIn.",
  },
  {
    icon: Database,
    num: "05",
    title: "CRM & automation",
    value: "crm",
    body: "GoHighLevel pipelines, lead nurturing sequences, and email automation that close deals while you sleep.",
  },
  {
    icon: MapPin,
    num: "06",
    title: "Google Business Profile",
    value: "gmb",
    body: "Local SEO and GMB optimization to dominate map results and attract nearby customers.",
  },
  {
    icon: Code,
    num: "07",
    title: "Web design & development",
    value: "web",
    body: "Custom, conversion-focused websites built fast and built to rank � responsive, performant, and on-brand.",
  },
];

const Services = () => {
  const navigate = useNavigate();

  const handleCTA = (value) => {
    trackButtonClick(value, "service_card", "Services");
    navigate(`/?service=${value}#contact`);
    setTimeout(() => {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <FadeUp
      as="section"
      id="services"
      style={{ background: "#F5F2EC", padding: "96px 0", overflow: "hidden" }}
    >
      <style>{`
        .f-disp { font-family: 'Bricolage Grotesque', sans-serif; }
        .f-body { font-family: 'Inter', sans-serif; }
        .svc-card:hover { box-shadow: 0 16px 48px rgba(59,111,240,0.12), 0 2px 8px rgba(0,0,0,0.06); }
      `}</style>

      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 5rem)",
        }}
      >
        {/* Header with parallax depth */}
        <ParallaxLayer speed={-30}>
          <div style={{ marginBottom: 56 }}>
            <p
              className="f-body"
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: "#3B6FF0",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              What we do
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 20,
              }}
            >
              <h2
                className="f-disp"
                style={{
                  margin: 0,
                  fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.0,
                  color: "#0d0d0d",
                }}
              >
                Our
                <br />
                <span style={{ color: "#3B6FF0" }}>Services</span>
              </h2>
              <motion.a
                href="/services"
                whileHover={{ x: 4 }}
                className="f-body"
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#0d0d0d",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                View all services <ArrowUpRight size={15} />
              </motion.a>
            </div>
          </div>
        </ParallaxLayer>

        {/* Cards � stagger entry on scroll */}
        <StaggerContainer
          stagger={0.07}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.num}>
                <motion.div
                  whileHover={{ y: -6 }}
                  onClick={() => handleCTA(s.value)}
                  className="svc-card"
                  style={{
                    background: "#fff",
                    padding: "32px 28px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    borderRadius: 2,
                    height: "100%",
                    borderTop: "2px solid transparent",
                    transition: "border-color 0.25s ease",
                  }}
                  onHoverStart={(e) => {
                    e.currentTarget.style.borderTopColor = "#3B6FF0";
                  }}
                  onHoverEnd={(e) => {
                    e.currentTarget.style.borderTopColor = "transparent";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        background: "rgba(59,111,240,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={20} color="#3B6FF0" />
                    </div>
                    <span
                      className="f-disp"
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "rgba(0,0,0,0.18)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {s.num}
                    </span>
                  </div>
                  <p
                    className="f-disp"
                    style={{
                      margin: 0,
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      color: "#0d0d0d",
                      lineHeight: 1.25,
                    }}
                  >
                    {s.title}
                  </p>
                  <p
                    className="f-body"
                    style={{
                      margin: 0,
                      fontSize: 13,
                      color: "rgba(0,0,0,0.42)",
                      lineHeight: 1.65,
                    }}
                  >
                    {s.body}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      marginTop: "auto",
                      paddingTop: 8,
                    }}
                  >
                    <span
                      className="f-body"
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: "#3B6FF0",
                      }}
                    >
                      Learn more
                    </span>
                    <ArrowUpRight size={13} color="#3B6FF0" />
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </FadeUp>
  );
};

export default Services;

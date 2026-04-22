import { motion } from "framer-motion";
import { Facebook, Linkedin, Instagram, Youtube } from "lucide-react";
import mainLogo from "../../assets/mainLogo.png";
import { trackButtonClick } from "../../services/analytics";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  "AI Search & Agents",
  "SEO & AEO",
  "Google & Meta Ads",
  "Social Media",
  "CRM & Automation",
  "Web Development",
];

const SOCIALS = [
  { Icon: Facebook, label: "Facebook", href: "#" },
  { Icon: Linkedin, label: "LinkedIn", href: "#" },
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Youtube, label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0d0d14",
        color: "#fff",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "64px clamp(1.5rem, 5vw, 5rem) 0",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "200px 1fr 1fr",
            gap: "clamp(2rem, 6vw, 5rem)",
            paddingBottom: 56,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: "#fff",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <img src={mainLogo} alt="CreativeIQ" style={{ width: 22, height: 22, objectFit: "contain" }} />
              </div>
              <span
                style={{
                  fontFamily: "Bricolage Grotesque, sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                }}
              >
                CreativeIQ
              </span>
            </div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.35)",
                lineHeight: 1.65,
                margin: "0 0 24px",
              }}
            >
              Digital ecosystems built for AI-driven discovery, search
              dominance, and real conversions.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.45)",
                    textDecoration: "none",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#3b82f6";
                    e.currentTarget.style.color = "#3b82f6";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                marginBottom: 18,
              }}
            >
              Services
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {SERVICES.map((s) => (
                <li key={s} style={{ marginBottom: 10 }}>
                  <a
                    href="#services"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.82rem",
                      color: "rgba(255,255,255,0.45)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                marginBottom: 18,
              }}
            >
              Contact
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                fontFamily: "Inter, sans-serif",
                fontSize: "0.82rem",
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.45)" }}>San Antonio, Texas</span>
              <a
                href="tel:2108380177"
                style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >
                (210) 838-0177
              </a>
              <a
                href="mailto:CiQ@creativeiq.marketing"
                style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >
                CiQ@creativeiq.marketing
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "22px 0",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.72rem",
              color: "rgba(255,255,255,0.2)",
              margin: 0,
            }}
          >
             {new Date().getFullYear()} CreativeIQ Marketing. All rights reserved.
          </p>
          <nav style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {NAV.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => trackButtonClick(label, "footer_nav", "Footer")}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.25)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

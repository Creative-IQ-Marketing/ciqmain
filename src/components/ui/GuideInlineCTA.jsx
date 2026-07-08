import { Download } from "lucide-react";
import { trackButtonClick } from "../../services/analytics";

function triggerDownload(source = "inline_cta") {
  trackButtonClick("Download SEO Guide", source, "GuideInlineCTA");
  const a = document.createElement("a");
  a.href = "/ciq-ai-seo-growth-guide.pdf";
  a.download = "CIQ-AI-SEO-Growth-Guide.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/**
 * Compact inline guide CTA — drop into any page.
 * Usage: <GuideInlineCTA source="contact_page" />
 */
export default function GuideInlineCTA({ source = "inline_cta" }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1.5rem",
        padding: "1.25rem 1.5rem",
        borderRadius: 8,
        border: "1px solid #E5E7EB",
        background: "#FAFAFA",
        flexWrap: "wrap",
      }}
    >
      {/* Left: text */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", minWidth: 0 }}>
        {/* Accent bar */}
        <div
          aria-hidden="true"
          style={{
            width: 3,
            height: 36,
            borderRadius: 2,
            background: "#3B6FF0",
            flexShrink: 0,
          }}
        />
        <div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "#0B0F1A",
              margin: "0 0 2px",
              letterSpacing: "-0.01em",
            }}
          >
            AI SEO Growth Guide — Free PDF
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "#9CA3AF",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            The exact framework we use to get clients ranking on Google and AI platforms.
          </p>
        </div>
      </div>

      {/* Right: button */}
      <button
        onClick={() => triggerDownload(source)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          padding: "9px 18px",
          borderRadius: 6,
          background: "#0B0F1A",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          fontSize: "0.8rem",
          fontWeight: 600,
          letterSpacing: "0.01em",
          whiteSpace: "nowrap",
          transition: "background 0.2s ease",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#1e2740")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#0B0F1A")}
      >
        <Download size={13} strokeWidth={2.3} />
        Download Free
      </button>
    </div>
  );
}

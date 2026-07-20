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
 * Quiet guide CTA — text + download link, no panel chrome.
 */
export default function GuideInlineCTA({ source = "inline_cta" }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
      <div className="min-w-0">
        <p className="font-sans text-sm font-medium tracking-[-0.01em] text-[var(--c-ink)]">
          AI SEO Growth Guide
        </p>
        <p className="mt-0.5 font-sans text-sm leading-snug text-[var(--c-text-muted)]">
          Free PDF — the framework we use for Google and AI platforms.
        </p>
      </div>
      <button
        type="button"
        onClick={() => triggerDownload(source)}
        className="inline-flex shrink-0 items-center gap-1.5 font-sans text-sm font-semibold text-[var(--c-accent)] transition hover:text-[#2f5fd9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)]"
      >
        <Download size={14} strokeWidth={2} aria-hidden />
        Download
      </button>
    </div>
  );
}

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
 */
export default function GuideInlineCTA({ source = "inline_cta" }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-5 border border-[var(--c-border)] bg-[var(--c-surface-2)] px-5 py-4 sm:px-6">
      <div className="min-w-0">
        <p className="font-sans text-sm font-semibold tracking-[-0.01em] text-[var(--c-ink)]">
          AI SEO Growth Guide - Free PDF
        </p>
        <p className="mt-1 font-sans text-sm leading-snug text-[var(--c-text-muted)]">
          The exact framework we use to get clients ranking on Google and AI
          platforms.
        </p>
      </div>
      <button
        type="button"
        onClick={() => triggerDownload(source)}
        className="inline-flex shrink-0 items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--c-cta)] px-5 py-2.5 font-sans text-sm font-semibold text-white transition hover:bg-[var(--c-cta-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)]"
      >
        <Download size={14} strokeWidth={2} aria-hidden />
        Download free
      </button>
    </div>
  );
}

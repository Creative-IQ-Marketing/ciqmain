import { Download } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { trackButtonClick } from "../../services/analytics";
import { Button } from "../ui/button";
import guideCover from "../../assets/hero/guide-cover-2026.webp";

export default function GuideStrip() {
  const { pathname } = useLocation();
  if (pathname === "/ai-seo-guide") return null;

  return (
    <section
      aria-label="Free AI SEO Growth Guide"
      className="border-t border-[var(--c-border)] bg-[var(--c-base)]"
    >
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col items-start gap-6 px-[var(--container-pad)] py-10 sm:flex-row sm:items-center sm:gap-8">
        <img
          src={guideCover}
          alt="CreativeIQ AI SEO Growth Guide 2026 cover"
          width={90}
          height={120}
          loading="lazy"
          decoding="async"
          className="h-[120px] w-[90px] shrink-0 rounded-md object-cover shadow-[var(--shadow-soft)]"
        />
        <div className="flex-1">
          <h2 className="font-sans text-xl font-extrabold tracking-[-0.03em] text-[var(--c-ink)]">
            Free book: The AI SEO &amp; AEO Growth Guide
          </h2>
          <p className="mt-1 max-w-xl font-sans text-sm leading-relaxed text-[var(--c-text-secondary)]">
            How to rank on Google and get cited by ChatGPT, Perplexity, and
            Gemini. Free, no sign-up.{" "}
            <Link
              to="/ai-seo-guide"
              className="font-semibold text-[var(--c-accent)] hover:underline"
            >
              Read more
            </Link>
          </p>
        </div>
        <Button asChild>
          <a
            href="/ciq-ai-seo-growth-guide.pdf"
            download="CIQ-AI-SEO-Growth-Guide.pdf"
            onClick={() =>
              trackButtonClick("Download SEO Guide", "guide_strip", "GuideStrip")
            }
          >
            <Download size={15} strokeWidth={1.75} aria-hidden />
            Download the book
          </a>
        </Button>
      </div>
    </section>
  );
}

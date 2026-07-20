import { Download } from "lucide-react";
import { trackButtonClick } from "../../services/analytics";
import { Button } from "../ui/button";
import Reveal from "../primitives/Reveal";
import guideCover from "../../assets/hero/guide-cover-2026.jpg";

let pdfCached = false;
function warmCache() {
  if (pdfCached) return;
  pdfCached = true;
  fetch("/ciq-ai-seo-growth-guide.pdf", { cache: "force-cache" }).catch(
    () => null,
  );
}

function triggerDownload() {
  trackButtonClick("Download SEO Guide", "guide_download_cta", "GuideDownload");
  const a = document.createElement("a");
  a.href = "/ciq-ai-seo-growth-guide.pdf";
  a.download = "CIQ-AI-SEO-Growth-Guide.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

const CHAPTERS = [
  { n: "01", t: "AI-ready on-page architecture" },
  { n: "02", t: "Technical SEO that moves rankings" },
  { n: "03", t: "Show up on ChatGPT, Perplexity, Gemini" },
  { n: "04", t: "Conversion: traffic into revenue" },
];

export default function GuideDownload() {
  return (
    <section
      id="guide-download"
      onMouseEnter={warmCache}
      className="relative overflow-hidden border-t border-[var(--c-border)] bg-[var(--c-base)]"
    >
      <div className="mx-auto grid max-w-[var(--container-max)] items-center gap-14 px-[var(--container-pad)] py-[var(--section-pad)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <Reveal>
          <h2 className="mb-5 max-w-lg font-sans text-[clamp(2.2rem,4vw,3.6rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-[var(--c-ink)] text-balance">
            The AI SEO Growth Guide
          </h2>
          <p className="mb-10 max-w-md font-sans text-base leading-relaxed text-[var(--c-text-secondary)]">
            The playbook we use to rank on Google and appear in AI answers. Not
            recycled 2019 tactics. What works when search, chat, and conversion
            have to move together.
          </p>

          <ul className="mb-10 space-y-0">
            {CHAPTERS.map((c) => (
              <li
                key={c.n}
                className="flex items-baseline gap-4 border-t border-[var(--c-border)] py-4 font-sans last:border-b"
              >
                <span className="text-xs font-bold tabular-nums text-[var(--c-accent)]">
                  {c.n}
                </span>
                <span className="text-sm text-[var(--c-ink-soft)]">{c.t}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-4">
            <Button type="button" onClick={triggerDownload}>
              <Download size={15} strokeWidth={1.75} aria-hidden />
              Download PDF
            </Button>
            <span className="font-sans text-xs tracking-[0.02em] text-[var(--c-text-muted)]">
              Free. No sign-up.
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative flex justify-center lg:justify-end">
          <div
            className="absolute -inset-8 rounded-full opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(59,111,240,0.18), transparent 68%)",
            }}
            aria-hidden
          />
          <button
            type="button"
            onClick={triggerDownload}
            className="group relative rotate-[-3deg] transition hover:rotate-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)]"
            aria-label="Download the AI SEO Growth Guide PDF"
          >
            <img
              src={guideCover}
              alt="CreativeIQ AI SEO Growth Guide 2026 cover"
              width={300}
              height={400}
              loading="lazy"
              decoding="async"
              className="relative w-[min(300px,72vw)] rounded-[var(--radius-card)] shadow-[var(--shadow-frame)] transition duration-500 group-hover:scale-[1.03]"
            />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

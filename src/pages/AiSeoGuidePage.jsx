import { useState } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import PageHeader from "../components/layout/PageHeader";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { submitAiSeoGuideLead } from "../services/ghl";
import { trackButtonClick, trackFormSubmission } from "../services/analytics";
import guideCover from "../assets/hero/guide-cover-2026.webp";

const GUIDE_PDF = "/ciq-ai-seo-growth-guide.pdf";

const CHAPTERS = [
  { n: "01", t: "AI-ready on-page architecture" },
  { n: "02", t: "Technical SEO that moves rankings" },
  { n: "03", t: "Show up on ChatGPT, Perplexity, Gemini" },
  { n: "04", t: "Conversion: traffic into revenue" },
];

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function downloadGuide() {
  trackButtonClick("Download SEO Guide", "guide_success_download", "AiSeoGuidePage");
  const a = document.createElement("a");
  a.href = GUIDE_PDF;
  a.download = "CIQ-AI-SEO-Growth-Guide.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function AiSeoGuidePage() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const name = firstName.trim();
    const cleanEmail = email.trim();

    if (!name) {
      setError("Please enter your first name.");
      return;
    }
    if (!isValidEmail(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await submitAiSeoGuideLead({ firstName: name, email: cleanEmail });
      trackFormSubmission("ai_seo_guide");
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-white">
      <SEO
        title="AI SEO Growth Guide | CreativeIQ"
        description="Get the CreativeIQ AI SEO Growth Guide in your inbox. Enter your name and email — the playbook for ranking on Google and showing up in AI answers."
        keywords="AI SEO guide, SEO growth guide, ChatGPT SEO, GEO, CreativeIQ PDF"
        canonical="https://creativeiqmarketing.com/ai-seo-guide"
        pageType="website"
      />

      <PageHeader
        eyebrow="Free playbook"
        title="AI SEO Growth Guide"
        description="The framework we use to rank on Google and appear in AI answers. Enter your details — we'll send the PDF to your inbox."
      />

      <section className="border-t border-[var(--c-border)] bg-[var(--c-surface-2)] pb-20 pt-10">
        <div className="mx-auto grid max-w-[var(--container-max)] gap-10 px-[var(--container-pad)] lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <div className="hidden lg:block">
            <img
              src={guideCover}
              alt="CreativeIQ AI SEO Growth Guide 2026 cover"
              width={300}
              height={400}
              className="w-full max-w-[280px] rounded-[var(--radius-card)] shadow-[var(--shadow-frame)]"
            />
            <ul className="mt-8 space-y-0">
              {CHAPTERS.map((c) => (
                <li
                  key={c.n}
                  className="flex items-baseline gap-4 border-t border-[var(--c-border)] py-3.5 font-sans last:border-b"
                >
                  <span className="text-xs font-bold tabular-nums text-[var(--c-accent)]">
                    {c.n}
                  </span>
                  <span className="text-sm text-[var(--c-ink-soft)]">{c.t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-[var(--c-border)] bg-white p-6 sm:p-10">
            {success ? (
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
                  <Check className="h-7 w-7 text-emerald-600" strokeWidth={2.5} />
                </div>
                <h2 className="font-sans text-2xl font-extrabold tracking-[-0.03em] text-[var(--c-ink)]">
                  Check your inbox
                </h2>
                <p className="mx-auto mt-3 max-w-sm font-sans text-base leading-relaxed text-[var(--c-text-secondary)]">
                  The AI SEO Growth Guide is on its way
                  {firstName.trim() ? `, ${firstName.trim()}` : ""}. If it
                  doesn’t land in a minute, check spam — or download it here.
                </p>
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <Button type="button" onClick={downloadGuide}>
                    Download now
                  </Button>
                  <Button variant="secondary" asChild>
                    <Link to="/">Back to home</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h2 className="font-sans text-xl font-extrabold tracking-[-0.03em] text-[var(--c-ink)]">
                    Send it to my inbox
                  </h2>
                  <p className="mt-1 font-sans text-sm text-[var(--c-text-muted)]">
                    First name and email. That’s it.
                  </p>
                </div>

                <label className="block">
                  <span className="mb-2 block font-sans text-sm font-medium text-[var(--c-ink)]">
                    First name
                  </span>
                  <Input
                    name="firstName"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setError("");
                    }}
                    placeholder="Your name"
                    disabled={loading}
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block font-sans text-sm font-medium text-[var(--c-ink)]">
                    Email
                  </span>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--c-text-muted)]" />
                    <Input
                      type="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="you@company.com"
                      disabled={loading}
                      required
                      className="pl-11"
                    />
                  </div>
                </label>

                {error ? (
                  <p className="font-sans text-sm text-red-600">{error}</p>
                ) : null}

                <Button type="submit" disabled={loading} className="w-full" size="lg">
                  {loading ? (
                    "Sending…"
                  ) : (
                    <>
                      Email me the guide
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>

                <p className="text-center font-sans text-xs leading-relaxed text-[var(--c-text-muted)]">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

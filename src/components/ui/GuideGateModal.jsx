import { useEffect, useRef, useState } from "react";
import { m as motion } from "framer-motion";
import { Check, Download, Mail, X } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import { submitAiSeoGuideLead } from "../../services/ghl";
import { requestSeoGuideEmail } from "../../services/seoGuideTool";
import { trackGuideEvent } from "../../services/analytics";
import guideCover from "../../assets/hero/guide-cover-2026.webp";

const GUIDE_PDF = "/ciq-ai-seo-growth-guide.pdf";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function downloadGuide(source) {
  trackGuideEvent("download", source);
  const a = document.createElement("a");
  a.href = GUIDE_PDF;
  a.download = "CIQ-AI-SEO-Growth-Guide.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function GuideGateModal({ source, onClose }) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const startedRef = useRef(false);
  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  function markStarted() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackGuideEvent("form_start", source);
  }

  function handleClose() {
    if (!done) trackGuideEvent("gate_dismiss", source);
    onClose();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const name = firstName.trim();
    const cleanEmail = email.trim();

    if (!name) {
      setError("Please enter your first name.");
      trackGuideEvent("form_error", source, { reason: "missing_name" });
      return;
    }
    if (!isValidEmail(cleanEmail)) {
      setError("Please enter a valid email address.");
      trackGuideEvent("form_error", source, { reason: "invalid_email" });
      return;
    }

    setLoading(true);
    // The CRM contact is what the team follows up on; the email is a second
    // touch. Only block the download if neither went through.
    const [crm, mail] = await Promise.allSettled([
      submitAiSeoGuideLead({
        firstName: name,
        email: cleanEmail,
        source: `guide_gate_${source}`,
        pagePath: window.location.pathname,
      }),
      requestSeoGuideEmail({ firstName: name, email: cleanEmail }),
    ]);
    setLoading(false);

    if (crm.status === "rejected" && mail.status === "rejected") {
      trackGuideEvent("submit_failed", source);
      setError("Something went wrong on our end. Please try again.");
      return;
    }

    trackGuideEvent("lead_captured", source, {
      crm_ok: crm.status === "fulfilled",
      email_ok: mail.status === "fulfilled",
    });
    setDone(true);
    downloadGuide(source);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-gate-title"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
        >
          <X size={16} />
        </button>

        {done ? (
          <div className="px-8 py-10 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
              <Check className="h-7 w-7 text-emerald-600" strokeWidth={2.5} />
            </div>
            <h2
              id="guide-gate-title"
              className="font-sans text-2xl font-extrabold tracking-[-0.03em] text-[var(--c-ink)]"
            >
              Your download is on its way
            </h2>
            <p className="mx-auto mt-3 max-w-sm font-sans text-sm leading-relaxed text-[var(--c-text-secondary)]">
              Thanks, {firstName.trim()}. We&apos;ve also emailed a copy to{" "}
              {email.trim()}. If the download didn&apos;t start, use the button
              below.
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button type="button" onClick={() => downloadGuide(source)}>
                <Download size={15} strokeWidth={1.75} aria-hidden />
                Download again
              </Button>
              <Button type="button" variant="secondary" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 px-8 pb-8 pt-9">
            <div className="flex items-center gap-4">
              <img
                src={guideCover}
                alt=""
                width={60}
                height={80}
                className="h-[80px] w-[60px] shrink-0 rounded-md object-cover shadow-[var(--shadow-soft)]"
              />
              <div>
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--c-accent)]">
                  Free PDF
                </p>
                <h2
                  id="guide-gate-title"
                  className="mt-1 font-sans text-xl font-extrabold tracking-[-0.03em] text-[var(--c-ink)]"
                >
                  Get the AI SEO Growth Guide
                </h2>
              </div>
            </div>
            <p className="font-sans text-sm text-[var(--c-text-muted)]">
              Tell us where to send it. Your download starts right after.
            </p>

            <label className="block">
              <span className="mb-2 block font-sans text-sm font-medium text-[var(--c-ink)]">
                First name
              </span>
              <Input
                ref={nameRef}
                name="firstName"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => {
                  markStarted();
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
                    markStarted();
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
              <p role="alert" className="font-sans text-sm text-red-600">
                {error}
              </p>
            ) : null}

            <Button type="submit" disabled={loading} className="w-full" size="lg">
              {loading ? (
                "Sending…"
              ) : (
                <>
                  <Download size={15} strokeWidth={1.75} aria-hidden />
                  Download the guide
                </>
              )}
            </Button>
            <p className="text-center font-sans text-xs leading-relaxed text-[var(--c-text-muted)]">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

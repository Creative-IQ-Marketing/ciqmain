import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CircleAlert,
  CircleCheckBig,
  Globe,
  LoaderCircle,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import GuideInlineCTA from "../components/ui/GuideInlineCTA";
import { trackButtonClick, trackFormSubmission } from "../services/analytics";
import { requestSeoAuditReport } from "../services/seoAuditTool";
import { upsertSeoAuditLead } from "../services/ghl";

const BENEFITS = [
  {
    label: "Technical signals",
    body: "Crawlability, structure, speed posture, and the issues that quietly suppress visibility.",
  },
  {
    label: "Mobile experience",
    body: "A practical read on how the site behaves when real users and search systems land on it.",
  },
  {
    label: "Commercial readiness",
    body: "Whether the site feels credible enough to earn the click, the trust, and the next action.",
  },
];

const TRUST_POINTS = [
  "Accepted instantly",
  "2 free reports per email",
  "Delivered by email",
];

const FAQS = [
  {
    question: "What do I need to submit?",
    answer:
      "Only your email and the website URL you want reviewed. The tool is intentionally simple so the request takes less than a minute.",
  },
  {
    question: "Why does the page confirm before the report is finished?",
    answer:
      "The report request is accepted first, then processed asynchronously. That 202 accepted response keeps the UX fast instead of making the visitor wait on-page.",
  },
  {
    question: "How many free reports can I request?",
    answer:
      "Each email address gets two free reports per month. If your team needs more, contact CreativeIQ and we can register you for ongoing access.",
  },
];

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function isLikelyUrl(value) {
  try {
    const parsed = new URL(normalizeUrl(value));
    return Boolean(parsed.hostname && parsed.hostname.includes("."));
  } catch {
    return false;
  }
}

function StatusPanel({ status, message }) {
  if (status === "idle") return null;

  const toneMap = {
    success: {
      title: "Report accepted",
      className: "border-[#3b6ff0]/30 bg-[#f8fbff] text-slate-900",
      icon: CircleCheckBig,
    },
    limited: {
      title: "Free limit reached",
      className: "border-[#f6c343]/50 bg-[#fffaf0] text-slate-900",
      icon: CircleAlert,
    },
    error: {
      title: "Request could not be submitted",
      className: "border-slate-300 bg-white text-slate-900",
      icon: CircleAlert,
    },
    submitting: {
      title: "Submitting request",
      className: "border-slate-200 bg-[#f8fafc] text-slate-800",
      icon: LoaderCircle,
    },
  };

  const tone = toneMap[status];
  const StatusIcon = tone.icon;

  return (
    <div className={`mt-5 rounded-3xl border px-5 py-4 ${tone.className}`}>
      <div className="flex items-center gap-2.5">
        <StatusIcon
          className={`h-4.5 w-4.5 ${status === "submitting" ? "animate-spin" : ""}`}
        />
        <p className="text-sm font-semibold">{tone.title}</p>
      </div>
      <p className="mt-1 text-sm leading-7">
        {message || "Please wait while we submit your request."}
      </p>
      {status === "limited" && (
        <div className="mt-4">
          <Link
            to="/contact"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#18181b] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#2a2a2a]"
          >
            Contact us for more access
          </Link>
        </div>
      )}
    </div>
  );
}

export default function FreeSeoAuditPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const canonical = "https://creativeiq.marketing/free-ai-seo-audit";

  const structuredData = useMemo(
    () => ({
      application: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "CreativeIQ Free AI SEO Audit",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        url: canonical,
        description:
          "Free AI SEO audit tool from CreativeIQ. Submit a URL and email to receive a technical SEO and discovery-readiness report by email.",
        publisher: {
          "@type": "Organization",
          name: "CreativeIQ Marketing",
          url: "https://creativeiq.marketing",
        },
      },
      faq: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer,
          },
        })),
      },
      breadcrumb: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://creativeiq.marketing/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Free AI SEO Audit",
            item: canonical,
          },
        ],
      },
    }),
    [canonical],
  );

  useEffect(() => {
    const scripts = Object.entries(structuredData).map(([key, value]) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.schema = `free-ai-seo-audit-${key}`;
      script.text = JSON.stringify(value);
      document.head.appendChild(script);
      return script;
    });

    return () => {
      scripts.forEach((script) => script.remove());
    };
  }, [structuredData]);

  const submitLabel =
    status === "submitting"
      ? "Generating your report..."
      : "Get My Visibility Report";

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    const cleanEmail = email.trim();
    const normalizedUrl = normalizeUrl(url);

    if (!cleanFirstName) {
      setStatus("error");
      setMessage("Enter your first name.");
      return;
    }

    if (!cleanLastName) {
      setStatus("error");
      setMessage("Enter your last name.");
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    if (!isLikelyUrl(normalizedUrl)) {
      setStatus("error");
      setMessage("Enter a valid website URL.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const result = await requestSeoAuditReport({
        firstName: cleanFirstName,
        lastName: cleanLastName,
        email: cleanEmail,
        url: normalizedUrl,
      });

      if (result.status === 202) {
        await upsertSeoAuditLead({
          firstName: cleanFirstName,
          lastName: cleanLastName,
          email: cleanEmail,
          website: normalizedUrl,
        }).catch(() => null);
        trackFormSubmission("free_ai_seo_audit");
        trackButtonClick(
          "Free AI SEO Audit Submit",
          "free_ai_seo_audit_submit",
          "Lead Magnet",
        );
        setStatus("success");
        setMessage(result.message);
      }
    } catch (error) {
      // Safely access error properties with null checks
      const errorStatus = error?.status ?? null;
      const errorMessage = error?.message ?? "Unknown error";

      if (errorStatus === 429) {
        setStatus("limited");
        setMessage(
          "You have used your 2 free reports this month. Contact us to get registered for ongoing access.",
        );
        return;
      }

      setStatus("error");
      setMessage(
        errorMessage && errorMessage.trim()
          ? errorMessage
          : "We could not queue your report right now. Please try again.",
      );

      // Log the full error for debugging
      console.error("SEO audit form submission error:", {
        status: errorStatus,
        message: errorMessage,
        error,
      });
    }
  };

  return (
    <>
      <SEO
        title="Free AI SEO Audit Tool | CreativeIQ Marketing"
        description="Get a free AI-powered SEO audit for your website in seconds. Identify performance issues, ranking gaps, and conversion problems instantly."
        keywords="free SEO audit, AI SEO audit, website SEO report, technical SEO audit, SEO analysis tool, CreativeIQ SEO audit, AI search optimization audit"
        canonical={canonical}
        pageType="website"
      />

      <main className="relative overflow-hidden bg-white text-[#0f0f0f]">
        <section className="relative mx-auto max-w-3xl border-b border-black/[0.05] px-4 pb-14 pt-[calc(var(--hero-header-offset)+2rem)] text-center sm:px-6 md:pb-16 lg:pt-[calc(var(--hero-header-offset)+3rem)]">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3B6FF0]"
          >
            Free tool
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="font-sans text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#0f0f0f]"
          >
            Audit My Site
            <span className="sr-only">
              {" "}
              — Free AI SEO Audit Tool | CreativeIQ Marketing
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-[#5c5c5c]"
          >
            <p>
              Most websites underperform due to missing technical SEO
              foundations—not poor content. Our free AI audit uncovers ranking
              gaps, performance issues, and conversion blockers in minutes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-10 max-w-2xl"
          >
            <div className="rounded-[22px] border border-black/[0.06] bg-white p-5 text-left shadow-[0_20px_48px_-20px_rgba(0,0,0,0.1)] sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.06] pb-4">
                <div>
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3B6FF0]">
                    Fast request form
                  </p>
                  <h2 className="mt-2 font-sans text-2xl font-extrabold tracking-[-0.03em] text-[#0f0f0f] sm:text-3xl">
                    Unlock My Website & SEO Audit
                  </h2>
                  <p className="mt-3 max-w-lg font-sans text-sm leading-relaxed text-[#5c5c5c]">
                    Technical SEO, mobile usability, speed, and content visibility
                    — actionable insights for agencies, service businesses, and
                    e-commerce.
                  </p>
                </div>
                <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-700">
                  <ShieldCheck className="h-4 w-4" />2 per email
                </span>
              </div>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="font-sans mb-2 block text-sm font-semibold text-slate-700">
                      First name
                    </span>
                    <div className="relative">
                      <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        placeholder="John"
                        className="font-sans h-14 w-full rounded-2xl border border-slate-300 bg-white pl-11 pr-4 text-base text-slate-900 outline-none transition focus:border-[#3b6ff0] focus:ring-4 focus:ring-[#3b6ff0]/10"
                        required
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="font-sans mb-2 block text-sm font-semibold text-slate-700">
                      Last name
                    </span>
                    <div className="relative">
                      <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        placeholder="Smith"
                        className="font-sans h-14 w-full rounded-2xl border border-slate-300 bg-white pl-11 pr-4 text-base text-slate-900 outline-none transition focus:border-[#3b6ff0] focus:ring-4 focus:ring-[#3b6ff0]/10"
                        required
                      />
                    </div>
                  </label>
                </div>

                <label className="block">
                  <span className="font-sans mb-2 block text-sm font-semibold text-slate-700">
                    Work email
                  </span>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@company.com"
                      className="font-sans h-14 w-full rounded-2xl border border-slate-300 bg-white pl-11 pr-4 text-base text-slate-900 outline-none transition focus:border-[#3b6ff0] focus:ring-4 focus:ring-[#3b6ff0]/10"
                      required
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="font-sans mb-2 block text-sm font-semibold text-slate-700">
                    Website URL
                  </span>
                  <div className="relative">
                    <Globe className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={url}
                      onChange={(event) => setUrl(event.target.value)}
                      placeholder="example.com"
                      className="font-sans h-14 w-full rounded-2xl border border-slate-300 bg-white pl-11 pr-4 text-base text-slate-900 outline-none transition focus:border-[#3b6ff0] focus:ring-4 focus:ring-[#3b6ff0]/10"
                      required
                    />
                  </div>
                </label>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#18181b] px-6 py-4 font-sans text-[15px] font-semibold text-white transition hover:bg-[#2a2a2a] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitLabel}
                </button>
              </form>

              <div className="mt-4 flex flex-wrap gap-2.5">
                {TRUST_POINTS.map((item) => (
                  <span
                    key={item}
                    className="inline-flex min-h-10 items-center rounded-full border border-black/[0.06] bg-white px-3.5 py-2 font-sans text-xs font-semibold text-[#5c5c5c]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <StatusPanel status={status} message={message} />

              <p className="font-sans mt-4 text-xs leading-6 text-slate-500">
                Need more than two reports each month? Contact CreativeIQ to get
                registered for broader access.
              </p>
            </div>
          </motion.div>
        </section>

        <section className="relative mx-auto max-w-4xl px-4 pb-14 sm:px-6 md:pb-18">
          <div className="grid gap-3 sm:grid-cols-3">
            {BENEFITS.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.04)]"
              >
                <p className="font-sans text-sm font-bold text-slate-950">
                  {item.label}
                </p>
                <p className="font-sans mt-2 text-sm leading-7 text-slate-600">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="audit-faq"
          className="relative mx-auto max-w-3xl px-4 pb-18 sm:px-6 lg:pb-24"
        >
          <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)] sm:p-8">
            <div className="text-center">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-[#3b6ff0]">
                Frequently asked
              </p>
              <h2 className="mt-3 text-[clamp(2rem,5vw,3.2rem)] leading-[0.98] tracking-[-0.05em] text-slate-950">
                <span className="audit-serif italic">Minimal on purpose.</span>
              </h2>
            </div>

            <div className="mt-8 space-y-4">
              {FAQS.map(({ question, answer }) => (
                <article
                  key={question}
                  className="rounded-3xl border border-slate-200 bg-[#fbfaf7] p-5"
                >
                  <h3 className="font-sans text-base font-extrabold tracking-[-0.02em] text-slate-950">
                    {question}
                  </h3>
                  <p className="font-sans mt-2 text-sm leading-7 text-slate-600">
                    {answer}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                to="/contact"
                onClick={() =>
                  trackButtonClick(
                    "Audit Bottom CTA",
                    "audit_bottom_cta",
                    "Lead Magnet",
                  )
                }
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#18181b] px-5 py-3 font-sans text-sm font-semibold text-white transition hover:bg-[#2a2a2a]"
              >
                Need more access
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Guide resource */}
            <div className="mt-8">
              <GuideInlineCTA source="seo_audit_page" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

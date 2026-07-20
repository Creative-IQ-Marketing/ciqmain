import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CircleAlert,
  CircleCheckBig,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import GuideInlineCTA from "../components/ui/GuideInlineCTA";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { trackButtonClick, trackFormSubmission } from "../services/analytics";
import { requestSeoAuditReport } from "../services/seoAuditTool";
import { upsertSeoAuditLead } from "../services/ghl";
import {
  IconCommercial,
  IconMobile,
  IconSeo,
} from "../assets/icons/ServiceIcons";

const BENEFITS = [
  {
    label: "Technical signals",
    body: "Crawlability, structure, speed posture, and issues that quietly suppress visibility.",
    icon: IconSeo,
  },
  {
    label: "Mobile experience",
    body: "How the site behaves when real users and search systems land on it.",
    icon: IconMobile,
  },
  {
    label: "Commercial readiness",
    body: "Whether the site earns the click, the trust, and the next action.",
    icon: IconCommercial,
  },
];

const FAQS = [
  {
    question: "What do I need to submit?",
    answer:
      "Your name, email, and the website URL. The request takes less than a minute.",
  },
  {
    question: "Why confirm before the report is finished?",
    answer:
      "We accept the request first, then process asynchronously so you are not waiting on the page.",
  },
  {
    question: "How many free reports can I request?",
    answer:
      "Two free reports per email each month. Need more? Contact us for ongoing access.",
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
      className: "bg-[var(--c-accent-dim)] text-[var(--c-ink)]",
      icon: CircleCheckBig,
    },
    limited: {
      title: "Free limit reached",
      className: "bg-[var(--c-surface-2)] text-[var(--c-ink)]",
      icon: CircleAlert,
    },
    error: {
      title: "Request could not be submitted",
      className: "bg-[var(--c-surface-2)] text-[var(--c-ink)]",
      icon: CircleAlert,
    },
    submitting: {
      title: "Submitting request",
      className: "bg-[var(--c-surface-2)] text-[var(--c-ink)]",
      icon: LoaderCircle,
    },
  };

  const tone = toneMap[status];
  const StatusIcon = tone.icon;

  return (
    <div className={`mt-5 rounded-[var(--radius-control)] px-5 py-4 ${tone.className}`}>
      <div className="flex items-center gap-2.5">
        <StatusIcon
          className={`size-4 ${status === "submitting" ? "animate-spin" : ""}`}
        />
        <p className="font-sans text-sm font-semibold">{tone.title}</p>
      </div>
      <p className="mt-1 font-sans text-sm leading-relaxed text-[var(--c-text-secondary)]">
        {message || "Please wait while we submit your request."}
      </p>
      {status === "limited" && (
        <div className="mt-4">
          <Link
            to="/contact"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--c-cta)] px-4 py-2.5 font-sans text-xs font-semibold text-white transition hover:bg-[var(--c-cta-hover)]"
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
      : "Get my visibility report";

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

      <main className="bg-white text-[var(--c-ink)]">
        <section className="border-b border-[var(--c-border)] pt-[calc(var(--hero-header-offset)+1.5rem)] pb-12 sm:pb-14">
          <div className="mx-auto grid max-w-[var(--container-max)] gap-10 px-[var(--container-pad)] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 lg:items-start">
            <div className="max-w-xl">
              <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--c-accent)]">
                Free AI SEO audit
              </p>
              <h1 className="font-sans text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-balance">
                Audit My Site
                <span className="sr-only">
                  {" "}
                  Free AI SEO Audit Tool from CreativeIQ Marketing
                </span>
              </h1>
              <p className="mt-4 font-sans text-base leading-relaxed text-[var(--c-text-secondary)]">
                Technical foundations fail before copy does. This audit covers
                signals, mobile experience, and commercial readiness — then
                emails your report.
              </p>

              <ul className="mt-8 space-y-5">
                {BENEFITS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label} className="flex gap-3">
                      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--c-accent-dim)] text-[var(--c-accent)]">
                        <Icon className="size-4" />
                      </span>
                      <div>
                        <p className="font-sans text-sm font-semibold text-[var(--c-ink)]">
                          {item.label}
                        </p>
                        <p className="mt-1 font-sans text-sm leading-relaxed text-[var(--c-text-secondary)]">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-[var(--radius-card)] bg-[var(--c-surface-2)] p-5 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-sans text-xl font-extrabold tracking-[-0.03em] text-[var(--c-ink)] sm:text-2xl">
                    Get my visibility report
                  </h2>
                  <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-[var(--c-text-secondary)]">
                    Technical SEO, mobile usability, speed, and content
                    visibility.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold text-[var(--c-text-muted)]">
                  <ShieldCheck className="size-3.5 text-[var(--c-accent)]" />
                  2 per email
                </span>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block space-y-2">
                    <span className="block font-sans text-xs font-semibold uppercase tracking-wider text-[var(--c-text-muted)]">
                      First name
                    </span>
                    <Input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      required
                      autoComplete="given-name"
                    />
                  </label>
                  <label className="block space-y-2">
                    <span className="block font-sans text-xs font-semibold uppercase tracking-wider text-[var(--c-text-muted)]">
                      Last name
                    </span>
                    <Input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Smith"
                      required
                      autoComplete="family-name"
                    />
                  </label>
                </div>

                <label className="block space-y-2">
                  <span className="block font-sans text-xs font-semibold uppercase tracking-wider text-[var(--c-text-muted)]">
                    Work email
                  </span>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    autoComplete="email"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="block font-sans text-xs font-semibold uppercase tracking-wider text-[var(--c-text-muted)]">
                    Website URL
                  </span>
                  <Input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="example.com"
                    required
                    autoComplete="url"
                  />
                </label>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={status === "submitting"}
                  className="h-12 w-full"
                >
                  {submitLabel}
                </Button>
              </form>

              <StatusPanel status={status} message={message} />

              <p className="mt-4 font-sans text-xs leading-relaxed text-[var(--c-text-muted)]">
                Need more than two reports each month? Contact CreativeIQ for
                broader access.
              </p>
            </div>
          </div>
        </section>

        <section
          id="audit-faq"
          className="bg-[var(--c-surface-2)] py-14 lg:py-16"
        >
          <div className="mx-auto max-w-2xl px-[var(--container-pad)]">
            <h2 className="font-sans text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.03em] text-[var(--c-ink)]">
              Frequently asked
            </h2>
            <div className="mt-8 space-y-6">
              {FAQS.map(({ question, answer }) => (
                <article key={question}>
                  <h3 className="font-sans text-base font-semibold tracking-[-0.02em] text-[var(--c-ink)]">
                    {question}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-[var(--c-text-secondary)]">
                    {answer}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10">
              <Link
                to="/contact"
                onClick={() =>
                  trackButtonClick(
                    "Audit Bottom CTA",
                    "audit_bottom_cta",
                    "Lead Magnet",
                  )
                }
                className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[var(--c-ink)] transition hover:text-[var(--c-accent)]"
              >
                Need more access
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-8">
              <GuideInlineCTA source="seo_audit_page" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

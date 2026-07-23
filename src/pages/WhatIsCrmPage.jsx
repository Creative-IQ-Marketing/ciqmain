import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import SEO from "../components/SEO";
import PageHeader, {
  PageCtaPrimary,
  PageCtaSecondary,
} from "../components/layout/PageHeader";
import GHLValueTable from "../components/landing/GHLValueTable";
import { Button } from "../components/ui/button";

const PILLARS = [
  {
    title: "Capture every lead",
    body: "Website forms, missed calls, chat, social inquiries, and ads all land in one database — so nothing dies in a voicemail or DM.",
  },
  {
    title: "Respond without chaos",
    body: "Missed-call text-back, SMS, email, and calendars live together. Your team sees the full conversation history on every contact.",
  },
  {
    title: "Automate the follow-up",
    body: "Workflows nurture leads, book appointments, request reviews, and move deals — so growth does not depend on someone remembering to follow up.",
  },
  {
    title: "See what works",
    body: "Pipelines, source tracking, and reporting show which channels create revenue — not just vanity traffic.",
  },
];

export default function WhatIsCrmPage() {
  return (
    <main>
      <SEO
        title="What is CRM? | CreativeIQ Growth Systems"
        description="CRM is your business operating system for leads, clients, and revenue. See what CIQ CRM includes versus buying HubSpot, Mailchimp, ads tools, and more separately."
        keywords="what is CRM, CRM automation, GoHighLevel alternative, lead capture system, CreativeIQ CRM, missed call text back"
        canonical="https://creativeiqmarketing.com/services/what-is-crm"
      />

      <PageHeader
        title="What is"
        titleAccent="CRM?"
        description="CRM means Customer Relationship Management — but in practice it is the operating system that captures leads, runs follow-up, books appointments, and tracks revenue so marketing spend is not wasted."
      >
        <PageCtaPrimary to="/services#crm-solutions">
          View CRM packages
        </PageCtaPrimary>
        <PageCtaSecondary to="/contact">Talk to us</PageCtaSecondary>
      </PageHeader>

      <section className="border-b border-[var(--c-border)] bg-white py-[var(--section-pad)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)]">
          <div className="max-w-2xl">
            <h2 className="font-sans text-[clamp(1.6rem,3vw,2.35rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-[var(--c-ink)] text-balance">
              Why it matters if you already run ads or SEO
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-[var(--c-text-secondary)]">
              Traffic without a system becomes a brochure. A CRM turns visitors
              into contacts, contacts into booked conversations, and
              conversations into clients — automatically where it should, with
              humans where it must.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {PILLARS.map((item) => (
              <article
                key={item.title}
                className="border-l-2 border-[var(--c-accent)] bg-[var(--c-surface-2)] px-5 py-6 sm:px-6"
              >
                <h3 className="font-sans text-lg font-bold tracking-[-0.02em] text-[var(--c-ink)]">
                  {item.title}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-[var(--c-text-secondary)]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Lead capture forms + pipelines",
              "Missed call text-back",
              "SMS + email messaging",
              "Booking calendars",
              "Funnels & landing pages",
              "Review / reputation flows",
              "Ads managers + tracking",
              "AI chat & agents (Elite)",
              "Client portal (Elite)",
            ].map((line) => (
              <li
                key={line}
                className="flex items-start gap-2.5 font-sans text-sm text-[var(--c-text-secondary)]"
              >
                <Check
                  className="mt-0.5 size-4 shrink-0 text-[var(--c-accent)]"
                  strokeWidth={2.25}
                  aria-hidden
                />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <GHLValueTable />

      <section className="border-t border-[var(--c-border)] bg-white py-[var(--section-pad)]">
        <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-6 px-[var(--container-pad)] sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h2 className="font-sans text-[clamp(1.5rem,2.8vw,2.1rem)] font-extrabold tracking-[-0.03em] text-[var(--c-ink)]">
              Ready to choose a tier?
            </h2>
            <p className="mt-2 font-sans text-sm leading-relaxed text-[var(--c-text-secondary)]">
              Start at $97/mo for DIY tools, or step into Pro and Elite when you
              want automation and AI handling the follow-up.
            </p>
          </div>
          <Button asChild>
            <Link to="/services#crm-solutions">
              Compare CRM packages
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

import { Globe, Mail, MessageSquare, Phone } from "lucide-react";
import {
  EMAIL,
  PHONE_DISPLAY,
  PHONE_SMS,
  PHONE_TEL,
} from "../../utils/contact";
import ContactForm from "./ContactForm";
import GuideInlineCTA from "../ui/GuideInlineCTA";

const COPY = {
  home: {
    title: "Tell us what you're building",
    description:
      "Share goals and constraints. We map the right system for where you are, not a generic package pitch.",
    analyticsContext: "HomeContact",
    formId: "home-contact-interest",
  },
  services: {
    title: "Ready to start your growth system?",
    description:
      "Tell us your stage and targets. We design the stack that fits, and we work with international clients.",
    analyticsContext: "ServicesContact",
    formId: "services-contact-interest",
  },
};

export default function ContactSection({
  variant = "home",
  sectionId = variant === "services" ? "services-contact" : "contact",
}) {
  const copy = COPY[variant] ?? COPY.home;

  return (
    <section
      id={sectionId}
      className="relative scroll-mt-32 overflow-hidden border-t border-[var(--c-border)] bg-[var(--c-base)]"
    >
      <div className="relative z-10 mx-auto max-w-[var(--container-max)] px-[var(--container-pad)] py-12 sm:py-14 lg:py-16">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="mb-4 font-sans text-[clamp(1.9rem,3.5vw,2.85rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[var(--c-ink)] text-balance">
              {copy.title}
            </h2>
            <p className="mb-8 max-w-[42ch] font-sans text-base leading-relaxed text-[var(--c-text-secondary)]">
              {copy.description}
            </p>

            <div className="space-y-4 font-sans text-sm text-[var(--c-text-muted)]">
              <a
                href={`tel:${PHONE_TEL}`}
                className="group flex items-center gap-3 transition hover:text-[var(--c-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--c-surface-2)] text-[var(--c-accent)] transition group-hover:bg-[var(--c-accent-dim)]">
                  <Phone size={16} strokeWidth={1.75} aria-hidden />
                </span>
                {PHONE_DISPLAY}
              </a>
              <a
                href={PHONE_SMS}
                className="group flex items-center gap-3 transition hover:text-[var(--c-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--c-surface-2)] text-[var(--c-accent)] transition group-hover:bg-[var(--c-accent-dim)]">
                  <MessageSquare size={16} strokeWidth={1.75} aria-hidden />
                </span>
                Text us
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-center gap-3 transition hover:text-[var(--c-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--c-surface-2)] text-[var(--c-accent)] transition group-hover:bg-[var(--c-accent-dim)]">
                  <Mail size={16} strokeWidth={1.75} aria-hidden />
                </span>
                {EMAIL}
              </a>
              <div className="flex items-center gap-3 pt-1">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--c-surface-2)] text-[var(--c-accent)]">
                  <Globe size={16} strokeWidth={1.75} aria-hidden />
                </span>
                International clients welcome
              </div>
            </div>

            <div className="mt-8">
              <GuideInlineCTA
                source={
                  variant === "services" ? "services_contact" : "home_contact"
                }
              />
            </div>
          </div>

          <div className="rounded-[var(--radius-card)] bg-[var(--c-surface-2)] p-6 sm:p-8">
            <ContactForm
              formId={copy.formId}
              analyticsContext={copy.analyticsContext}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

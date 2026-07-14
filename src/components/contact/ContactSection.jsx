import { Globe, Mail, MessageSquare, Phone } from "lucide-react";
import {
  EMAIL,
  PHONE_DISPLAY,
  PHONE_SMS,
  PHONE_TEL,
} from "../../utils/contact";
import ContactForm from "./ContactForm";
import FadeUp from "../primitives/FadeUp";

const COPY = {
  home: {
    eyebrow: "Get in touch",
    title: "Let's Grow Your Business",
    titleAccent: "Together",
    description:
      "Ready to take your marketing to the next level? Tell us your goals and we'll build the right system—not just sell you a package.",
    analyticsContext: "HomeContact",
    formId: "home-contact-interest",
  },
  services: {
    eyebrow: "Let's Build Together",
    title: "Ready to Start Your",
    titleAccent: "Growth System?",
    description:
      "Tell us your stage and goals. We'll build the right system—not just sell you a package. We work with clients internationally.",
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
    <FadeUp
      as="section"
      id={sectionId}
      className="relative scroll-mt-32 overflow-hidden border-t border-black/[0.05] bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="relative z-10 mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3B6FF0]">
              {copy.eyebrow}
            </p>
            <h2 className="mb-5 font-sans text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-tight tracking-[-0.03em] text-[#0f0f0f]">
              {copy.title}
              {copy.titleAccent && (
                <>
                  <br />
                  <span className="text-[#3B6FF0]">{copy.titleAccent}</span>
                </>
              )}
            </h2>
            <p className="mb-10 font-sans text-base leading-relaxed text-[#5c5c5c] lg:text-lg">
              {copy.description}
            </p>

            <div className="space-y-3 font-sans text-sm text-[#737373]">
              <a
                href={`tel:${PHONE_TEL}`}
                className="flex items-center gap-3 transition hover:text-[#0f0f0f]"
              >
                <Phone size={16} strokeWidth={1.75} className="text-[#3B6FF0]" aria-hidden />
                {PHONE_DISPLAY}
              </a>
              <a
                href={PHONE_SMS}
                className="flex items-center gap-3 transition hover:text-[#0f0f0f]"
              >
                <MessageSquare size={16} strokeWidth={1.75} className="text-[#3B6FF0]" aria-hidden />
                Text us
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 transition hover:text-[#0f0f0f]"
              >
                <Mail size={16} strokeWidth={1.75} className="text-[#3B6FF0]" aria-hidden />
                {EMAIL}
              </a>
              <div className="flex items-center gap-3 pt-1">
                <Globe size={16} strokeWidth={1.75} className="text-[#3B6FF0]" aria-hidden />
                International clients welcome
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-black/[0.06] bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
            <ContactForm
              formId={copy.formId}
              analyticsContext={copy.analyticsContext}
            />
          </div>
        </div>
      </div>
    </FadeUp>
  );
}

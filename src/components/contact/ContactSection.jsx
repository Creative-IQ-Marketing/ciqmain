import { motion } from "framer-motion";
import { Globe, Phone, Mail, MessageSquare } from "lucide-react";
import {
  EMAIL,
  PHONE_DISPLAY,
  PHONE_SMS,
  PHONE_TEL,
} from "../../utils/contact";
import ContactForm from "./ContactForm";

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
    <section
      id={sectionId}
      className="py-24 bg-[#F5F5F7] relative overflow-hidden scroll-mt-32"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="f-body text-[11px] font-semibold uppercase tracking-[0.22em] text-[#3B6FF0] mb-4 block">
              {copy.eyebrow}
            </span>
            <h2 className="f-disp text-4xl md:text-5xl font-bold text-slate-900 mb-5 leading-tight">
              {copy.title}
              {copy.titleAccent && (
                <>
                  <br />
                  <span className="text-[#3B6FF0]">{copy.titleAccent}</span>
                </>
              )}
            </h2>
            <p className="f-body text-slate-600 text-lg mb-10 leading-relaxed">
              {copy.description}
            </p>

            <div className="f-body space-y-3 text-sm text-slate-500">
              <a
                href={`tel:${PHONE_TEL}`}
                className="flex items-center gap-3 hover:text-[#3B6FF0] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#3B6FF0]" /> {PHONE_DISPLAY}
              </a>
              <a
                href={PHONE_SMS}
                className="flex items-center gap-3 hover:text-[#3B6FF0] transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#3B6FF0]" /> Text us
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 hover:text-[#3B6FF0] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#3B6FF0]" /> {EMAIL}
              </a>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-[#3B6FF0]" /> International
                clients welcome
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm"
          >
            <ContactForm
              formId={copy.formId}
              analyticsContext={copy.analyticsContext}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

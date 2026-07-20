import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Reveal from "../primitives/Reveal";

const FAQS = [
  {
    q: "What does CreativeIQ do?",
    a: "We are a full-service growth agency: SEO and GEO, content, social, conversion websites, CRM automation, paid media, consulting, and conversion intelligence. Neuromarketing sits inside the work so brands earn trust and conversions, not just clicks.",
  },
  {
    q: "Who have you worked with?",
    a: "Partners include FYZICAL Therapy & Balance Centers, Morales Padia Law, Cosmetic Dentistry of San Antonio, the South Texas Business Partnership, Chambers of Commerce, and healthcare organizations across Texas, Florida, and beyond.",
  },
  {
    q: "What industries do you serve?",
    a: "Healthcare and wellness, behavioral health, law, med spas, dentistry, nonprofits, retail, real estate, hospitality, and professional services. Single-location and multi-location teams both get systems tuned to how their audience responds.",
  },
  {
    q: "What makes CreativeIQ different?",
    a: "Creative, technical, and automation work live under one roof. We build growth ecosystems instead of bolting on one channel. Technology plus behavioral design is the differentiator.",
  },
  {
    q: "What platforms do you manage?",
    a: "Instagram, Facebook, LinkedIn, TikTok, YouTube, Google, email, websites, and CRM platforms. Channel mix follows where your buyers spend time and what converts.",
  },
  {
    q: "What does onboarding look like?",
    a: "Discovery covers goals, audience, and friction. We map a custom strategy, then execute: site, SEO infrastructure, CRM automations, content, ads, and reporting.",
  },
  {
    q: "How long until we see results?",
    a: "Most clients see measurable movement in 60-90 days. Stronger compounding usually lands in the 3-6 month window as SEO, content, and systems mature.",
  },
  {
    q: "Can clients review content before it posts?",
    a: "Yes. Approval can be every asset or a lighter cadence with CIQ managing day-to-day. Either path stays aligned to brand voice and visual identity.",
  },
  {
    q: "Does CreativeIQ only handle marketing?",
    a: "No. Marketing is the core. We also improve lead management, customer experience, automation, and digital infrastructure so growth has somewhere to land.",
  },
  {
    q: "Why do SEO and website infrastructure matter?",
    a: "Visibility without a converting site burns spend. Technical SEO, performance, mobile experience, AI visibility, and behavioral design turn traffic into action.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="overflow-hidden border-t border-[var(--c-border)] bg-[var(--c-cream)]/50"
    >
      <div className="mx-auto grid max-w-[var(--container-max)] gap-12 px-[var(--container-pad)] py-[var(--section-pad)] lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-sans text-[clamp(2.1rem,4vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[var(--c-ink)] text-balance">
            Everything you need to know
          </h2>
          <p className="mt-5 max-w-sm font-sans text-base leading-relaxed text-[var(--c-text-secondary)]">
            Straight answers on services, process, and what it feels like to
            partner with CreativeIQ.
          </p>
        </Reveal>

        <Reveal stagger={0.04} className="min-w-0">
          <Accordion
            type="single"
            collapsible
            className="w-full border-t border-[var(--c-border)] bg-transparent"
          >
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`item-${i}`}
                data-reveal-item
                className="border-[var(--c-border)]"
              >
                <AccordionTrigger className="text-[clamp(0.95rem,1.6vw,1.125rem)] tracking-[-0.015em]">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="max-w-[680px]">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

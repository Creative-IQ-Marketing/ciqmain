import { useState, useEffect } from "react";
import {
  Download,
  Check,
  Phone,
  Mail,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";
import ContactSection from "../components/contact/ContactSection";
import PageHeader, { PageCtaSecondary } from "../components/layout/PageHeader";
import { useLocation } from "react-router-dom";
import { scrollToSection } from "../utils/scrollToSection";
import SEO from "../components/SEO";
import GuideInlineCTA from "../components/ui/GuideInlineCTA";
import { downloadVCard } from "../utils/vcard";
import { trackButtonClick } from "../services/analytics";
import {
  EMAIL,
  PHONE_DISPLAY,
  PHONE_SMS,
  PHONE_TEL,
} from "../utils/contact";

export default function ContactPage() {
  const [saved, setSaved] = useState(false);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#contact") {
      window.setTimeout(() => scrollToSection("contact", 100), 300);
    }
  }, [hash]);

  const handleDownload = () => {
    trackButtonClick("Download vCard", "vcf_download", "ContactPage");
    downloadVCard();
    setSaved(true);
  };

  useEffect(() => {
    const schema = {
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
          name: "Contact",
          item: "https://creativeiq.marketing/contact",
        },
      ],
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.schema = "contact-breadcrumb";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  const channels = [
    {
      label: "Call",
      href: `tel:${PHONE_TEL}`,
      text: PHONE_DISPLAY,
      icon: Phone,
    },
    { label: "Email", href: `mailto:${EMAIL}`, text: EMAIL, icon: Mail },
    {
      label: "Text",
      href: PHONE_SMS,
      text: "Message us",
      icon: MessageSquare,
    },
  ];

  return (
    <>
      <SEO
        title="Contact CreativeIQ | Get Your Digital Marketing Strategy"
        description="Ready to grow? Contact CreativeIQ Marketing in San Antonio for a free strategy session."
        keywords="contact marketing agency, San Antonio marketing, digital marketing strategy"
        canonical="https://creativeiq.marketing/contact"
        pageType="website"
      />

      <PageHeader
        align="center"
        title="Let's work together"
        description="Call, text, email, or save our vCard. Then tell us what you are building."
      >
        {!saved ? (
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-full bg-[#18181b] px-7 py-3 font-sans text-[15px] font-semibold text-white transition hover:bg-[#2a2a2a]"
          >
            <Download size={16} strokeWidth={1.75} aria-hidden />
            Save to contacts
          </button>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2.5 font-sans text-sm font-medium text-emerald-800">
            <Check size={16} strokeWidth={1.75} aria-hidden />
            Added to your contacts
          </span>
        )}
        <PageCtaSecondary
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <span className="inline-flex items-center gap-1.5">
            Contact form
            <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden />
          </span>
        </PageCtaSecondary>
      </PageHeader>

      <section className="border-b border-[var(--c-border)] bg-white">
        <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-2 divide-x divide-y divide-[var(--c-border)] border-x border-[var(--c-border)] sm:grid-cols-4 sm:divide-y-0">
          {channels.map(({ label, href, text, icon: Icon }) => (
            <a
              key={label}
              href={href}
              className="group px-5 py-7 transition hover:bg-[var(--c-surface-2)] sm:px-7 sm:py-9"
            >
              <Icon
                size={16}
                className="mb-4 text-[var(--c-accent)]"
                strokeWidth={1.75}
                aria-hidden
              />
              <p className="font-sans text-sm font-medium text-[var(--c-text-muted)]">
                {label}
              </p>
              <p className="mt-1 font-sans text-[15px] font-semibold tracking-[-0.01em] text-[var(--c-ink)] break-words group-hover:text-[var(--c-accent)]">
                {text}
              </p>
            </a>
          ))}
          <div className="px-5 py-7 sm:px-7 sm:py-9">
            <p className="font-sans text-sm font-medium text-[var(--c-text-muted)]">
              Coverage
            </p>
            <p className="mt-1 font-sans text-[15px] font-semibold tracking-[-0.01em] text-[var(--c-ink)]">
              International
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)] py-10">
          <GuideInlineCTA source="contact_page" />
        </div>
      </section>

      <ContactSection variant="home" sectionId="contact" />
    </>
  );
}

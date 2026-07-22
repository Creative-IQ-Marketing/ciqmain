import { useEffect } from "react";
import SEO from "../components/SEO";
import PageHeader, { PageCtaPrimary } from "../components/layout/PageHeader";

const sections = [
  {
    id: "agreement",
    title: "Agreement to Terms",
    content: [
      "By accessing and using CreativeIQ's website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website or services.",
      "CreativeIQ reserves the right to modify these terms at any time. Your continued use of the website following the posting of revised terms means that you accept and agree to the changes.",
    ],
  },
  {
    id: "services",
    title: "Our Services",
    content: [
      "CreativeIQ provides digital marketing services including but not limited to: SEO optimization, PPC advertising, CRM automation, web development, and growth strategy consulting.",
      "All service descriptions, pricing, and availability are subject to change without notice. We reserve the right to refuse or cancel any service at our discretion.",
      "Service delivery timelines are estimates only and subject to client responsiveness, data access, and project scope changes.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property Rights",
    content: [
      "All content on our website, including text, graphics, logos, images, and software, is the property of CreativeIQ or its content suppliers and is protected by international copyright laws.",
      "You are granted a limited license to access and use this website for personal, non-commercial purposes only. You may not reproduce, duplicate, or transmit any content without written permission from CreativeIQ.",
      "Any custom work, strategies, or deliverables created by CreativeIQ for your business become your intellectual property once payment is received in full.",
    ],
  },
  {
    id: "user-conduct",
    title: "User Conduct & Prohibited Activities",
    content: [
      "You agree not to use our website for any unlawful purpose or in any way that violates these terms.",
      "Prohibited activities include: harassment, defamation, fraudulent activity, intellectual property violation, spamming, or any activity that disrupts or interferes with our services.",
      "You agree not to attempt to gain unauthorized access to our systems, networks, or restricted areas of our website.",
    ],
  },
  {
    id: "limitation-liability",
    title: "Limitation of Liability",
    content: [
      "CreativeIQ and its owners, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, arising from your use of or inability to use the website or services.",
      "Our total liability to you for any claim arising from our services shall not exceed the amount paid for those services in the 12 months prior to the claim.",
      "Some jurisdictions do not allow limitation of liability, so these limits may not apply to you.",
    ],
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    content: [
      "The website and services are provided 'as is' and 'as available' without any warranties, express or implied, including merchantability, fitness for a particular purpose, or non-infringement.",
      "CreativeIQ does not warrant that the website will be uninterrupted, error-free, or completely secure.",
      "Results from our services depend on many factors beyond our control, including search engine algorithms, market conditions, and client implementation. We make no guarantees regarding specific outcomes or rankings.",
    ],
  },
  {
    id: "payment-refunds",
    title: "Payment Terms & Refund Policy",
    content: [
      "Payment for services is due according to the invoice terms agreed upon in the service agreement.",
      "Services must be requested in writing and confirmed by CreativeIQ before work begins.",
      "Refunds are available if a service cancellation is requested within 14 days of the initial invoice, provided no work has been performed.",
      "Refunds for services in progress are calculated as a pro-rata basis of work completed.",
      "Clients are responsible for any payment processing fees or taxes associated with their purchase.",
    ],
  },
  {
    id: "termination",
    title: "Termination of Services",
    content: [
      "Either party may terminate the service agreement with 30 days written notice.",
      "CreativeIQ may terminate services immediately if the client: violates these terms, engages in unlawful activity, or fails to pay invoices.",
      "Upon termination, you remain responsible for all outstanding payments and fees.",
    ],
  },
  {
    id: "data-privacy",
    title: "Data & Privacy",
    content: [
      "We collect and process personal data in accordance with our Privacy Policy and applicable data protection laws.",
      "By using our services, you authorize CreativeIQ to collect and use data necessary to provide services, including analytics, performance metrics, and customer information.",
      "You are responsible for ensuring you have all necessary rights and consents to share data with CreativeIQ.",
    ],
  },
  {
    id: "links",
    title: "Third-Party Links",
    content: [
      "Our website may contain links to third-party websites. CreativeIQ is not responsible for the content, accuracy, or practices of external sites.",
      "Your access to and use of third-party websites is at your own risk and subject to their terms and conditions.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law & Jurisdiction",
    content: [
      "These Terms and Conditions are governed by and construed in accordance with the laws of Texas, USA, without regard to its conflict of laws principles.",
      "Any legal action or proceeding related to these terms shall be exclusively brought in the state and federal courts located in Bexar County, Texas.",
      "You consent to the personal jurisdiction of these courts.",
    ],
  },
  {
    id: "contact",
    title: "Contact Information",
    content: [
      "If you have questions about these Terms and Conditions, please contact us at:",
      "Email: CiQ@creativeiq.marketing\nPhone: (210) 838-0177\nLocation: San Antonio, Texas",
    ],
  },
];

export default function TermsAndConditionsPage() {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://creativeiqmarketing.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Terms & Conditions",
          item: "https://creativeiqmarketing.com/terms",
        },
      ],
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.schema = "terms-breadcrumb";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <>
      <SEO
        title="Terms & Conditions | CreativeIQ Marketing"
        description="Read CreativeIQ's terms and conditions governing our digital marketing services including SEO, PPC, social media, and CRM automation in San Antonio."
        keywords="terms and conditions, terms of service, legal terms, CreativeIQ"
        canonical="https://creativeiqmarketing.com/terms"
        pageType="website"
      />

      <main className="bg-white">
        <PageHeader
          eyebrow="Legal Information"
          title="Terms & Conditions"
          description="Please read these terms carefully. They govern your use of CreativeIQ's website and services."
          align="center"
        />
        <p className="mx-auto max-w-3xl px-5 pb-10 text-center font-sans text-sm text-[#737373] sm:px-6">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="sticky top-[var(--site-header-height,72px)] z-40 border-b border-black/[0.05] bg-white/95 py-4 backdrop-blur-md">
          <div className="mx-auto max-w-3xl px-5 sm:px-6">
            <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#737373]">
              Quick navigation
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              {sections.slice(0, 6).map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="rounded-full border border-black/[0.06] px-3 py-1.5 font-sans text-[#5c5c5c] transition hover:border-[#3B6FF0] hover:text-[#3B6FF0]"
                >
                  {section.title.split(" ")[0]}
                </a>
              ))}
              <a
                href="#contact"
                className="rounded-full border border-black/[0.06] px-3 py-1.5 font-sans text-[#5c5c5c] transition hover:border-[#3B6FF0] hover:text-[#3B6FF0]"
              >
                More...
              </a>
            </div>
          </div>
        </div>

        <div className="bg-[#f5f6f8] py-14 md:py-16">
          <div className="mx-auto max-w-3xl space-y-14 px-5 sm:px-6">
            {sections.map((section, idx) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-32"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#3B6FF0]/10 text-sm font-bold text-[#3B6FF0]">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-4 font-sans text-2xl font-extrabold tracking-[-0.03em] text-[#0f0f0f] md:text-3xl">
                      {section.title}
                    </h2>
                    <div className="space-y-4">
                      {section.content.map((paragraph, pIdx) => (
                        <p
                          key={pIdx}
                          className="whitespace-pre-wrap font-sans text-base leading-relaxed text-[#5c5c5c] md:text-lg"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            ))}

            <div className="mt-12 border-t border-black/[0.05] pt-14">
              <div className="rounded-[var(--radius-card)] border border-black/[0.06] bg-[#fafafa] p-8 text-center md:p-10">
                <h3 className="font-sans text-2xl font-extrabold tracking-[-0.03em] text-[#0f0f0f] md:text-3xl">
                  Questions about our terms?
                </h3>
                <p className="mx-auto mt-4 max-w-xl font-sans text-base leading-relaxed text-[#5c5c5c]">
                  Get in touch with our team. We&apos;re here to clarify any
                  concerns and help you understand how we work.
                </p>
                <div className="mt-8">
                  <PageCtaPrimary to="/contact">Contact us</PageCtaPrimary>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

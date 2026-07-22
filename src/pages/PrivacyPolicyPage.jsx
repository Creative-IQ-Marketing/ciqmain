import { useEffect } from "react";
import SEO from "../components/SEO";
import PageHeader from "../components/layout/PageHeader";

const sections = [
  {
    id: "introduction",
    title: "Privacy & Your Data",
    content: [
      "At CreativeIQ, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.",
      "Please read this policy carefully. If you do not agree with our practices, please do not use our website or services.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: [
      "Information You Provide Directly:\n- Contact information (name, email, phone number, business name)\n- Account registration details\n- Service inquiry and consultation information\n- Payment information processed through secure payment processors\n- Communication preferences and feedback\n\nAutomatically Collected Information:\n- IP address and browser type\n- Pages visited and time spent on each page\n- Referral source and links clicked\n- Device information and operating system\n- Analytics data (Google Analytics)\n- Cookies and similar tracking technologies\n\nInformation from Third Parties:\n- Data provided by email service providers\n- Information from Google Analytics\n- Social media data (if you connect your accounts)",
    ],
  },
  {
    id: "use-of-information",
    title: "How We Use Your Information",
    content: [
      "We use your information for:\n- Providing and improving our services\n- Sending service updates, newsletters, and marketing communications\n- Processing payments and transactions\n- Responding to inquiries and customer support\n- Analytics and understanding user behavior\n- Personalizing your experience\n- Complying with legal obligations\n- Preventing fraud and enhancing security\n\nWe will never sell or share your personal information with third parties for marketing purposes without your explicit consent.",
    ],
  },
  {
    id: "legal-basis",
    title: "Legal Basis for Processing",
    content: [
      "We process your personal data based on:",
      "Consent: You have explicitly agreed to our processing of your data\nContract: Processing is necessary to fulfill a service agreement with you\nLegal Obligation: We are required to process data by law\nLegitimate Interest: Processing is necessary for our business interests, including improving services and marketing\n\nYou have the right to withdraw consent at any time by unsubscribing from communications or contacting us.",
    ],
  },
  {
    id: "cookies-tracking",
    title: "Cookies & Tracking Technologies",
    content: [
      "Our website uses cookies and similar technologies to enhance your browsing experience and collect analytics data.",
      "Cookie Types:\n- Essential Cookies: Required for website functionality\n- Analytics Cookies: Track user behavior and website performance\n- Marketing Cookies: Enable targeted advertising\n\nYou can control cookies through your browser settings. Disabling cookies may affect website functionality. We recommend enabling essential cookies for the best experience.",
    ],
  },
  {
    id: "data-sharing",
    title: "Data Sharing & Third Parties",
    content: [
      "We share your information with trusted third parties only as necessary:",
      "Service Providers: Payment processors, email service providers, hosting providers, and analytics services\nGoogle Analytics: We use Google Analytics to understand user behavior (subject to their privacy policy)\nLegal Requirements: Law enforcement, government agencies, or courts when required by law\nBusiness Transfers: In the event of a merger, acquisition, or sale of assets\n\nAll third-party processors are contractually obligated to maintain confidentiality and use data only as directed by CreativeIQ.",
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    content: [
      "We implement industry-standard security measures to protect your information:",
      "SSL/TLS encryption for all data transmission\nSecure payment processing through PCI-DSS compliant providers\nRegular security audits and updates\nRestricted access to personal data\nSecure password protocols\n\nWhile we strive to protect your data, no method of transmission is 100% secure. You use our services at your own risk.",
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: [
      "We retain your information for as long as necessary to provide services and comply with legal obligations:",
      "Account Information: Retained while you are a customer, plus 3 years after service termination\nMarketing Communications: Retained until you unsubscribe\nAnalytics Data: Retained for 26 months (Google Analytics default)\nPayment Information: Processed immediately and not stored by us (handled by payment processors)\n\nYou can request deletion of your data at any time, subject to legal retention requirements.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Data Rights",
    content: [
      "You have the following rights regarding your personal data:",
      "Right to Access: Request and review the data we hold about you\nRight to Correction: Request we update inaccurate information\nRight to Deletion: Request deletion of your data (right to be forgotten)\nRight to Portability: Request your data in a portable format\nRight to Opt-Out: Unsubscribe from marketing communications\nRight to Restrict Processing: Limit how we use your data\nRight to Object: Object to specific uses of your data\n\nTo exercise these rights, contact us at CiQ@creativeiq.marketing. We will respond within 30 days.",
    ],
  },
  {
    id: "children",
    title: "Children's Privacy",
    content: [
      "Our website and services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children.",
      "If we become aware that a child has provided us with personal information, we will take steps to delete such information and terminate the child's account.",
      "Parents or guardians who believe their child has provided information to us should contact us immediately.",
    ],
  },
  {
    id: "international-transfers",
    title: "International Data Transfers",
    content: [
      "Your information may be processed and stored in the United States and other countries.",
      "By using our services, you consent to the transfer of your information to countries outside your country of residence, which may have different data protection laws.",
      "We will take steps to ensure adequate safeguards are in place when transferring data internationally.",
    ],
  },
  {
    id: "policy-updates",
    title: "Updates to This Policy",
    content: [
      "We may update this Privacy Policy periodically to reflect changes in practices, technology, or legal requirements.",
      "We will notify you of material changes by posting the updated policy on our website and updating the 'Last Updated' date.",
      "Your continued use of our website after changes constitute your acceptance of the updated Privacy Policy.",
    ],
  },
  {
    id: "contact-privacy",
    title: "Contact & Data Requests",
    content: [
      "For privacy concerns, data requests, or to exercise your rights, contact us:",
      "Email: CiQ@creativeiq.marketing\nPhone: (210) 838-0177\nLocation: San Antonio, Texas\n\nWe will respond to all data requests within 30 days as required by applicable law.",
    ],
  },
];

export default function PrivacyPolicyPage() {
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
          name: "Privacy Policy",
          item: "https://creativeiqmarketing.com/privacy",
        },
      ],
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.schema = "privacy-breadcrumb";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <>
      <SEO
        title="Privacy Policy | CreativeIQ Marketing"
        description="Read CreativeIQ's privacy policy to understand how we collect and protect your personal data as San Antonio's leading digital marketing agency."
        keywords="privacy policy, data protection, GDPR, privacy, CreativeIQ"
        canonical="https://creativeiqmarketing.com/privacy"
        pageType="website"
      />

      <main className="bg-white">
        <PageHeader
          eyebrow="Your Privacy Matters"
          title="Privacy Policy"
          description="We're transparent about how we collect, use, and protect your information. Your privacy is our priority."
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
                href="#contact-privacy"
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
                  Data subject rights
                </h3>
                <p className="mx-auto mt-4 max-w-xl font-sans text-base leading-relaxed text-[#5c5c5c]">
                  Have a question about your data or want to exercise your
                  privacy rights? Reach out to our privacy team and we&apos;ll
                  help within 30 days.
                </p>
                <div className="mt-8">
                  <a
                    href="mailto:CiQ@creativeiq.marketing"
                    className="inline-flex items-center justify-center rounded-full bg-[#18181b] px-7 py-3 font-sans text-[15px] font-semibold text-white transition hover:bg-[#2a2a2a]"
                  >
                    Email our privacy team
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

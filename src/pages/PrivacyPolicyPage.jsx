import SEO from "../components/SEO";
import { ArrowRight } from "lucide-react";

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
  return (
    <>
      <SEO
        title="Privacy Policy | CreativeIQ Marketing"
        description="Read CreativeIQ's privacy policy to understand how we collect, use, and protect your personal data."
        keywords="privacy policy, data protection, GDPR, privacy, CreativeIQ"
        canonical="https://creativeiq.marketing/privacy"
        pageType="website"
      />

      <main className="w-full bg-gradient-to-b from-white via-blue-50/30 to-white">
        {/* Background decorative elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-slate-100/20 to-transparent rounded-full blur-3xl" />
        </div>

        {/* Hero Section */}
        <div className="relative pt-32 pb-16 md:pt-44 md:pb-24 px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#3B6FF0] mb-4">
              Your Privacy Matters
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
              Privacy Policy
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We're transparent about how we collect, use, and protect your
              information. Your privacy is our priority.
            </p>

            <div className="mt-8 text-sm text-slate-500">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="sticky top-24 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 py-4 px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
              Quick Navigation
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              {sections.slice(0, 6).map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-[#3B6FF0] hover:text-white transition-colors"
                >
                  {section.title.split(" ")[0]}
                </a>
              ))}
              <a
                href="#contact-privacy"
                className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-[#3B6FF0] hover:text-white transition-colors"
              >
                More...
              </a>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="relative py-16 md:py-24 px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-16">
            {sections.map((section, idx) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-32"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#3B6FF0]/10 text-[#3B6FF0] font-bold text-sm shrink-0 mt-1">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                      {section.title}
                    </h2>
                    <div className="space-y-4">
                      {section.content.map((paragraph, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-base md:text-lg text-slate-700 leading-relaxed whitespace-pre-wrap"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            ))}

            {/* CTA Section */}
            <div className="mt-20 pt-16 border-t border-slate-200">
              <div className="bg-gradient-to-br from-[#3B6FF0] to-[#2F5FE6] rounded-2xl p-8 md:p-12 text-white text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Data Subject Rights
                </h3>
                <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                  Have a question about your data or want to exercise your
                  privacy rights? Reach out to our privacy team and we'll help
                  within 30 days.
                </p>
                <a
                  href="mailto:CiQ@creativeiq.marketing"
                  className="inline-flex items-center gap-2 bg-white text-[#3B6FF0] px-8 py-3.5 rounded-full font-semibold hover:bg-blue-50 transition-colors"
                >
                  Email Our Privacy Team <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

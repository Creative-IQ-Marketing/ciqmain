import SEO from "../components/SEO";
import { ArrowRight } from "lucide-react";

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
  return (
    <>
      <SEO
        title="Terms & Conditions | CreativeIQ Marketing"
        description="Read CreativeIQ's terms and conditions for our digital marketing services, SEO, PPC, and growth strategies."
        keywords="terms and conditions, terms of service, legal terms, CreativeIQ"
        canonical="https://creativeiq.marketing/terms"
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
              Legal Information
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
              Terms & Conditions
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Please read these terms carefully. They govern your use of
              CreativeIQ's website and services.
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
                href="#contact"
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
                  Questions About Our Terms?
                </h3>
                <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                  Get in touch with our team. We're here to clarify any concerns
                  and help you understand how we work.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-[#3B6FF0] px-8 py-3.5 rounded-full font-semibold hover:bg-blue-50 transition-colors"
                >
                  Contact Us <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

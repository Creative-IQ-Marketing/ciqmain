import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, Check, ArrowRight, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import { downloadVCard } from "../utils/vcard";
import { trackButtonClick } from "../services/analytics";

const ease = [0.22, 1, 0.36, 1];

export default function ContactPage() {
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const handleDownload = () => {
    trackButtonClick("Download vCard", "vcf_download", "ContactPage");
    downloadVCard();
  };

  const handleFormCTA = () => {
    navigate("/");
    setTimeout(() => {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 350);
  };

  return (
    <>
      <SEO
        title="Contact CreativeIQ | Save Our Number — Digital Marketing San Antonio TX"
        description="Save CreativeIQ Marketing to your contacts instantly. Call (210) 838-0177 or email CiQ@creativeiq.marketing. Full-service digital marketing in San Antonio, TX."
        keywords="CreativeIQ contact, digital marketing San Antonio, contact CreativeIQ, marketing agency phone number, SEO agency San Antonio"
        canonical="https://creativeiq.marketing/contact"
        pageType="website"
      />

      <main className="w-full bg-white pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Hero section */}
          <motion.div
            className="text-center mb-12 md:mb-16 lg:mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease }}
          >
            <motion.p
              className="text-xs font-semibold tracking-widest uppercase text-black/35 mb-3"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              Get in touch
            </motion.p>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-4"
              style={{ fontFamily: "'Manrope', sans-serif" }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.06, ease }}
            >
              Let's work together.
            </motion.h1>

            <motion.p
              className="text-sm md:text-base text-black/50 leading-relaxed max-w-lg mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease }}
            >
              Quick contact. One tap to save. Zero friction.
            </motion.p>

            {/* Download/Save CTA */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease }}
            >
              <AnimatePresence mode="wait">
                {!saved ? (
                  <motion.button
                    key="download"
                    onClick={handleDownload}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    exit={{
                      opacity: 0,
                      scale: 0.95,
                      transition: { duration: 0.2 },
                    }}
                    className="inline-flex items-center gap-3 mt-6 px-6 md:px-8 py-3 md:py-4 rounded-full bg-blue-600 text-white font-bold shadow-lg hover:shadow-xl transition-shadow"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                    aria-label="Download CreativeIQ contact card"
                  >
                    <Download size={18} strokeWidth={2.5} aria-hidden="true" />
                    Save to Contacts
                  </motion.button>
                ) : (
                  <motion.div
                    key="saved"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease }}
                    className="flex flex-col items-center"
                  >
                    <div
                      className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      <Check size={18} strokeWidth={2.5} aria-hidden="true" />
                      <span className="font-bold text-sm md:text-base">
                        Added to your contacts
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center mt-4">
                      <a
                        href="tel:2108380177"
                        className="inline-flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-full bg-blue-600 text-white font-semibold text-sm md:text-base hover:bg-blue-700 transition-colors"
                        onClick={() =>
                          trackButtonClick(
                            "Post-Save Call",
                            "contact_call",
                            "ContactPage",
                          )
                        }
                      >
                        <Phone size={15} aria-hidden="true" />
                        Call now
                      </a>
                      <a
                        href="mailto:CiQ@creativeiq.marketing"
                        className="inline-flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-full bg-gray-100 text-black font-semibold text-sm md:text-base hover:bg-gray-200 transition-colors"
                        onClick={() =>
                          trackButtonClick(
                            "Post-Save Email",
                            "contact_email",
                            "ContactPage",
                          )
                        }
                      >
                        <Mail size={15} aria-hidden="true" />
                        Email us
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-xs text-black/32 tracking-wide mt-3">
                Works on iPhone, Android &amp; desktop · No app required
              </p>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="h-px bg-black/6 my-12 md:my-16"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            style={{ originX: 0.5 }}
          />

          {/* Contact info cards */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease }}
          >
            <a
              href="tel:2108380177"
              className="block p-4 md:p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-gray-100 hover:border-blue-200 transition-all"
              onClick={() =>
                trackButtonClick("Card Call", "card_call", "ContactPage")
              }
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-black/40 mb-2">
                Call
              </p>
              <p
                className="font-bold text-sm md:text-base text-black"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                (210) 838-0177
              </p>
            </a>

            <a
              href="mailto:CiQ@creativeiq.marketing"
              className="block p-4 md:p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-gray-100 hover:border-blue-200 transition-all"
              onClick={() =>
                trackButtonClick("Card Email", "card_email", "ContactPage")
              }
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-black/40 mb-2">
                Email
              </p>
              <p
                className="font-bold text-xs md:text-sm text-black break-words"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                CiQ@creativeiq.marketing
              </p>
            </a>

            <div className="p-4 md:p-5 rounded-2xl bg-gray-50 border border-gray-100">
              <p className="text-xs font-semibold tracking-widest uppercase text-black/40 mb-2">
                Location
              </p>
              <p
                className="font-bold text-sm md:text-base text-black"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                San Antonio, TX
              </p>
            </div>

            <div className="p-4 md:p-5 rounded-2xl bg-gray-50 border border-gray-100">
              <p className="text-xs font-semibold tracking-widest uppercase text-black/40 mb-2">
                Hours
              </p>
              <p
                className="font-bold text-sm md:text-base text-black"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Mon–Fri 9–6pm
              </p>
            </div>
          </motion.div>

          {/* Form CTA */}
          <motion.div
            className="text-center pt-6 md:pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease }}
          >
            <p className="text-xs text-black/35 tracking-wide mb-2">
              Prefer a form?
            </p>
            <button
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:opacity-70 transition-opacity"
              onClick={handleFormCTA}
              aria-label="Go to contact form"
            >
              Contact form <ArrowRight size={13} aria-hidden="true" />
            </button>
          </motion.div>
        </div>
      </main>
    </>
  );
}

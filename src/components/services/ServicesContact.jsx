import { motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle, ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import { submitToGHL } from "../../services/ghl";
import {
  trackButtonClick,
  trackFormSubmission,
} from "../../services/analytics";

const SERVICE_OPTIONS = [
  {
    value: "bundle-essential",
    label: "Bundle 1 — Essential Visibility ($1,777/m)",
  },
  { value: "bundle-growth", label: "Bundle 2 — Growth Operations ($2,222/m)" },
  { value: "bundle-elite", label: "Bundle 3 — Elite Automation ($3,888/m)" },
  { value: "audit", label: "Conversion Intelligence Audit" },
  { value: "retainer", label: "Conversion Optimization Retainer" },
  { value: "consulting", label: "High-Level Consulting" },
  { value: "tier-foundation", label: "Tier 1 — Foundation System" },
  { value: "tier-growth-engine", label: "Tier 2 — Growth Engine" },
  { value: "tier-brand-authority", label: "Tier 3 — Brand Authority System" },
  { value: "tier-revenue", label: "Tier 4 — Revenue Maximizer" },
  { value: "tier-enterprise", label: "Tier 5 — Enterprise Growth Partner" },
  { value: "other", label: "Not sure yet — let's talk" },
];

export default function ServicesContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) {
      setError("Please confirm your consent to continue.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      trackButtonClick(
        "services_contact_submit",
        "form_submit",
        "ServicesContact",
      );
      await submitToGHL(formData);
      trackFormSubmission("services_contact", formData.service);
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="services-contact"
      className="py-24 bg-slate-950 relative overflow-hidden"
    >
      {/* Orb — lightweight for mobile */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-800/30 rounded-full filter blur-[80px] opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-4 block">
              Let&apos;s Build Together
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Ready to Start Your
              <br />
              <span className="text-blue-400">Growth System?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Tell us your stage and goals. We&apos;ll build the right
              system—not just sell you a package. Most clients start seeing
              results within the first 30 days.
            </p>

            {/* Trust points */}
            <ul className="space-y-4 mb-10">
              {[
                "Free strategy session — no commitment",
                "Tailored proposal within 48 hours",
                "6–12 month partnerships for real results",
                "Transparent pricing, no hidden fees",
              ].map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3 text-slate-300"
                >
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0" />
                  <span className="text-sm">{point}</span>
                </li>
              ))}
            </ul>

            {/* Contact info */}
            <div className="space-y-3 text-sm text-slate-400">
              <a
                href="tel:+1234567890"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-500" /> (123) 456-7890
              </a>
              <a
                href="mailto:hello@creativeiq.io"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-500" /> hello@creativeiq.io
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-blue-500" /> Texas, USA
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8"
          >
            {success ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Message Received!
                </h3>
                <p className="text-slate-400 text-sm">
                  We&apos;ll reach out within 24 hours with a custom proposal.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 000-0000"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    I&apos;m interested in
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select a service or package…</option>
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Tell us about your goals
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="What's your biggest growth challenge right now?"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 accent-blue-600"
                  />
                  <span className="text-xs text-slate-400 leading-relaxed">
                    I consent to CreativeIQ contacting me about their services.
                    I understand I can unsubscribe at any time.
                  </span>
                </label>

                {error && (
                  <p className="text-sm text-red-400 bg-red-900/20 border border-red-500/20 rounded-lg p-3">
                    {error}
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full py-4 rounded-xl bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-600 transition-all disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </span>
                  ) : (
                    <>
                      Send My Request <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

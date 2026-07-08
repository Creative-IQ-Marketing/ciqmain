import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { submitToGHL } from "../../services/ghl";
import {
  trackButtonClick,
  trackFormSubmission,
  trackServiceSelection,
} from "../../services/analytics";
import {
  SERVICE_FORM_OPTIONS,
  getServiceFormLabel,
} from "../../data/serviceFormOptions";
import { useFormInterest } from "../../hooks/useFormInterest";

export default function ContactForm({
  formId = "contact-interest",
  analyticsContext = "ContactForm",
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    consent: false,
  });
  const [interestSource, setInterestSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [servicePulse, setServicePulse] = useState(false);

  const applyInterest = useCallback((interest, source) => {
    trackServiceSelection(interest);
    setFormData((prev) => ({ ...prev, service: interest }));
    setInterestSource(source);
    setServicePulse(true);
    window.setTimeout(() => setServicePulse(false), 2500);
  }, []);

  useFormInterest(applyInterest);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "service" && value) {
      setInterestSource("manual");
    }
    setError(null);
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
      trackButtonClick("contact_submit", "form_submit", analyticsContext);

      const serviceLabel = getServiceFormLabel(formData.service);
      const sourceNote = interestSource
        ? `Lead source: ${interestSource}`
        : "";
      const messageBody = [sourceNote, formData.message]
        .filter(Boolean)
        .join("\n\n");

      await submitToGHL({
        ...formData,
        service: serviceLabel || formData.service || "General inquiry",
        message: messageBody,
      });
      trackFormSubmission(analyticsContext, formData.service);
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-[#3B6FF0]/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-[#3B6FF0]" />
        </div>
        <h3 className="f-disp text-xl font-bold text-slate-900 mb-2">
          Message Received!
        </h3>
        <p className="f-body text-slate-500 text-sm">
          We&apos;ll reach out within 24 hours with a custom proposal.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="f-body block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            className="f-body w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#3B6FF0] focus:ring-2 focus:ring-[#3B6FF0]/10 transition-colors"
          />
        </div>
        <div>
          <label className="f-body block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 000-0000"
            className="f-body w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#3B6FF0] focus:ring-2 focus:ring-[#3B6FF0]/10 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="f-body block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
          Email *
        </label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="jane@company.com"
          className="f-body w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#3B6FF0] focus:ring-2 focus:ring-[#3B6FF0]/10 transition-colors"
        />
      </div>

      <div>
        <label className="f-body block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
          I&apos;m interested in
        </label>
        <select
          id={formId}
          name="service"
          value={formData.service}
          onChange={handleChange}
          className={`f-body w-full bg-white border rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-[#3B6FF0] focus:ring-2 focus:ring-[#3B6FF0]/10 transition-all ${
            servicePulse
              ? "border-[#3B6FF0] ring-2 ring-[#3B6FF0]/20"
              : "border-slate-200"
          }`}
        >
          <option value="">Select a service or package…</option>
          {SERVICE_FORM_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="f-body block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
          Tell us about your goals
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="What's your biggest growth challenge right now?"
          className="f-body w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#3B6FF0] focus:ring-2 focus:ring-[#3B6FF0]/10 transition-colors resize-none"
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          className="mt-0.5 w-4 h-4 accent-[#3B6FF0]"
        />
        <span className="f-body text-xs text-slate-500 leading-relaxed">
          I consent to CreativeIQ contacting me about their services. I
          understand I can unsubscribe at any time.
        </span>
      </label>

      {error && (
        <p className="f-body text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </p>
      )}

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="w-full py-4 rounded-full bg-[#3B6FF0] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#2f5ad4] transition-all disabled:opacity-60"
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
  );
}

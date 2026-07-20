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
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

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
      <div className="py-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--c-accent-dim)]">
          <CheckCircle className="h-8 w-8 text-[var(--c-accent)]" />
        </div>
        <h3 className="mb-2 font-sans text-xl font-extrabold text-[var(--c-ink)]">
          Message received
        </h3>
        <p className="font-sans text-sm text-[var(--c-text-muted)]">
          We&apos;ll reach out within 24 hours with a custom proposal.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor={`${formId}-name`}
            className="block font-sans text-xs font-semibold uppercase tracking-wider text-[var(--c-text-muted)]"
          >
            Full name *
          </label>
          <Input
            id={`${formId}-name`}
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            autoComplete="name"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor={`${formId}-phone`}
            className="block font-sans text-xs font-semibold uppercase tracking-wider text-[var(--c-text-muted)]"
          >
            Phone
          </label>
          <Input
            id={`${formId}-phone`}
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 000-0000"
            autoComplete="tel"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor={`${formId}-email`}
          className="block font-sans text-xs font-semibold uppercase tracking-wider text-[var(--c-text-muted)]"
        >
          Email *
        </label>
        <Input
          id={`${formId}-email`}
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="jane@company.com"
          autoComplete="email"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor={formId}
          className="block font-sans text-xs font-semibold uppercase tracking-wider text-[var(--c-text-muted)]"
        >
          I&apos;m interested in
        </label>
        <select
          id={formId}
          name="service"
          value={formData.service}
          onChange={handleChange}
          className={`flex h-11 w-full appearance-none rounded-[var(--radius-control)] border border-[var(--c-border-strong)] bg-white px-3.5 font-sans text-[15px] text-[var(--c-ink)] shadow-none transition-[border-color,box-shadow] hover:border-[var(--c-ink)]/20 focus-visible:border-[var(--c-accent)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--c-accent)]/15 ${
            servicePulse
              ? "border-[var(--c-accent)] ring-[3px] ring-[var(--c-accent)]/15"
              : ""
          }`}
        >
          <option value="">Select a service or package</option>
          {SERVICE_FORM_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label
          htmlFor={`${formId}-message`}
          className="block font-sans text-xs font-semibold uppercase tracking-wider text-[var(--c-text-muted)]"
        >
          Tell us about your goals
        </label>
        <Textarea
          id={`${formId}-message`}
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="What's your biggest growth challenge right now?"
        />
      </div>

      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          className="mt-0.5 h-4 w-4 accent-[var(--c-accent)]"
        />
        <span className="font-sans text-xs leading-relaxed text-[var(--c-text-muted)]">
          I consent to CreativeIQ contacting me about their services. I
          understand I can unsubscribe at any time.
        </span>
      </label>

      {error ? (
        <p
          role="alert"
          className="rounded-[var(--radius-control)] border border-red-200 bg-red-50 p-3 font-sans text-sm text-red-700"
        >
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={loading} className="h-12 w-full">
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Sending
          </span>
        ) : (
          <>
            Send my request <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}

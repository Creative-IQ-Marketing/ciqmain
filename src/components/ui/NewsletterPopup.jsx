import { AnimatePresence, motion } from "framer-motion";
import { Mail, X } from "lucide-react";
import { useState } from "react";
import { useNewsletter } from "../../context/NewsletterContext";
import { subscribeContactToNewsletter } from "../../services/ghl";
import { trackButtonClick } from "../../services/analytics";

export default function NewsletterPopup() {
  const { open, closeNewsletter } = useNewsletter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setError("");
    setLoading(true);
    try {
      await subscribeContactToNewsletter(email, {
        source: "newsletter_popup",
        pagePath: window.location.pathname,
      });
      trackButtonClick("Newsletter Subscribe", "newsletter_popup", "NewsletterPopup");
      setSubscribed(true);
      setEmail("");
    } catch {
      setError("Could not subscribe right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    closeNewsletter();
    setTimeout(() => {
      setSubscribed(false);
      setError("");
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
            >
              <X size={16} />
            </button>

            <div className="border-b border-slate-100 px-8 pb-6 pt-10">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#3B6FF0]/10">
                <Mail className="h-5 w-5 text-[#3B6FF0]" />
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3B6FF0]">
                Newsletter
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                Growth insights, weekly.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Sharp strategy, channel signals, and practical execution ideas —
                one concise email per week.
              </p>
            </div>

            <div className="px-8 py-6">
              {subscribed ? (
                <div className="py-4 text-center">
                  <p className="text-sm font-semibold text-slate-900">
                    You&apos;re subscribed.
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Check your inbox for a confirmation.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-5 text-sm font-medium text-[#3B6FF0] hover:underline"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="popup-newsletter-email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="popup-newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      required
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3B6FF0] focus:ring-2 focus:ring-[#3B6FF0]/10"
                    />
                  </div>
                  {error && (
                    <p className="text-xs font-medium text-red-600">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="h-12 w-full rounded-xl bg-[#3B6FF0] text-sm font-semibold text-white transition hover:bg-[#2f5ad4] disabled:opacity-60"
                  >
                    {loading ? "Subscribing…" : "Subscribe"}
                  </button>
                  <p className="text-center text-xs text-slate-400">
                    No spam. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

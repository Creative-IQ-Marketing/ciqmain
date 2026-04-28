import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { unsubscribeEmailFromNewsletter } from "../services/ghl";

export default function UnsubscribedPage() {
  const [searchParams] = useSearchParams();
  const prefill = useMemo(
    () => (searchParams.get("email") || "").trim().toLowerCase(),
    [searchParams],
  );
  const [email, setEmail] = useState(prefill);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setError("");
    setLoading(true);
    try {
      await unsubscribeEmailFromNewsletter(email, {
        source: "unsubscribe_page",
        pagePath: window.location.pathname,
      });
      setSuccess(true);
      setEmail("");
    } catch (submitError) {
      console.error("Unsubscribe page request failed:", submitError);
      setError("Could not process unsubscribe right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-10 bottom-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
      </div>
      <section className="relative mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full rounded-3xl border border-white/15 bg-white/5 p-8 text-center shadow-[0_24px_60px_rgba(20,40,120,0.22)] backdrop-blur-xl sm:p-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200">
            Newsletter Preferences
          </p>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">
            Manage Your Subscription
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Enter your email below to unsubscribe from newsletter updates.
            You can resubscribe any time from our footer form.
          </p>
          <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-xl">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                  if (success) setSuccess(false);
                }}
                placeholder="Enter your email"
                required
                className="h-12 flex-1 rounded-full border border-white/25 bg-white/10 px-5 text-sm text-white outline-none transition focus:border-blue-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-blue-500 disabled:opacity-70"
              >
                {loading ? "Submitting..." : "Unsubscribe"}
              </button>
            </div>
            {success && (
              <p className="mt-3 text-sm font-medium text-blue-200">
                You have been unsubscribed successfully.
              </p>
            )}
            {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
          </form>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex h-11 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-blue-500"
            >
              Return Home
            </Link>
            <Link
              to="/#footer-newsletter"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-white/20"
            >
              Resubscribe
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

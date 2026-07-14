import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Mail } from "lucide-react";
import { unsubscribeEmailFromNewsletter } from "../services/ghl";
import SEO from "../components/SEO";
import PageHeader, {
  PageCtaPrimary,
  PageCtaSecondary,
} from "../components/layout/PageHeader";

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
    <>
      <SEO
        title="Unsubscribed | CreativeIQ"
        description="You have been successfully unsubscribed from CreativeIQ marketing emails."
        canonical="https://creativeiq.marketing/newsletter/unsubscribed"
        noindex={true}
      />
      <main className="bg-white">
        <PageHeader
          eyebrow="Newsletter preferences"
          title="Manage your subscription"
          description="Enter your email below to unsubscribe from newsletter updates. You can resubscribe any time from our footer form."
          align="center"
        />

        <section className="border-t border-black/[0.05] pb-20 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-lg px-5 sm:px-6"
          >
            <div className="rounded-[22px] border border-black/[0.06] bg-white p-8 shadow-[0_20px_48px_-24px_rgba(0,0,0,0.12)] sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                  <span className="mb-2 block font-sans text-sm font-medium text-[#0f0f0f]">
                    Email address
                  </span>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" />
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
                      className="h-12 w-full rounded-xl border border-black/[0.1] bg-white pl-11 pr-4 font-sans text-base text-[#0f0f0f] outline-none transition focus:border-[#3B6FF0] focus:ring-4 focus:ring-[#3B6FF0]/10"
                    />
                  </div>
                </label>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-[#18181b] py-3.5 font-sans text-[15px] font-semibold text-white transition hover:bg-[#2a2a2a] disabled:opacity-70"
                >
                  {loading ? "Submitting..." : "Unsubscribe"}
                </button>
              </form>

              {success && (
                <p className="mt-4 text-center font-sans text-sm font-medium text-emerald-700">
                  You have been unsubscribed successfully.
                </p>
              )}
              {error && (
                <p className="mt-4 text-center font-sans text-sm text-red-600">
                  {error}
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <PageCtaPrimary to="/">Return home</PageCtaPrimary>
                <PageCtaSecondary to="/newsletter">Resubscribe</PageCtaSecondary>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}

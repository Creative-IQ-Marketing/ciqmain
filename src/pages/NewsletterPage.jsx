import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import PageHeader from "../components/layout/PageHeader";
import { subscribeContactToNewsletter } from "../services/ghl";
import { trackButtonClick } from "../services/analytics";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!success) {
      inputRef.current?.focus();
    }
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      trackButtonClick(
        "Newsletter Subscribe",
        "newsletter_subscribe",
        "NewsletterPage",
      );
      await subscribeContactToNewsletter(email, {
        source: "newsletter_landing_page",
        pagePath: "/newsletter",
      });
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Newsletter | CreativeIQ"
        description="Subscribe to CreativeIQ's newsletter for digital marketing insights, growth strategies, and industry updates — delivered weekly to your inbox."
        keywords="newsletter, marketing insights, digital marketing tips"
        canonical="https://creativeiq.marketing/newsletter"
        pageType="website"
      />

      <main className="bg-white">
        <PageHeader
          eyebrow="Newsletter"
          title="Stay ahead in"
          titleAccent="digital marketing"
          description="Get strategies, insights, and growth tactics from our team — delivered weekly to your inbox."
          align="center"
        />

        <section className="border-t border-black/[0.05] pb-20 pt-4">
          <div className="mx-auto max-w-lg px-5 sm:px-6">
            <div className="rounded-[22px] border border-black/[0.06] bg-white p-8 shadow-[0_20px_48px_-24px_rgba(0,0,0,0.12)] sm:p-10">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                      <Check className="h-8 w-8 text-emerald-600 stroke-[2.5]" />
                    </div>
                    <h2 className="font-sans text-2xl font-extrabold tracking-[-0.03em] text-[#0f0f0f]">
                      You&apos;re all set!
                    </h2>
                    <p className="mt-3 font-sans text-base leading-relaxed text-[#5c5c5c]">
                      Thanks for subscribing. Check your inbox for a welcome
                      message and our latest insights.
                    </p>
                    <Link
                      to="/"
                      className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#18181b] px-7 py-3 font-sans text-[15px] font-semibold text-white transition hover:bg-[#2a2a2a]"
                      onClick={() =>
                        trackButtonClick(
                          "Newsletter Success Home",
                          "newsletter_success_cta",
                          "NewsletterPage",
                        )
                      }
                    >
                      Back to home
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <label className="block">
                        <span className="mb-2 block font-sans text-sm font-medium text-[#0f0f0f]">
                          Email address
                        </span>
                        <div className="relative">
                          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" />
                          <input
                            ref={inputRef}
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setError("");
                            }}
                            placeholder="you@company.com"
                            disabled={loading}
                            className={`h-12 w-full rounded-xl border bg-white pl-11 pr-4 font-sans text-base text-[#0f0f0f] outline-none transition focus:border-[#3B6FF0] focus:ring-4 focus:ring-[#3B6FF0]/10 ${
                              error
                                ? "border-red-300"
                                : "border-black/[0.1]"
                            } ${loading ? "opacity-70" : ""}`}
                          />
                        </div>
                      </label>

                      <AnimatePresence>
                        {error && (
                          <motion.p
                            className="font-sans text-sm text-red-600"
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                          >
                            {error}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#18181b] py-3.5 font-sans text-[15px] font-semibold text-white transition hover:bg-[#2a2a2a] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {loading ? (
                          "Subscribing..."
                        ) : (
                          <>
                            Subscribe now
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </form>

                    <p className="mt-6 text-center font-sans text-xs leading-relaxed text-[#737373]">
                      We respect your privacy. Unsubscribe from any email
                      anytime.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

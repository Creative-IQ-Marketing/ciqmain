import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { subscribeContactToNewsletter } from "../services/ghl";
import { trackButtonClick } from "../services/analytics";
import mainLogo from "../assets/mainLogo.png";
import bgVideo from "../assets/svid/contentmgmt.mp4";

const ease = [0.22, 1, 0.36, 1];

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

  // Preload video in head for better performance
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href = bgVideo;
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

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
        description="Subscribe to CreativeIQ's newsletter for digital marketing insights, growth strategies, and industry updates delivered to your inbox."
        keywords="newsletter, marketing insights, digital marketing tips"
        canonical="https://creativeiq.marketing/newsletter"
        pageType="website"
      />

      <div className="h-screen flex items-center justify-center px-6 sm:px-8 relative overflow-hidden">
        {/* Main content - Premium Glass Container */}
        <motion.div
          className="w-full max-w-2xl relative z-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
        >
          {/* Glassmorphism background card */}
          <div className="absolute inset-0 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-black/40" />

          {/* Content with padding */}
          <div className="relative px-8 sm:px-12 md:px-16 py-12 sm:py-16 md:py-20">
            {/* Logo inside container */}
            <Link
              to="/"
              className="inline-block mb-8 sm:mb-10 md:mb-12 group hover:opacity-80 transition-opacity"
              onClick={() =>
                trackButtonClick(
                  "Newsletter Back Home",
                  "newsletter_back",
                  "NewsletterPage",
                )
              }
            >
              <motion.img
                src={mainLogo}
                alt="CreativeIQ"
                className="h-14 sm:h-16 md:h-20 w-auto filter brightness-0 invert"
                whileHover={{ scale: 1.05 }}
              />
            </Link>
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
                  {/* Success icon */}
                  <motion.div
                    className="mx-auto mb-8 sm:mb-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-linear-to-br from-emerald-100 to-emerald-50 flex items-center justify-center shadow-lg shadow-emerald-200/50"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 12,
                      delay: 0.2,
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.5,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <Check className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600 stroke-[2.5]" />
                    </motion.div>
                  </motion.div>

                  {/* Success message */}
                  <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-5 leading-tight"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{ fontFamily: "Syne" }}
                  >
                    You're all set!
                  </motion.h2>

                  <motion.p
                    className="text-white/80 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 leading-relaxed"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    style={{ fontFamily: "DM Sans" }}
                  >
                    Thanks for subscribing! Check your inbox for a welcome
                    message and our latest digital marketing insights delivered
                    weekly.
                  </motion.p>

                  {/* CTA to home */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 bg-linear-to-r from-[#3b82f6] to-blue-600 hover:shadow-lg hover:shadow-blue-500/30 text-white font-semibold rounded-xl transition-all duration-300 group text-base sm:text-lg"
                      onClick={() =>
                        trackButtonClick(
                          "Newsletter Success Home",
                          "newsletter_success_cta",
                          "NewsletterPage",
                        )
                      }
                    >
                      Back to Home
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Headline */}
                  <h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5 sm:mb-6 leading-tight tracking-tight"
                    style={{ fontFamily: "Syne" }}
                  >
                    Stay Ahead in Digital Marketing
                  </h1>

                  {/* Subheadline */}
                  <p
                    className="text-base sm:text-lg md:text-xl text-white/80 mb-12 sm:mb-14 md:mb-16 leading-relaxed max-w-xl mx-auto"
                    style={{ fontFamily: "DM Sans" }}
                  >
                    Get strategies, insights, and growth tactics from our
                    team—delivered weekly to your inbox.
                  </p>

                  {/* Email form */}
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5 sm:space-y-6"
                  >
                    <div className="relative group">
                      <div className="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-white transition-colors">
                        <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <input
                        ref={inputRef}
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        placeholder="your@email.com"
                        disabled={loading}
                        className={`w-full pl-14 sm:pl-16 pr-5 sm:pr-6 py-4 sm:py-5 text-base sm:text-lg border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-0 bg-white/90 backdrop-blur-sm shadow-lg placeholder-gray-500 font-medium ${
                          error
                            ? "border-red-400/50 focus:border-red-500 focus:bg-white/95"
                            : "border-white/40 focus:border-white focus:bg-white/95 hover:border-white/60"
                        } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                        style={{ fontFamily: "DM Sans" }}
                      />
                    </div>

                    {/* Error message */}
                    <AnimatePresence>
                      {error && (
                        <motion.p
                          className="text-red-300 text-sm sm:text-base text-left pl-5 sm:pl-6 font-medium"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                          style={{ fontFamily: "DM Sans" }}
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="w-full px-6 sm:px-8 py-4 sm:py-5 bg-linear-to-r from-[#3b82f6] to-blue-600 hover:shadow-xl hover:shadow-blue-500/30 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed text-base sm:text-lg md:text-lg active:scale-95"
                      style={{ fontFamily: "Syne" }}
                      whileHover={!loading ? { scale: 1.02 } : {}}
                      whileTap={!loading ? { scale: 0.96 } : {}}
                    >
                      {loading ? (
                        <>
                          <motion.div
                            className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe Now</span>
                          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </motion.button>
                  </form>

                  {/* Privacy notice */}
                  <motion.p
                    className="text-xs sm:text-sm text-white/60 mt-8 sm:mt-10 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    style={{ fontFamily: "DM Sans" }}
                  >
                    We respect your privacy. Unsubscribe from any email anytime.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Decorative background with video */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Background video */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={bgVideo} type="video/mp4" />
          </video>

          {/* Elegant vignette - dark on edges, lighter in center */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)",
            }}
          />

          {/* Soft glow overlay for sophistication */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-linear-to-b from-blue-600/5 via-transparent to-indigo-600/5 rounded-full blur-3xl opacity-80" />
        </div>
      </div>
    </>
  );
}

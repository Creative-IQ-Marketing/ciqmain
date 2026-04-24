import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function UnsubscribedPage() {
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
            You Have Been Unsubscribed
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            You will no longer receive our newsletter updates. If this was a
            mistake, you can subscribe again anytime from our footer newsletter
            form.
          </p>
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

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const TRACK_TEXT = [
  "Visibility",
  "Demand",
  "Conversions",
  "Retention",
  "Automation",
  "Compounding Growth",
];

export default function StoryStrip() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-46%"]);
  const reveal = useTransform(scrollYProgress, [0.06, 0.52], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section ref={ref} className="relative h-[120vh] bg-white">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-10 top-1/3 h-56 w-56 rounded-full bg-[#3B6FF0]/12 blur-3xl" />
          <div className="absolute right-10 bottom-1/4 h-64 w-64 rounded-full bg-[#3B6FF0]/14 blur-3xl" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            style={{
              clipPath: useTransform(
                reveal,
                [0, 1],
                ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
              ),
              y,
            }}
            className="rounded-[28px] border border-blue-200 bg-white/95 px-7 py-8 text-slate-900 shadow-[0_22px_65px_rgba(43,85,221,0.18)] backdrop-blur-md sm:px-10 sm:py-10"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-blue-600">
              Built As One System
            </p>
            <h3 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
              We design one growth machine where every channel amplifies the
              next.
            </h3>
            <div className="mt-8 overflow-hidden border-t border-slate-200 pt-6">
              <motion.div style={{ x }} className="flex w-max gap-8">
                {[...TRACK_TEXT, ...TRACK_TEXT, ...TRACK_TEXT].map(
                  (item, idx) => (
                    <span
                      key={`${item}-${idx}`}
                      className="text-lg font-semibold text-slate-700 sm:text-2xl"
                    >
                      {item}
                      <span className="ml-8 text-blue-500">·</span>
                    </span>
                  ),
                )}
              </motion.div>
            </div>
            <div className="mt-7">
              <a
                href="#footer-newsletter"
                className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-blue-700 transition hover:bg-blue-100"
              >
                Get Weekly Growth Insights
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

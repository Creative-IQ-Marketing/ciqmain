import { useRef } from "react";
import { useInView } from "framer-motion";
import { useCountUp } from "../../hooks/useCountUp";
import FadeUp from "../primitives/FadeUp";

const STATS = [
  { value: 120, suffix: "+", label: "Clients Served", decimals: 0 },
  { value: 3.4, suffix: "x", label: "Average Traffic Growth", decimals: 1 },
  { value: 98, suffix: "%", label: "Client Retention", decimals: 0 },
  { value: 50, suffix: "+", label: "Custom Systems Built", decimals: 0 },
];

function StatItem({ value, suffix, label, decimals, inView }) {
  const display = useCountUp(value, 1600, inView, decimals);

  return (
    <div className="min-w-0 flex-1 px-4 text-center sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-center gap-0.5 font-sans text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-none tracking-[-0.03em] text-[#3B6FF0]">
        {display}
        <span className="text-[0.55em] font-extrabold text-[#3B6FF0]/70">
          {suffix}
        </span>
      </div>
      <p className="mt-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#737373]">
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  const countRef = useRef(null);
  const inView = useInView(countRef, { once: true, margin: "-100px" });

  return (
    <FadeUp
      as="section"
      id="stats"
      className="relative overflow-hidden border-t border-black/[0.05] bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="relative z-10 mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
        <div className="mb-14 text-center sm:mb-16">
          <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3B6FF0]">
            By the numbers
          </p>
          <h2 className="font-sans text-[clamp(2rem,4vw,3.25rem)] font-extrabold tracking-[-0.03em] text-[#0f0f0f]">
            Results that <span className="text-[#3B6FF0]">compound.</span>
          </h2>
        </div>

        <div
          ref={countRef}
          className="flex flex-wrap items-center justify-center"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-[1_1_160px] items-center"
            >
              <StatItem {...stat} inView={inView} />
              {i < STATS.length - 1 && (
                <div className="hidden h-14 w-px shrink-0 bg-black/[0.08] sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </FadeUp>
  );
}

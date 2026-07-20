import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useCountUp } from "../../hooks/useCountUp";
import { useInView } from "framer-motion";
import texture from "../../assets/sections/section-stats-texture.webp";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STATS = [
  { value: 120, suffix: "+", label: "Clients served", decimals: 0 },
  { value: 3.4, suffix: "x", label: "Avg. traffic growth", decimals: 1 },
  { value: 98, suffix: "%", label: "Client retention", decimals: 0 },
  { value: 50, suffix: "+", label: "Custom systems", decimals: 0 },
];

function StatBlock({ value, suffix, label, decimals, inView }) {
  const display = useCountUp(value, 1800, inView, decimals);
  return (
    <div className="stat-block border-t border-[var(--c-border)] py-8 first:border-t-0 sm:border-t-0 sm:border-l sm:border-[var(--c-border)] sm:px-8 sm:py-0 first:sm:border-l-0 first:sm:pl-0">
      <div className="flex items-baseline gap-1 font-sans text-[clamp(3rem,8vw,6.5rem)] font-extrabold leading-none tracking-[-0.05em] tabular-nums text-[var(--c-ink)]">
        <span>{display}</span>
        <span className="text-[0.45em] font-bold text-[var(--c-accent)]">
          {suffix}
        </span>
      </div>
      <p className="mt-4 max-w-[12rem] font-sans text-sm leading-snug text-[var(--c-text-secondary)]">
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  const rootRef = useRef(null);
  const countRef = useRef(null);
  const inView = useInView(countRef, { once: true, margin: "-80px" });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".stat-block", {
          autoAlpha: 0,
          y: 40,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
            once: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      id="stats"
      ref={rootRef}
      className="relative overflow-hidden border-t border-[var(--c-border)]"
    >
      <img
        src={texture}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-40"
        loading="lazy"
        decoding="async"
      />
      <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-pad)] py-12 sm:py-14 lg:py-16">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <h2 className="font-sans text-[clamp(1.85rem,3.5vw,2.75rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[var(--c-ink)] text-balance">
            Results that{" "}
            <span className="text-[var(--c-accent)]">compound</span>
          </h2>
        </div>

        <div
          ref={countRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STATS.map((stat) => (
            <StatBlock key={stat.label} {...stat} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

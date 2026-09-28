import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Eyebrow } from "../signal/primitives";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TEXT =
  "Most businesses run on a website that doesn't convert, a CRM nobody updates and marketing that doesn't talk to either. We build it as *one* *system* — so every visit, lead and follow-up actually lands.";

const SURFACES = [
  "Responsive websites",
  "Complete CRM",
  "SEO",
  "Social media",
  "Content & video",
  "Automation",
  "Google Business",
  "Email campaigns",
];

export default function Manifesto() {
  const root = useRef(null);

  useGSAP(
    () => {
      const words = root.current.querySelectorAll("[data-lw]");
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          words,
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: { trigger: "[data-lw-wrap]", start: "top 78%", end: "bottom 45%", scrub: 0.6 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="s-dark relative overflow-hidden py-[clamp(6rem,14vw,12rem)]">
      <div className="s-container">
        <Eyebrow index="01">The problem we fix</Eyebrow>
        <p
          data-lw-wrap
          className="mt-10 max-w-[18ch] text-[clamp(2rem,5.4vw,5.6rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-[var(--s-paper)] lg:max-w-[22ch]"
        >
          {TEXT.split(" ").map((w, i) => {
            const serif = w.startsWith("*");
            const clean = w.replace(/\*/g, "");
            return (
              <span key={i} data-lw className={serif ? "s-serif text-[var(--s-signal)]" : undefined}>
                {clean}{" "}
              </span>
            );
          })}
        </p>

        <div className="mt-20 overflow-hidden border-y border-[var(--s-line)] py-5">
          <div className="s-marquee" style={{ "--dur": "32s" }}>
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
                {SURFACES.map((s) => (
                  <span key={s} className="flex items-center">
                    <span className="px-8 text-[clamp(1.4rem,2.6vw,2.4rem)] font-medium tracking-[-0.03em] text-[var(--s-paper-dim)]">
                      {s}
                    </span>
                    <span className="s-mono text-[var(--s-signal)]">✳</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <p className="s-label mt-4 text-[var(--s-paper-ghost)]">Everything your growth runs on — under one roof.</p>
      </div>
    </section>
  );
}

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Eyebrow } from "../signal/primitives";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TEXT =
  "Search changed. Your buyers now ask ChatGPT, Gemini and Google who to hire — and the machine answers with one name. Most businesses are invisible to it. We engineer the signals that make that name *yours.*";

const SURFACES = ["Google", "ChatGPT", "Gemini", "Perplexity", "Maps", "Instagram", "TikTok", "YouTube"];

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
        <Eyebrow index="01">The shift</Eyebrow>
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
        <p className="s-label mt-4 text-[var(--s-paper-ghost)]">Every surface where you get chosen — or skipped.</p>
      </div>
    </section>
  );
}

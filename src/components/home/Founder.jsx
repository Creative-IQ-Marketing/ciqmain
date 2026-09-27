import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Eyebrow, SignalButton } from "../signal/primitives";
import { trackButtonClick } from "../../services/analytics";
import vilma from "../../assets/vilma/vilma-bw-work-xl.webp";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PRINCIPLES = [
  ["AI-era expertise", "Built for discovery in 2026 — Google, ChatGPT, Gemini, Perplexity and the technical signals they reward."],
  ["Full-stack execution", "Web, SEO, CRM, content and social under one roof, so strategy never fractures across vendors."],
  ["Measured, plainly", "Traffic lifts, retention and shipped systems — reported every month in language owners use."],
  ["Local and nationwide", "San Antonio rooted, national reach. Same discipline for a single location or a multi-market team."],
];

export default function Founder() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: "[data-founder-pin]", start: "top top", end: "+=120%", scrub: 0.8, pin: true },
        });
        tl.fromTo(
          "[data-portrait]",
          { clipPath: "inset(30% 36% 30% 36% round 28px)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power2.inOut" },
        )
          .fromTo("[data-portrait] img", { scale: 1.35 }, { scale: 1, ease: "power2.inOut" }, 0)
          .fromTo("[data-founder-name]", { yPercent: 0, autoAlpha: 1 }, { yPercent: -60, autoAlpha: 0, ease: "power1.in" }, 0.15)
          .fromTo("[data-founder-caption]", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0 }, 0.55);
        gsap.from("[data-principle]", {
          autoAlpha: 0,
          y: 40,
          stagger: 0.1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-principles]", start: "top 80%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="about" className="s-dark relative">
      <div data-founder-pin className="relative h-[100svh] overflow-hidden">
        <div data-portrait className="absolute inset-0" style={{ clipPath: "inset(0% 0% 0% 0%)" }}>
          <img
            src={vilma}
            alt="Vilma Tovar, Founder and CEO of CreativeIQ"
            className="h-full w-full object-cover object-[58%_30%]"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--s-ink)] via-[rgba(6,7,10,0.25)] to-[rgba(6,7,10,0.45)]" />
        </div>

        <div className="pointer-events-none absolute inset-0 flex flex-col justify-center">
          <p
            data-founder-name
            className="s-display whitespace-nowrap text-center text-[clamp(4rem,15vw,17rem)] text-[var(--s-paper)] [text-shadow:0_10px_60px_rgba(0,0,0,0.35)]"
          >
            Vilma <span className="s-serif">Tovar</span>
          </p>
        </div>

        <div data-founder-caption className="absolute inset-x-0 bottom-0">
          <div className="s-container grid gap-6 pb-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <Eyebrow index="04" className="!text-[var(--s-paper-dim)]">Founder & CEO</Eyebrow>
              <p className="mt-4 max-w-xl text-[clamp(1.2rem,2vw,1.7rem)] font-medium leading-[1.25] tracking-[-0.025em] text-[var(--s-paper)]">
                AI strategist, speaker and growth consultant — building marketing systems that earn trust from customers
                <span className="s-serif text-[var(--s-signal-hot)]"> and </span>
                the machines that recommend them.
              </p>
            </div>
            <div className="pointer-events-auto">
              <SignalButton
                to="/about/vilma"
                variant="ghost"
                onClick={() => trackButtonClick("About Vilma", "vilma_intro_cta", "Founder")}
              >
                Meet Vilma
              </SignalButton>
            </div>
          </div>
        </div>
      </div>

      <div data-principles className="s-container py-[clamp(5rem,10vw,9rem)]">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="s-display text-[clamp(2.6rem,5vw,5rem)] text-[var(--s-paper)]">
              Your growth partner
              <br />
              in the <span className="s-serif text-[var(--s-signal)]">AI era.</span>
            </h2>
            <div className="mt-8">
              <SignalButton to="/about/creativeiq" variant="ghost">
                About CreativeIQ
              </SignalButton>
            </div>
          </div>
          <ol>
            {PRINCIPLES.map(([t, b], i) => (
              <li
                key={t}
                data-principle
                className="group grid grid-cols-[3rem_1fr] gap-4 border-t border-[var(--s-line)] py-7 transition-colors duration-500 last:border-b hover:bg-[rgba(201,139,135,0.05)] sm:grid-cols-[4rem_1fr_1.3fr] sm:gap-6"
              >
                <span className="s-mono pt-1 text-[12px] text-[var(--s-signal)]">0{i + 1}</span>
                <p className="text-[clamp(1.3rem,2vw,1.75rem)] font-semibold tracking-[-0.035em] text-[var(--s-paper)] transition-transform duration-500 group-hover:translate-x-2">
                  {t}
                </p>
                <p className="col-start-2 text-[15px] leading-relaxed text-[var(--s-paper-dim)] sm:col-start-auto">{b}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

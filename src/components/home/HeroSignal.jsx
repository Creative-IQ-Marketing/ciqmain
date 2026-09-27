import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LogoCosmos from "./LogoCosmos";
import { SignalButton } from "../signal/primitives";
import { trackButtonClick } from "../../services/analytics";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function useBooted() {
  const [booted, setBooted] = useState(() => typeof window !== "undefined" && Boolean(window.__ciqBooted));
  useEffect(() => {
    if (window.__ciqBooted) {
      setBooted(true);
      return undefined;
    }
    const on = () => setBooted(true);
    window.addEventListener("ciq-boot-done", on);
    return () => window.removeEventListener("ciq-boot-done", on);
  }, []);
  return booted;
}

export default function HeroSignal() {
  const root = useRef(null);
  const progress = useRef(0);
  const booted = useBooted();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!booted) {
          gsap.set(".s-word", { yPercent: 115 });
          gsap.set("[data-hero-fade]", { autoAlpha: 0, y: 20 });
          return;
        }
        gsap
          .timeline({ delay: 0.15 })
          .to(".s-word", { yPercent: 0, rotate: 0, duration: 1.5, stagger: 0.07, ease: "expo.out" })
          .to("[data-hero-fade]", { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: "expo.out" }, 0.5);

        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            progress.current = self.progress;
          },
        });
        gsap.to("[data-hero-copy]", {
          yPercent: -30,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "70% top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [booted] },
  );

  const word = (w, extra = "") => (
    <span className="s-word-mask">
      <span className={`s-word ${extra}`}>{w}</span>
    </span>
  );

  return (
    <section
      ref={root}
      className="s-dark relative flex h-[100svh] min-h-[640px] flex-col overflow-hidden"
      aria-label="CreativeIQ — built to rank, made to convert"
    >
      <div
        className="pointer-events-none absolute right-[-10%] top-[5%] h-[70vmax] w-[70vmax] rounded-full opacity-50 blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(59, 111, 240,0.22), transparent 62%)" }}
        aria-hidden
      />
      <div className="absolute inset-0" data-cursor="hide">
        <LogoCosmos progressRef={progress} formed={booted} />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-b from-transparent to-[var(--s-ink)]"
        aria-hidden
      />
      <div data-hero-copy className="pointer-events-none relative z-10 flex flex-1 flex-col pt-[calc(var(--hero-header-offset)+1.5rem)]">
        <div className="s-container mt-auto grid items-end gap-8 pb-8 lg:grid-cols-[1fr_auto] lg:pb-12">
          <div>
            <h1 className="s-display text-[clamp(3.2rem,8.4vw,10.5rem)] text-[var(--s-paper)]">
              <span className="block">
                {word("Built")} {word("to")} {word("rank.")}
              </span>
              <span className="block">
                {word("Made")} {word("to")}{" "}
                {word("convert.", "s-serif pr-[0.06em] font-normal tracking-[-0.03em] text-[var(--s-signal)]")}
              </span>
            </h1>
            <p data-hero-fade className="mt-6 max-w-[34rem] text-[clamp(1rem,1.3vw,1.15rem)] leading-relaxed text-[var(--s-paper-dim)]">
              Responsive websites, complete CRM systems, SEO and social — built by one team
              and wired together, so attention turns into <em className="s-serif text-[var(--s-paper)] text-[1.15em]">booked</em> business.
            </p>
            <div data-hero-fade className="pointer-events-auto mt-8 flex flex-wrap gap-3">
              <SignalButton
                to="/contact"
                onClick={() => trackButtonClick("Start a project", "hero_cta", "Hero")}
              >
                Start a project
              </SignalButton>
              <SignalButton
                to="/free-ai-seo-audit"
                variant="ghost"
                onClick={() => trackButtonClick("Free Audit", "hero_cta", "Hero")}
              >
                Audit my site free
              </SignalButton>
            </div>
          </div>
          <div data-hero-fade className="hidden max-w-[15rem] text-right lg:block">
            <p className="s-label text-[var(--s-paper-ghost)]">One team for</p>
            <p className="s-didone mt-2 text-[1.35rem] leading-snug text-[var(--s-paper-dim)]">
              Web, CRM, SEO <span className="s-serif text-[var(--s-signal)]">&amp;</span> Social
            </p>
          </div>
        </div>

        <div className="s-container flex items-center justify-between border-t border-[var(--s-line)] py-4" data-hero-fade>
          <span className="s-label text-[var(--s-paper-ghost)]">Scroll to enter</span>
          <span className="s-label text-[var(--s-paper-ghost)]">↓</span>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SignalField from "./SignalField";
import { SignalButton } from "../signal/primitives";
import { trackButtonClick } from "../../services/analytics";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const QUERIES = [
  "best digital marketing agency in San Antonio",
  "who can make ChatGPT recommend my business",
  "agency for SEO, social and CRM in one place",
  "fix my website so it actually converts",
];

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

/** Types a query, "thinks", then resolves the answer to CreativeIQ. Loops. */
function AskAI({ start }) {
  const [q, setQ] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | thinking | answer
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!start) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setQ(QUERIES[0]);
      setPhase("answer");
      return undefined;
    }
    const full = QUERIES[i];
    let t;
    if (phase === "typing") {
      if (q.length < full.length) t = setTimeout(() => setQ(full.slice(0, q.length + 1)), 38 + Math.random() * 40);
      else t = setTimeout(() => setPhase("thinking"), 350);
    } else if (phase === "thinking") {
      t = setTimeout(() => setPhase("answer"), 1100);
    } else {
      t = setTimeout(() => {
        setQ("");
        setPhase("typing");
        setI((n) => (n + 1) % QUERIES.length);
      }, 3600);
    }
    return () => clearTimeout(t);
  }, [start, q, phase, i]);

  return (
    <div className="w-full max-w-[26rem] rounded-2xl border border-[var(--s-line)] bg-[rgba(12,14,19,0.72)] p-4 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <span className="s-label text-[var(--s-paper-ghost)]">Ask any AI</span>
        <span className="s-label flex items-center gap-2 text-[var(--s-paper-ghost)]">
          <span className="s-pulse-dot" /> live
        </span>
      </div>
      <p className="s-mono mt-3 min-h-[2.8em] text-[13px] leading-relaxed text-[var(--s-paper)]">
        <span className="text-[var(--s-signal)]">›</span> {q}
        {phase === "typing" ? <span className="s-caret" /> : null}
      </p>
      <div className="mt-3 h-px w-full overflow-hidden bg-[var(--s-line)]">
        <div
          className="h-full bg-[var(--s-signal)] transition-[width] ease-out"
          style={{
            width: phase === "typing" ? "0%" : "100%",
            transitionDuration: phase === "thinking" ? "1100ms" : "0ms",
          }}
        />
      </div>
      <div
        className="mt-3 flex items-center justify-between gap-3 transition-all duration-700"
        style={{
          opacity: phase === "answer" ? 1 : 0.18,
          filter: phase === "answer" ? "blur(0)" : "blur(6px)",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--s-signal)] font-[var(--f-display)] text-[13px] font-extrabold text-white">
            C<span className="s-serif text-[15px]">i</span>Q
          </span>
          <div>
            <p className="text-[15px] font-semibold tracking-tight text-[var(--s-paper)]">CreativeIQ</p>
            <p className="s-mono text-[11px] text-[var(--s-paper-ghost)]">recommended · cited source 01</p>
          </div>
        </div>
        <span className="s-mono text-[11px] text-[#3ddc84]">#1</span>
      </div>
    </div>
  );
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
      aria-label="CreativeIQ — built to rank, designed to convert"
    >
      <div
        className="pointer-events-none absolute left-[55%] top-[30%] h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(77,124,255,0.28), transparent 65%)" }}
        aria-hidden
      />
      <div className="absolute inset-0" data-cursor="Disturb">
        <SignalField progressRef={progress} formed={booted} />
      </div>

      <div data-hero-copy className="pointer-events-none relative z-10 flex flex-1 flex-col pt-[calc(var(--hero-header-offset)+1.5rem)]">
        <div className="s-container flex items-start justify-between" data-hero-fade>
          <p className="s-label text-[var(--s-paper-ghost)]">
            AI-era growth studio
            <br />
            <span className="text-[var(--s-paper-dim)]">San Antonio, TX — 29.42°N 98.49°W</span>
          </p>
          <p className="s-label hidden text-right text-[var(--s-paper-ghost)] md:block">
            SEO · GEO · Social
            <br />
            Web · CRM · Content
          </p>
        </div>

        <div className="s-container mt-auto grid items-end gap-8 pb-8 lg:grid-cols-[1fr_auto] lg:pb-12">
          <div>
            <h1 className="s-display text-[clamp(3.2rem,8.4vw,10.5rem)] text-[var(--s-paper)]">
              <span className="block">
                {word("Built")} {word("to")} {word("rank.")}
              </span>
              <span className="block">
                {word("Made")} {word("to")}{" "}
                {word("convert.", "s-serif pr-[0.08em] text-[var(--s-signal)]")}
              </span>
            </h1>
            <p data-hero-fade className="mt-6 max-w-[34rem] text-[clamp(1rem,1.3vw,1.15rem)] leading-relaxed text-[var(--s-paper-dim)]">
              Your customers stopped scrolling results. They ask machines who to trust.
              We build the SEO, sites, content and CRM that make the answer <em className="s-serif text-[var(--s-paper)] text-[1.15em]">you</em>.
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
          <div data-hero-fade className="pointer-events-auto hidden lg:block">
            <AskAI start={booted} />
          </div>
        </div>

        <div className="s-container flex items-center justify-between border-t border-[var(--s-line)] py-4" data-hero-fade>
          <span className="s-label text-[var(--s-paper-ghost)]">Scroll to resolve</span>
          <span className="s-label text-[var(--s-paper-ghost)]">↓</span>
        </div>
      </div>
    </section>
  );
}

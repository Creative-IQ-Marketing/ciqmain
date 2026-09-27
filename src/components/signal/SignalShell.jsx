import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Lenis smooth scroll, driven by the GSAP ticker so ScrollTrigger stays in sync. */
export function SmoothScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (reduced()) return undefined;
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95 });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}

/**
 * Blend-mode cursor. Any element with data-cursor="Label" turns it into a
 * signal disc with that label; links and buttons swell it.
 */
export function Cursor() {
  const ref = useRef(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return undefined;
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });

    gsap.set(el, { autoAlpha: 0 });
    let seen = false;
    const move = (e) => {
      if (!seen) {
        seen = true;
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { autoAlpha: 1, duration: 0.3 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e) => {
      const labelled = e.target.closest?.("[data-cursor]");
      if (labelled) {
        el.dataset.state = "label";
        setLabel(labelled.dataset.cursor);
        return;
      }
      const link = e.target.closest?.("a, button, [role='button'], input, select, textarea, label");
      el.dataset.state = link ? "link" : "";
    };
    const leave = () => gsap.to(el, { autoAlpha: 0, duration: 0.2 });
    const enter = () => gsap.to(el, { autoAlpha: 1, duration: 0.2 });

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
    };
  }, []);

  return (
    <div ref={ref} className="s-cursor" aria-hidden>
      <div className="s-cursor__dot" />
      <span className="s-cursor__label">{label}</span>
    </div>
  );
}

const BOOT_LINES = [
  "crawl  creativeiqmarketing.com",
  "parse  schema · entities · intent",
  "rank   local + ai surfaces",
  "resolve answer → CreativeIQ",
];

/** First-visit boot sequence: an index counter that splits open onto the page. */
export function Preloader() {
  const [done, setDone] = useState(() => {
    if (typeof window === "undefined" || reduced()) return true;
    try {
      return sessionStorage.getItem("ciq_signal_boot") === "1";
    } catch {
      return false;
    }
  });
  const root = useRef(null);
  const count = useRef(null);

  useEffect(() => {
    if (done) {
      window.__ciqBooted = true;
      window.dispatchEvent(new Event("ciq-boot-done"));
      return undefined;
    }
    window.__lenis?.stop();
    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        try {
          sessionStorage.setItem("ciq_signal_boot", "1");
        } catch {
          /* private mode */
        }
        window.__lenis?.start();
        setDone(true);
      },
    });
    tl.to(counter, {
      v: 100,
      duration: 2.1,
      ease: "power2.inOut",
      onUpdate: () => {
        if (count.current)
          count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
      },
    })
      .from(
        ".s-boot-line",
        { autoAlpha: 0, x: -12, stagger: 0.42, duration: 0.4, ease: "power2.out" },
        0.1,
      )
      .add(() => {
        window.__ciqBooted = true;
        window.dispatchEvent(new Event("ciq-boot-done"));
      }, "+=0.05")
      .to(".s-boot-top", { yPercent: -100, duration: 1.05, ease: "expo.inOut" }, "<")
      .to(".s-boot-bottom", { yPercent: 100, duration: 1.05, ease: "expo.inOut" }, "<");
    return () => tl.kill();
  }, [done]);

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[300] text-[var(--s-paper)]" aria-hidden>
      <div className="s-boot-top absolute inset-x-0 top-0 h-1/2 bg-[var(--s-ink)]" />
      <div className="s-boot-bottom absolute inset-x-0 bottom-0 h-1/2 bg-[var(--s-ink)]" />
      <div className="s-boot-top absolute inset-x-0 top-0 flex h-1/2 flex-col justify-end">
        <div className="s-container pb-4">
          {BOOT_LINES.map((l) => (
            <p key={l} className="s-boot-line s-mono text-[12px] text-[var(--s-paper-dim)]">
              <span className="text-[var(--s-signal)]">›</span> {l}
            </p>
          ))}
        </div>
      </div>
      <div className="s-boot-bottom absolute inset-x-0 bottom-0 flex h-1/2 items-end">
        <div className="s-container flex items-end justify-between pb-6">
          <span className="s-label text-[var(--s-paper-ghost)]">Indexing signal</span>
          <span
            ref={count}
            className="s-display text-[clamp(5rem,18vw,15rem)] tabular-nums leading-[0.8]"
          >
            000
          </span>
        </div>
      </div>
    </div>
  );
}

/** Route change curtain: a signal-blue wipe that covers, then reveals. */
export function RouteCurtain() {
  const { pathname } = useLocation();
  const ref = useRef(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (reduced() || !ref.current) return;
    gsap.fromTo(
      ref.current,
      { clipPath: "inset(0% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut", delay: 0.05 },
    );
  }, [pathname]);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[250] flex items-center justify-center bg-[var(--s-signal)]"
      style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      aria-hidden
    >
      <span className="s-display text-[clamp(3rem,10vw,9rem)] text-white">
        C<span className="s-serif">i</span>Q
      </span>
    </div>
  );
}

export function Grain() {
  return <div className="s-grain" aria-hidden />;
}

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Words wrapped in masks so they can rise into view. Keeps text readable to crawlers. */
export function SplitWords({ text, className = "", wordClassName = "" }) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="s-word-mask" aria-hidden>
          <span className={`s-word ${wordClassName}`}>{w}</span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

/** Rises every .s-word inside when scrolled into view. */
export function RiseOnView({ as: Tag = "div", children, className = "", start = "top 85%", stagger = 0.06, ...rest }) {
  const ref = useRef(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current.querySelectorAll(".s-word, [data-rise]"), {
          yPercent: 115,
          rotate: 4,
          duration: 1.2,
          stagger,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start, once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

/** Pulls its child toward the pointer. */
export function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return undefined;
    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const reset = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
    };
  }, [strength]);
  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {children}
    </span>
  );
}

/** Pill button with a rolling label and a fill that rises from below. */
export function SignalButton({ to, href, variant = "signal", children, onClick, className = "", ...rest }) {
  const inner = (
    <>
      <span className="s-btn__roll">
        <span>{children}</span>
        <span aria-hidden>{children}</span>
      </span>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M3 11 11 3M4.5 3H11v6.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </>
  );
  const cls = `s-btn s-btn--${variant} ${className}`;
  return (
    <Magnetic strength={0.25}>
      {to ? (
        <Link to={to} onClick={onClick} className={cls} {...rest}>
          {inner}
        </Link>
      ) : (
        <a href={href} onClick={onClick} className={cls} {...rest}>
          {inner}
        </a>
      )}
    </Magnetic>
  );
}

/** Small mono eyebrow with an index number: "(02) — Method". */
export function Eyebrow({ index, children, className = "" }) {
  return (
    <p className={`s-label flex items-center gap-3 text-[var(--s-paper-ghost)] ${className}`}>
      {index ? <span className="text-[var(--s-signal)]">({index})</span> : null}
      <span className="h-px w-8 bg-current opacity-50" />
      {children}
    </p>
  );
}

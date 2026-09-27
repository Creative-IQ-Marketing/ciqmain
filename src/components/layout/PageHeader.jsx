import { Link, useLocation } from "react-router-dom";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Magnetic } from "../signal/primitives";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * The crescent from the CreativeIQ mark, drawn as a hairline that writes
 * itself in and slowly turns as you scroll. Shared by every inner page hero.
 */
export function CrescentMark({ className = "" }) {
  return (
    <svg viewBox="0 0 400 400" className={className} fill="none" aria-hidden>
      <path
        data-crescent
        d="M258 36 C 150 30, 52 118, 52 222 C 52 318, 138 386, 228 380 C 262 378, 296 366, 320 350"
        stroke="var(--s-paper)"
        strokeOpacity="0.55"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        data-crescent
        d="M258 36 C 176 56, 92 130, 92 226 C 92 312, 170 372, 250 368"
        stroke="var(--s-paper)"
        strokeOpacity="0.25"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle data-crescent-dot cx="320" cy="350" r="3.5" fill="var(--s-signal)" />
      <g data-crescent-ring>
        <circle cx="200" cy="208" r="178" stroke="var(--s-signal)" strokeOpacity="0.28" strokeWidth="0.8" strokeDasharray="2 7" />
      </g>
    </svg>
  );
}

/** Dark cinematic hero for inner pages; hands off to a paper body panel. */
export default function PageHeader({
  eyebrow,
  title,
  titleAccent,
  description,
  align = "left",
  children,
  className = "",
}) {
  const rootRef = useRef(null);
  const { pathname } = useLocation();
  const centered = align === "center";
  const crumb = pathname.split("/").filter(Boolean).join(" / ") || "home";

  useGSAP(
    () => {
      const paths = rootRef.current.querySelectorAll("[data-crescent]");
      paths.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      });
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ delay: 0.25 });
        tl.from("[data-ph-word]", { yPercent: 115, rotate: 3, duration: 1.3, stagger: 0.06, ease: "expo.out" })
          .from("[data-ph-fade]", { autoAlpha: 0, y: 18, duration: 0.9, stagger: 0.08, ease: "expo.out" }, 0.35)
          .to(paths, { strokeDashoffset: 0, duration: 2.2, stagger: 0.25, ease: "power2.inOut" }, 0)
          .from("[data-crescent-dot]", { scale: 0, transformOrigin: "center", duration: 0.6, ease: "back.out(3)" }, 1.8);
        gsap.to("[data-crescent-wrap]", {
          rotate: 24,
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-crescent-ring]", { rotate: 360, transformOrigin: "200px 208px", duration: 90, repeat: -1, ease: "none" });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(paths, { strokeDashoffset: 0 });
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const words = (text, cls = "") =>
    String(text)
      .split(" ")
      .map((w, i) => (
        <span key={`${w}-${i}`} className="s-word-mask">
          <span data-ph-word className={`s-word ${cls}`}>
            {w}
          </span>
          {" "}
        </span>
      ));

  return (
    <section
      ref={rootRef}
      className={`s-dark relative overflow-hidden pt-[calc(var(--hero-header-offset)+3rem)] ${className}`}
    >
      <div
        className="pointer-events-none absolute right-[-12%] top-[-10%] h-[60vmax] w-[60vmax] rounded-full opacity-60 blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(59, 111, 240,0.2), transparent 62%)" }}
        aria-hidden
      />
      <div
        data-crescent-wrap
        className="pointer-events-none absolute right-[-6rem] top-[14%] w-[min(34rem,70vw)] opacity-70 sm:right-[2%] lg:right-[6%] lg:top-[12%]"
      >
        <CrescentMark className="h-auto w-full" />
      </div>

      <div
        className={`s-container relative pb-[clamp(4rem,9vw,8rem)] ${centered ? "text-center" : ""}`}
      >
        <p
          data-ph-fade
          className={`s-label flex items-center gap-3 text-[var(--s-paper-ghost)] ${centered ? "justify-center" : ""}`}
        >
          <span className="text-[var(--s-signal)]">CIQ</span>
          <span className="h-px w-8 bg-current opacity-50" />
          {eyebrow || crumb}
        </p>
        <h1
          className={`s-display mt-8 text-[clamp(2.9rem,7.4vw,7.6rem)] text-[var(--s-paper)] ${
            centered ? "mx-auto max-w-[14ch]" : "max-w-[15ch]"
          }`}
        >
          {words(title)}
          {titleAccent ? (
            <>
              <br />
              {words(titleAccent, "s-serif font-normal tracking-[-0.03em] text-[var(--s-signal)]")}
            </>
          ) : null}
        </h1>
        {description ? (
          <p
            data-ph-fade
            className={`mt-8 text-[clamp(1rem,1.3vw,1.15rem)] leading-relaxed text-[var(--s-paper-dim)] text-pretty ${
              centered ? "mx-auto max-w-xl" : "max-w-xl"
            }`}
          >
            {description}
          </p>
        ) : null}
        {children ? (
          <div data-ph-fade className={`mt-10 flex flex-wrap gap-3 ${centered ? "justify-center" : ""}`}>
            {children}
          </div>
        ) : null}
      </div>
      <div className="relative h-[clamp(1.5rem,4vw,3rem)] rounded-t-[clamp(1.5rem,4vw,3rem)] bg-[var(--s-paper)]" aria-hidden />
    </section>
  );
}

function PillInner({ children }) {
  return (
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
}

function Pill({ to, onClick, children, variant, className }) {
  const cls = `s-btn s-btn--${variant} ${className}`;
  return (
    <Magnetic strength={0.25}>
      {to ? (
        <Link to={to} onClick={onClick} className={cls}>
          <PillInner>{children}</PillInner>
        </Link>
      ) : (
        <button type="button" onClick={onClick} className={cls}>
          <PillInner>{children}</PillInner>
        </button>
      )}
    </Magnetic>
  );
}

export function PageCtaPrimary({ to, onClick, children, className = "" }) {
  return <Pill to={to} onClick={onClick} variant="signal" className={className}>{children}</Pill>;
}

export function PageCtaSecondary({ to, onClick, children, className = "" }) {
  return <Pill to={to} onClick={onClick} variant="ghost" className={className}>{children}</Pill>;
}

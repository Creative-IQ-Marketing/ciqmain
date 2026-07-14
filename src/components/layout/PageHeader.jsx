import { Link } from "react-router-dom";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Clean inner-page hero — type first, no decorative glow fills.
 * Text content is passed via props; visuals only here.
 */
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
  const centered = align === "center";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".page-header-inner > *", {
          autoAlpha: 0,
          y: 18,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className={`relative border-b border-[var(--c-border)] bg-[var(--c-base)] pb-12 pt-[calc(var(--hero-header-offset)+1.5rem)] sm:pb-14 lg:pb-16 ${className}`}
    >
      <div
        className={`page-header-inner relative mx-auto px-[var(--container-pad)] ${
          centered
            ? "max-w-3xl text-center"
            : "max-w-[var(--container-max)] lg:max-w-3xl"
        }`}
      >
        {eyebrow ? (
          <p className="mb-3 font-sans text-sm font-medium text-[var(--c-text-muted)]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-sans text-[clamp(2.15rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[var(--c-ink)] text-balance">
          {title}
          {titleAccent ? (
            <>
              <br />
              <span className="text-[var(--c-accent)]">{titleAccent}</span>
            </>
          ) : null}
        </h1>
        {description ? (
          <p
            className={`mt-5 font-sans text-base leading-relaxed text-[var(--c-text-secondary)] text-pretty ${
              centered ? "mx-auto max-w-xl" : "max-w-2xl"
            }`}
          >
            {description}
          </p>
        ) : null}
        {children ? (
          <div
            className={`mt-8 flex flex-wrap gap-3 ${
              centered ? "justify-center" : ""
            }`}
          >
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function PageCtaPrimary({ to, onClick, children, className = "" }) {
  const cls = `inline-flex items-center justify-center rounded-[var(--radius-pill)] bg-[var(--c-cta)] px-7 py-3 font-sans text-[15px] font-semibold text-white transition hover:bg-[var(--c-cta-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] ${className}`;
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function PageCtaSecondary({ to, onClick, children, className = "" }) {
  const cls = `inline-flex items-center justify-center rounded-[var(--radius-pill)] border border-[var(--c-border-strong)] bg-white px-7 py-3 font-sans text-[15px] font-medium text-[var(--c-ink)] transition hover:border-[var(--c-ink)]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] ${className}`;
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

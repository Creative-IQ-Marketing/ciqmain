import { Link } from "react-router-dom";

/**
 * Shared inner-page hero — matches homepage typography & spacing.
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
  const centered = align === "center";

  return (
    <section
      className={`border-b border-black/[0.05] bg-white pb-12 pt-[calc(var(--hero-header-offset)+2rem)] sm:pb-14 lg:pb-16 ${className}`}
    >
      <div
        className={`mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10 ${
          centered ? "max-w-3xl text-center" : "max-w-3xl"
        }`}
      >
        {eyebrow ? (
          <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3B6FF0]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-sans text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#0f0f0f]">
          {title}
          {titleAccent ? (
            <>
              <br />
              <span className="text-[#3B6FF0]">{titleAccent}</span>
            </>
          ) : null}
        </h1>
        {description ? (
          <p
            className={`mt-5 font-sans text-base leading-relaxed text-[#5c5c5c] ${
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
  if (to) {
    return (
      <Link
        to={to}
        className={`inline-flex items-center justify-center rounded-full bg-[#18181b] px-7 py-3 font-sans text-[15px] font-semibold text-white transition hover:bg-[#2a2a2a] ${className}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full bg-[#18181b] px-7 py-3 font-sans text-[15px] font-semibold text-white transition hover:bg-[#2a2a2a] ${className}`}
    >
      {children}
    </button>
  );
}

export function PageCtaSecondary({ to, onClick, children, className = "" }) {
  const cls = `inline-flex items-center justify-center rounded-full border border-[#d4d4d4] bg-white px-7 py-3 font-sans text-[15px] font-medium text-[#252525] transition hover:border-[#aaa] ${className}`;
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

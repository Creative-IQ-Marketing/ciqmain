/**
 * Single intentional pen accent — points from the headline toward the CTAs.
 * No stray doodles. Desktop only.
 */
export default function HeroDecorations() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] hidden lg:block"
      aria-hidden
    >
      <div className="absolute top-[clamp(11.5rem,22vh,15rem)] left-[calc(50%+min(17rem,28vw))] flex w-[9.5rem] flex-col items-start">
        <p className="origin-bottom-left -rotate-6 font-[family-name:var(--font-hand)] text-[1.65rem] font-medium leading-none tracking-[-0.01em] text-[var(--c-accent)]">
          Built to convert
        </p>
        <svg
          viewBox="0 0 88 72"
          fill="none"
          className="-ml-1 mt-1 h-[4.25rem] w-[5.25rem] text-[var(--c-accent)]"
        >
          <path
            d="M18 4 C22 18, 28 32, 40 42 C52 52, 64 56, 76 58"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.55"
          />
          <path
            d="M68 52 L76 58 L70 64"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.55"
          />
        </svg>
      </div>
    </div>
  );
}

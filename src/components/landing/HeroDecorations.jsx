/**
 * BrandLyft-adjacent pen accent — handwritten note pointing to the gallery.
 * Single signature moment. Not decoration spam.
 */
export default function HeroDecorations() {
  return (
    <div
      className="pointer-events-none absolute inset-0 hidden lg:block"
      aria-hidden
    >
      <svg
        viewBox="0 0 56 64"
        fill="none"
        className="absolute left-[max(1rem,calc(50%-520px))] top-[38%] h-14 w-14 text-[var(--c-ink)]"
        style={{ opacity: 0.2 }}
      >
        <path
          d="M14 18 L14 26 M10 22 L18 22"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M22 34 L28 28 M28 34 L22 28"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M8 42 C12 38, 16 36, 20 32"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="round"
        />
      </svg>

      <div
        className="absolute right-[max(1.5rem,calc(50%-480px))] top-[36%] flex flex-col items-end"
        style={{ opacity: 0.92 }}
      >
        <p
          className="mb-0 max-w-[140px] text-right text-[1.55rem] leading-[1.15] text-[var(--c-ink)]/55 pb-1"
          style={{
            fontFamily: "var(--font-hand)",
            transform: "rotate(-8deg) translateX(8px)",
          }}
        >
          Built to convert
        </p>
        <svg
          viewBox="0 0 120 140"
          fill="none"
          className="-mt-1 mr-2 h-[130px] w-[100px] text-[var(--c-ink)]"
          style={{ opacity: 0.28 }}
        >
          <path
            d="M92 12 C88 36, 82 58, 68 78 C54 98, 36 112, 14 128"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
          <path
            d="M8 124 L14 132 L22 122"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

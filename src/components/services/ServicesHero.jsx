import heroSystems from "../../assets/generated/services-hero-systems.webp";

/**
 * Compact services opener — type over layered image. No CTAs.
 * Lanes below own the next action.
 */
export default function ServicesHero() {
  return (
    <section className="mt-12 relative overflow-hidden border-b border-[var(--c-border)] pt-[calc(var(--hero-header-offset)+1.5rem)] pb-10 sm:pb-12 lg:pb-14">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <img
          src={heroSystems}
          alt=""
          width={1280}
          height={853}
          className="h-full w-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/88 to-white" />
        <div className="absolute inset-0 backdrop-blur-[1.5px]" />
      </div>

      <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-pad)]">
        <h1 className="max-w-3xl font-sans text-[clamp(2.15rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[var(--c-ink)] text-balance">
          Services built as{" "}
          <span className="text-[var(--c-accent)]">systems</span>
        </h1>
        <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-[var(--c-text-secondary)]">
          Choose a lane. Compare what you need.
        </p>
      </div>
    </section>
  );
}

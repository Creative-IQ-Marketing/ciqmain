import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FadeUp from "../primitives/FadeUp";

gsap.registerPlugin(useGSAP);

const logoModules = import.meta.glob("../../assets/transparent/*.webp", {
  eager: true,
});

const clients = Object.entries(logoModules).map(([path, mod], index) => ({
  id: index + 1,
  src: mod.default,
  alt: `CreativeIQ client partner logo ${index + 1}`,
}));

export default function Clients() {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        const track = trackRef.current;
        if (!track) return;
        const tween = gsap.to(track, {
          xPercent: -50,
          duration: 38,
          ease: "none",
          repeat: -1,
        });
        const pause = () => tween.pause();
        const play = () => tween.play();
        sectionRef.current?.addEventListener("mouseenter", pause);
        sectionRef.current?.addEventListener("mouseleave", play);
        return () => {
          sectionRef.current?.removeEventListener("mouseenter", pause);
          sectionRef.current?.removeEventListener("mouseleave", play);
        };
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <FadeUp
      as="section"
      ref={sectionRef}
      className="relative overflow-hidden border-y border-[var(--c-border)] bg-[var(--c-base)] py-10 sm:py-12"
      aria-label="Trusted by"
    >
      <div className="mx-auto mb-8 flex max-w-[var(--container-max)] items-end justify-between gap-6 px-[var(--container-pad)]">
        <p className="font-sans text-sm font-medium text-[var(--c-text-muted)]">
          Trusted by operators across healthcare, law, real estate, and professional services
        </p>
        <span className="hidden font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--c-accent)] sm:block">
          {clients.length}+ partners
        </span>
      </div>

      <div className="relative hidden overflow-hidden md:block">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent lg:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent lg:w-40" />
        <div ref={trackRef} className="flex w-max items-center gap-16 px-10 will-change-transform">
          {[...clients, ...clients].map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="flex h-16 w-40 shrink-0 items-center justify-center opacity-45 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-20 sm:w-48"
            >
              <img
                src={client.src}
                alt={client.alt}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 px-6 md:hidden">
        {clients.slice(0, 6).map((client) => (
          <div
            key={client.id}
            className="flex h-14 items-center justify-center opacity-50 grayscale"
          >
            <img
              src={client.src}
              alt={client.alt}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </FadeUp>
  );
}

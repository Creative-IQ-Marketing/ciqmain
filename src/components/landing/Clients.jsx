import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FadeUp from "../primitives/FadeUp";

gsap.registerPlugin(useGSAP);

const logoModules = import.meta.glob("../../assets/transparent/*.webp");

const CLIENTS = {
  1: { name: "United Construct, Clean, Restore" },
  2: { name: "Love Your Life" },
  3: { name: "Aggie 100", href: "https://aggie100.com" },
  4: { name: "Lawtina Network" },
  6: { name: "Twinkle" },
  7: { name: "K-Aesthetic Skin", href: "https://k-aesthetic.skin" },
  8: { name: "N Zone Sports Centex", href: "https://nzonesports.com/centex" },
  9: { name: "Go Play Sports" },
  10: { name: "Morales Padia Law", href: "https://moralespadialaw.com" },
  11: {
    name: "Tricounty Interior Services",
    href: "https://tricountyinterior.com",
  },
  12: { name: "JR Real Estate" },
  13: { name: "Lone Star Capital Bank" },
  14: {
    name: "Clear Integrity Group",
    href: "https://www.clearintegritygroup.com",
  },
  15: { name: "TEAMability Two-Step Gala", href: "https://teamability.org" },
  16: {
    name: "FYZICAL Therapy & Balance Centers",
    href: "https://www.fyzical.com",
  },
  17: { name: "FF" },
  18: { name: "ABC Healthcare Revenue Consulting & Auditing" },
  19: {
    name: "Evolve Human Optimization Labs",
    href: "https://www.evolvehumanlabs.com",
  },
  20: { name: "TEAMability", href: "https://teamability.org" },
  21: { name: "Viago" },
  22: { name: "META Consultants" },
  23: {
    name: "Cosmetic Dentistry of San Antonio",
    href: "https://cosmeticdentistryofsa.com",
  },
  24: { name: "South Texas Business Partnership" },
  25: {
    name: "DEBS — Diversified Employee Benefit Services",
    href: "https://debsinsurance.com",
  },
  26: {
    name: "San Antonio Dominion Rotary",
    href: "https://dominionrotarysatx.com",
  },
  27: { name: "TX Arborist", href: "https://tx-arborist.com" },
  29: { name: "Key Partner Network" },
  30: {
    name: "Blackstone Claim Services",
    href: "https://blackstoneclaimservices.com",
  },
};

function ClientLogo({ client, className }) {
  const img = (
    <img
      src={client.src}
      alt={client.alt}
      className="max-h-full max-w-full object-contain"
      loading="lazy"
    />
  );
  if (!client.href) return <div className={className}>{img}</div>;
  return (
    <a
      href={client.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${client.name} (opens in a new tab)`}
      className={`${className} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--c-accent)]`}
    >
      {img}
    </a>
  );
}

export default function Clients() {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      Object.entries(logoModules).map(async ([path, loader], index) => {
        const mod = await loader();
        const num = Number(path.match(/\((\d+)\)\.webp$/)?.[1] ?? 0);
        const info = CLIENTS[num];
        return {
          id: index + 1,
          src: mod.default,
          name: info?.name,
          href: info?.href,
          alt: info
            ? `${info.name} logo`
            : `CreativeIQ client partner logo ${index + 1}`,
        };
      }),
    ).then((list) => {
      if (!cancelled) setClients(list);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useGSAP(
    () => {
      if (!clients.length) return undefined;
      const mm = gsap.matchMedia();
      mm.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
        () => {
          const track = trackRef.current;
          if (!track) return;
          const tween = gsap.to(track, {
            xPercent: -50,
            // ~3.4s per logo (was ~1.6s): slow enough to read each name.
            duration: clients.length * 3.4,
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
        },
      );
      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [clients.length], revertOnUpdate: true },
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
          Trusted by operators across healthcare, law, real estate, and
          professional services
        </p>
        <span className="hidden font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--c-accent)] sm:block">
          {clients.length}+ brands
        </span>
      </div>

      <div className="relative hidden overflow-hidden md:block">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent lg:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent lg:w-40" />
        <div
          ref={trackRef}
          className="flex w-max items-center gap-16 px-10 will-change-transform"
        >
          {[...clients, ...clients].map((client, index) => (
            <ClientLogo
              key={`${client.id}-${index}`}
              client={client}
              className={`flex h-16 w-40 shrink-0 items-center justify-center opacity-45 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 focus-visible:opacity-100 focus-visible:grayscale-0 sm:h-20 sm:w-48 ${client.href ? "cursor-pointer" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 px-6 md:hidden">
        {clients.slice(0, 6).map((client) => (
          <ClientLogo
            key={client.id}
            client={client}
            className="flex h-14 items-center justify-center opacity-50 grayscale"
          />
        ))}
      </div>
    </FadeUp>
  );
}

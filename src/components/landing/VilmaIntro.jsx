import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../primitives/Reveal";
import vilmaCreative from "../../assets/vilma/vilma-creative.webp";
import vilmaWork from "../../assets/vilma/vilma-bw-work.webp";
import vilmaCreativeSm from "../../assets/vilma/vilma-creative-sm.webp";
import vilmaWorkSm from "../../assets/vilma/vilma-bw-work-sm.webp";
import { trackButtonClick } from "../../services/analytics";

const PORTRAITS_SM = [
  {
    src: vilmaCreativeSm,
    alt: "Vilma Tovar, Founder and CEO of CreativeIQ",
  },
  {
    src: vilmaWorkSm,
    alt: "Vilma Tovar speaking and leading CreativeIQ work",
  },
];

const PORTRAITS = [
  {
    src: vilmaCreative,
    alt: "Vilma Tovar, Founder and CEO of CreativeIQ",
  },
  {
    src: vilmaWork,
    alt: "Vilma Tovar speaking and leading CreativeIQ work",
  },
];

function Crossfade({
  portraits,
  index,
  className,
  objectPosition = "center 18%",
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {portraits.map((portrait, i) => (
        <motion.img
          key={portrait.src}
          src={portrait.src}
          alt={i === index ? portrait.alt : ""}
          initial={false}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition }}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
      ))}
    </div>
  );
}

export default function VilmaIntro() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % PORTRAITS.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <section
      aria-label="About Vilma Tovar"
      className="relative overflow-hidden border-b border-[var(--c-border)] bg-white"
    >
      {/* Mobile — flex row with photo + short bio */}
      <div className="mx-auto flex max-w-[var(--container-max)] items-start gap-4 px-[var(--container-pad)] py-6 md:hidden">
        <Crossfade
          portraits={PORTRAITS_SM}
          index={index}
          className="size-[4.5rem] shrink-0 rounded-[1.15rem] bg-[var(--c-surface-2)]"
          objectPosition="center 15%"
        />
        <div className="min-w-0 flex-1">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--c-accent)]">
            Founder
          </p>
          <p className="mt-0.5 font-sans text-base font-bold tracking-[-0.02em] text-[var(--c-ink)]">
            Vilma Tovar
          </p>
          <p className="mt-1.5 font-sans text-[13px] leading-snug text-[var(--c-text-secondary)]">
            AI strategist and growth consultant building systems that earn
            trust.
          </p>
          <Link
            to="/about/vilma"
            onClick={() =>
              trackButtonClick("About Vilma", "vilma_intro_cta", "VilmaIntro")
            }
            className="mt-2 inline-flex items-center gap-1 font-sans text-sm font-semibold text-[var(--c-accent)]"
          >
            About
            <ArrowUpRight className="size-3.5" strokeWidth={1.75} aria-hidden />
          </Link>
        </div>
      </div>

      {/* Desktop — shorter splash band, stronger image */}
      <div className="relative hidden md:block">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-[55%] lg:w-[50%]"
          aria-hidden
        >
          <Crossfade
            portraits={PORTRAITS}
            index={index}
            className="absolute inset-0 h-full w-full"
            objectPosition="center 18%"
          />
          {/* Lighter wash so she reads clearly */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/45 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-pad)] py-9 lg:py-11">
          <Reveal className="max-w-md">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--c-accent)]">
              Founder
            </p>
            <h2 className="mt-1.5 font-sans text-[clamp(1.45rem,2.4vw,1.9rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--c-ink)] text-balance">
              Led by Vilma Tovar
            </h2>
            <p className="mt-2.5 font-sans text-sm leading-relaxed text-[var(--c-text-secondary)]">
              AI strategist, speaker, and growth consultant building marketing
              systems that earn trust from customers and intelligent platforms.
            </p>
            <Link
              to="/about/vilma"
              onClick={() =>
                trackButtonClick("About Vilma", "vilma_intro_cta", "VilmaIntro")
              }
              className="mt-4 inline-flex items-center gap-2 font-sans text-sm font-semibold text-[var(--c-accent)] transition hover:text-[#2f5fd9]"
            >
              About Vilma
              <ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

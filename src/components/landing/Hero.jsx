import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { trackButtonClick } from "../../services/analytics";
import { Button } from "../ui/button";
import HeroArcGallery from "./HeroArcGallery";
import HeroMobileGallery from "./HeroMobileGallery";
import HeroDecorations from "./HeroDecorations";

gsap.registerPlugin(useGSAP);

const ROTATING_PHRASES = [
  "Does your business appear?",
  "Does AI recommend your company?",
  "Is your website optimized for search?",
  "Do you have Schema Mapping?",
  "Does Google know your services?",
  "Are visitors converting to leads?",
  "Can you compete with AI search?",
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

export default function Hero() {
  const rootRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const [typedText, setTypedText] = useState(
    reducedMotion ? ROTATING_PHRASES[0] : "",
  );
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setTypedText(ROTATING_PHRASES[0]);
      return undefined;
    }

    const currentPhrase = ROTATING_PHRASES[phraseIndex];
    let timeoutId;

    if (!isDeleting && typedText === currentPhrase) {
      timeoutId = setTimeout(() => setIsDeleting(true), 1400);
      return () => clearTimeout(timeoutId);
    }

    if (isDeleting && typedText === "") {
      timeoutId = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
      }, 240);
      return () => clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(
      () => {
        const next = isDeleting
          ? currentPhrase.slice(0, Math.max(typedText.length - 1, 0))
          : currentPhrase.slice(0, typedText.length + 1);
        setTypedText(next);
      },
      isDeleting ? 42 : 76,
    );

    return () => clearTimeout(timeoutId);
  }, [typedText, isDeleting, phraseIndex, reducedMotion]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          motionOk: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions;
          if (reduceMotion) {
            gsap.set(
              [
                ".hero-line",
                ".hero-accent",
                ".hero-probe",
                ".hero-support",
                ".hero-ctas",
                ".hero-decor",
                ".hero-gallery-wrap",
              ],
              { autoAlpha: 1, y: 0, rotateX: 0 },
            );
            return;
          }

          // Headline (.hero-line / .hero-accent) paints immediately for LCP text.
          gsap.set([".hero-probe", ".hero-support", ".hero-ctas"], {
            autoAlpha: 0,
            y: 18,
          });
          gsap.set(".hero-decor", { autoAlpha: 0 });
          gsap.set(".hero-gallery-wrap", { autoAlpha: 0, y: 28 });

          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
          });

          tl.to(".hero-probe", { autoAlpha: 1, y: 0, duration: 0.7 }, 0.15)
            .to(".hero-support", { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.5")
            .to(".hero-ctas", { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.45")
            .to(".hero-decor", { autoAlpha: 1, duration: 0.8 }, "-=0.55")
            .to(
              ".hero-gallery-wrap",
              { autoAlpha: 1, y: 0, duration: 1 },
              "-=0.55",
            );
        },
        rootRef,
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="relative flex flex-col overflow-x-clip bg-[var(--c-base)] pb-6 pt-[var(--hero-header-offset)] lg:min-h-[100dvh] lg:pb-2"
    >
      <div className="relative z-10 mx-auto w-full max-w-4xl flex-1 px-4 pt-5 text-center sm:px-6 sm:pt-7 lg:max-w-[920px] lg:pt-8 lg:pb-2">
        <h1 className="relative font-sans text-[clamp(2.25rem,8.5vw,4.75rem)] font-extrabold leading-[1.06] tracking-[-0.035em] text-[var(--c-ink)] text-balance">
          <span className="hero-line hero-line-a block">Built to Rank.</span>
          <span className="hero-line hero-line-b mt-[0.08em] block">
            Designed to{" "}
            <span className="hero-accent relative inline-block text-[var(--c-accent)] italic [font-synthesis:none]">
              Convert.
              {/* Mobile/tablet: skip; desktop uses HeroDecorations */}
            </span>
          </span>
        </h1>

        <p
          className="hero-probe mx-auto mt-3 min-h-[1.4em] font-sans text-[15px] font-medium leading-normal text-[var(--c-text-muted)]"
          aria-live="polite"
        >
          {typedText}
          {!reducedMotion ? (
            <span className="ml-0.5 text-[#bbb]" aria-hidden>
              |
            </span>
          ) : null}
        </p>

        <p className="hero-support mx-auto mt-3 max-w-[34rem] font-sans text-base font-normal leading-relaxed text-[var(--c-text-secondary)] text-pretty">
          One team for SEO, social, content, and websites. Systems that turn
          attention into revenue.
        </p>

        <div className="hero-ctas mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-7">
          <Button asChild>
            <Link
              to="/contact"
              onClick={() =>
                trackButtonClick("Start a project", "hero_cta", "Hero")
              }
            >
              Start a project
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link
              to="/free-ai-seo-audit"
              onClick={() => trackButtonClick("Free Audit", "hero_cta", "Hero")}
            >
              Audit my site
            </Link>
          </Button>
        </div>

        <HeroMobileGallery reducedMotion={reducedMotion} />
      </div>

      <div className="hero-gallery-wrap mt-auto">
        <HeroArcGallery reducedMotion={reducedMotion} />
      </div>
    </section>
  );
}

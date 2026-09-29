import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { trackButtonClick } from "../../services/analytics";
import { Button } from "../ui/button";

const HeroArcGallery = lazy(() => import("./HeroArcGallery"));
const HeroMobileGallery = lazy(() => import("./HeroMobileGallery"));

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
  const reducedMotion = usePrefersReducedMotion();
  const [typedText, setTypedText] = useState(
    reducedMotion ? ROTATING_PHRASES[0] : ROTATING_PHRASES[0],
  );
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingReady, setTypingReady] = useState(false);

  // Defer typing animation until after first paint / idle (LCP = headline text).
  useEffect(() => {
    if (reducedMotion) return undefined;
    const start = () => setTypingReady(true);
    const idle =
      typeof requestIdleCallback === "function"
        ? requestIdleCallback(start, { timeout: 2500 })
        : setTimeout(start, 1200);
    return () => {
      if (typeof cancelIdleCallback === "function") cancelIdleCallback(idle);
      else clearTimeout(idle);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !typingReady) return undefined;

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
  }, [typedText, isDeleting, phraseIndex, reducedMotion, typingReady]);

  return (
    <section className="relative flex flex-col overflow-x-clip bg-[var(--c-base)] pb-6 pt-[var(--hero-header-offset)] lg:min-h-[100dvh] lg:pb-2">
      <div className="relative z-10 mx-auto w-full max-w-4xl flex-1 px-4 pt-5 text-center sm:px-6 sm:pt-7 lg:max-w-[920px] lg:pt-8 lg:pb-2">
        <h1 className="relative font-sans text-[clamp(2.25rem,8.5vw,4.75rem)] font-extrabold leading-[1.06] tracking-[-0.035em] text-[var(--c-ink)] text-balance">
          <span className="block">Built to Rank.</span>
          <span className="mt-[0.08em] block">
            Designed to{" "}
            <span className="relative inline-block text-[var(--c-accent)] italic [font-synthesis:none]">
              Convert.
            </span>
          </span>
        </h1>

        <p
          className="mx-auto mt-3 min-h-[1.4em] font-sans text-[15px] font-medium leading-normal text-[var(--c-text-muted)]"
          aria-live="polite"
        >
          {typedText}
          {!reducedMotion ? (
            <span className="ml-0.5 text-[#bbb]" aria-hidden>
              |
            </span>
          ) : null}
        </p>

        <p className="mx-auto mt-3 max-w-[34rem] font-sans text-base font-normal leading-relaxed text-[var(--c-text-secondary)] text-pretty">
          One team for SEO, social, content, and websites. Systems that turn
          attention into revenue.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-7">
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

        <Suspense fallback={null}>
          <HeroMobileGallery reducedMotion={reducedMotion} />
        </Suspense>
      </div>

      <div className="mt-auto">
        <Suspense fallback={null}>
          <HeroArcGallery reducedMotion={reducedMotion} />
        </Suspense>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { trackButtonClick } from "../../services/analytics";
import HeroArcGallery from "./HeroArcGallery";
import HeroMobileGallery from "./HeroMobileGallery";
import HeroDecorations from "./HeroDecorations";

const ROTATING_PHRASES = [
  "Does your business appear?",
  "Does AI recommend your company?",
  "Is your website optimized for search?",
  "Do you have Schema Mapping?",
  "Does Google know your services?",
  "Are visitors converting to leads?",
  "Can you compete with AI search?",
];

export default function Hero() {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
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
  }, [typedText, isDeleting, phraseIndex]);

  return (
    <section className="relative flex flex-col overflow-x-clip bg-white pb-8 pt-[var(--hero-header-offset)] lg:min-h-dvh lg:pb-4">
      <HeroDecorations />

      <div className="relative z-10 mx-auto w-full max-w-4xl flex-1 px-4 pt-5 text-center sm:px-6 sm:pt-7 lg:max-w-[920px] lg:pt-8">
        <h1 className="font-sans text-[clamp(2.25rem,9vw,5rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-[#0f0f0f]">
          Built to Rank.
          <br />
          Designed to <span className="text-[#3B6FF0]">Convert.</span>
        </h1>

        <p className="mx-auto mt-3 min-h-[1.4em] font-sans text-[15px] font-normal leading-normal text-[#737373]">
          {typedText}
          <span className="text-[#bbb]">|</span>
        </p>

        <p className="mx-auto mt-2.5 max-w-[620px] font-sans text-base font-normal leading-relaxed text-[#5c5c5c]">
          SEO, social, content, and websites — one team building systems that
          turn attention into revenue.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-7">
          <button
            type="button"
            onClick={() => {
              trackButtonClick("Start a project", "hero_cta", "Hero");
              navigate("/contact");
            }}
            className="inline-flex items-center justify-center rounded-full bg-[#18181b] px-7 py-3 font-sans text-[15px] font-semibold text-white transition hover:bg-[#2a2a2a] sm:px-8"
          >
            Start a project
          </button>
          <button
            type="button"
            onClick={() => {
              trackButtonClick("Free Audit", "hero_cta", "Hero");
              navigate("/free-ai-seo-audit");
            }}
            className="inline-flex items-center justify-center rounded-full border border-[#d4d4d4] bg-white px-7 py-3 font-sans text-[15px] font-medium text-[#252525] transition hover:border-[#aaa] sm:px-8"
          >
            Audit my site
          </button>
        </div>

        <HeroMobileGallery />
      </div>

      <HeroArcGallery />
    </section>
  );
}

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SEO from "../components/SEO";
import { SignalButton } from "../components/signal/primitives";
import { CrescentMark } from "../components/layout/PageHeader";
import { trackButtonClick } from "../services/analytics";
import vilmaCover from "../assets/vilma/vilma-bw-work-xl.webp";
import vilmaLife from "../assets/vilma/vilma-lifestyle.webp";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const METHOD = [
  ["SEO & AEO", "Be found — and be the answer engines quote."],
  ["Neuromarketing", "Design for how people actually think, feel and decide."],
  ["AI ecosystems", "Structured so machines understand and recommend you."],
  ["CRM automation", "Follow-up that never forgets, never sleeps."],
  ["Brand & web", "Sites that remove doubt instead of adding noise."],
  ["Growth strategy", "One stack, measured plainly, compounding monthly."],
];

const COMMUNITY = [
  ["Dominion Rotary Club", "Chair", "Supporting community initiatives and professional development across San Antonio."],
  ["Student mentorship", "Mentor", "High school and undergraduate students through Hallmark University, Harmony Public Schools and Texas A&M programs."],
  ["Public speaking", "Speaker", "Entrepreneurship, AI, neuromarketing, digital strategy and leadership at universities and business forums."],
  ["Regional networks", "Member", "Key Partner Networking Group, South Texas Business Partnership and Stone Oak business organizations."],
];

const MANIFESTO =
  "Marketing is not about getting attention. It is about *earning* *trust.*";

export default function AboutVilmaPage() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Cover: portrait settles, masthead + name rise.
        gsap
          .timeline({ delay: 0.2 })
          .fromTo("[data-cover-img]", { scale: 1.25, filter: "brightness(0.4)" }, { scale: 1.06, filter: "brightness(1)", duration: 2.4, ease: "expo.out" })
          .from("[data-cover-name] .s-word", { yPercent: 110, duration: 1.5, stagger: 0.1, ease: "expo.out" }, 0.3)
          .from("[data-cover-fade]", { autoAlpha: 0, y: 16, duration: 1, stagger: 0.08, ease: "expo.out" }, 0.8);
        gsap.to("[data-cover-img]", {
          yPercent: 14,
          ease: "none",
          scrollTrigger: { trigger: "[data-cover]", start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-cover-name]", {
          yPercent: -35,
          ease: "none",
          scrollTrigger: { trigger: "[data-cover]", start: "top top", end: "bottom top", scrub: true },
        });

        // Manifesto words light up.
        gsap.fromTo(
          "[data-mw]",
          { opacity: 0.1 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: "[data-manifesto]", start: "top 75%", end: "bottom 50%", scrub: 0.5 },
          },
        );

        // Chapter rises.
        gsap.utils.toArray("[data-rise-block]").forEach((el) => {
          gsap.from(el.querySelectorAll("[data-r]"), {
            autoAlpha: 0,
            y: 40,
            duration: 1.1,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
          });
        });

        // Human chapter: portrait opens like a door.
        gsap.fromTo(
          "[data-life]",
          { clipPath: "inset(0% 50% 0% 50%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.inOut",
            scrollTrigger: { trigger: "[data-life]", start: "top 85%", end: "top 25%", scrub: 0.8 },
          },
        );
        gsap.fromTo(
          "[data-life] img",
          { scale: 1.3 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: "[data-life]", start: "top bottom", end: "bottom top", scrub: true } },
        );

        // Signature writes itself.
        const sig = root.current.querySelector("[data-sig]");
        if (sig) {
          gsap.fromTo(
            sig,
            { strokeDashoffset: 1400 },
            {
              strokeDashoffset: 0,
              duration: 3,
              ease: "power2.inOut",
              scrollTrigger: { trigger: sig, start: "top 85%", once: true },
            },
          );
          gsap.to("[data-sig-fill]", {
            fillOpacity: 1,
            duration: 1.2,
            delay: 2.4,
            scrollTrigger: { trigger: sig, start: "top 85%", once: true },
          });
        }
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-sig-fill]", { fillOpacity: 1 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <main ref={root} className="s-dark">
      <SEO
        title="About Vilma Tovar | Founder & CEO of CreativeIQ"
        description="Vilma Tovar is Founder and CEO of CreativeIQ Marketing. AI strategist, speaker, and growth consultant building trust-first digital ecosystems."
        keywords="Vilma Tovar, CreativeIQ founder, AI marketing strategist, neuromarketing, San Antonio entrepreneur"
        canonical="https://creativeiqmarketing.com/about/vilma"
      />

      {/* ── Cover ─────────────────────────────────────────── */}
      <section data-cover className="relative h-[100svh] min-h-[680px] overflow-hidden">
        <img
          data-cover-img
          src={vilmaCover}
          alt="Vilma Tovar, Founder and CEO of CreativeIQ, reviewing work on her phone"
          className="absolute inset-0 h-full w-full object-cover object-[58%_28%]"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(6,7,10,0.65)] via-[rgba(6,7,10,0.05)] to-[var(--s-ink)]" />

        <div className="relative flex h-full flex-col pt-[calc(var(--hero-header-offset)+1.5rem)]">
          <div data-cover-fade className="s-container flex items-start justify-between border-b border-[var(--s-line-strong)] pb-3">
            <span className="s-label text-[var(--s-paper-dim)]">CIQ Journal — Issue 01</span>
            <span className="s-label hidden text-[var(--s-paper-dim)] sm:inline">The Founder</span>
            <span className="s-label text-[var(--s-paper-dim)]">San Antonio, TX</span>
          </div>

          <div className="s-container mt-8 grid gap-6 sm:grid-cols-2">
            <p data-cover-fade className="s-didone max-w-[16rem] text-[1.15rem] leading-snug text-[var(--s-paper)]">
              From her father&rsquo;s shop to AI search — <span className="s-serif text-[var(--s-signal-hot)]">a decade of earning trust.</span>
            </p>
            <p data-cover-fade className="s-label max-w-[14rem] text-[var(--s-paper-dim)] sm:justify-self-end sm:text-right">
              Neuromarketing · AI ecosystems · Speaker · Mentor
            </p>
          </div>

          <h1 data-cover-name className="s-container mt-auto pb-[calc(var(--site-mobile-banner-height)+1.5rem)] leading-[0.82] lg:pb-8">
            <span className="s-word-mask">
              <span className="s-word s-display block text-[clamp(5rem,19vw,19rem)] text-[var(--s-paper)]">Vilma</span>
            </span>
            <span className="s-word-mask -mt-[0.1em] block text-right">
              <span className="s-word s-serif block text-[clamp(5rem,19vw,19rem)] text-[var(--s-signal)]">Tovar</span>
            </span>
            <span className="sr-only">, Founder and CEO of CreativeIQ</span>
          </h1>
        </div>
      </section>

      {/* ── Chapter I: Origin ─────────────────────────────── */}
      <section data-rise-block className="s-container grid gap-10 py-[clamp(5rem,10vw,9rem)] lg:grid-cols-[0.35fr_1fr]">
        <div data-r className="lg:sticky lg:top-32 lg:self-start">
          <p className="s-label text-[var(--s-signal)]">Chapter I</p>
          <p className="s-serif mt-2 text-[clamp(3rem,6vw,5.5rem)] leading-none text-[var(--s-paper)]">Origin</p>
        </div>
        <div className="max-w-3xl">
          <p data-r className="text-[clamp(1.5rem,2.6vw,2.4rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[var(--s-paper)]">
            Marketing started as necessity. <span className="s-serif text-[var(--s-signal)]">It became a craft.</span>
          </p>
          <p data-r className="mt-10 text-[1.08rem] leading-[1.8] text-[var(--s-paper-dim)]">
            <span className="s-didone float-left mr-3 mt-2 text-[5.2rem] leading-[0.7] text-[var(--s-signal)]">A</span>
            s a teenager, Vilma helped market her father&apos;s business when advertising budgets were limited. Without paid
            media to lean on, she became obsessed with how people searched, how trust was built online, and how businesses
            could earn customers organically.
          </p>
          <p data-r className="mt-6 text-[1.08rem] leading-[1.8] text-[var(--s-paper-dim)]">
            She taught herself SEO, website optimization and social media years before many small businesses understood their
            importance. Those early years became the foundation of CreativeIQ.
          </p>
        </div>
      </section>

      {/* ── Manifesto ─────────────────────────────────────── */}
      <section data-manifesto className="relative overflow-hidden border-y border-[var(--s-line)] py-[clamp(5rem,12vw,11rem)]">
        <div className="pointer-events-none absolute -right-24 top-1/2 w-[40rem] -translate-y-1/2 opacity-40" aria-hidden>
          <CrescentMark className="h-auto w-full" />
        </div>
        <div className="s-container relative">
          <p className="s-label text-[var(--s-paper-ghost)]">Her philosophy</p>
          <p className="mt-8 max-w-[16ch] text-[clamp(2.6rem,6.4vw,6.8rem)] font-semibold leading-[1] tracking-[-0.05em] text-[var(--s-paper)]">
            {MANIFESTO.split(" ").map((w, i) => {
              const serif = w.startsWith("*");
              return (
                <span key={i} data-mw className={serif ? "s-serif font-normal text-[var(--s-signal)]" : undefined}>
                  {w.replace(/\*/g, "")}{" "}
                </span>
              );
            })}
          </p>
          <div className="mt-14 grid max-w-4xl gap-8 md:grid-cols-2">
            <p className="leading-[1.8] text-[var(--s-paper-dim)]">
              That philosophy is rooted in neuromarketing: how people think, feel, remember and decide. Every website, ad,
              video, landing page, email and customer interaction either builds confidence or creates friction.
            </p>
            <p className="leading-[1.8] text-[var(--s-paper-dim)]">
              Rather than guesswork, Vilma combines psychology, behavioral science and data-driven marketing to design journeys
              that feel intuitive. Successful businesses don&rsquo;t manipulate people. They remove uncertainty.
            </p>
          </div>
        </div>
      </section>

      {/* ── Chapter II: Method ────────────────────────────── */}
      <section data-rise-block className="s-container py-[clamp(5rem,10vw,9rem)]">
        <div data-r className="flex items-end justify-between gap-6">
          <div>
            <p className="s-label text-[var(--s-signal)]">Chapter II</p>
            <p className="s-serif mt-2 text-[clamp(3rem,6vw,5.5rem)] leading-none text-[var(--s-paper)]">The method</p>
          </div>
          <p className="hidden max-w-xs text-right text-[var(--s-paper-dim)] md:block">
            Understood by humans and intelligent systems — one ecosystem, not a pile of tools.
          </p>
        </div>
        <ol className="mt-14 border-t border-[var(--s-line)]">
          {METHOD.map(([t, b], i) => (
            <li
              key={t}
              data-r
              className="group relative grid grid-cols-[2.5rem_1fr] items-baseline gap-4 overflow-hidden border-b border-[var(--s-line)] py-6 sm:grid-cols-[4rem_1fr_1fr] sm:py-8"
            >
              <span
                className="absolute inset-0 origin-bottom scale-y-0 bg-[var(--s-signal)] transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-y-100"
                aria-hidden
              />
              <span className="s-mono relative text-[12px] text-[var(--s-signal)] transition-colors duration-500 group-hover:text-[var(--s-ink)]">
                0{i + 1}
              </span>
              <span className="s-display relative text-[clamp(2rem,5vw,4.6rem)] text-[var(--s-paper)] transition-[color,transform] duration-700 group-hover:translate-x-3 group-hover:text-[var(--s-ink)]">
                {t}
              </span>
              <span className="relative col-start-2 max-w-sm text-[15px] leading-relaxed text-[var(--s-paper-dim)] transition-colors duration-500 group-hover:text-[var(--s-ink)] sm:col-start-auto sm:justify-self-end sm:text-right">
                {b}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Chapter III: Human ────────────────────────────── */}
      <section data-rise-block className="s-container grid items-center gap-12 pb-[clamp(5rem,10vw,9rem)] lg:grid-cols-[0.9fr_1.1fr]">
        <div data-life className="relative aspect-[3/4] overflow-hidden rounded-[24px]">
          <img
            src={vilmaLife}
            alt="Vilma Tovar lifting her baby outside a brasserie in San Antonio"
            className="h-full w-full object-cover object-[60%_30%]"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div>
          <p data-r className="s-label text-[var(--s-signal)]">Chapter III</p>
          <p data-r className="s-serif mt-2 text-[clamp(3rem,6vw,5.5rem)] leading-none text-[var(--s-paper)]">
            The person
          </p>
          <p data-r className="mt-8 text-[clamp(1.3rem,2vw,1.75rem)] font-medium leading-[1.3] tracking-[-0.03em] text-[var(--s-paper)]">
            Community service, mentorship and athletics shaped how Vilma leads: with resilience, responsibility and a bias
            toward systems that hold up under pressure.
          </p>
          <dl data-r className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[var(--s-line)]">
            {[
              ["NCAA", "Collegiate soccer"],
              ["Rugby", "Univ. of Mary Washington"],
              ["Chair", "Dominion Rotary Club"],
              ["10+ yrs", "Building growth ecosystems"],
            ].map(([k, v]) => (
              <div key={k} className="bg-[var(--s-ink)] p-5">
                <dt className="s-didone text-[1.9rem] leading-none text-[var(--s-paper)]">{k}</dt>
                <dd className="s-label mt-2 text-[var(--s-paper-ghost)]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Community ─────────────────────────────────────── */}
      <section data-rise-block className="border-t border-[var(--s-line)]">
        <div className="s-container py-[clamp(4rem,8vw,7rem)]">
          <p data-r className="s-label text-[var(--s-paper-ghost)]">Leadership beyond the agency</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {COMMUNITY.map(([t, role, b]) => (
              <article
                key={t}
                data-r
                className="group rounded-[22px] border border-[var(--s-line)] bg-[var(--s-ink-2)] p-7 transition-colors duration-500 hover:border-[var(--s-signal)]"
              >
                <p className="s-label text-[var(--s-signal)]">{role}</p>
                <h2 className="mt-4 text-[1.6rem] font-semibold tracking-[-0.035em] text-[var(--s-paper)]">{t}</h2>
                <p className="mt-3 leading-relaxed text-[var(--s-paper-dim)]">{b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sign-off ──────────────────────────────────────── */}
      <section className="s-container border-t border-[var(--s-line)] py-[clamp(5rem,10vw,9rem)] text-center">
        <p className="s-label text-[var(--s-paper-ghost)]">With intention,</p>
        <svg viewBox="0 0 900 220" className="mx-auto mt-4 h-auto w-full max-w-3xl" aria-label="Vilma">
          <text
            data-sig
            data-sig-fill
            x="50%"
            y="72%"
            textAnchor="middle"
            className="s-serif"
            style={{ fontSize: 210, fontFamily: "var(--f-serif)", fontStyle: "italic" }}
            fill="var(--s-signal)"
            fillOpacity="0"
            stroke="var(--s-signal)"
            strokeWidth="1.4"
            strokeDasharray="1400"
            strokeDashoffset="0"
          >
            Vilma
          </text>
        </svg>
        <p className="mx-auto mt-6 max-w-lg text-[var(--s-paper-dim)]">
          Resilience and responsibility shape how Vilma leads CreativeIQ. That standard shows up in every engagement.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <SignalButton to="/about/creativeiq" onClick={() => trackButtonClick("About CreativeIQ", "vilma_cta", "AboutVilma")}>
            About CreativeIQ
          </SignalButton>
        </div>
      </section>
    </main>
  );
}

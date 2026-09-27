import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Eyebrow, RiseOnView, SplitWords } from "../signal/primitives";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STATS = [
  { value: 120, suffix: "+", decimals: 0, label: "Businesses served", note: "healthcare · law · real estate · pro services" },
  { value: 3.4, suffix: "×", decimals: 1, label: "Average traffic growth", note: "measured across retained SEO clients" },
  { value: 98, suffix: "%", decimals: 0, label: "Client retention", note: "people stay when the numbers move" },
  { value: 50, suffix: "+", decimals: 0, label: "Custom systems shipped", note: "sites, funnels, CRMs, automations" },
];

const QUOTES = [
  { q: "Partnering with the CreativeIQ team has been a game changer for my business.", n: "Kassandra Ramirez", r: "Business Owner" },
  { q: "I have not only made more leads but also learned more about marketing.", n: "Jonathan Barragan", r: "Local Guide / Client" },
  { q: "This company has gone way beyond my expectations. Extremely friendly and very knowledgeable.", n: "Arnold Rodriguez", r: "Client" },
  { q: "They have gone above and beyond to scale businesses' digital presence and produce tangible results.", n: "Roderick Murdock", r: "Local Guide / Client" },
  { q: "Super friendly, easy to work with, and really knows her stuff.", n: "Fernando Jesus", r: "Entrepreneur" },
  { q: "We had a website created that was done quickly and efficiently. Great job, Vilma.", n: "Roger Guerrero", r: "Client" },
  { q: "Very smart and hard working company that cares about their customers.", n: "Miguel Febus", r: "Client" },
];

const logoModules = import.meta.glob("../../assets/transparent/*.webp");

function Logos() {
  const [logos, setLogos] = useState([]);
  useEffect(() => {
    let off = false;
    Promise.all(Object.values(logoModules).map((l) => l().then((m) => m.default))).then((list) => {
      if (!off) setLogos(list);
    });
    return () => {
      off = true;
    };
  }, []);
  if (!logos.length) return <div className="h-24" />;
  return (
    <div className="relative overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className="s-marquee items-center" style={{ "--dur": "60s" }}>
        {[0, 1].map((k) =>
          logos.map((src, i) => (
            <div key={`${k}-${i}`} className="flex h-16 w-40 shrink-0 items-center justify-center px-6" aria-hidden={k === 1}>
              <img
                src={src}
                alt={k === 0 ? `CreativeIQ client logo ${i + 1}` : ""}
                loading="lazy"
                className="max-h-full max-w-full object-contain opacity-60 mix-blend-screen grayscale invert transition duration-500 hover:opacity-100"
              />
            </div>
          )),
        )}
      </div>
    </div>
  );
}

export default function Proof() {
  const root = useRef(null);

  useGSAP(
    () => {
      const nums = gsap.utils.toArray("[data-num]");
      nums.forEach((el) => {
        const end = parseFloat(el.dataset.num);
        const dec = Number(el.dataset.dec);
        const o = { v: 0 };
        gsap.to(o, {
          v: end,
          ease: "power3.out",
          duration: 2,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = o.v.toFixed(dec);
          },
        });
      });
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-stat-rule]", {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1.4,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-stats]", start: "top 80%", once: true },
        });
        gsap.to("[data-quotes]", {
          xPercent: -35,
          ease: "none",
          scrollTrigger: { trigger: "[data-quotes-wrap]", start: "top bottom", end: "bottom top", scrub: 0.6 },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="stats" className="s-dark relative overflow-hidden pb-[clamp(4rem,8vw,7rem)] pt-[clamp(3rem,6vw,5rem)]">
      <div className="s-container">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <Eyebrow index="03">Proof, not promises</Eyebrow>
            <RiseOnView as="h2" className="s-display mt-8 text-[clamp(2.8rem,6vw,6.5rem)] text-[var(--s-paper)]">
              <SplitWords text="Results that" />
              <br />
              <SplitWords text="compound." wordClassName="s-serif text-[var(--s-signal)]" />
            </RiseOnView>
          </div>
          <p className="max-w-md text-[1.05rem] leading-relaxed text-[var(--s-paper-dim)] lg:justify-self-end">
            We measure what the business actually feels — calls, bookings, revenue — and report it plainly every month.
          </p>
        </div>

        <div data-stats className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="relative py-8 pr-6">
              <div data-stat-rule className="absolute inset-x-0 top-0 h-px bg-[var(--s-line-strong)]" />
              <p className="flex items-start text-[clamp(4rem,8vw,8.5rem)] font-bold leading-[0.85] tracking-[-0.06em] tabular-nums text-[var(--s-paper)]">
                <span data-num={s.value} data-dec={s.decimals}>
                  {s.value.toFixed(s.decimals)}
                </span>
                <span className="s-serif mt-[0.08em] text-[0.5em] text-[var(--s-signal)]">{s.suffix}</span>
              </p>
              <p className="mt-5 text-[15px] font-semibold text-[var(--s-paper)]">{s.label}</p>
              <p className="s-mono mt-1 text-[11px] text-[var(--s-paper-ghost)]">{s.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <Logos />
      </div>

      <div id="testimonials" data-quotes-wrap className="mt-20 overflow-hidden">
        <div data-quotes className="flex w-max gap-5 pl-[clamp(1.1rem,3.2vw,2.75rem)]">
          {QUOTES.map((t) => (
            <figure
              key={t.n}
              className="flex w-[82vw] shrink-0 flex-col justify-between rounded-[22px] border border-[var(--s-line)] bg-[var(--s-ink-2)] p-7 sm:w-[30rem] lg:p-9"
            >
              <p className="s-serif text-[4rem] leading-[0.5] text-[var(--s-signal)]" aria-hidden>
                &ldquo;
              </p>
              <blockquote className="mt-4 text-[clamp(1.25rem,1.9vw,1.7rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[var(--s-paper)]">
                {t.q}
              </blockquote>
              <figcaption className="mt-10 flex items-center justify-between border-t border-[var(--s-line)] pt-5">
                <span className="text-[15px] font-semibold text-[var(--s-paper)]">{t.n}</span>
                <span className="s-label text-[var(--s-paper-ghost)]">{t.r}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="s-container mt-6 flex items-center gap-3">
          <span className="text-[var(--s-signal)]">★★★★★</span>
          <span className="s-label text-[var(--s-paper-ghost)]">5/5 average client rating</span>
        </div>
      </div>
    </section>
  );
}

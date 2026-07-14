import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";

const testimonials = [
  {
    name: "Fernando Jesus",
    role: "Entrepreneur",
    quote:
      "Had an awesome experience working with Vilma. She's super friendly, easy to work with, and really knows her stuff.",
  },
  {
    name: "Kassandra Ramirez",
    role: "Business Owner",
    quote:
      "Partnering with the CreativeIQ marketing team has been a game changer for my business.",
  },
  {
    name: "Miguel Febus",
    role: "Client",
    quote:
      "Very smart and hard working company that cares about their customers.",
  },
  {
    name: "Roderick Murdock",
    role: "Local Guide / Client",
    quote:
      "They have gone above and beyond to help scale businesses' digital presence and produce tangible results.",
  },
  {
    name: "Arnold Rodriguez",
    role: "Client",
    quote:
      "This company has gone way beyond my expectations. Extremely friendly and very knowledgeable.",
  },
  {
    name: "Jonathan Barragan",
    role: "Local Guide / Client",
    quote:
      "Amazing working with Vilma and her team. I have not only made more leads but also learned more about marketing.",
  },
  {
    name: "Roger Guerrero",
    role: "Client",
    quote:
      "We had a website created that was done quickly and efficiently. Great job, Vilma.",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const quoteRef = useRef(null);
  const current = testimonials[currentIndex];

  const crossfade = (nextIndex) => {
    const el = quoteRef.current;
    if (!el) {
      setCurrentIndex(nextIndex);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCurrentIndex(nextIndex);
      return;
    }
    gsap.to(el, {
      autoAlpha: 0,
      y: 12,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setCurrentIndex(nextIndex);
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" },
        );
      },
    });
  };

  const prev = () =>
    crossfade((currentIndex - 1 + testimonials.length) % testimonials.length);
  const next = () => crossfade((currentIndex + 1) % testimonials.length);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-t border-[var(--c-border)] bg-[var(--c-base)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)] py-12 sm:py-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 sm:mb-10">
          <h2 className="max-w-md font-sans text-[clamp(1.85rem,3.5vw,2.75rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[var(--c-ink)]">
            What clients say
          </h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--c-border-strong)] text-[var(--c-ink)] transition hover:border-[var(--c-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--c-border-strong)] text-[var(--c-ink)] transition hover:border-[var(--c-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)]"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} strokeWidth={1.75} />
            </button>
            <span className="ml-1 font-sans text-xs tabular-nums text-[var(--c-text-muted)]">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(testimonials.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div ref={quoteRef} className="relative mx-auto max-w-4xl text-center">
          <span
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 font-sans text-[clamp(8rem,22vw,16rem)] font-extrabold leading-none text-[var(--c-accent)]/[0.08] select-none"
            aria-hidden
          >
            &ldquo;
          </span>
          <blockquote className="relative">
            <p className="font-sans text-[clamp(1.25rem,2.6vw,2rem)] font-semibold leading-[1.25] tracking-[-0.03em] text-[var(--c-ink)] text-balance">
              {current.quote}
            </p>
            <footer className="mt-7">
              <cite className="not-italic">
                <span className="block font-sans text-base font-semibold text-[var(--c-ink)]">
                  {current.name}
                </span>
                <span className="mt-1 block font-sans text-sm text-[var(--c-text-muted)]">
                  {current.role}
                </span>
              </cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

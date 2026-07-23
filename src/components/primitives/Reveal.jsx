import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scroll reveal wrapper — opacity + y, honors reduced motion.
 * Never leaves content stuck at opacity 0 if the trigger is missed.
 */
export default function Reveal({
  as: Tag = "div",
  children,
  className = "",
  y = 36,
  delay = 0,
  stagger = 0,
  once = true,
  start = "top 88%",
  ...props
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return undefined;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, { autoAlpha: 1, y: 0, clearProps: "transform" });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets =
          stagger > 0
            ? gsap.utils.toArray(el.querySelectorAll("[data-reveal-item]"))
            : el;
        const tweenTargets =
          stagger > 0 && (!targets || targets.length === 0) ? el : targets;

        const tween = gsap.fromTo(
          tweenTargets,
          { autoAlpha: 0, y },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            delay,
            stagger: stagger || 0,
            ease: "power3.out",
            paused: true,
            immediateRender: false,
          },
        );

        const st = ScrollTrigger.create({
          trigger: el,
          start,
          once,
          invalidateOnRefresh: true,
          onEnter: () => tween.play(),
          onRefresh: (self) => {
            // Already scrolled past — show immediately (fixes first-load misses)
            if (self.progress > 0 || self.start < window.scrollY) {
              tween.progress(1);
            }
          },
        });

        // Catch cases where element is already in viewport on mount
        requestAnimationFrame(() => {
          if (st.progress > 0 || st.isActive) tween.progress(1);
          else {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
              tween.play();
            }
          }
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  );
}

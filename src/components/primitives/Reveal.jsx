import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scroll reveal wrapper — opacity + y, honors reduced motion.
 */
export default function Reveal({
  as: Tag = "div",
  children,
  className = "",
  y = 36,
  delay = 0,
  stagger = 0,
  once = true,
  start = "top 82%",
  ...props
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(ref.current, { autoAlpha: 1, y: 0 });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets =
          stagger > 0
            ? gsap.utils.toArray(ref.current.querySelectorAll("[data-reveal-item]"))
            : ref.current;

        if (stagger > 0 && (!targets || targets.length === 0)) {
          gsap.from(ref.current, {
            autoAlpha: 0,
            y,
            duration: 0.9,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start,
              once,
            },
          });
          return;
        }

        gsap.from(targets, {
          autoAlpha: 0,
          y,
          duration: 0.9,
          delay,
          stagger: stagger || 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start,
            once,
          },
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

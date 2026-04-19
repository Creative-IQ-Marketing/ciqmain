import { useScroll, useTransform } from "framer-motion";

/**
 * Returns a MotionValue (0–1) representing scroll progress
 * through the given ref element. 0 = element bottom enters
 * viewport, 1 = element top leaves viewport.
 *
 * @param {React.RefObject} ref - target element ref
 * @returns {MotionValue<number>}
 */
export function useScrollProgress(ref) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return scrollYProgress;
}

/**
 * Convenience: returns parallax translateY MotionValues for
 * the standard layering model.
 *
 * @param {React.RefObject} ref
 * @returns {{ bg, mid, ambient }}
 */
export function useParallaxLayers(ref) {
  const progress = useScrollProgress(ref);
  return {
    bg: useTransform(progress, [0, 1], [0, -120]),
    mid: useTransform(progress, [0, 1], [0, -60]),
    ambient: useTransform(progress, [0, 1], [0, -200]),
  };
}

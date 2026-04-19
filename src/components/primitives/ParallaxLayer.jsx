import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { useScrollProgress } from "../../hooks/useScrollProgress";

/**
 * Wraps children in a parallax depth layer.
 *
 * speed:
 *   -120 = background (slowest — moves UP on scroll)
 *    -60 = midground
 *      0 = locked
 *   -200 = ambient (fastest float)
 */
export default function ParallaxLayer({
  children,
  speed = -60,
  style,
  className,
}) {
  const ref = useRef(null);
  const progress = useScrollProgress(ref);
  const y = useTransform(progress, [0, 1], [0, speed]);

  return (
    <motion.div
      ref={ref}
      style={{ y, willChange: "transform", ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

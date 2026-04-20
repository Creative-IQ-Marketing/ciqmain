import { forwardRef } from "react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Viewport-activated wrapper that never hides content at opacity 0.
 * Sections stay readable even if an observer fires late.
 */
const FadeUp = forwardRef(function FadeUp(
  {
    children,
    delay = 0,
    duration = 0.75,
    y = 40,
    style,
    className,
    as = "div",
  },
  ref,
) {
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      ref={ref}
      initial={{ opacity: 1, y: Math.min(y, 22), filter: "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -10% 0px" }}
      transition={{ duration, delay, ease: EASE }}
      style={style}
      className={className}
    >
      {children}
    </Component>
  );
});

export default FadeUp;

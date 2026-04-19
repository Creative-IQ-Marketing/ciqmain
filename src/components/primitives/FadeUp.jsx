import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Immediate render wrapper — content is always visible on mount.
 * Removes all scroll-gating so sections never stay hidden on fresh load.
 */
export default function FadeUp({
  children,
  delay = 0,
  duration = 0.75,
  y = 40,
  style,
  className,
  as = "div",
}) {
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      initial={false}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration, delay, ease: EASE }}
      style={style}
      className={className}
    >
      {children}
    </Component>
  );
}

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin accent bar at the very top of the page that tracks scroll depth. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: "var(--c-accent, #3b82f6)",
        transformOrigin: "0%",
        scaleX,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}

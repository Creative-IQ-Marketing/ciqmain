import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

const containerVariants = (stagger) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
});

const childVariants = {
  hidden: { opacity: 0, y: 32, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE },
  },
};

/** Wraps children in a stagger-entry sequence on mount. Always visible. */
export default function StaggerContainer({
  children,
  stagger = 0.1,
  className,
  style,
}) {
  return (
    <motion.div
      variants={containerVariants(stagger)}
      initial={false}
      animate="show"
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/** Apply to direct children of StaggerContainer. */
export function StaggerItem({ children, className, style }) {
  return (
    <motion.div variants={childVariants} className={className} style={style}>
      {children}
    </motion.div>
  );
}

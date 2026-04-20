import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

const containerVariants = (stagger) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
});

const childVariants = {
  hidden: { opacity: 1, y: 26, filter: "blur(0px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE },
  },
};

/** Starts its stagger when the container enters view without hiding content. */
export default function StaggerContainer({
  children,
  stagger = 0.1,
  className,
  style,
}) {
  return (
    <motion.div
      variants={containerVariants(stagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.14, margin: "0px 0px -10% 0px" }}
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

import { useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * A button that magnetically follows the cursor within its
 * bounds, creating a tactile pull effect.
 *
 * Render as <button> by default. Pass `as="a"` for link variant.
 */
export default function MagneticButton({
  children,
  style,
  className,
  onClick,
  as: Tag = "button",
  strength = 0.35,
  ...props
}) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setOffset({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  const MotionTag = motion[Tag] ?? motion.button;

  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 220, damping: 16, mass: 0.4 }}
      whileTap={{ scale: 0.96 }}
      style={style}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

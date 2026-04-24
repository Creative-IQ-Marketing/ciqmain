import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SectionGlide({ flip = false }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleX = useTransform(scrollYProgress, [0.15, 0.7], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.9, 0.2]);

  return (
    <section ref={ref} className="relative h-24 bg-white overflow-hidden">
      <div
        className={`absolute inset-0 ${
          flip
            ? "bg-gradient-to-b from-blue-50/35 via-white to-white"
            : "bg-gradient-to-b from-white via-white to-blue-50/30"
        }`}
      />
      <div className="relative mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ scaleX, opacity, transformOrigin: "left center" }}
          className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent"
        />
      </div>
    </section>
  );
}

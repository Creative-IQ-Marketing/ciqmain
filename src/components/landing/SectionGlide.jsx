import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SectionGlide({ flip = false }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleX = useTransform(scrollYProgress, [0.15, 0.7], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.5, 0.15]);

  return (
    <section
      ref={ref}
      className={`relative h-16 overflow-hidden sm:h-20 ${
        flip ? "bg-white" : "bg-[#f7f6f1]"
      }`}
    >
      <div
        className={`absolute inset-0 ${
          flip
            ? "bg-gradient-to-b from-[#f7f6f1]/40 to-white"
            : "bg-gradient-to-b from-white to-[#f7f6f1]/40"
        }`}
      />
      <div className="relative mx-auto flex h-full max-w-[1320px] items-center px-5 sm:px-6 lg:px-10">
        <motion.div
          style={{ scaleX, opacity, transformOrigin: "left center" }}
          className="h-px w-full bg-gradient-to-r from-transparent via-black/[0.08] to-transparent"
        />
      </div>
    </section>
  );
}

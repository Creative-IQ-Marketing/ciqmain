import { motion, useInView, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import FadeUp from "../primitives/FadeUp";

const logoModules = import.meta.glob("../../assets/transparent/*.png", {
  eager: true,
});

const clients = Object.entries(logoModules).map(([path, mod], index) => ({
  id: index + 1,
  src: mod.default,
  alt: `CreativeIQ client partner logo ${index + 1}`,
}));

const Clients = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, {
    margin: "-15% 0px -15% 0px",
  });

  useEffect(() => {
    if (!inView) {
      return undefined;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % clients.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <FadeUp
      as="section"
      ref={sectionRef}
      className="relative overflow-hidden border-y border-slate-100/90 bg-[#fafafa] py-14 sm:py-16"
    >
      <div className="mx-auto mb-10 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p
          className="uppercase"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--size-label)",
            fontWeight: 600,
            letterSpacing: "var(--tracking-label)",
            color: "var(--c-text-secondary)",
          }}
        >
          Created For
        </p>
      </div>

      <div className="relative hidden w-full overflow-hidden md:block">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#fafafa] to-transparent sm:w-36" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#fafafa] to-transparent sm:w-36" />

        <div className="flex">
          <motion.div
            className="flex flex-nowrap items-center gap-14 sm:gap-16"
            animate={
              inView && hoveredId === null
                ? { x: ["0%", "-50%"] }
                : { x: "0%" }
            }
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 32,
                ease: "linear",
              },
            }}
          >
            {[...clients, ...clients].map((client, index) => {
              const active = hoveredId === client.id;
              return (
                <motion.div
                  key={`${client.id}-${index}`}
                  className="relative flex h-20 w-44 shrink-0 cursor-default items-center justify-center sm:h-24 sm:w-48"
                  onMouseEnter={() => setHoveredId(client.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <motion.img
                    src={client.src}
                    alt={client.alt}
                    className="max-h-full max-w-full object-contain"
                    animate={{
                      filter: active ? "grayscale(0%)" : "grayscale(100%)",
                      opacity: active ? 1 : 0.5,
                      scale: active ? 1.06 : 1,
                    }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <div className="block px-4 md:hidden">
        <div className="relative mx-auto h-36 max-w-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.img
                src={clients[currentIndex].src}
                alt={clients[currentIndex].alt}
                className="max-h-full max-w-[85%] object-contain"
                animate={{
                  filter: "grayscale(100%)",
                  opacity: 0.55,
                }}
                whileTap={{
                  filter: "grayscale(0%)",
                  opacity: 1,
                  scale: 1.04,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mx-auto mt-8 h-px max-w-xs overflow-hidden rounded-full bg-slate-200">
          <motion.div
            className="h-full rounded-full bg-slate-400"
            animate={{
              width: `${((currentIndex + 1) / clients.length) * 100}%`,
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    </FadeUp>
  );
};

export default Clients;

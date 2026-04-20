import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import FadeUp from "../primitives/FadeUp";

const logoModules = import.meta.glob("../../assets/brands/*.webp", {
  eager: true,
});

const clients = Object.entries(logoModules).map(([path, mod], index) => ({
  id: index + 1,
  src: mod.default,
  alt: path.split("/").pop(),
}));

const Clients = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
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
      className="py-12 bg-white border-y border-slate-100 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-sm font-semibold text-slate-600 tracking-widest uppercase">
          Created For
        </p>
      </div>

      <div className="relative w-full overflow-hidden hidden md:block">
        <div className="absolute top-0 left-0 w-24 h-full bg-white/90 z-10 backdrop-blur-sm" />
        <div className="absolute top-0 right-0 w-24 h-full bg-white/90 z-10 backdrop-blur-sm" />

        <div className="flex">
          <motion.div
            className="flex space-x-16 items-center flex-nowrap"
            animate={
              inView
                ? {
                    x: ["0%", "-50%"],
                  }
                : { x: "0%" }
            }
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...clients, ...clients].map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="relative w-40 h-20 flex-shrink-0 flex items-center justify-center group"
              >
                <img
                  src={client.src}
                  alt={client.alt}
                  className="max-w-full max-h-full object-contain transition-all duration-500 ease-out transform group-hover:scale-125 group-hover:drop-shadow-xl"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="block md:hidden px-4">
        <div className="relative w-full">
          {/* Main Carousel */}
          <div className="relative h-32 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shadow-sm">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-blue-200 blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-slate-200 blur-3xl" />
            </div>

            {/* Carousel Items */}
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              key={currentIndex}
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <img
                src={clients[currentIndex].src}
                alt={clients[currentIndex].alt}
                className="max-w-[70%] max-h-[70%] object-contain drop-shadow-lg"
              />
            </motion.div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {clients.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-blue-600 w-3 h-3"
                    : "bg-slate-300 w-2 h-2 hover:bg-slate-400"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </FadeUp>
  );
};

export default Clients;

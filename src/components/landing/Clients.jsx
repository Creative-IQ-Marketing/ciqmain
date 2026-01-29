import { motion } from "framer-motion";

const logoModules = import.meta.glob("../../assets/brands/*.webp", {
  eager: true,
});

const clients = Object.entries(logoModules).map(([path, mod], index) => ({
  id: index + 1,
  src: mod.default,
  alt: path.split("/").pop(),
}));

const Clients = () => {
  return (
    <section className="py-12 bg-white border-y border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-sm font-semibold text-slate-600 tracking-widest uppercase">
          proud partners
        </p>
      </div>

      <div className="relative w-full overflow-hidden hidden md:block">
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex">
          <motion.div
            className="flex space-x-16 items-center flex-nowrap"
            animate={{
              x: ["0%", "-50%"],
            }}
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
        <div className="grid grid-cols-3 gap-3">
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              className="relative w-full h-24 rounded-xl border border-slate-100 bg-white shadow-sm flex items-center justify-center overflow-hidden"
              initial={{ y: 0, rotate: 0, scale: 1 }}
              animate={{
                y: [0, -4, 0, 4, 0],
                rotate: [-1, 0, 1, 0, -1],
                scale: [1, 1.05, 1, 1.05, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (index % 5) * 0.2, // Staggered effect
              }}
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 blur-2xl" />
              </div>
              <img
                src={client.src}
                alt={client.alt}
                className="max-w-[80%] max-h-[80%] object-contain transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;

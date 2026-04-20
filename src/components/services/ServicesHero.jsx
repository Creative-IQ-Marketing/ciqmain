import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const STATS = [
  { value: "400+", label: "Websites Built" },
  { value: "$300K+", label: "Ad Spend Managed" },
  { value: "8+", label: "Years Experience" },
  { value: "300%", label: "Avg Traffic Lift" },
];

export default function ServicesHero() {
  const scrollToPackages = () => {
    document.getElementById("bundles")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document
      .getElementById("services-contact")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center bg-slate-950 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/4 w-[400px] h-[400px] bg-blue-900/30 rounded-full filter blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-blue-800/20 rounded-full filter blur-[60px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M0 0H40V40' fill='none' stroke='rgba(255,255,255,0.22)' stroke-width='1'/%3E%3C/svg%3E\")",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-300 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Growth Infrastructure for brands seeking innovative solutions
          </span>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
            Stop Buying Services.
            <br />
            <span className="text-blue-400">Start Building Systems.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 leading-relaxed mb-10">
            CreativeIQ builds growth infrastructure—not one-off campaigns. Every
            package is engineered to deliver visibility, automation, and revenue
            that compounds over time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={scrollToPackages}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-700 text-white font-semibold text-base shadow-lg shadow-blue-900/40 hover:bg-blue-600 transition-colors"
            >
              See Our Packages <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-slate-500 text-slate-200 font-semibold text-base hover:bg-slate-800 transition-colors"
            >
              Talk to Our Team
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.button
          onClick={scrollToPackages}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-slate-500 flex flex-col items-center mx-auto gap-1 hover:text-slate-300 transition-colors"
        >
          <span className="text-xs uppercase tracking-widest">Explore</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}

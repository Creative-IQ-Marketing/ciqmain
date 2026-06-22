import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { trackButtonClick } from "../../services/analytics";

const STATS = [
  { value: "400+", label: "Websites Built" },
  { value: "$300K+", label: "Ad Spend Managed" },
  { value: "8+", label: "Years Experience" },
  { value: "300%", label: "Avg Traffic Lift" },
];

export default function ServicesHero() {
  const navigate = useNavigate();

  const scrollToPackages = () => {
    document.getElementById("bundles")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document
      .getElementById("services-contact")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-[#F5F5F7] pt-28 pb-20 sm:pt-32 sm:pb-24">
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 text-center sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#3B6FF0]">
            Services & pricing
          </p>
          <h1 className="f-hero mx-auto max-w-4xl text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-slate-900">
            Stop buying services.
            <br />
            <span className="text-[#3B6FF0]">Start building systems.</span>
            <span className="sr-only">
              {" "}
              — Digital Marketing Services San Antonio | CreativeIQ
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Growth infrastructure—not one-off campaigns. Every package is built
            for visibility, automation, and revenue that compounds.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <motion.button
              onClick={scrollToPackages}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full bg-[#3B6FF0] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#2f5ad4]"
            >
              See packages <ArrowRight className="h-4 w-4" />
            </motion.button>
            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Talk to our team
            </motion.button>
            <motion.button
              onClick={() => {
                trackButtonClick(
                  "Services Free SEO Tool",
                  "services_free_seo_tool",
                  "ServicesHero",
                );
                navigate("/free-ai-seo-audit");
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Free SEO audit
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="f-disp text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.button
          onClick={scrollToPackages}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mx-auto mt-12 flex flex-col items-center gap-1 text-slate-500 transition hover:text-[#3B6FF0]"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
            Explore
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}

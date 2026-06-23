import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { trackButtonClick } from "../../services/analytics";
import { scrollToServicesContact } from "../../utils/formInterest";

export default function ServicesHero() {
  const navigate = useNavigate();

  const scrollToPackages = () => {
    document.getElementById("bundles")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    scrollToServicesContact("other", "services-hero-quote");
  };

  return (
    <section className="bg-white pt-28 mt-20 pb-12 sm:pt-32 sm:pb-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="f-body mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#3B6FF0]">
            Services
          </p>
          <h1 className="f-hero text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-slate-900">
            Systems that grow with you.
            <span className="sr-only">
              {" "}
              — Digital Marketing Services San Antonio | CreativeIQ
            </span>
          </h1>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={scrollToPackages}
              className="inline-flex items-center gap-2 rounded-full bg-[#3B6FF0] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2f5ad4]"
            >
              View packages <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Get a quote
            </button>
            <button
              type="button"
              onClick={() => {
                trackButtonClick(
                  "Services Free SEO Tool",
                  "services_free_seo_tool",
                  "ServicesHero",
                );
                navigate("/free-ai-seo-audit");
              }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Free SEO audit
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

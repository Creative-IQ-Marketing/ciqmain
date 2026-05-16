import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { trackButtonClick } from "../../services/analytics";

const ease = [0.22, 1, 0.36, 1];

const EXPLORATION_PATHS = [
  {
    icon: "⚙️",
    title: "Our Services",
    description: "See how we help businesses rank, convert, and grow",
    href: "/services",
    cta: "Explore Services",
    color: "from-blue-50 to-blue-100",
    borderColor: "border-blue-200",
  },
  {
    icon: "🔍",
    title: "Free SEO Audit",
    description: "Discover how you show up on Google, AI platforms, and social",
    href: "/free-ai-seo-audit",
    cta: "Get Your Audit",
    color: "from-purple-50 to-purple-100",
    borderColor: "border-purple-200",
  },
  {
    icon: "📋",
    title: "Book a Strategy Call",
    description: "Talk to an AI marketing specialist about your goals",
    href: "/contact",
    cta: "Schedule Call",
    color: "from-emerald-50 to-emerald-100",
    borderColor: "border-emerald-200",
  },
];

export default function ExploreFurther() {
  const navigate = useNavigate();

  return (
    <section
      className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
      style={{
        background: "linear-gradient(135deg, #f9f8f5 0%, #fff 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm font-semibold tracking-widest uppercase text-slate-500 mb-3"
          >
            Next Steps
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            Ready to Rank and Convert?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 text-lg max-w-2xl mx-auto"
          >
            Start your journey to AI-ready growth. Choose your path below.
          </motion.p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {EXPLORATION_PATHS.map((path, index) => (
            <motion.div
              key={path.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: 0.1 + index * 0.1,
                ease,
              }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className={`bg-gradient-to-br ${path.color} border ${path.borderColor} rounded-lg p-6 sm:p-8 cursor-pointer transition-all duration-300 relative overflow-hidden group`}
              onClick={() => {
                trackButtonClick(
                  path.cta,
                  `explore_${path.href}`,
                  "ExploreFurther",
                );
                navigate(path.href);
              }}
            >
              {/* Background accent */}
              <div
                className="absolute -right-8 -top-8 w-24 h-24 opacity-10 group-hover:scale-110 transition-transform duration-500"
                style={{
                  background:
                    "radial-gradient(circle, #3B6FF0 0%, transparent 70%)",
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                <div className="text-3xl mb-3">{path.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {path.title}
                </h3>
                <p className="text-slate-700 text-sm mb-6 leading-relaxed">
                  {path.description}
                </p>

                {/* CTA Button */}
                <button
                  className="inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-slate-900 bg-white rounded-full hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-slate-300 group/btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    trackButtonClick(
                      path.cta,
                      `explore_button_${path.href}`,
                      "ExploreFurther",
                    );
                    navigate(path.href);
                  }}
                >
                  <span>{path.cta}</span>
                  <ArrowRight
                    size={16}
                    className="group-hover/btn:translate-x-1 transition-transform duration-300"
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

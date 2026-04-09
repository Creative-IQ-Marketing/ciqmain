import { TrendingUp, Star, Globe, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

const Stats = () => {
  const stats = [
    {
      value: "400+",
      label: "Websites Built",
      icon: Globe,
      color: "from-blue-600 to-blue-800",
    },
    {
      value: "$300K+",
      label: "Ad Spend Managed",
      icon: DollarSign,
      color: "from-slate-600 to-slate-800",
    },
    {
      value: "8+",
      label: "Years Experience",
      icon: TrendingUp,
      color: "from-blue-700 to-blue-900",
    },
    {
      value: "5/5",
      label: "Client Rating",
      icon: Star,
      color: "from-slate-700 to-slate-900",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-1/4 w-96 h-96 bg-blue-800/20 rounded-full filter blur-2xl"></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-900/20 rounded-full filter blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Our Impact
          </h2>
          <p className="text-blue-200 text-sm">
            Proven results for our clients
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-xl bg-slate-800/50 border border-blue-500/20 text-center"
              >
                <div
                  className={`mb-3 inline-block p-3 rounded-lg bg-gradient-to-br ${stat.color}`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <p className="text-blue-200 text-sm">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-blue-200/80">
              AI + SEO Fun Facts
            </div>
            <h3 className="mt-3 text-2xl md:text-3xl font-bold text-white">
              Search is being rebuilt around AI
            </h3>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Over 60% of search experiences are now influenced by AI-generated results (snippets, voice search, predictive answers).",
              "Google’s AI ranks based on intent and structure—not just keywords—so most traditional SEO is outdated.",
              "Websites built with proper SEO architecture are up to 3× more likely to surface in AI-powered results.",
              "Teams combining SEO with ad data + AI insights can reduce cost per lead by 30–50%.",
            ].map((fact) => (
              <div
                key={fact}
                className="rounded-xl border border-blue-500/20 bg-slate-800/40 p-5 text-sm text-blue-100/90 leading-relaxed"
              >
                {fact}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;

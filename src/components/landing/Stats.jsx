import { motion } from "framer-motion";
import { TrendingUp, Star, Target, Users } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      value: "+300%",
      label: "Average Traffic Increase",
      icon: TrendingUp,
      color: "from-blue-600 to-blue-800",
      delay: 0.1,
    },
    {
      value: "4.9/5",
      label: "Average Client Rating",
      icon: Star,
      color: "from-slate-700 to-slate-900",
      delay: 0.2,
    },
    {
      value: "98%",
      label: "Client Retention Rate",
      icon: Target,
      color: "from-blue-500 to-blue-700",
      delay: 0.3,
    },
    {
      value: "500+",
      label: "Happy Clients",
      icon: Users,
      color: "from-slate-600 to-slate-800",
      delay: 0.4,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -8 }}
                className="text-center group"
              >
                <motion.div
                  className={`mb-6 inline-block p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-2xl`}
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </motion.div>
                <motion.div className="text-4xl md:text-5xl font-bold text-white mb-3 transition-colors">
                  {stat.value}
                </motion.div>
                <div className="text-blue-200 text-sm md:text-base font-medium">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;

import { motion } from "framer-motion";
import { TrendingUp, Star, Target, Users } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      value: "+300%",
      label: "Average Traffic Increase",
      icon: TrendingUp,
      color: "from-blue-500 to-blue-700",
      delay: 0.1,
    },
    {
      value: "4.9/5",
      label: "Average Client Rating",
      icon: Star,
      color: "from-amber-500 to-orange-500",
      delay: 0.2,
    },
    {
      value: "98%",
      label: "Client Retention Rate",
      icon: Target,
      color: "from-emerald-500 to-teal-600",
      delay: 0.3,
    },
    {
      value: "50+",
      label: "Happy Clients",
      icon: Users,
      color: "from-indigo-500 to-purple-700",
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
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
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
                  className={`mb-6 inline-block p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-xl`}
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </motion.div>
                <motion.div className="text-4xl md:text-5xl font-bold text-white mb-3 group-hover:text-blue-100 transition-colors">
                  {stat.value}
                </motion.div>
                <div className="text-blue-100 text-sm md:text-base font-medium">
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

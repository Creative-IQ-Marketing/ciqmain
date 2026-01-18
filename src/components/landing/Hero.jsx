import { motion } from "framer-motion";
import { TrendingUp, Zap } from "lucide-react";
import DataAnalyticsSVG from "../svgs/DataAnalyticsSVG";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="home"
      className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-slate-50 to-white relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-72 h-72 bg-slate-400 rounded-full mix-blend-multiply filter blur-3xl opacity-5"
        animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 0.5 }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center text-center md:text-left">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold border border-blue-200 mx-auto md:mx-0"
              variants={itemVariants}
            >
              <motion.span
                className="w-2 h-2 bg-blue-600 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>#1 Digital Marketing Agency</span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              variants={itemVariants}
            >
              <span className="text-gray-900">Grow Your</span>
              <br />
              <span className="text-gray-900">Business with</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Digital Excellence
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0"
              variants={itemVariants}
            >
              We help ambitious brands dominate their competition with
              data-driven digital marketing strategies that deliver measurable
              results.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              variants={itemVariants}
            >
              <motion.a
                href="#contact"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg shadow-lg text-center flex items-center justify-center gap-2 group"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(37, 99, 235, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Get Free Strategy Session
              </motion.a>
              <motion.a
                href="#services"
                className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-lg text-center"
                whileHover={{ scale: 1.05, backgroundColor: "#F0F9FF" }}
                whileTap={{ scale: 0.98 }}
              >
                View Our Services
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap gap-8 pt-8 justify-center md:justify-start"
              variants={itemVariants}
            >
              {[
                { value: "8+", label: "Years Experience" },
                { value: "500+", label: "Happy Clients" },
                { value: "98%", label: "Retention Rate" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.5 + index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="text-3xl font-bold text-blue-600">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Illustration */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-300 rounded-3xl opacity-20 blur-3xl"
              animate={{ scale: [1, 1.05, 1], opacity: [0.18, 0.3, 0.18] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div
              className="relative bg-slate-950 rounded-3xl shadow-2xl p-8 border border-slate-800 overflow-hidden"
              whileHover={{
                boxShadow: "0 30px 60px -15px rgba(15, 23, 42, 0.8)",
                y: -4,
              }}
            >
              <motion.div
                className="absolute -top-16 -right-10 w-40 h-40 rounded-full bg-sky-500/30 blur-3xl"
                animate={{ y: [0, 10, -4, 0], opacity: [0.2, 0.35, 0.25, 0.2] }}
                transition={{ duration: 7, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-yellow-400/20 blur-3xl"
                animate={{ y: [0, -8, 6, 0], opacity: [0.15, 0.3, 0.22, 0.15] }}
                transition={{ duration: 6.5, repeat: Infinity, delay: 0.7 }}
              />
              <DataAnalyticsSVG className="w-full h-auto relative z-10" />
            </motion.div>

            {/* Floating cards */}
            <motion.div
              className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="text-white w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">+45%</div>
                  <div className="text-xs text-gray-600">Monthly Growth</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="text-white w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">12.8%</div>
                  <div className="text-xs text-gray-600">Conversion Rate</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import { motion } from "framer-motion";
import {
  Award,
  TrendingUp,
  Users,
  Target,
  Briefcase,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import TeamCollaborationSVG from "../svgs/TeamCollaborationSVG";

const About = () => {
  const features = [
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Award-winning strategies that set industry standards",
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "300% average increase in organic traffic for clients",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Certified professionals with years of experience",
    },
    {
      icon: Target,
      title: "Data-Driven",
      description: "Strategic decisions backed by analytics and insights",
    },
    {
      icon: Briefcase,
      title: "Dedicated Support",
      description: "Personal account manager for your success",
    },
    {
      icon: BarChart3,
      title: "Transparent Reporting",
      description: "Clear metrics and regular performance updates",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Illustration */}
          <motion.div
            className="relative order-2 md:order-1"
            initial={{ opacity: 0, scale: 0.8, x: -50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-3xl opacity-20 blur-2xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <TeamCollaborationSVG className="w-full h-auto" />
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            className="space-y-8 order-1 md:order-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <motion.h3
                className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                About CreativeIQ
              </motion.h3>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Your Growth Partner in the{" "}
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Digital Age
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                With over 8 years of experience, we've helped hundreds of
                businesses transform their online presence and achieve
                sustainable growth through strategic digital marketing.
              </p>
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 gap-6"
              variants={containerVariants}
            >
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="group p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-blue-100 cursor-pointer"
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.08,
                      boxShadow: "0 20px 25px -5px rgba(37, 99, 235, 0.2)",
                      backgroundColor: "rgb(240, 249, 255)",
                    }}
                  >
                    <motion.div
                      className="text-3xl mb-3 inline-block p-3 bg-blue-100 rounded-lg"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </motion.div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div className="pt-4" variants={itemVariants}>
              <motion.a
                href="#contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg shadow-lg group"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(37, 99, 235, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule Free Consultation
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.div>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

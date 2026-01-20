/* eslint-disable no-unused-vars */
import {
  Search,
  MousePointerClick,
  MessageSquare,
  Database,
  MapPin,
  Code,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SEOOptimizationSVG from "../svgs/SEOOptimizationSVG";
import DigitalMarketingSVG from "../svgs/DigitalMarketingSVG";
import GrowthChartSVG from "../svgs/GrowthChartSVG";

const Services = () => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceValue) => {
    navigate(`/?service=${serviceValue}#contact`);

    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const services = [
    {
      icon: Search,
      title: "Search Engine Optimization",
      value: "seo",
      description:
        "Boost your organic visibility with comprehensive SEO strategies.",
      features: [
        "Keyword Research",
        "On-Page Optimization",
        "Link Building",
        "Technical SEO",
      ],
      color: "from-blue-500 to-blue-700",
      illustration: SEOOptimizationSVG,
      featured: true,
    },
    {
      icon: MousePointerClick,
      title: "Pay-Per-Click Advertising",
      value: "ppc",
      description: "Maximize ROI with data-driven PPC campaigns that convert.",
      features: [
        "Campaign Setup",
        "Ad Creation",
        "Bid Management",
        "Performance Tracking",
      ],
      color: "from-blue-600 to-slate-700",
      illustration: DigitalMarketingSVG,
      featured: true,
    },
    {
      icon: MessageSquare,
      title: "Social Media Marketing",
      value: "social",
      description:
        "Build meaningful connections with your audience across all platforms.",
      features: [
        "Content Strategy",
        "Community Management",
        "Paid Social",
        "Influencer Marketing",
      ],
      color: "from-slate-600 to-slate-800",
      illustration: GrowthChartSVG,
      featured: true,
    },
    {
      icon: Database,
      title: "CRM & Automation",
      value: "crm",
      description: "Streamline your processes and nurture leads automatically.",
      features: [
        "CRM Setup & Training",
        "Lead Nurturing",
        "Email Automation",
        "Pipeline Management",
      ],
      color: "from-blue-500 to-slate-700",
      featured: false,
    },
    {
      icon: MapPin,
      title: "Google My Business",
      value: "gmb",
      description: "Optimize your local presence and attract nearby customers.",
      features: [
        "Profile Optimization",
        "Review Management",
        "Local SEO",
        "Post Management",
      ],
      color: "from-slate-700 to-slate-900",
      featured: false,
    },
    {
      icon: Code,
      title: "Web Development",
      value: "web",
      description:
        "Create stunning, high-performing websites that drive results.",
      features: [
        "Custom Design",
        "Responsive Development",
        "E-commerce Solutions",
        "Performance Optimization",
      ],
      color: "from-blue-600 to-slate-800",
      featured: false,
    },
  ];

  const featuredServices = services.filter((s) => s.featured);
  const additionalServices = services.filter((s) => !s.featured);

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
    <section
      id="services"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white via-slate-50 to-white relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-slate-300 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Complete Digital Marketing{" "}
            <span className="bg-linear-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            From strategy to execution, we provide everything you need to
            dominate your competition online
          </motion.p>
        </motion.div>

        {/* Featured Services with Illustrations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {featuredServices.map((service, index) => {
            const IconComponent = service.icon;
            const IllustrationComponent = service.illustration;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(37, 99, 235, 0.15)",
                }}
                className="group glass rounded-2xl overflow-hidden shadow-xl text-center md:text-left"
              >
                <div className="p-8">
                  <motion.div className="mb-6 h-48 flex items-center justify-center overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <IllustrationComponent className="w-full h-full" />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className={`text-4xl mb-6 inline-block p-4 bg-linear-to-br ${service.color} rounded-2xl shadow-lg`}
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center text-gray-700 font-medium"
                      >
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-3 shrink-0" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                  <motion.button
                    onClick={() => handleServiceClick(service.value)}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-linear-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group"
                  >
                    Book this Service
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {additionalServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                }}
                className="group bg-white rounded-2xl p-8 shadow-lg text-center md:text-left"
              >
                <motion.div
                  className={`text-4xl mb-6 inline-block p-4 bg-linear-to-br ${service.color} rounded-2xl shadow-lg`}
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center text-gray-700 font-medium text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-blue-600 mr-3 shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  onClick={() => handleServiceClick(service.value)}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-linear-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  Book this Service
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-linear-to-r from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full mix-blend-screen filter blur-xl opacity-10"></div>
          </div>
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h3>
            <p className="text-blue-100 text-lg mb-10 leading-relaxed">
              Get a custom digital marketing strategy tailored to your unique
              business needs. Our experts are ready to help you dominate your
              market.
            </p>
            <motion.a
              href="#contact"
              onClick={() =>
                trackButtonClick(
                  "Get Your Free Strategy",
                  "services_cta_btn",
                  "Services",
                )
              }
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-10 py-5 bg-white text-blue-600 font-bold rounded-xl hover:shadow-2xl transition-all duration-200 text-lg gap-2"
            >
              Get Your Free Strategy
              <ArrowRight className="w-6 h-6" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

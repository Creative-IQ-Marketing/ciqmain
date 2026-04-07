import {
  Search,
  MousePointerClick,
  MessageSquare,
  Bot,
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
import DataAnalyticsSVG from "../svgs/DataAnalyticsSVG";
import { trackButtonClick } from "../../services/analytics";

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
      icon: Bot,
      title: "AI Search + AI Agents",
      value: "ai",
      description:
        "Get discovered across AI platforms and turn attention into leads with custom AI agents.",
      features: [
        "AI Search Visibility (ChatGPT/Gemini/Claude/Perplexity)",
        "AI Agent Chat + Lead Capture",
        "Knowledge Base + SOP Ingestion",
        "Conversation Analytics",
      ],
      color: "from-blue-600 to-slate-800",
      illustration: DataAnalyticsSVG,
      featured: true,
    },
    {
      icon: Search,
      title: "Search Engine Optimization",
      value: "seo",
      description:
        "SEO built for AI indexing + long-term authority (not just keywords).",
      features: [
        "Keyword Research",
        "On-Page Optimization",
        "AI-Ready Site Structure",
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
        staggerChildren: 0.12,
        delayChildren: 0.1,
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
      id="services"
      className="py-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-block text-sm font-semibold text-blue-600 tracking-widest uppercase mb-4"
          >
            Our Services
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-950 mb-4 sm:mb-6 leading-tight">
            Complete Digital Marketing{" "}
            <span className="bg-linear-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Everything works together as one integrated system—visibility,
            conversion, and automation.
          </motion.p>
        </motion.div>

        {/* Services Grid - All 7 services */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-5"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -4,
                  boxShadow: "0 20px 40px -10px rgba(37, 99, 235, 0.12)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group h-full flex flex-col bg-white rounded-2xl border border-slate-200/60 p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-linear-to-br ${service.color} mb-5 group-hover:shadow-lg transition-shadow duration-300`}
                >
                  <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-950 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mb-5 leading-relaxed flex-grow">
                  {service.description}
                </p>

                {/* Quick Features */}
                <ul className="space-y-2 mb-6 text-xs sm:text-sm">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + idx * 0.03 }}
                      className="flex items-start gap-2 text-slate-700"
                    >
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-100 mt-0.5 flex-shrink-0">
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      </span>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                  onClick={() => handleServiceClick(service.value)}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-auto pt-5 border-t border-slate-200/50 text-slate-950 font-semibold text-sm sm:text-base flex items-center justify-center gap-2 py-3 group/btn hover:text-blue-600 transition-colors duration-300"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 md:mt-24 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full mix-blend-screen filter blur-3xl opacity-5"></div>
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Ready to get started?
              </h3>
              <p className="text-blue-100 text-sm sm:text-base md:text-lg mb-8 max-w-2xl mx-auto">
                Let's discuss which services are right for your business and
                create a custom strategy.
              </p>
              <motion.a
                href="#contact"
                onClick={() =>
                  trackButtonClick(
                    "Get Started",
                    "services_cta_btn",
                    "Services",
                  )
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center px-8 sm:px-12 py-4 bg-white text-blue-600 font-bold rounded-xl hover:shadow-2xl transition-all duration-200 text-base sm:text-lg gap-2"
              >
                Schedule Consultation
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

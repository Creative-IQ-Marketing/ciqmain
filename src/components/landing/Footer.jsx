import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import mainLogo from "../../assets/mainLogo.png";

const Footer = () => {
  const services = [
    "Search Engine Optimization",
    "Pay-Per-Click Advertising",
    "Social Media Marketing",
    "CRM & Automation",
    "Google My Business",
    "Web Development",
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook" },
    { icon: Twitter, label: "Twitter" },
    { icon: Linkedin, label: "LinkedIn" },
    { icon: Instagram, label: "Instagram" },
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
      transition: { duration: 0.6 },
    },
  };

  return (
    <footer className="bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center md:text-left"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col md:flex-row items-center md:items-start space-y-3 md:space-y-0 md:space-x-3 mb-6"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <img
                  src={mainLogo}
                  alt="CreativeIQ Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
                CreativeIQ
              </span>
            </motion.div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner in digital marketing excellence. Helping
              ambitious businesses dominate their markets for 8+ years.
            </p>
            <div className="flex justify-center md:justify-start space-x-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.2, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-200 group"
                    title={social.label}
                  >
                    <Icon className="w-5 h-5 group-hover:text-white" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold mb-6 flex flex-col md:flex-row items-center md:items-start gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full hidden md:block"></div>
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href="#services"
                    className="text-gray-300 hover:text-blue-300 transition-colors inline-flex items-center justify-center md:justify-start gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" />
                    {service}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold mb-6 flex flex-col md:flex-row items-center md:items-start gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full hidden md:block"></div>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-300 transition-colors inline-flex items-center justify-center md:justify-start gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold mb-6 flex flex-col md:flex-row items-center md:items-start gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full hidden md:block"></div>
              Contact Us
            </h4>
            <ul className="space-y-4">
              <motion.li className="flex flex-col md:flex-row items-center md:items-start gap-3 group cursor-pointer">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 group-hover:text-blue-300 transition-colors">
                  San Antonio, Texas, USA
                </span>
              </motion.li>
              <motion.li className="flex flex-col md:flex-row items-center md:items-start gap-3 group">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <a
                  href="tel:8046512531"
                  className="text-gray-300 hover:text-blue-300 transition-colors"
                >
                  (804) 651-2531
                </a>
              </motion.li>
              <motion.li className="flex flex-col md:flex-row items-center md:items-start gap-3 group">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:CiQ@creativeiq.marketing"
                  className="text-gray-300 hover:text-blue-300 transition-colors"
                >
                  CiQ@creativeiq.marketing
                </a>
              </motion.li>
              <motion.li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                <Clock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  Mon-Fri: 9AM-6PM
                  <br />
                  Sat: 10AM-4PM
                </span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t border-white/10 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <p className="text-gray-400 text-sm font-medium">
              © {new Date().getFullYear()} CreativeIQ Marketing. All rights
              reserved.
            </p>
            <div className="flex space-x-8 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    whileHover={{ color: "#3b82f6" }}
                    className="text-gray-400 hover:text-blue-400 transition-colors font-medium"
                  >
                    {item}
                  </motion.a>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.a
        href="#home"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-200 z-50"
      >
        <ArrowRight className="w-5 h-5 rotate-[-90deg]" />
      </motion.a>
    </footer>
  );
};

export default Footer;

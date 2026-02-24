/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Phone, Sparkles } from "lucide-react";
import mainLogo from "../../assets/mainLogo.png";
import { trackButtonClick, trackOutboundLink } from "../../services/analytics";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (event, href, name) => {
    event.preventDefault();

    trackButtonClick(name || href, "nav_link", "Header");

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (!element) return;
    const headerOffset = 80;
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a href="#home" className="flex items-center space-x-2 group">
              <img
                src={mainLogo}
                alt="CreativeIQ Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                CreativeIQ
              </span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href, link.name)}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </motion.a>
            ))}
          </motion.nav>

          {/* CTA Button */}
          <motion.div
            className="hidden md:flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.a
            href="tel:2108380177"
            onClick={() =>
              trackOutboundLink("tel:2108380177", "header_phone_click")
            }
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Phone className="w-4 h-4" />
            210-838-0177
          </motion.a>
            <motion.a
              href="#contact"
              onClick={() =>
                trackButtonClick("Free Audit", "header_cta_btn", "Header")
              }
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-all duration-200"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(37, 99, 235, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Free Audit
            </motion.a>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={
            isMenuOpen
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden border-t border-gray-100"
        >
          <nav className="flex flex-col space-y-4 py-4 px-2">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-2 py-2 hover:bg-gray-50 rounded-lg block"
              >
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={
                    isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                  }
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="block"
                >
                  {link.name}
                </motion.span>
              </a>
            ))}
            <a
              href="tel:2108380177"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-2 py-2 hover:bg-gray-50 rounded-lg flex items-center gap-2"
            >
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={
                  isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                }
                transition={{ duration: 0.2, delay: 0.25 }}
                className="flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                210-838-0177
              </motion.span>
            </a>
            <a
              href="#contact"
              onClick={(event) =>
                handleNavClick(event, "#contact", "Free Audit")
              }
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg hover:shadow-lg text-center block"
            >
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={
                  isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                }
                transition={{ duration: 0.2, delay: 0.3 }}
                className="block"
              >
                Free Audit
              </motion.span>
            </a>
          </nav>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;

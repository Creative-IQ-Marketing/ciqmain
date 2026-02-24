import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, ArrowRight, Clock } from "lucide-react";

const ContactPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            className="w-full max-w-sm md:max-w-xl bg-white rounded-2xl shadow-2xl border border-blue-100 p-6 md:p-10 relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 z-0" />
            
            {/* Close Button - Increased touch target and z-index */}
            <button
              onClick={closePopup}
              className="absolute top-3 right-3 p-3 rounded-full bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 transition-all z-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500/20 active:scale-95"
              aria-label="Close popup"
            >
              <X size={24} strokeWidth={2.5} />
            </button>

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Let's Connect!
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Ready to grow your business? Reach out to our team directly.
              </p>

              {/* Reply Time Indicator */}
              <div className="flex items-center gap-2 mb-6 text-emerald-600 bg-emerald-50 py-1.5 px-3 rounded-lg w-fit text-xs font-semibold">
                <Clock size={14} />
                <span>We reply within an hour</span>
              </div>

              <div className="space-y-4 mb-6">
                <a 
                  href="tel:2108380177" 
                  className="flex items-center p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors group"
                >
                  <div className="bg-white p-2 rounded-lg text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                    <Phone size={20} />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs text-gray-500 font-medium">Call Us</p>
                    <p className="text-sm font-bold text-gray-900">210-838-0177</p>
                  </div>
                </a>

                <a 
                  href="mailto:CiQ@creativeiq.marketing" 
                  className="flex items-center p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group"
                >
                  <div className="bg-white p-2 rounded-lg text-slate-700 shadow-sm group-hover:scale-110 transition-transform">
                    <Mail size={20} />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs text-gray-500 font-medium">Email Us</p>
                    <p className="text-sm font-bold text-gray-900">CiQ@creativeiq.marketing</p>
                  </div>
                </a>
              </div>

              {/* Clean Read Button (Call to Action) */}
              <a
                href="#contact"
                onClick={closePopup}
                className="w-full inline-flex justify-center items-center py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-200 group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactPopup;

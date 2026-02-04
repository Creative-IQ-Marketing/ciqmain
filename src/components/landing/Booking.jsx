import { motion } from "framer-motion";
import { useState } from "react";

const Booking = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <section
      id="booking"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Schedule Your <span className="text-blue-600">Strategy Call</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Select a time that works for you. Let's discuss your growth goals
            and map out a plan to achieve them.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl mx-auto border border-slate-100 relative"
        >
          {/* Loading State */}
          {!iframeLoaded && (
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-slate-50 z-20 min-h-[600px]">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
              <p className="mt-4 text-slate-500 font-medium animate-pulse">
                Loading calendar...
              </p>
            </div>
          )}

          {/* GHL Widget Iframe */}
          <div className="w-full min-h-[800px] md:min-h-[700px] bg-white">
            <iframe
              src="https://link.creativeiq.marketing/widget/booking/e8POFfMswdSVwbyqmB1t"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                minHeight: "800px",
              }}
              scrolling="auto"
              id="ghl-booking-widget"
              onLoad={() => setIframeLoaded(true)}
              title="Book a Strategy Call"
            ></iframe>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-8 text-slate-400 grayscale opacity-70"
        >
          {/* Simple text or icons could go here, but keeping it clean for now */}
        </motion.div>
      </div>
    </section>
  );
};

export default Booking;

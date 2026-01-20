/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { submitToGHL } from "../../services/ghl";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [servicePulse, setServicePulse] = useState(false);

  const SERVICES_LIST = [
    {
      value: "seo",
      label: "Search Engine Optimization",
    },
    {
      value: "ppc",
      label: "Pay-Per-Click Advertising",
    },
    {
      value: "social",
      label: "Social Media Marketing",
    },
    {
      value: "crm",
      label: "CRM & Automation",
    },
    {
      value: "gmb",
      label: "Google My Business",
    },
    {
      value: "web",
      label: "Web Development",
    },
    {
      value: "other",
      label: "Other / Multiple Services",
    },
  ];

  const getServiceLabel = (serviceValue) => {
    const service = SERVICES_LIST.find((s) => s.value === serviceValue);
    return service ? service.label : serviceValue;
  };

  useEffect(() => {
    const serviceParam = searchParams.get("service");

    if (serviceParam) {
      console.log("Setting service from URL parameter:", serviceParam);

      setFormData((prev) => ({
        ...prev,
        service: serviceParam,
      }));

      setServicePulse(true);

      setTimeout(() => {
        const serviceSelect = document.getElementById("service");
        if (serviceSelect) {
          console.log("Focusing service select");
          serviceSelect.focus();
        }
      }, 800);

      setTimeout(() => {
        setServicePulse(false);
      }, 3000);
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formDataWithFullService = {
        ...formData,
        service: getServiceLabel(formData.service),
      };
      await submitToGHL(formDataWithFullService);
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
        consent: false,
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message || "Failed to submit form. Please try again.");
      console.error("Form submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Office Location",
      content: "San Antonio, Texas, USA",
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "(804) 651-2531",
      link: "tel:8046512531",
      color: "from-blue-500 to-slate-600",
    },
    {
      icon: Mail,
      title: "Email",
      content: "CiQ@creativeiq.marketing",
      link: "mailto:CiQ@creativeiq.marketing",
      color: "from-slate-700 to-slate-800",
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Mon - Fri: 9AM - 6PM",
      subContent: "Sat: 10AM - 4PM",
      color: "from-blue-600 to-slate-700",
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="contact"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-slate-300 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Let's Grow Your Business{" "}
            <span className="bg-linear-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
              Together
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Ready to take your digital marketing to the next level? Get a free
            consultation and custom strategy tailored to your business
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-8"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{
                boxShadow: "0 25px 50px -12px rgba(37, 99, 235, 0.3)",
              }}
              className="bg-linear-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-8 text-white shadow-xl text-center md:text-left"
            >
              <h3 className="text-3xl font-bold mb-3">
                Free Digital Marketing Audit
              </h3>
              <p className="text-blue-100 mb-8 leading-relaxed">
                Discover growth opportunities and see exactly how to improve
                your online presence
              </p>
              <ul className="space-y-4">
                {[
                  "Comprehensive website analysis",
                  "SEO performance review",
                  "Competitor analysis",
                  "Custom growth strategy",
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center font-medium"
                  >
                    <CheckCircle className="w-5 h-5 mr-3 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{
                      y: -8,
                      boxShadow: "0 20px 40px -10px rgba(37, 99, 235, 0.2)",
                    }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 text-center md:text-left"
                  >
                    <motion.div
                      className={`text-3xl mb-4 inline-block p-4 bg-linear-to-br ${info.color} rounded-xl shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 12 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </motion.div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">
                      {info.title}
                    </h4>
                    {info.link ? (
                      <motion.a
                        href={info.link}
                        whileHover={{ x: 4 }}
                        className="text-blue-600 hover:text-blue-800 font-semibold transition-colors inline-flex items-center gap-2"
                      >
                        {info.content}
                        <ArrowRight className="w-4 h-4" />
                      </motion.a>
                    ) : (
                      <>
                        <p className="text-gray-700 font-medium">
                          {info.content}
                        </p>
                        {info.subContent && (
                          <p className="text-gray-600 text-sm mt-1">
                            {info.subContent}
                          </p>
                        )}
                      </>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-gray-900 mb-3"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <motion.input
                  whileFocus={{ boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)" }}
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-all duration-200 font-medium"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-gray-900 mb-3"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <motion.input
                  whileFocus={{ boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)" }}
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-all duration-200 font-medium"
                  placeholder="vivacreativeiq@gmail.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-bold text-gray-900 mb-3"
                >
                  Phone Number
                </label>
                <motion.input
                  whileFocus={{ boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)" }}
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-all duration-200 font-medium"
                  placeholder="(123) 456-7890"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="service"
                  className="block text-sm font-bold text-gray-900 mb-3"
                >
                  Service Interested In <span className="text-red-500">*</span>
                </label>
                <motion.select
                  whileFocus={{ boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)" }}
                  animate={
                    servicePulse
                      ? {
                          boxShadow: [
                            "0 0 0 0px rgba(37, 99, 235, 0.7)",
                            "0 0 0 8px rgba(37, 99, 235, 0)",
                            "0 0 0 0px rgba(37, 99, 235, 0)",
                          ],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.5,
                    repeat: servicePulse ? 2 : 0,
                    ease: "easeOut",
                  }}
                  id="service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:border-blue-600 focus:outline-none transition-all duration-200 font-medium ${
                    servicePulse
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <option value="">Select a service</option>
                  {SERVICES_LIST.map((service) => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </motion.select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-bold text-gray-900 mb-3"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <motion.textarea
                  whileFocus={{ boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)" }}
                  id="message"
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-all duration-200 font-medium resize-none"
                  placeholder="Tell us about your business and your goals..."
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="w-7 h-7 border-2 border-gray-200 rounded focus:outline-none cursor-pointer mt-1 accent-black"
                />
                <label
                  htmlFor="consent"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  I consent to receive marketing messages, updates, and
                  promotional communications from CreativeIQ via email, phone,
                  or SMS.
                </label>
              </div>

              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px -10px rgba(37, 99, 235, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-linear-to-r from-blue-600 to-blue-800 text-white font-bold rounded-xl transition-all duration-200 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <p className="text-red-700 font-medium">{error}</p>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg"
                >
                  <p className="text-emerald-700 font-medium">
                    Message sent successfully! We'll be in touch soon.
                  </p>
                </motion.div>
              )}

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-gray-500 text-center"
              >
                We'll get back to you within 24 hours
              </motion.p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Kassandra Ramirez",
      role: "Business Owner",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      content:
        "Partnering with Creative IQ marketing team has been a game changer for my business. Their creativity, strategy, and passion has taken my business to the next level. Truly the best decision I've made!",
      rating: 5,
    },
    {
      name: "Fernando Jesus",
      role: "Entrepreneur",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      content:
        "Had an awesome experience working with Vilma! She's super friendly, easy to work with, and really knows her stuff. The whole process was smooth, and the final recording came out better than I expected.",
      rating: 5,
    },
    {
      name: "Sarah Mitchell",
      role: "CEO, TechFlow Inc.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      content:
        "The results have been incredible. Our organic traffic has increased by 300% and we're seeing consistent growth month over month. Highly recommend CreativeIQ!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      content:
        "Outstanding service and exceptional results. The team is professional, responsive, and truly invested in our success. Our ROI has never been better.",
      rating: 5,
    },
    {
      name: "Jessica Williams",
      role: "E-commerce Owner",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
      content:
        "CreativeIQ transformed our online presence. Their strategic approach to SEO and paid advertising has doubled our revenue in just 6 months.",
      rating: 5,
    },
    {
      name: "David Thompson",
      role: "Startup Founder",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      content:
        "Best digital marketing agency we've worked with. They understand our business goals and deliver campaigns that actually drive results. Highly professional!",
      rating: 5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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
      id="testimonials"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
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
            Client{" "}
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
              Testimonials
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Hear from our satisfied clients about their amazing results with
            CreativeIQ
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20 max-w-4xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center p-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl"
          >
            <div className="text-5xl font-bold text-white mb-3">4.9/5</div>
            <div className="text-blue-100 font-semibold mb-3">
              Average Rating
            </div>
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-amber-400 fill-amber-400"
                />
              ))}
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center p-8 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl shadow-xl"
          >
            <div className="text-5xl font-bold text-white mb-3">500+</div>
            <div className="text-slate-200 font-semibold">Happy Clients</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center p-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl"
          >
            <div className="text-5xl font-bold text-white mb-3">98%</div>
            <div className="text-blue-100 font-semibold">Retention Rate</div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(37, 99, 235, 0.15)",
              }}
              className="group bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-lg border border-blue-100 min-h-[320px] flex flex-col justify-between"
            >
              {/* Stars */}
              <div className="flex mb-6 gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              {/* Content */}
              <motion.p className="text-gray-700 mb-8 leading-relaxed text-lg font-medium italic">
                "{testimonial.content}"
              </motion.p>

              {/* Author */}
              <div className="flex items-center">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover mr-4 ring-2 ring-blue-200"
                />
                <div>
                  <div className="font-bold text-gray-900 text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-600 mb-8 text-lg">
            Ready to join our list of successful clients?
          </p>
          <motion.a
            href="#contact"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px -10px rgba(37, 99, 235, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-xl text-lg gap-2"
          >
            Start Your Success Story
            <ArrowRight className="w-6 h-6" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

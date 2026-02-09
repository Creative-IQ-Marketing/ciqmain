import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Fernando Jesus",
      role: "Entrepreneur",
      content:
        "Had an awesome experience working with Vilma! She's super friendly, easy to work with, and really knows her stuff. The whole process was smooth, and the final recording came out better than I expected. If you're looking for someone to help with digital marketing, I'd definitely recommend her.",
      rating: 5,
    },
    {
      name: "Kassandra Ramirez",
      role: "Business Owner",
      content:
        "Partnering with Creative IQ marketing team has been a game changer for my business. Their creativity, strategy, and passion has taken my business to the next level. Truly the best decision I've made!",
      rating: 5,
    },
    {
      name: "Miguel Febus",
      role: "Client",
      content:
        "Very smart and hard working company that care about there customers!!",
      rating: 5,
    },
    {
      name: "Roderick Murdock",
      role: "Local Guide / Client",
      content:
        "I have had the opportunity to work with Creative IQ and Vilma. They have gone above and beyond to help to scale businesses' digital presence and produce tangible results. Vilma is great at making marketing clear to understand.",
      rating: 5,
    },
    {
      name: "Arnold Rodriguez",
      role: "Client",
      content:
        "Where do I start, this company has gone way beyond my expectations. They are extremely friendly and very knowledgeable in their processes. I will definitely use them with future project. Thank you creativeIQ for an excellent job.",
      rating: 5,
    },
    {
      name: "Jonathan Barragan",
      role: "Local Guide / Client",
      content:
        "Amazing working with Vilma and her team! I have not only made more leads but also learned more from her in regard to marketing. Most of it goes over my head so that's why I let her handle things. Amazing and talented.",
      rating: 5,
    },
    {
      name: "Roger Guerrero",
      role: "Client",
      content:
        "We had a website created that was done quickly and efficiently. Change orders and updates to my satisfaction. Great Job Vilma!",
      rating: 5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="testimonials"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden"
    >
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-3 block">
            Client Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real results from businesses we've helped grow.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full relative group"
            >
              {/* Large Quote Icon Decoration */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-blue-50 transform rotate-180 group-hover:text-blue-100 transition-colors duration-300" />
              
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              <div className="mb-6 grow">
                <p className="text-gray-700 leading-relaxed text-lg font-medium italic">
                  "{testimonial.content}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-auto flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-blue-600 font-medium text-sm">
                    {testimonial.role}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {testimonial.name.charAt(0)}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

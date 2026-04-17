import { useState } from "react";
import { Quote, ArrowLeft, ArrowRight, Star } from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Fernando Jesus",
      role: "Entrepreneur",
      quote:
        "Had an awesome experience working with Vilma! She's super friendly, easy to work with, and really knows her stuff. The whole process was smooth, and the final recording came out better than I expected. If you're looking for someone to help with digital marketing, I'd definitely recommend her.",
    },
    {
      name: "Kassandra Ramirez",
      role: "Business Owner",
      quote:
        "Partnering with Creative IQ marketing team has been a game changer for my business. Their creativity, strategy, and passion has taken my business to the next level. Truly the best decision I've made!",
    },
    {
      name: "Miguel Febus",
      role: "Client",
      quote:
        "Very smart and hard working company that care about there customers!!",
    },
    {
      name: "Roderick Murdock",
      role: "Local Guide / Client",
      quote:
        "I have had the opportunity to work with Creative IQ and Vilma. They have gone above and beyond to help to scale businesses' digital presence and produce tangible results. Vilma is great at making marketing clear to understand.",
    },
    {
      name: "Arnold Rodriguez",
      role: "Client",
      quote:
        "Where do I start, this company has gone way beyond my expectations. They are extremely friendly and very knowledgeable in their processes. I will definitely use them with future project. Thank you creativeIQ for an excellent job.",
    },
    {
      name: "Jonathan Barragan",
      role: "Local Guide / Client",
      quote:
        "Amazing working with Vilma and her team! I have not only made more leads but also learned more from her in regard to marketing. Most of it goes over my head so that's why I let her handle things. Amazing and talented.",
    },
    {
      name: "Roger Guerrero",
      role: "Client",
      quote:
        "We had a website created that was done quickly and efficiently. Change orders and updates to my satisfaction. Great Job Vilma!",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section id="testimonials" className="py-24 text-slate-950">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-950 leading-tight">
              Here&apos;s what our
              <span className="block">clients have to say</span>
              <span className="block">about us.</span>
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-md">
              As the trusted partner for growing businesses, our clients&apos;
              experiences and results speak louder than any promise we could
              make.
            </p>
          </Motion.div>

          <div className="md:pl-12 md:border-l md:border-slate-950/10">
            <AnimatePresence mode="wait">
              <Motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <Quote className="w-8 h-8 text-blue-600" />
                <p className="text-base md:text-lg leading-relaxed text-gray-800">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div>
                  <p className="mt-4 text-sm tracking-[0.22em] uppercase text-slate-950 font-semibold">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-xs tracking-[0.15em] uppercase text-blue-600 mt-1">
                    {testimonials[currentIndex].role}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center gap-1 text-yellow-400">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={prevTestimonial}
                      className="w-10 h-10 rounded-full border border-slate-950 flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all duration-300"
                      aria-label="Previous testimonial"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="w-10 h-10 rounded-full border border-slate-950 flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all duration-300"
                      aria-label="Next testimonial"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

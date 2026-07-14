import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const testimonials = [
  {
    name: "Fernando Jesus",
    role: "Entrepreneur",
    quote:
      "Had an awesome experience working with Vilma! She's super friendly, easy to work with, and really knows her stuff.",
  },
  {
    name: "Kassandra Ramirez",
    role: "Business Owner",
    quote:
      "Partnering with Creative IQ marketing team has been a game changer for my business.",
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
      "They have gone above and beyond to help scale businesses' digital presence and produce tangible results.",
  },
  {
    name: "Arnold Rodriguez",
    role: "Client",
    quote:
      "This company has gone way beyond my expectations. Extremely friendly and very knowledgeable.",
  },
  {
    name: "Jonathan Barragan",
    role: "Local Guide / Client",
    quote:
      "Amazing working with Vilma and her team! I have not only made more leads but also learned more about marketing.",
  },
  {
    name: "Roger Guerrero",
    role: "Client",
    quote:
      "We had a website created that was done quickly and efficiently. Great Job Vilma!",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () =>
    setCurrentIndex(
      (i) => (i - 1 + testimonials.length) % testimonials.length,
    );
  const next = () =>
    setCurrentIndex((i) => (i + 1) % testimonials.length);

  return (
    <section
      id="testimonials"
      className="border-t border-black/[0.05] bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          <div className="space-y-5">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3B6FF0]">
              Testimonials
            </p>
            <h2 className="font-sans text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#0f0f0f]">
              What clients say
            </h2>
            <p className="max-w-md font-sans text-base leading-relaxed text-[#5c5c5c]">
              Results and relationships speak louder than promises.
            </p>
          </div>

          <div className="md:border-l md:border-black/[0.06] md:pl-12 lg:pl-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <p className="font-sans text-base leading-relaxed text-[#252525] md:text-lg">
                  &ldquo;{testimonials[currentIndex].quote}&rdquo;
                </p>
                <div>
                  <p className="font-sans text-sm font-semibold text-[#0f0f0f]">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="mt-1 font-sans text-xs font-medium uppercase tracking-[0.12em] text-[#737373]">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between border-t border-black/[0.06] pt-6">
              <p className="font-sans text-xs text-[#737373]">
                {currentIndex + 1} of {testimonials.length}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d4d4d4] text-[#252525] transition hover:border-[#aaa]"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={16} strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d4d4d4] text-[#252525] transition hover:border-[#aaa]"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={16} strokeWidth={1.75} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

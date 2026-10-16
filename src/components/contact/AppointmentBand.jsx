import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Check, MessageSquare } from "lucide-react";
import vilmaWide from "../../assets/vilma/vilma-phone-wide.webp";
import vilmaTall from "../../assets/vilma/vilma-phone-tall.webp";
import { PHONE_SMS } from "../../utils/contact";
import { trackButtonClick } from "../../services/analytics";
import { Button } from "../ui/button";

const EASE = [0.22, 1, 0.36, 1];

/**
 * The appointment, set on Vilma's own photo. The full frame is the
 * background (no cutout); the agenda sits on a frosted card over the quiet
 * side of the room, so she stays visible on her phone beside it.
 */
export default function AppointmentBand({ title, intro, points }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative isolate overflow-hidden bg-[var(--c-ink)]">
      <motion.picture
        className="absolute inset-0 -z-10 block"
        initial={reduce ? false : { scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <source media="(min-width: 1024px)" srcSet={vilmaWide} />
        <img
          src={vilmaTall}
          alt="Vilma Tovar, founder of CreativeIQ, on her phone"
          width={800}
          height={1000}
          loading="lazy"
          decoding="async"
          className="h-full w-full max-w-none object-cover object-[50%_12%] lg:w-[118%] lg:object-[0%_14%]"
        />
      </motion.picture>
      {/* keeps the card side calm without hiding her */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/55 via-black/10 to-transparent lg:bg-gradient-to-r lg:from-black/50 lg:via-black/15 lg:to-transparent"
      />

      <div className="mx-auto flex min-h-[38rem] max-w-[var(--container-max)] items-end px-[var(--container-pad)] pb-6 pt-[22rem] sm:pt-[26rem] lg:min-h-[44rem] lg:items-center lg:py-20">
        <motion.div
          className="w-full max-w-[30rem] rounded-[var(--radius-card)] bg-white/90 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-md sm:p-8"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--c-accent)]">
            With Vilma Tovar
          </p>
          <h2 className="mt-2 font-sans text-[clamp(1.75rem,3vw,2.4rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[var(--c-ink)] text-balance">
            {title}
          </h2>
          <p className="mt-4 font-sans text-[15px] text-[var(--c-text-secondary)]">
            {intro}
          </p>
          <ul className="mt-3 space-y-2.5">
            {points.map((point) => (
              <li
                key={point}
                className="flex gap-3 font-sans text-[15px] leading-snug text-[var(--c-ink)]"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--c-accent)] text-white">
                  <Check size={12} strokeWidth={3} aria-hidden />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild>
              <Link
                to="/book"
                onClick={() =>
                  trackButtonClick("Book appointment", "appointment_band", "HomeContact")
                }
              >
                <Calendar size={15} strokeWidth={1.75} aria-hidden />
                Book the appointment
              </Link>
            </Button>
            <a
              href={PHONE_SMS}
              onClick={() =>
                trackButtonClick("Text Vilma", "appointment_band", "HomeContact")
              }
              className="inline-flex items-center justify-center gap-2 font-sans text-[15px] font-semibold text-[var(--c-accent)] transition hover:text-[#2f5ad4]"
            >
              <MessageSquare size={15} strokeWidth={1.75} aria-hidden />
              Text Vilma
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

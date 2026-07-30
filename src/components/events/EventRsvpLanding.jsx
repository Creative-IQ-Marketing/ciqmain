import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ACTIVE_EVENT } from "../../data/activeEvent";
import EventRsvpForm from "./EventRsvpForm";

/**
 * Full-bleed flyer + RSVP card. Driven by ACTIVE_EVENT.
 */
export default function EventRsvpLanding() {
  const { flyerImg, flyerAlt, name, theme } = ACTIVE_EVENT;

  return (
    <div
      className="relative min-h-dvh overflow-hidden"
      style={{ backgroundColor: theme.ink }}
    >
      <img
        src={flyerImg}
        alt={flyerAlt}
        className="absolute inset-0 h-full w-full object-cover object-top"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-dvh items-start justify-center px-4 pb-12 pt-[38vh] sm:px-6 sm:pt-[40vh] md:pt-[42vh] lg:pt-[44vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full justify-center"
        >
          <EventRsvpForm />
        </motion.div>
      </div>

      <Link
        to="/"
        className="absolute left-4 top-4 z-20 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#1a1410] shadow-[0_2px_8px_rgba(0,0,0,0.25)] backdrop-blur-sm transition hover:bg-white sm:left-6 sm:top-6"
      >
        ← CreativeIQ home
      </Link>

      <p className="pointer-events-none absolute bottom-4 left-0 right-0 z-10 text-center font-sans text-[11px] text-white/50">
        {name}
      </p>
    </div>
  );
}

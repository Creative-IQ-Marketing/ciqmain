import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, MapPin, X } from "lucide-react";
import { useRsvp } from "../../context/RsvpContext";
import BusinessUnpluggedForm from "../landing/BusinessUnpluggedForm";

export default function BusinessUnpluggedModal() {
  const { open, closeRsvp } = useRsvp();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          onClick={closeRsvp}
        >
          <div className="absolute inset-0 bg-slate-900/55 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-slate-200 bg-white shadow-2xl sm:max-h-[90dvh] sm:max-w-lg sm:rounded-2xl"
          >
            <button
              type="button"
              onClick={closeRsvp}
              aria-label="Close RSVP"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
            >
              <X size={16} />
            </button>

            <div className="shrink-0 border-b border-slate-100 px-6 pb-5 pt-8 sm:px-8 sm:pt-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b8943f]">
                You&apos;re invited
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-[1.65rem]">
                Business Unplugged
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                An evening of connection, conversation, and cocktails at Hotel
                Valencia Riverwalk.
              </p>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={14} className="text-[#b8943f]" aria-hidden="true" />
                  Aug 6 · 5:30 – 8:00 PM
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#b8943f]" aria-hidden="true" />
                  Hotel Valencia, San Antonio
                </span>
              </div>
            </div>

            <div className="overflow-y-auto px-6 py-5 sm:px-8 sm:py-6">
              <BusinessUnpluggedForm embedded onClose={closeRsvp} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

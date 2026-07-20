import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * In-page lane tabs (quiet) + floating < label > pill once you scroll past them.
 */
export default function ServicesLaneSwitch({ lanes, value, onChange }) {
  const reduceMotion = useReducedMotion();
  const railRef = useRef(null);
  const [showFloat, setShowFloat] = useState(false);

  const index = Math.max(
    0,
    lanes.findIndex((l) => l.id === value),
  );
  const active = lanes[index] || lanes[0];

  useEffect(() => {
    const el = railRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setShowFloat(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = useCallback(
    (dir) => {
      const next = (index + dir + lanes.length) % lanes.length;
      onChange(lanes[next].id);
    },
    [index, lanes, onChange],
  );

  return (
    <>
      <div
        ref={railRef}
        id="services-lanes"
        className="scroll-mt-[var(--hero-header-offset)] border-b border-[var(--c-border)] bg-white"
      >
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)]">
          <div
            role="tablist"
            aria-label="Service lanes"
            className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {lanes.map((lane) => {
              const selected = lane.id === value;
              return (
                <button
                  key={lane.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`services-panel-${lane.id}`}
                  id={`services-tab-${lane.id}`}
                  onClick={() => onChange(lane.id)}
                  className={`relative shrink-0 px-3 py-3.5 font-sans text-sm tracking-[-0.02em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] sm:px-4 ${
                    selected
                      ? "font-semibold text-[var(--c-ink)]"
                      : "font-medium text-[var(--c-text-muted)] hover:text-[var(--c-ink)]"
                  }`}
                >
                  {lane.label}
                  {selected ? (
                    <span
                      className="absolute inset-x-3 bottom-0 h-0.5 bg-[var(--c-accent)] sm:inset-x-4"
                      aria-hidden
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showFloat ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4 bottom-[calc(var(--site-mobile-banner-height,0px)+1.25rem+env(safe-area-inset-bottom,0px))] lg:bottom-8"
          >
            <div
              role="group"
              aria-label="Switch service lane"
              className="pointer-events-auto flex items-center gap-0.5 rounded-full bg-[var(--c-ink)] py-1.5 pl-1.5 pr-1.5 text-white shadow-[0_16px_40px_-18px_rgba(15,15,15,0.55)]"
            >
              <button
                type="button"
                aria-label="Previous lane"
                onClick={() => go(-1)}
                className="flex size-10 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)]"
              >
                <ChevronLeft className="size-5" strokeWidth={1.75} />
              </button>
              <p className="min-w-[8.5rem] px-2 text-center font-sans text-[13px] font-semibold tracking-[-0.02em] sm:min-w-[10rem] sm:text-sm">
                {active?.label}
              </p>
              <button
                type="button"
                aria-label="Next lane"
                onClick={() => go(1)}
                className="flex size-10 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)]"
              >
                <ChevronRight className="size-5" strokeWidth={1.75} />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { ArrowUpRight, CalendarPlus } from "lucide-react";
import {
  daysUntil,
  eventDateParts,
  googleCalendarUrl,
  splitEvents,
} from "../../data/events";
import { trackButtonClick } from "../../services/analytics";

const ease = [0.22, 1, 0.36, 1];

const MathClamp = (v) => Math.max(-1, Math.min(1, v));

function useIsDesktop() {
  const [desktop, setDesktop] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setDesktop(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return desktop;
}

/**
 * Homepage Events — directly beneath the hero. Copy and details are HTML;
 * the 3D event passes (eventPassScene.js) load lazily beside them.
 */
export default function EventsShowcase() {
  const { upcoming, past } = useMemo(() => splitEvents(), []);
  const next = upcoming[0] || null;
  const recent = past.slice(0, 2);
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();

  const wrapRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: desktop ? ["start 80%", "end 25%"] : ["start 85%", "end 40%"],
  });

  const passes = useMemo(
    () =>
      [...(next ? [next] : []), ...recent].map((e, i) => ({
        flyer: e.flyer,
        name: e.name,
        dateLabel: eventDateParts(e.date).long,
        featured: i === 0 && Boolean(next),
      })),
    [next, recent],
  );

  return (
    <section
      id="events"
      aria-labelledby="events-heading"
      className="relative z-10 scroll-mt-20 bg-[var(--c-footer)] text-white"
    >
      <div ref={wrapRef} className="relative">
        <div className="relative">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 60% at 72% 42%, rgba(59,111,240,0.24), transparent 65%), radial-gradient(ellipse 40% 50% at 10% 100%, rgba(59,111,240,0.08), transparent 70%)",
            }}
            aria-hidden
          />

          <div className="relative mx-auto grid max-w-[var(--container-max)] gap-8 px-[var(--container-pad)] pb-14 pt-16 lg:static lg:min-h-[41rem] lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-20">
            <div className="order-2 lg:order-1 lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease }}
              >
                <p className="text-sm font-medium text-white/50">
                  Events by CIQ
                </p>
              </motion.div>

              {next ? <NextEvent event={next} /> : <NoUpcoming />}
            </div>

            <div className="order-1 -mt-16 lg:static lg:order-2 lg:col-span-7 lg:mt-0 lg:h-full">
              <PassStage
                passes={passes}
                progress={scrollYProgress}
                reduce={reduce}
                fallback={next || recent[0]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NextEvent({ event }) {
  const d = eventDateParts(event.date);
  const days = daysUntil(event.date);
  const when =
    days === 0 ? "Tonight" : days === 1 ? "Tomorrow" : `In ${days} days`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.08, ease }}
      className="mt-10"
      aria-label={`Next event: ${event.name}`}
    >
      <p className="flex items-center gap-2 text-[0.8125rem] font-semibold text-white/70">
        <span className="relative flex h-2 w-2" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--c-accent)] opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--c-accent)]" />
        </span>
        Next up · {when}
      </p>

      <div className="mt-5 flex items-center gap-5">
        <div className="flex w-[4.5rem] shrink-0 flex-col items-center rounded-[var(--radius-control)] border border-white/15 bg-white/[0.04] py-2.5">
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[var(--c-accent)]">
            {d.month}
          </span>
          <span className="text-[2rem] font-extrabold leading-none tracking-[-0.04em]">
            {d.day}
          </span>
        </div>
        <div className="min-w-0">
          <h3 className="text-[clamp(1.5rem,2.4vw,1.9rem)] font-extrabold leading-tight tracking-[-0.03em]">
            {event.name}
          </h3>
          <p className="mt-1 text-sm text-white/55">{event.host}</p>
        </div>
      </div>

      <p className="mt-6 text-[0.95rem] leading-relaxed text-white/80">
        {d.weekday} · {event.time}
        <br />
        {event.venue} · {event.address.split(",")[0]}
      </p>
      <p className="mt-3 text-sm text-white/50">
        {event.entry} · Live music by Austin Ausley
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={event.rsvpUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackButtonClick(`RSVP ${event.name}`, "home_events", "Events")
          }
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--c-accent)] px-6 text-[0.95rem] font-semibold text-white transition hover:bg-white hover:text-[var(--c-ink)]"
        >
          RSVP now <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
        <a
          href={googleCalendarUrl(event)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackButtonClick("Add to calendar", "home_events", "Events")
          }
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-white/20 px-6 text-[0.95rem] font-semibold text-white transition hover:border-white/60"
        >
          <CalendarPlus className="h-4 w-4" aria-hidden /> Add to calendar
        </a>
      </div>
    </motion.article>
  );
}

function NoUpcoming() {
  return (
    <div className="mt-8 max-w-md">
      <p className="text-lg font-semibold">The next one is being planned.</p>
      <p className="mt-2 text-white/60">
        Get the invite first — events go to our newsletter before anywhere else.
      </p>
      <a
        href="/newsletter"
        className="mt-6 inline-flex min-h-12 items-center rounded-[var(--radius-pill)] bg-[var(--c-accent)] px-6 font-semibold"
      >
        Get event invites
      </a>
    </div>
  );
}

/** Lazily mounts the WebGL passes; flyer image if WebGL is unavailable. */
function PassStage({ passes, progress, reduce, fallback }) {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return undefined;
    const host = box.closest("section") || box;
    const onMove = (e) => {
      if (e.pointerType !== "mouse") return;
      const r = box.getBoundingClientRect();
      sceneRef.current?.setPointer(
        MathClamp(((e.clientX - r.left) / r.width) * 2 - 1),
        MathClamp(((e.clientY - r.top) / r.height) * 2 - 1),
      );
    };
    const onLeave = () => sceneRef.current?.setPointer(0, 0);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    let disposed = false;
    let visIO;

    const loadIO = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        loadIO.disconnect();
        try {
          const { createEventPassScene } = await import("./eventPassScene");
          if (disposed) return;
          const scene = createEventPassScene(canvasRef.current, {
            passes,
            reducedMotion: Boolean(reduce),
          });
          sceneRef.current = scene;
          scene.setProgress(reduce ? 1 : progress.get());
          setReady(true);
          visIO = new IntersectionObserver(([e]) =>
            scene.setVisible(e.isIntersecting),
          );
          visIO.observe(box);
        } catch (err) {
          console.warn("[events] 3D unavailable, showing flyer", err);
          setFailed(true);
        }
      },
      { rootMargin: "600px 0px" },
    );
    loadIO.observe(box);

    return () => {
      disposed = true;
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      loadIO.disconnect();
      visIO?.disconnect();
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [passes, reduce, progress]);

  useMotionValueEvent(progress, "change", (v) => {
    if (!reduce) sceneRef.current?.setProgress(v);
  });

  return (
    <div
      ref={boxRef}
      className="relative mx-auto aspect-[1/1] w-full max-w-[28rem] sm:aspect-[5/4] sm:max-w-none lg:pointer-events-none lg:w-auto lg:absolute lg:bottom-[-9rem] lg:left-[34%] lg:right-0 lg:top-0 lg:z-20 lg:aspect-auto lg:max-w-none"
    >
      {failed ? (
        fallback ? (
          <img
            src={fallback.flyer}
            alt={fallback.flyerAlt}
            className="absolute inset-0 m-auto max-h-[85%] rounded-[var(--radius-card)] object-contain shadow-[var(--shadow-frame)]"
            loading="lazy"
          />
        ) : null
      ) : (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
          aria-hidden
        />
      )}
      {fallback && !failed ? (
        <span className="sr-only">{fallback.flyerAlt}</span>
      ) : null}
    </div>
  );
}

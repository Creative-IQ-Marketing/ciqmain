import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowUpRight, CalendarPlus, MapPin, Ticket } from "lucide-react";
import {
  daysUntil,
  eventDateParts,
  googleCalendarUrl,
  splitEvents,
} from "../../data/events";
import { trackButtonClick } from "../../services/analytics";

const ease = [0.22, 1, 0.36, 1];

function useIsDesktop() {
  const [desktop, setDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches,
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
  const recent = past.slice(0, 3);
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();

  const wrapRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: desktop ? ["start start", "end end"] : ["start 85%", "end 40%"],
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
      className="relative scroll-mt-20 bg-[var(--c-footer)] text-white"
    >
      <div ref={wrapRef} className="relative lg:h-[210vh]">
        <div className="relative overflow-hidden lg:sticky lg:top-0 lg:h-[100svh]">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 60% at 72% 42%, rgba(59,111,240,0.24), transparent 65%), radial-gradient(ellipse 40% 50% at 10% 100%, rgba(59,111,240,0.08), transparent 70%)",
            }}
            aria-hidden
          />

          <div className="relative mx-auto grid h-full max-w-[var(--container-max)] lg:static gap-8 px-[var(--container-pad)] pb-14 pt-16 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-0">
            <div className="order-2 lg:order-1 lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease }}
              >
                <p className="text-sm font-medium text-white/50">Events by CIQ</p>
                <h2
                  id="events-heading"
                  className="mt-3 text-[clamp(1.9rem,3.6vw,3rem)] font-extrabold leading-[1.06] tracking-[-0.04em] text-balance"
                >
                  Business is built
                  <span className="text-[var(--c-accent)]"> in the room.</span>
                </h2>
              </motion.div>

              {next ? <NextEvent event={next} /> : <NoUpcoming />}

              {recent.length ? (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: 0.15, ease }}
                  className="mt-10"
                >
                  <h3 className="text-xs font-semibold uppercase tracking-[var(--tracking-label)] text-white/45">
                    Recent
                  </h3>
                  <ul className="mt-3 divide-y divide-white/10 border-y border-white/10">
                    {recent.map((e) => {
                      const d = eventDateParts(e.date);
                      return (
                        <li key={e.id} className="flex items-baseline gap-4 py-3 text-sm">
                          <span className="w-14 shrink-0 font-semibold tabular-nums text-white/45">
                            {d.month} {d.day}
                          </span>
                          <span className="min-w-0 flex-1 truncate font-semibold text-white/85">
                            {e.name}
                          </span>
                          <span className="hidden truncate text-white/45 sm:block">{e.venue}</span>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              ) : null}
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
  const when = days === 0 ? "Tonight" : days === 1 ? "Tomorrow" : `In ${days} days`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.08, ease }}
      className="mt-8"
      aria-label={`Next event: ${event.name}`}
    >
      <p className="flex items-center gap-2 text-[0.8125rem] font-semibold text-white/70">
        <span className="relative flex h-2 w-2" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--c-accent)] opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--c-accent)]" />
        </span>
        Next up · {when}
      </p>

      <div className="mt-5 flex items-start gap-5">
        <div className="flex w-[4.5rem] shrink-0 flex-col items-center rounded-[var(--radius-control)] border border-white/15 bg-white/[0.04] py-2.5">
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[var(--c-accent)]">
            {d.month}
          </span>
          <span className="text-[2rem] font-extrabold leading-none tracking-[-0.04em]">{d.day}</span>
          <span className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/45">
            {d.weekday.slice(0, 3)}
          </span>
        </div>
        <div className="min-w-0">
          <h3 className="text-[clamp(1.5rem,2.4vw,1.9rem)] font-extrabold leading-tight tracking-[-0.03em]">
            {event.name}
          </h3>
          <p className="mt-1 text-sm text-white/55">
            {event.kind} · Hosted by {event.host}
          </p>
          <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-white/70">{event.blurb}</p>
        </div>
      </div>

      <dl className="mt-6 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
        <div className="flex gap-2.5">
          <dt className="sr-only">When</dt>
          <CalendarPlus className="mt-0.5 h-4 w-4 shrink-0 text-[var(--c-accent)]" aria-hidden />
          <dd className="text-white/80">
            {d.weekday}, {d.long.replace(`, ${d.year}`, "")}
            <br />
            <span className="text-white/50">{event.time}</span>
          </dd>
        </div>
        <div className="flex gap-2.5">
          <dt className="sr-only">Where</dt>
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--c-accent)]" aria-hidden />
          <dd className="text-white/80">
            {event.venue}
            <br />
            <span className="text-white/50">{event.address.split(",")[0]}</span>
          </dd>
        </div>
      </dl>

      {event.highlights?.length ? (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Highlights">
          <li className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-[var(--c-accent)]/15 px-3 py-1 text-xs font-semibold text-white">
            <Ticket className="h-3.5 w-3.5 text-[var(--c-accent)]" aria-hidden />
            {event.entry}
          </li>
          {event.highlights.map((h) => (
            <li
              key={h}
              className="rounded-[var(--radius-pill)] border border-white/12 px-3 py-1 text-xs font-medium text-white/70"
            >
              {h}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <a
          href={event.rsvpUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackButtonClick(`RSVP ${event.name}`, "home_events", "Events")}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--c-accent)] px-6 text-[0.95rem] font-semibold text-white transition hover:bg-white hover:text-[var(--c-ink)]"
        >
          RSVP now <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
        <a
          href={googleCalendarUrl(event)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackButtonClick("Add to calendar", "home_events", "Events")}
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
          visIO = new IntersectionObserver(([e]) => scene.setVisible(e.isIntersecting));
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
      loadIO.disconnect();
      visIO?.disconnect();
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [passes, reduce, progress]);

  useMotionValueEvent(progress, "change", (v) => {
    if (!reduce) sceneRef.current?.setProgress(v);
  });

  function onPointerMove(e) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    sceneRef.current?.setPointer(
      ((e.clientX - r.left) / r.width) * 2 - 1,
      ((e.clientY - r.top) / r.height) * 2 - 1,
    );
  }

  return (
    <div
      ref={boxRef}
      onPointerMove={onPointerMove}
      onPointerLeave={() => sceneRef.current?.setPointer(0, 0)}
      className="relative mx-auto aspect-[1/1] w-full max-w-[28rem] sm:aspect-[5/4] sm:max-w-none lg:absolute lg:inset-y-0 lg:left-[40%] lg:right-0 lg:aspect-auto lg:max-w-none"
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
      {fallback && !failed ? <span className="sr-only">{fallback.flyerAlt}</span> : null}
    </div>
  );
}

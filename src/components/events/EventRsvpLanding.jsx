import { motion } from "framer-motion";
import { ACTIVE_EVENT } from "../../data/activeEvent";
import kpnLogo from "../../assets/events/kpn-logo.png";
import EventRsvpForm from "./EventRsvpForm";
import "../../styles/lets-connect.css";

const ease = [0.16, 1, 0.3, 1];

export default function EventRsvpLanding() {
  const {
    name,
    host,
    tagline,
    schedule,
    time,
    addressShort,
    city,
    blurb,
    venue,
    perks,
    featuredName,
  } = ACTIVE_EVENT;

  const phrase = `${tagline.replace(/ · /g, "  ·  ")}  ·  `;
  const marqueeLine = Array.from({ length: 8 }, () => phrase).join("");
  const first = featuredName?.split(" ")[0] || "";
  const last = featuredName?.split(" ").slice(1).join(" ") || "";

  return (
    <div className="lc-page relative">
      <header className="relative isolate min-h-[100dvh] overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 20% 30%, rgba(212,179,122,0.1), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(21,34,56,0.95), transparent 50%)",
          }}
          aria-hidden
        />
        <p
          className="lc-display pointer-events-none absolute -left-6 bottom-[8%] select-none text-[clamp(7rem,22vw,16rem)] font-extrabold leading-none tracking-tighter text-[rgba(236,231,220,0.04)] lg:bottom-[12%] lg:left-0"
          aria-hidden
        >
          08
        </p>

        <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col px-5 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex items-center justify-between gap-4"
          >
            <img
              src={kpnLogo}
              alt={host}
              className="h-12 w-auto max-w-[min(100%,16rem)] object-contain object-left brightness-0 invert sm:h-14 sm:max-w-none lg:h-[4.5rem]"
              width={413}
              height={172}
              decoding="async"
            />
            <a href="#rsvp" className="lc-btn-outline hidden sm:inline-flex">
              RSVP
            </a>
          </motion.div>

          <div className="mt-auto grid flex-1 items-end gap-12 pb-6 pt-16 lg:grid-cols-12 lg:gap-16 lg:pb-10 lg:pt-24">
            <div className="min-w-0 lg:col-span-7">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease }}
                className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d4b37a]"
              >
                {host}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.16, ease }}
                className="lc-display mt-5 max-w-[11ch] text-[clamp(3.2rem,9.5vw,7rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em] text-[#ece7dc]"
              >
                Let&apos;s
                <span className="mt-2 block pb-1 text-[#d4b37a] italic normal-case leading-[1.05] tracking-[-0.03em]">
                  Connect
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.32, ease }}
                className="mt-8 max-w-md text-[15px] leading-relaxed text-[#c9c2b4] sm:mt-10 sm:text-base"
              >
                {blurb}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.42, ease }}
                className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
              >
                <a href="#rsvp" className="lc-btn-gold w-full sm:w-auto">
                  Reserve your spot
                </a>
                <p className="text-sm text-[#8b93a1] sm:pl-1">
                  Free entry · Free parking
                </p>
              </motion.div>
            </div>

            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.35, ease }}
              className="relative z-10 border-t border-[rgba(236,231,220,0.12)] pt-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-1"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d4b37a]">
                Next gathering
              </p>
              <div className="mt-4 flex items-end gap-3">
                <p className="lc-display text-5xl font-bold tracking-tight text-[#ece7dc] sm:text-6xl">
                  08.19
                </p>
                <p className="mb-1.5 text-sm text-[#8b93a1]">2026</p>
              </div>

              <div className="mt-10 space-y-6">
                <Meta label="When" value={`Wednesday\n${time}`} />
                <Meta label="Where" value={`${addressShort}\n${city}`} />
                {featuredName ? (
                  <Meta label="Music" value={`${featuredName}\nLive set`} />
                ) : null}
              </div>
            </motion.aside>
          </div>
        </div>
      </header>

      <div className="overflow-hidden border-y border-[rgba(236,231,220,0.12)] bg-[#0c1526] py-3.5">
        <div className="lc-marquee-track">
          <p className="lc-display px-4 text-sm font-bold uppercase tracking-[0.35em] text-[rgba(212,179,122,0.9)]">
            {marqueeLine}
          </p>
          <p
            className="lc-display px-4 text-sm font-bold uppercase tracking-[0.35em] text-[rgba(212,179,122,0.9)]"
            aria-hidden
          >
            {marqueeLine}
          </p>
        </div>
      </div>

      <section className="relative bg-[#0c1526]">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-col justify-between border-b border-[rgba(236,231,220,0.12)] px-5 py-14 sm:px-8 sm:py-20 lg:col-span-5 lg:border-b-0 lg:border-r lg:px-12 lg:py-24"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d4b37a]">
                The evening
              </p>
              <h2 className="lc-display mt-5 text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-[#ece7dc]">
                Meaningful connections.
                <span className="mt-2 block text-[#d4b37a]">
                  Great conversations.
                </span>
              </h2>
            </div>
            <p className="mt-12 max-w-sm text-[15px] leading-relaxed text-[#c9c2b4] lg:mt-16">
              Professionals, entrepreneurs, and leaders — one room, one night,
              hosted by {host} at {venue}.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            className="relative flex flex-col justify-end px-5 py-14 sm:px-8 sm:py-20 lg:col-span-7 lg:px-12 lg:py-24"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8b93a1]">
              Live music
            </p>
            <p className="lc-display mt-4 text-[clamp(3rem,10vw,6.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-[#ece7dc]">
              {first}
              <span className="block text-[#d4b37a]">{last}</span>
            </p>
            <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-[rgba(236,231,220,0.12)] pt-8">
              <p className="max-w-xs text-sm leading-relaxed text-[#c9c2b4]">
                An acoustic set to set the tone while you meet new partners,
                clients, and collaborators.
              </p>
              <p className="lc-display text-xs font-bold uppercase tracking-[0.2em] text-[#d4b37a]">
                {perks.join("  ·  ")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="rsvp" className="scroll-mt-4 bg-[#070d18]">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease }}
            className="order-2 border-t border-[rgba(236,231,220,0.12)] px-5 py-12 sm:px-8 sm:py-16 lg:order-1 lg:col-span-5 lg:border-r lg:border-t-0 lg:px-12 lg:py-24"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d4b37a]">
              Reserve
            </p>
            <h2 className="lc-display mt-4 text-[clamp(2.1rem,4vw,3rem)] font-bold leading-[1.05] tracking-tight text-[#ece7dc]">
              Save your place.
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[#c9c2b4]">
              Confirmation by email and text. Reminder the day before — and
              again before doors.
            </p>

            <dl className="mt-12 divide-y divide-[rgba(236,231,220,0.12)] border-y border-[rgba(236,231,220,0.12)]">
              <Row term="Date" def={schedule} />
              <Row term="Time" def={time} />
              <Row term="Place" def={`${addressShort}, ${city}`} />
              <Row term="Cost" def={perks.join(" · ")} />
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.06, ease }}
            className="order-1 px-5 py-12 sm:px-8 sm:py-16 lg:order-2 lg:col-span-7 lg:px-12 lg:py-24"
          >
            <EventRsvpForm />
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-[rgba(236,231,220,0.12)] bg-[#070d18]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-12 lg:px-12">
          <div className="flex items-center gap-5">
            <img
              src={kpnLogo}
              alt=""
              className="h-10 w-auto max-w-[13rem] object-contain brightness-0 invert sm:h-11"
              width={413}
              height={172}
              aria-hidden
            />
            <div
              className="hidden h-8 w-px bg-[rgba(236,231,220,0.12)] sm:block"
              aria-hidden
            />
            <p className="text-xs text-[#8b93a1] sm:text-sm">{host}</p>
          </div>
          <p className="lc-display text-[11px] font-bold uppercase tracking-[0.2em] text-[rgba(236,231,220,0.4)]">
            {name} · 08.19.26
          </p>
        </div>
      </footer>
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8b93a1]">
        {label}
      </p>
      <p className="mt-1.5 whitespace-pre-line text-sm leading-snug text-[#ece7dc]">
        {value}
      </p>
    </div>
  );
}

function Row({ term, def }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-4">
      <dt className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b93a1]">
        {term}
      </dt>
      <dd className="text-right text-sm text-[#ece7dc]">{def}</dd>
    </div>
  );
}

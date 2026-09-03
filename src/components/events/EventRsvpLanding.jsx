import { motion } from "framer-motion";
import { ACTIVE_EVENT, getEventRsvpUrl } from "../../data/activeEvent";
import ciqLogo from "../../assets/mainLogo.webp";
import EventRsvpForm from "./EventRsvpForm";
import "../../styles/lets-connect.css";

const CIQ_URL = "https://creativeiqmarketing.com";
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
    featuredLabel,
    flyerImg,
    flyerAlt,
    nextDate,
    mode,
  } = ACTIVE_EVENT;

  const rsvpHref = getEventRsvpUrl();
  const isExternal = mode === "external" && /^https?:\/\//i.test(rsvpHref);
  const phrase = `${tagline.replace(/ · /g, "  ·  ")}  ·  `;
  const marqueeLine = Array.from({ length: 8 }, () => phrase).join("");
  const dateParts = nextDate ? nextDate.split("-") : [];
  const monthDay =
    dateParts.length === 3
      ? `${dateParts[1]}.${dateParts[2]}`
      : schedule.split(",")[0];
  const year = dateParts[0] || "2026";
  const headlineBits = name.trim().split(/\s+/);
  const headlineLead = headlineBits.slice(0, -1).join(" ") || name;
  const headlineAccent = headlineBits.length > 1 ? headlineBits.at(-1) : "";

  return (
    <div className="lc-page relative">
      <header className="relative isolate min-h-[100dvh] overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 20% 30%, rgba(200,16,46,0.12), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(21,34,56,0.95), transparent 50%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col px-5 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex items-center justify-between gap-4"
          >
            <p className="max-w-[16rem] text-sm font-semibold tracking-tight text-[#ece7dc] sm:text-base">
              {host}
            </p>
            <a
              href={isExternal ? rsvpHref : "#rsvp"}
              {...(isExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="lc-btn-outline hidden sm:inline-flex"
            >
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
                className="lc-display mt-5 max-w-[14ch] text-[clamp(2.8rem,8.5vw,6.25rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em] text-[#ece7dc]"
              >
                {headlineLead}
                {headlineAccent ? (
                  <span className="mt-2 block pb-1 text-[#d4b37a] italic normal-case leading-[1.05] tracking-[-0.03em]">
                    {headlineAccent}
                  </span>
                ) : null}
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
                <a
                  href={isExternal ? rsvpHref : "#rsvp"}
                  {...(isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="lc-btn-gold w-full sm:w-auto"
                >
                  {isExternal ? "RSVP on event site" : "Reserve your spot"}
                </a>
                <p className="text-sm text-[#8b93a1] sm:pl-1">
                  {perks.slice(0, 3).join(" · ")}
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
                Next event
              </p>
              <div className="mt-4 flex items-end gap-3">
                <p className="lc-display text-5xl font-bold tracking-tight text-[#ece7dc] sm:text-6xl">
                  {monthDay}
                </p>
                <p className="mb-1.5 text-sm text-[#8b93a1]">{year}</p>
              </div>

              <div className="mt-10 space-y-6">
                <Meta label="When" value={`${schedule}\n${time}`} />
                <Meta label="Where" value={`${venue}\n${addressShort}\n${city}`} />
                {featuredName ? (
                  <Meta
                    label={featuredLabel || "Host"}
                    value={featuredName}
                  />
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
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="lg:col-span-5"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d4b37a]">
              The day
            </p>
            <h2 className="lc-display mt-5 text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-[#ece7dc]">
              Cars on the field.
              <span className="mt-2 block text-[#d4b37a]">Blood that saves lives.</span>
            </h2>
            <p className="mt-8 max-w-sm text-[15px] leading-relaxed text-[#c9c2b4]">
              Hosted by {host} at {venue}. Spectators are free — RSVP so the tent
              has a count.
            </p>
            <p className="lc-display mt-10 text-xs font-bold uppercase tracking-[0.2em] text-[#d4b37a]">
              {perks.join("  ·  ")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            className="lg:col-span-7"
          >
            <img
              src={flyerImg}
              alt={flyerAlt}
              className="w-full rounded-sm border border-[rgba(236,231,220,0.12)] shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
              width={1200}
              height={1500}
              decoding="async"
            />
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
              {isExternal ? "Join us on Oct 10." : "Save your place."}
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[#c9c2b4]">
              {isExternal
                ? "RSVP, register your show car, or apply as a vendor on the official Dominion Rotary event page."
                : "Confirmation by email and text. Reminder the day before — and again before doors."}
            </p>

            <dl className="mt-12 divide-y divide-[rgba(236,231,220,0.12)] border-y border-[rgba(236,231,220,0.12)]">
              <Row term="Date" def={schedule} />
              <Row term="Time" def={time} />
              <Row term="Place" def={`${venue}, ${city}`} />
              <Row term="Notes" def="Spectators free · Show-car registration available" />
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.06, ease }}
            className="order-1 px-5 py-12 sm:px-8 sm:py-16 lg:order-2 lg:col-span-7 lg:px-12 lg:py-24"
          >
            {isExternal ? (
              <div className="rounded-sm border border-[rgba(236,231,220,0.12)] bg-[#0c1526] p-6 sm:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d4b37a]">
                  Official RSVP
                </p>
                <h3 className="lc-display mt-4 text-2xl font-bold tracking-tight text-[#ece7dc] sm:text-3xl">
                  Continue on dominionrotarysatx.com
                </h3>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#c9c2b4]">
                  Spectator RSVP, vehicle registration, vendor, and sponsor
                  forms live on the event site.
                </p>
                <a
                  href={rsvpHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lc-btn-gold mt-8 inline-flex w-full sm:w-auto"
                >
                  Open Car Show RSVP
                </a>
              </div>
            ) : (
              <EventRsvpForm />
            )}
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-[rgba(236,231,220,0.12)] bg-[#070d18]">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#8b93a1]">{host}</p>
            <p className="lc-display text-[11px] font-bold uppercase tracking-[0.2em] text-[rgba(236,231,220,0.4)]">
              {name} · {monthDay}.{String(year).slice(-2)}
            </p>
          </div>

          <div className="flex flex-col gap-4 border-t border-[rgba(236,231,220,0.12)] pt-8 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={CIQ_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 opacity-80 transition hover:opacity-100"
            >
              <img
                src={ciqLogo}
                alt="CreativeIQ"
                className="h-8 w-8 object-contain brightness-0 invert sm:h-9 sm:w-9"
                width={256}
                height={242}
              />
              <span className="text-sm font-semibold tracking-tight text-[#ece7dc]">
                Creative<span className="text-[#d4b37a]">IQ</span>
              </span>
            </a>
            <a
              href={CIQ_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#8b93a1] transition hover:text-[#d4b37a]"
            >
              creativeiqmarketing.com
            </a>
          </div>
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

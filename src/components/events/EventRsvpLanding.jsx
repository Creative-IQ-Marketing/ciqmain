import { motion } from "framer-motion";
import { ACTIVE_EVENT } from "../../data/activeEvent";
import kpnLogo from "../../assets/events/kpn-logo.png";
import EventRsvpForm from "./EventRsvpForm";

export default function EventRsvpLanding() {
  const {
    name,
    host,
    tagline,
    theme,
    schedule,
    time,
    addressShort,
    address,
    perks,
    featuredName,
    featuredLabel,
  } = ACTIVE_EVENT;

  const city =
    address.split(",").slice(1).join(",").trim() || "San Antonio, TX";
  const blurb =
    "Join professionals, entrepreneurs, and leaders for an evening of meaningful connections and great conversations.";
  const first = featuredName?.split(" ")[0] || "";
  const last = featuredName?.split(" ").slice(1).join(" ") || "";

  return (
    <div
      className="min-h-dvh overflow-x-hidden"
      style={{ background: "#070d18", color: "#ece7dc" }}
    >
      <header className="relative isolate mx-auto flex min-h-[100dvh] max-w-7xl flex-col overflow-hidden px-5 pb-8 pt-6 sm:px-8 lg:px-12">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 20% 30%, rgba(212,179,122,0.1), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(21,34,56,0.95), transparent 50%)",
          }}
          aria-hidden
        />
        <p
          className="pointer-events-none absolute -left-6 bottom-[8%] select-none text-[clamp(7rem,22vw,16rem)] font-extrabold leading-none tracking-tighter text-white/[0.04] lg:bottom-[12%] lg:left-0"
          aria-hidden
        >
          08
        </p>

        <div className="flex items-center justify-between gap-4">
          <img
            src={kpnLogo}
            alt={host}
            className="h-12 w-auto max-w-[min(100%,16rem)] object-contain object-left brightness-0 invert sm:h-14 lg:h-[4.5rem]"
            width={413}
            height={172}
            decoding="async"
          />
          <a
            href="#event-rsvp"
            className="hidden min-h-[48px] items-center border border-white/25 px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#ece7dc] sm:inline-flex"
          >
            RSVP
          </a>
        </div>

        <div className="mt-auto grid flex-1 items-end gap-12 pb-4 pt-16 lg:grid-cols-12 lg:gap-16 lg:pb-10 lg:pt-24">
          <div className="min-w-0 lg:col-span-7">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.28em]"
              style={{ color: theme.accent }}
            >
              {host}
            </p>
            <h1 className="mt-5 max-w-[11ch] text-[clamp(3.2rem,9.5vw,7rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em] text-[#ece7dc]">
              Let&apos;s
              <span
                className="mt-2 block pb-1 italic normal-case leading-[1.05] tracking-[-0.03em]"
                style={{ color: theme.accent }}
              >
                Connect
              </span>
            </h1>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-[#c9c2b4] sm:mt-10 sm:text-base">
              {blurb}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#event-rsvp"
                className="inline-flex min-h-[54px] w-full items-center justify-center px-7 text-[13px] font-bold uppercase tracking-[0.14em] text-[#070d18] sm:w-auto"
                style={{ background: theme.accent }}
              >
                Reserve your spot
              </a>
              <p className="text-sm text-[#8b93a1]">Free entry · Free parking</p>
            </div>
          </div>

          <aside className="relative z-10 border-t border-white/10 pt-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-1">
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: theme.accent }}
            >
              Next gathering
            </p>
            <div className="mt-4 flex items-end gap-3">
              <p className="text-5xl font-bold tracking-tight text-[#ece7dc] sm:text-6xl">
                08.19
              </p>
              <p className="mb-1.5 text-sm text-[#8b93a1]">2026</p>
            </div>
            <div className="mt-10 space-y-6 text-sm">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8b93a1]">
                  When
                </p>
                <p className="mt-1.5 whitespace-pre-line text-[#ece7dc]">
                  {`Wednesday\n${time}`}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8b93a1]">
                  Where
                </p>
                <p className="mt-1.5 whitespace-pre-line text-[#ece7dc]">
                  {`${addressShort}\n${city}`}
                </p>
              </div>
              {featuredName ? (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8b93a1]">
                    Music
                  </p>
                  <p className="mt-1.5 whitespace-pre-line text-[#ece7dc]">
                    {`${featuredName}\nLive set`}
                  </p>
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </header>

      <div className="overflow-hidden border-y border-white/10 bg-[#0c1526] py-3.5">
        <p
          className="whitespace-nowrap px-4 text-center text-sm font-bold uppercase tracking-[0.35em]"
          style={{ color: theme.accent }}
        >
          {tagline} · {tagline} · {tagline}
        </p>
      </div>

      <section className="bg-[#0c1526]">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-12">
          <div className="border-b border-white/10 px-5 py-14 sm:px-8 lg:col-span-5 lg:border-b-0 lg:border-r lg:px-12 lg:py-24">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.24em]"
              style={{ color: theme.accent }}
            >
              The evening
            </p>
            <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-[#ece7dc]">
              Meaningful connections.
              <span className="mt-2 block" style={{ color: theme.accent }}>
                Great conversations.
              </span>
            </h2>
            <p className="mt-12 max-w-sm text-[15px] leading-relaxed text-[#c9c2b4]">
              Professionals, entrepreneurs, and leaders — one room, one night,
              hosted by {host}.
            </p>
          </div>
          <div className="px-5 py-14 sm:px-8 lg:col-span-7 lg:px-12 lg:py-24">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8b93a1]">
              Live music
            </p>
            <p className="mt-4 text-[clamp(3rem,10vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-[#ece7dc]">
              {first}
              <span className="block" style={{ color: theme.accent }}>
                {last}
              </span>
            </p>
            <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-white/10 pt-8">
              <p className="max-w-xs text-sm leading-relaxed text-[#c9c2b4]">
                An acoustic set to set the tone while you meet new partners,
                clients, and collaborators.
              </p>
              <p
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: theme.accent }}
              >
                {perks.join("  ·  ")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="event-rsvp" className="scroll-mt-4">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-12">
          <div className="order-2 border-t border-white/10 px-5 py-12 sm:px-8 lg:order-1 lg:col-span-5 lg:border-r lg:border-t-0 lg:px-12 lg:py-24">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.24em]"
              style={{ color: theme.accent }}
            >
              Reserve
            </p>
            <h2 className="mt-4 text-[clamp(2.1rem,4vw,3rem)] font-bold leading-[1.05] tracking-tight text-[#ece7dc]">
              Save your place at {name}.
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[#c9c2b4]">
              Free RSVP. Confirmation comes by email and text.
            </p>
            <dl className="mt-12 divide-y divide-white/10 border-y border-white/10">
              <div className="flex justify-between gap-4 py-4 text-sm">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b93a1]">
                  Date
                </dt>
                <dd className="text-right text-[#ece7dc]">{schedule}</dd>
              </div>
              <div className="flex justify-between gap-4 py-4 text-sm">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b93a1]">
                  Time
                </dt>
                <dd className="text-right text-[#ece7dc]">{time}</dd>
              </div>
              <div className="flex justify-between gap-4 py-4 text-sm">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b93a1]">
                  Place
                </dt>
                <dd className="text-right text-[#ece7dc]">
                  {addressShort}, {city}
                </dd>
              </div>
            </dl>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="order-1 px-5 py-12 sm:px-8 lg:order-2 lg:col-span-7 lg:px-12 lg:py-24"
          >
            <EventRsvpForm />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

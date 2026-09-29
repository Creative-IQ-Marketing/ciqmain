import { SignalButton } from "../signal/primitives";
import { trackButtonClick } from "../../services/analytics";

export const CALENDAR_URL = "https://calendar.app.google/nj8St5kEvr9bGtEY8";

export default function Booking() {
  return (
    <section
      id="booking"
      className="bg-[var(--c-base)] px-[var(--container-pad)] pb-20 pt-4 sm:pb-24"
    >
      <div className="mx-auto grid max-w-[1320px] gap-10 border border-[var(--c-border)] bg-white p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:p-16">
        <div>
          <p className="s-label text-[var(--c-text-muted)]">Google Calendar</p>
          <h2 className="s-display mt-4 text-[clamp(2.2rem,4vw,3.6rem)] text-[var(--c-ink)]">
            Pick a time.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--c-text-secondary)]">
            The calendar opens in Google. Choose a slot for a strategy call — goals, SEO, web, content, and the system that fits.
          </p>
        </div>
        <div className="lg:justify-self-end">
          <SignalButton
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackButtonClick("Open calendar", "booking_cta", "Book")}
          >
            Open the calendar
          </SignalButton>
        </div>
      </div>
    </section>
  );
}

import { trackButtonClick } from "../../services/analytics";
import { Button } from "../ui/button";

export const CALENDAR_URL = "https://calendar.app.google/nj8St5kEvr9bGtEY8";

export default function Booking() {
  return (
    <section
      id="booking"
      className="bg-white px-[var(--container-pad)] pb-20 pt-2 sm:pb-24"
    >
      <div className="mx-auto grid max-w-[var(--container-max)] items-end gap-8 rounded-[var(--radius-card)] border border-[var(--c-border)] bg-[var(--c-surface)] p-8 sm:p-12 lg:grid-cols-[1.15fr_auto] lg:p-14">
        <div>
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--c-text-muted)]">
            Google Calendar
          </p>
          <h2 className="mt-3 font-sans text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold tracking-[-0.04em] text-[var(--c-ink)]">
            Pick a time.
          </h2>
          <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-[var(--c-text-secondary)]">
            The calendar opens in Google. Choose a slot for a strategy call — goals, SEO, web, content, and the system that fits.
          </p>
        </div>
        <Button asChild size="lg">
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackButtonClick("Open calendar", "booking_cta", "Book")}
          >
            Open the calendar
          </a>
        </Button>
      </div>
    </section>
  );
}

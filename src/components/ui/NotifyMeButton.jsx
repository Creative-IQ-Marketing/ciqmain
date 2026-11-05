import { Bell } from "lucide-react";
import { useNewsletter } from "../../context/NewsletterContext";

export const NOTIFY_LABEL = "Notify me for specials, discounts, and blogs";

/**
 * Opens the newsletter sign-up. `source` is recorded in analytics and on the
 * CRM contact so we can see which page the sign-up came from.
 */
export default function NotifyMeButton({ source = "notify_me", className = "" }) {
  const { openNewsletter } = useNewsletter();
  return (
    <button
      type="button"
      onClick={() => openNewsletter(source)}
      className={`inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--c-border-strong)] bg-white px-5 py-2.5 font-sans text-sm font-semibold text-[var(--c-accent)] transition hover:border-[var(--c-accent)] hover:bg-[var(--c-accent-dim)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] focus-visible:ring-offset-2 ${className}`}
    >
      <Bell size={15} strokeWidth={1.75} aria-hidden />
      {NOTIFY_LABEL}
    </button>
  );
}

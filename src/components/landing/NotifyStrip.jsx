import { useLocation } from "react-router-dom";
import NotifyMeButton from "../ui/NotifyMeButton";

const HIDE_ON = ["/newsletter", "/ai-seo-guide", "/paymentform"];

/** Site-wide "Notify me" band, sits above the footer on every page. */
export default function NotifyStrip() {
  const { pathname } = useLocation();
  if (HIDE_ON.some((p) => pathname.startsWith(p))) return null;

  return (
    <section
      aria-label="Get notified"
      className="border-t border-[var(--c-border)] bg-[var(--c-surface-2)]"
    >
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col items-start gap-4 px-[var(--container-pad)] py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-sans text-sm text-[var(--c-text-secondary)]">
          Be first to hear about new offers, discounts, and what we publish.
        </p>
        <NotifyMeButton source="site_strip" />
      </div>
    </section>
  );
}

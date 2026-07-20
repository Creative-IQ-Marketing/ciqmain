import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { SITE_TOP_BANNER } from "../../constants/siteBanner";
import { trackButtonClick } from "../../services/analytics";

const DISMISS_KEY = "ciq_site_banner_dismissed";

function readDismissed() {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Event strip — desktop top / mobile bottom. Dismissible with X.
 */
export default function SiteTopBanner({ onNavigate }) {
  const [dismissed, setDismissed] = useState(readDismissed);

  useEffect(() => {
    const on = SITE_TOP_BANNER.enabled && !dismissed;
    document.documentElement.dataset.siteBanner = on ? "on" : "off";
    window.dispatchEvent(
      new CustomEvent("ciq-site-banner", { detail: { visible: on } }),
    );
  }, [dismissed]);

  if (!SITE_TOP_BANNER.enabled || dismissed) return null;

  const { eventName, mobileSubline, desktopMessage, cta } = SITE_TOP_BANNER;

  function handleCta(e) {
    e.preventDefault();
    trackButtonClick(cta.trackingLabel, cta.trackingId, "Header");
    onNavigate?.(e, cta.href);
  }

  function dismiss() {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    setDismissed(true);
  }

  return (
    <>
      {/* Mobile — bottom dock */}
      <div
        className="fixed inset-x-0 bottom-0 z-[60] lg:hidden"
        role="region"
        aria-label="Event announcement"
      >
        <div className="border-t border-black/[0.06] bg-white pb-[env(safe-area-inset-bottom,0px)]">
          <div className="mx-auto flex max-w-lg items-center gap-2 px-3 py-2.5">
            <div className="min-w-0 flex-1">
              <p className="truncate font-sans text-[13px] font-medium text-[var(--c-ink)]">
                {eventName}
              </p>
              <p className="truncate font-sans text-[11px] text-[var(--c-text-muted)]">
                {mobileSubline}
              </p>
            </div>
            <a
              href={cta.href}
              onClick={handleCta}
              className="shrink-0 rounded-full bg-[var(--c-accent)] px-3.5 py-2 font-sans text-[11px] font-semibold text-white transition hover:bg-[#2f5ad4]"
            >
              {cta.mobileLabel}
            </a>
            <button
              type="button"
              aria-label="Dismiss announcement"
              onClick={dismiss}
              className="flex size-9 shrink-0 items-center justify-center rounded-full text-[var(--c-text-muted)] transition hover:bg-[var(--c-surface-2)] hover:text-[var(--c-ink)]"
            >
              <X className="size-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop — top strip */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] hidden lg:block"
        role="region"
        aria-label="Event announcement"
      >
        <div className="relative bg-[var(--c-accent)]">
          <div className="mx-auto flex h-9 max-w-[1320px] items-center justify-center gap-3 px-10 pr-14">
            <p className="font-sans text-[13px] font-normal text-white/95">
              {desktopMessage}
            </p>
            <a
              href={cta.href}
              onClick={handleCta}
              className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3.5 py-1 font-sans text-[11px] font-semibold text-white transition hover:bg-white/25"
            >
              {cta.label} →
            </a>
          </div>
          <button
            type="button"
            aria-label="Dismiss announcement"
            onClick={dismiss}
            className="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white"
          >
            <X className="size-3.5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </>
  );
}

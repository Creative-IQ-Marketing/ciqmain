import { SITE_TOP_BANNER } from "../../constants/siteBanner";
import { trackButtonClick } from "../../services/analytics";

/**
 * Event announcement — bottom dock on mobile, top bar on desktop.
 */
export default function SiteTopBanner({ onCtaClick }) {
  if (!SITE_TOP_BANNER.enabled) return null;

  const { eventName, mobileSubline, desktopMessage, cta } = SITE_TOP_BANNER;

  function handleCta(e) {
    e.preventDefault();
    trackButtonClick(cta.trackingLabel, cta.trackingId, "Header");
    onCtaClick?.();
  }

  return (
    <>
      {/* Mobile — bottom dock */}
      <div
        className="fixed inset-x-0 bottom-0 z-[60] lg:hidden"
        role="region"
        aria-label="Event announcement"
      >
        <div
          className="pointer-events-none absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-slate-900/[0.06] to-transparent"
          aria-hidden="true"
        />

        <div className="border-t border-slate-200/90 bg-white/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-10px_40px_rgba(15,23,42,0.1)]">
          <div className="mx-auto flex max-w-lg items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold tracking-tight text-slate-900">
                {eventName}
              </p>
              <p className="truncate text-[11px] text-slate-500">{mobileSubline}</p>
            </div>
            <button
              type="button"
              onClick={handleCta}
              className="shrink-0 rounded-full bg-[#1a1410] px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-[#F3D56D] transition active:scale-[0.98] hover:bg-[#2a211a]"
            >
              {cta.mobileLabel}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop — top bar */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] hidden lg:block"
        role="region"
        aria-label="Event announcement"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-[#F3D56D]/80 to-transparent" />

        <div className="border-b border-[#F3D56D]/15 bg-[#1a1410]/95 backdrop-blur-md">
          <div className="mx-auto flex h-11 w-full items-center justify-center gap-4 px-8">
            <p className="text-sm font-semibold tracking-wide text-[#F3D56D]">{desktopMessage}</p>
            <button
              type="button"
              onClick={handleCta}
              className="rounded-full border-2 border-[#F3D56D] bg-[#F3D56D] px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.08em] text-[#1a1410] shadow-[0_3px_0_#b8943f] transition hover:bg-[#edd55c]"
            >
              {cta.label}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

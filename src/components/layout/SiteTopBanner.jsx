import { SITE_TOP_BANNER } from "../../constants/siteBanner";
import { trackButtonClick } from "../../services/analytics";

/**
 * Event strip — same surface + typography as header/hero.
 * Desktop: slim row above nav. Mobile: bottom dock.
 */
export default function SiteTopBanner({ onNavigate }) {
  if (!SITE_TOP_BANNER.enabled) return null;

  const { eventName, mobileSubline, desktopMessage, cta } = SITE_TOP_BANNER;

  function handleCta(e) {
    e.preventDefault();
    trackButtonClick(cta.trackingLabel, cta.trackingId, "Header");
    onNavigate?.(e, cta.href);
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
          <div className="mx-auto flex max-w-lg items-center justify-between gap-3 px-4 py-2.5">
            <div className="min-w-0 flex-1">
              <p className="f-body truncate text-[13px] font-medium text-slate-800">
                {eventName}
              </p>
              <p className="f-body truncate text-[11px] text-slate-500">{mobileSubline}</p>
            </div>
            <a
              href={cta.href}
              onClick={handleCta}
              className="f-body shrink-0 rounded-full bg-[#3B6FF0] px-4 py-2 text-[11px] font-semibold text-white transition hover:bg-[#2f5ad4]"
            >
              {cta.mobileLabel}
            </a>
          </div>
        </div>
      </div>

      {/* Desktop — top strip (matches inspo: blue bar, white copy) */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] hidden lg:block"
        role="region"
        aria-label="Event announcement"
      >
        <div className="bg-[#3B6FF0]">
          <div className="mx-auto flex h-9 max-w-[1320px] items-center justify-center gap-3 px-10">
            <p className="font-sans text-[13px] font-normal text-white/95">
              {desktopMessage}
            </p>
            <a
              href={cta.href}
              onClick={handleCta}
              className="group inline-flex items-center gap-1 rounded-full bg-white/15 px-3.5 py-1 font-sans text-[11px] font-semibold text-white transition hover:bg-white/25"
            >
              {cta.label} →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

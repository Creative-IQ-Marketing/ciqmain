import { ACTIVE_EVENT, getEventRsvpUrl } from "../data/activeEvent";

/**
 * Site-wide top banner — mirrors ACTIVE_EVENT.
 * Set ACTIVE_EVENT banner off by disabling here if needed.
 */
export const SITE_TOP_BANNER = {
  enabled: true,
  eventName: ACTIVE_EVENT.banner.eventName,
  mobileSubline: ACTIVE_EVENT.banner.mobileSubline,
  desktopMessage: ACTIVE_EVENT.banner.desktopMessage,
  cta: {
    label: ACTIVE_EVENT.banner.ctaLabel,
    mobileLabel: ACTIVE_EVENT.banner.ctaMobileLabel,
    href: getEventRsvpUrl(),
    trackingLabel: ACTIVE_EVENT.banner.trackingLabel,
    trackingId: ACTIVE_EVENT.banner.trackingId,
  },
};

/** @deprecated Use SITE_TOP_BANNER */
export const DESKTOP_TOP_BANNER = SITE_TOP_BANNER;

export const NEWSLETTER_POPUP_ENABLED = false;

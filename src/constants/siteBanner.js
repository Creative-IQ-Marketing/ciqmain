/**
 * Site-wide top banner configuration.
 * Visible on all breakpoints with responsive layouts.
 * Set `enabled: false` to remove the banner and reset header offset.
 */
export const SITE_TOP_BANNER = {
  enabled: true,
  eventName: "Business Unplugged",
  mobileSubline: "TBA · Hotel Valencia Riverwalk",
  desktopMessage: "You're invited — Business Unplugged · TBA · Hotel Valencia Riverwalk",
  cta: {
    label: "RSVP Now",
    mobileLabel: "RSVP",
    href: "/business-unplugged",
    trackingLabel: "Business Unplugged Banner",
    trackingId: "top_banner_cta",
  },
};

/** @deprecated Use SITE_TOP_BANNER */
export const DESKTOP_TOP_BANNER = SITE_TOP_BANNER;

export const NEWSLETTER_POPUP_ENABLED = false;

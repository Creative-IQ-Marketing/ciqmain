/**
 * Site-wide top banner — Let's Connect (Key Partner Network), Nov 18.
 * RSVP lives on its own site; the car show page (/carshow) is untouched.
 */
export const SITE_TOP_BANNER = {
  enabled: true,
  eventName: "Let's Connect",
  mobileSubline: "Nov 18 · KPN · $5",
  desktopMessage:
    "You're invited — Let's Connect by Key Partner Network · Nov 18 · 6:30–9:30 PM · Live music by Austin Ausley",
  cta: {
    label: "RSVP Now",
    mobileLabel: "RSVP",
    href: "https://lets-connect.creativeiqmarketing.com/",
    trackingLabel: "Lets Connect Banner",
    trackingId: "top_banner_cta",
  },
};

/** @deprecated Use SITE_TOP_BANNER */
export const DESKTOP_TOP_BANNER = SITE_TOP_BANNER;

export const NEWSLETTER_POPUP_ENABLED = false;

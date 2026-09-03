import flyerImg from "../assets/events/show-and-shine.jpg";

export const ACTIVE_EVENT = {
  id: "carshow",
  slug: "carshow",
  name: "Car Show",
  headline: "Car Show",
  featuredLabel: "Presented by",
  featuredName: "San Antonio Dominion Rotary",
  schedule: "Saturday, October 10, 2026",
  time: "8:00 AM – 2:00 PM",
  nextDate: "2026-10-10",
  venue: "South Texas Blood & Tissue",
  address: "6211 I-10 Bldg 2, San Antonio, TX 78201",
  addressShort: "6211 I-10 Bldg 2",
  city: "San Antonio, TX 78201",
  blurb:
    "3rd Annual Dominion Rotary Car Show & Blood Drive. Food trucks, raffle, silent auction, family fun, and awards — free for spectators.",
  perks: [
    "Food trucks",
    "Raffle",
    "Silent auction",
    "Family fun",
    "Awards",
  ],
  host: "San Antonio Dominion Rotary",
  tagline: "Car Show · Blood Drive",
  flyerImg,
  flyerAlt:
    "3rd Annual Dominion Rotary Car Show & Blood Drive — Saturday, October 10, 2026, 8:00 AM–2:00 PM at South Texas Blood & Tissue, 6211 I-10 Bldg 2, San Antonio.",
  mode: "external",
  rsvpUrl: "https://dominionrotarysatx.com/showandshine",
  theme: {
    accent: "#c8102e",
    accentSoft: "rgba(200, 16, 46, 0.18)",
    ink: "#0a0a0a",
    card: "#111111",
  },
  seo: {
    title: "Car Show | Dominion Rotary — Oct 10",
    description:
      "RSVP for the 3rd Annual Dominion Rotary Car Show & Blood Drive. Saturday, October 10, 2026, 8:00 AM–2:00 PM at South Texas Blood & Tissue, San Antonio.",
    keywords:
      "Car Show, Dominion Rotary, car show San Antonio, blood drive, South Texas Blood & Tissue, October 10 2026",
    ogImage: "/og-showandshine.jpg",
    ogImageAlt:
      "3rd Annual Dominion Rotary Car Show & Blood Drive — October 10, 2026",
  },
  ghl: {
    apiKey: "",
    locationId: "",
    tags: {
      RSVP: "show_and_shine_rsvp",
      EVENT: "show_and_shine",
      SOURCE: "ciqmain_website",
    },
  },
  aliases: ["showandshine", "lets-connect", "live-music", "business-unplugged"],
  banner: {
    eventName: "Car Show",
    mobileSubline: "Oct 10 · Blood Drive",
    desktopMessage:
      "You're invited — Dominion Rotary Car Show · Oct 10 · 8 AM–2 PM · Blood Drive · Free for spectators",
    ctaLabel: "RSVP Now",
    ctaMobileLabel: "RSVP",
    trackingLabel: "Car Show Banner",
    trackingId: "top_banner_cta",
  },
};

export const EVENT_PATH = `/${ACTIVE_EVENT.slug}`;

export function getEventCanonical() {
  return `https://creativeiqmarketing.com/${ACTIVE_EVENT.slug}`;
}

export function getEventRsvpUrl() {
  return ACTIVE_EVENT.rsvpUrl || EVENT_PATH;
}

export function getEventSeo() {
  const { seo } = ACTIVE_EVENT;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    ogImage: seo.ogImage,
    ogImageAlt: seo.ogImageAlt,
    canonical: getEventCanonical(),
    pageType: "website",
  };
}

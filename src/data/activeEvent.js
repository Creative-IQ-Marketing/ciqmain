import flyerImg from "../assets/events/smashd-live-music.jpg";

export const ACTIVE_EVENT = {
  id: "smashd-live-music",
  slug: "live-music",
  name: "Live Music at Smash'd",
  headline: "Live Music",
  featuredLabel: "Featuring",
  featuredName: "Austin Ausley",
  schedule: "1st and 3rd Wednesdays",
  time: "6:30 PM – 9:30 PM",
  nextDate: "",
  venue: "Smash'd",
  address: "520 E Grayson St, San Antonio, TX",
  addressShort: "520 E Grayson St.",
  perks: ["Free entry", "Free parking"],
  host: "Creative IQ Digital Marketing",
  flyerImg,
  flyerAlt:
    "Live Music at Smash'd featuring Austin Ausley — 1st and 3rd Wednesdays, 6:30–9:30 PM",
  mode: "rsvp",
  theme: {
    accent: "#b8a0d4",
    accentSoft: "rgba(184, 160, 212, 0.22)",
    ink: "#121212",
    card: "#f7f5f9",
  },
  seo: {
    title: "Live Music at Smash'd | Austin Ausley — RSVP Free",
    description:
      "RSVP for free live music at Smash'd featuring Austin Ausley. 1st and 3rd Wednesdays, 6:30–9:30 PM at 520 E Grayson St. Free entry and parking.",
    keywords:
      "Smash'd live music, Austin Ausley, San Antonio live music, free concert San Antonio, Creative IQ event",
    ogImage: "/og-live-music.jpg",
    ogImageAlt:
      "Live Music at Smash'd featuring Austin Ausley — free entry and parking",
  },
  ghl: {
    tags: {
      RSVP: "smashd_live_music_rsvp",
      EVENT: "smashd_live_music",
      SOURCE: "smashd_live_music_website",
    },
  },
  aliases: ["business-unplugged"],
  banner: {
    eventName: "Live Music at Smash'd",
    mobileSubline: "Austin Ausley · 1st & 3rd Wed · Free",
    desktopMessage:
      "You're invited — Live Music at Smash'd featuring Austin Ausley · 1st & 3rd Wednesdays · 6:30–9:30 PM · Free entry",
    ctaLabel: "RSVP Now",
    ctaMobileLabel: "RSVP",
    trackingLabel: "Live Music Banner",
    trackingId: "top_banner_cta",
  },
};

export const EVENT_PATH = `/${ACTIVE_EVENT.slug}`;

export function getEventCanonical() {
  return `https://creativeiqmarketing.com/${ACTIVE_EVENT.slug}`;
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

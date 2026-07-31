import flyerImg from "../assets/events/lets-connect.jpg";

export const ACTIVE_EVENT = {
  id: "lets-connect",
  slug: "lets-connect",
  name: "Let's Connect",
  headline: "Let's Connect",
  featuredLabel: "Live music by",
  featuredName: "Austin Ausley",
  schedule: "Wednesday, August 19, 2026",
  time: "6:30 PM – 9:30 PM",
  nextDate: "2026-08-19",
  venue: "Smash'd",
  address: "520 E Grayson St, San Antonio, TX 78215",
  addressShort: "520 E Grayson St.",
  perks: ["Free entry", "Free parking"],
  host: "Key Partner Network",
  tagline: "Connect · Collaborate · Grow",
  flyerImg,
  flyerAlt:
    "Let's Connect by Key Partner Network — Wednesday, August 19, 2026, 6:30–9:30 PM at 520 E Grayson St. Live music by Austin Ausley. Free entry and parking.",
  mode: "rsvp",
  theme: {
    accent: "#c9a66b",
    accentSoft: "rgba(201, 166, 107, 0.22)",
    ink: "#0f1a2e",
    card: "#f7f4ef",
  },
  seo: {
    title: "Let's Connect | Key Partner Network — RSVP Free",
    description:
      "RSVP for Let's Connect hosted by Key Partner Network. Wednesday, August 19, 2026, 6:30–9:30 PM at 520 E Grayson St. Live music by Austin Ausley. Free entry and parking.",
    keywords:
      "Let's Connect, Key Partner Network, KPN, Austin Ausley, San Antonio networking, Smash'd event, free networking San Antonio",
    ogImage: "/og-lets-connect.jpg",
    ogImageAlt:
      "Let's Connect by Key Partner Network featuring live music by Austin Ausley — free entry and parking",
  },
  ghl: {
    tags: {
      RSVP: "lets_connect_rsvp",
      EVENT: "lets_connect",
      SOURCE: "lets_connect_website",
    },
  },
  aliases: ["live-music", "business-unplugged"],
  banner: {
    eventName: "Let's Connect",
    mobileSubline: "Aug 19 · KPN · Free",
    desktopMessage:
      "You're invited — Let's Connect by Key Partner Network · Aug 19 · 6:30–9:30 PM · Live music by Austin Ausley · Free entry",
    ctaLabel: "RSVP Now",
    ctaMobileLabel: "RSVP",
    trackingLabel: "Lets Connect Banner",
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

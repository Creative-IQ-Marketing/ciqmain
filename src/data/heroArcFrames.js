import eventImage from "../assets/hero/hero-frame-event.webp";
import brandImage from "../assets/hero/hero-frame-brands.webp";
import crmImage from "../assets/hero/hero-frame-crm.webp";
import seoPoster from "../assets/hero/hero-frame-seo.webp";
import socialPoster from "../assets/hero/hero-frame-social.webp";
import webPoster from "../assets/hero/hero-frame-web.webp";

/**
 * Poster-only frames for the initial hero graph.
 * MP4 sources load via dynamic import in galleries after visibility/idle.
 */
export const HERO_ARC_FRAMES = [
  {
    id: "seo",
    label: "SEO systems",
    type: "video",
    videoKey: "sem",
    poster: seoPoster,
    contactValue: "bundle-launch",
  },
  {
    id: "social",
    label: "Social systems",
    type: "video",
    videoKey: "smm",
    poster: socialPoster,
    contactValue: "social-starter",
  },
  {
    id: "content",
    label: "Content",
    type: "video",
    videoKey: "content",
    poster: crmImage,
    contactValue: "video-production",
  },
  {
    id: "web",
    label: "Conversion sites",
    type: "video",
    videoKey: "web",
    poster: webPoster,
    contactValue: "bundle-launch",
  },
  {
    id: "reel",
    label: "Reels",
    type: "video",
    videoKey: "reel",
    poster: socialPoster,
    contactValue: "social-starter",
  },
  {
    id: "event",
    label: "Events",
    type: "image",
    src: eventImage,
    href: "/lets-connect",
  },
  {
    id: "brands",
    label: "Brand systems",
    type: "image",
    src: brandImage,
    contactValue: "other",
  },
];

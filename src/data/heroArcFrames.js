import eventImage from "../assets/hero/hero-frame-event.webp";
import brandImage from "../assets/hero/hero-frame-brands.webp";
import crmImage from "../assets/hero/hero-frame-crm.webp";
import seoPoster from "../assets/hero/hero-frame-seo.webp";
import socialPoster from "../assets/hero/hero-frame-social.webp";
import webPoster from "../assets/hero/hero-frame-web.webp";
import semVideo from "../assets/svid/seovid.mp4";
import smmVideo from "../assets/svid/social media.mp4";
import contentVideo from "../assets/svid/contentmgmt.mp4";
import webVideo from "../assets/svid/webdev.mp4";
import reelVideo from "../assets/svid/PinDown.io_@decorpixel0_1777042301 (1).mp4";

/** Unified 3:4 proof frames: videos where available, cinematic stills as anchors. */
export const HERO_ARC_FRAMES = [
  {
    id: "seo",
    label: "SEO systems",
    type: "video",
    src: semVideo,
    poster: seoPoster,
    contactValue: "bundle-launch",
  },
  {
    id: "social",
    label: "Social systems",
    type: "video",
    src: smmVideo,
    poster: socialPoster,
    contactValue: "social-starter",
  },
  {
    id: "content",
    label: "Content",
    type: "video",
    src: contentVideo,
    poster: crmImage,
    contactValue: "video-production",
  },
  {
    id: "web",
    label: "Conversion sites",
    type: "video",
    src: webVideo,
    poster: webPoster,
    contactValue: "bundle-launch",
  },
  {
    id: "reel",
    label: "Reels",
    type: "video",
    src: reelVideo,
    poster: socialPoster,
    contactValue: "social-starter",
  },
  {
    id: "event",
    label: "Events",
    type: "image",
    src: eventImage,
    href: "/business-unplugged",
  },
  {
    id: "brands",
    label: "Brand systems",
    type: "image",
    src: brandImage,
    contactValue: "other",
  },
];

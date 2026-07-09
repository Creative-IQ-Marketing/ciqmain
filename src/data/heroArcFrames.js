import semVideo from "../assets/svid/seovid.mp4";
import smmVideo from "../assets/svid/social media.mp4";
import contentVideo from "../assets/svid/contentmgmt.mp4";
import webVideo from "../assets/svid/webdev.mp4";
import reelVideo from "../assets/svid/PinDown.io_@decorpixel0_1777042301 (1).mp4";
import eventImage from "../assets/rsvp.jpeg";
import brandPreview from "../assets/brands/imgi_1_width_800.webp";
import mainLogo from "../assets/mainLogo.png";

/** Hero cylindrical arc — videos & on-hand assets (screenshots slot in later). */
export const HERO_ARC_FRAMES = [
  {
    id: "seo",
    label: "SEO",
    type: "video",
    src: semVideo,
    contactValue: "bundle-essential",
  },
  {
    id: "social",
    label: "Social",
    type: "video",
    src: smmVideo,
    contactValue: "social-starter",
  },
  {
    id: "content",
    label: "Content",
    type: "video",
    src: contentVideo,
    contactValue: "video-production",
  },
  {
    id: "web",
    label: "Web",
    type: "video",
    src: webVideo,
    contactValue: "bundle-essential",
  },
  {
    id: "reel",
    label: "Reels",
    type: "video",
    src: reelVideo,
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
    label: "Brands",
    type: "image",
    src: brandPreview,
    overlayLogo: mainLogo,
    contactValue: "other",
  },
];

import ytDebs from "../assets/hero/yt-D015yb4_pxc.webp";
import ytMeet from "../assets/hero/yt-ufFXuOMHZtE.webp";
import ytAds from "../assets/hero/yt-V7ks3XgXJWU.webp";
import ytWebsite from "../assets/hero/yt-azxqmT5QLxo.webp";
import ytBudget from "../assets/hero/yt-sqR_x6i1T2Y.webp";
import ytCig from "../assets/hero/yt-M8HvRN2RM2I.webp";
import ytContent from "../assets/hero/yt-VIoV0cbvocY.webp";
import ytQuit from "../assets/hero/yt-0W_tBhAGA98.webp";

export const YOUTUBE_CHANNEL_URL =
  "https://www.youtube.com/@CreativeIQdigitalmarketing";

/**
 * Hero arc frames: our own channel videos. They all autoplay muted (no player
 * UI) once the page has loaded; a click opens the full video with sound. `vertical` = a Short. Posters are
 * self-hosted crops of the YouTube thumbnails.
 */
export const HERO_ARC_FRAMES = [
  { id: "yt-debs", label: "DEBS Insurance", type: "youtube", youtubeId: "D015yb4_pxc", src: ytDebs },
  { id: "yt-meet", label: "Meet CreativeIQ", type: "youtube", youtubeId: "ufFXuOMHZtE", vertical: true, src: ytMeet },
  { id: "yt-ads", label: "Why ads don't convert", type: "youtube", youtubeId: "V7ks3XgXJWU", vertical: true, src: ytAds },
  { id: "yt-website", label: "Website as a salesperson", type: "youtube", youtubeId: "azxqmT5QLxo", vertical: true, src: ytWebsite },
  { id: "yt-budget", label: "3 budget questions", type: "youtube", youtubeId: "sqR_x6i1T2Y", vertical: true, src: ytBudget },
  { id: "yt-cig", label: "Clear Integrity Group", type: "youtube", youtubeId: "M8HvRN2RM2I", src: ytCig },
  { id: "yt-strategy", label: "Content strategy", type: "youtube", youtubeId: "VIoV0cbvocY", vertical: true, src: ytContent },
  { id: "yt-quit", label: "Why brands quit social", type: "youtube", youtubeId: "0W_tBhAGA98", vertical: true, src: ytQuit },
];

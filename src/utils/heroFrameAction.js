import { trackButtonClick } from "../services/analytics";
import { normalizeFormInterest } from "../data/serviceFormOptions";

export function executeHeroFrameAction(frame, navigate, source = "hero_arc_frame") {
  trackButtonClick(frame.label, source, "Hero");
  if (frame.href) {
    navigate(frame.href);
    return;
  }
  if (frame.contactValue) {
    const interest =
      normalizeFormInterest(frame.contactValue) || frame.contactValue;
    navigate(`/?interest=${interest}#contact`);
    return;
  }
  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
}

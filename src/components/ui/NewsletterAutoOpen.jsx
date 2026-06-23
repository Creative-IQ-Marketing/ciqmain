import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNewsletter } from "../../context/NewsletterContext";

const AUTO_POPUP_KEY = "ciq_newsletter_auto_shown";
const SKIP_PATHS = ["/newsletter", "/newsletter/unsubscribed"];

export default function NewsletterAutoOpen() {
  const { open, openNewsletter } = useNewsletter();
  const { pathname } = useLocation();

  useEffect(() => {
    if (open) return;
    if (SKIP_PATHS.some((path) => pathname.startsWith(path))) return;
    if (sessionStorage.getItem(AUTO_POPUP_KEY)) return;

    const timer = window.setTimeout(() => {
      if (sessionStorage.getItem(AUTO_POPUP_KEY)) return;
      sessionStorage.setItem(AUTO_POPUP_KEY, "1");
      openNewsletter();
    }, 10000);

    return () => window.clearTimeout(timer);
  }, [pathname, open, openNewsletter]);

  return null;
}

import { useEffect, useState } from "react";

/**
 * True once hero videos may start: after the window `load` event plus a short
 * idle beat (so they never compete with LCP), only when `query` matches, and
 * never for reduced-motion or Save-Data visitors.
 */
export default function useHeroVideosReady(query) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const conn = navigator.connection;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      conn?.saveData
    ) {
      return undefined;
    }
    const mq = window.matchMedia(query);
    let timer;
    let loaded = document.readyState === "complete";
    const sync = () => setReady(loaded && mq.matches);
    const onLoad = () => {
      timer = window.setTimeout(() => {
        loaded = true;
        sync();
      }, 1500);
    };

    if (loaded) onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    mq.addEventListener("change", sync);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", onLoad);
      mq.removeEventListener("change", sync);
    };
  }, [query]);

  return ready;
}

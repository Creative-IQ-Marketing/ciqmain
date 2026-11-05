import { useEffect, useRef, useState } from "react";

let videoPromise = null;
function loadVideos() {
  if (!videoPromise) {
    videoPromise = import("../../data/heroVideos.js").then((m) => m.HERO_VIDEOS);
  }
  return videoPromise;
}

/**
 * Poster-first media: images paint immediately; videos hydrate after
 * intersection (or idle) so MP4s stay out of the critical path.
 */
export default function HeroFrameMedia({
  frame,
  eager = false,
  width = 196,
  height = 262,
  className = "size-full object-cover",
  allowVideo = true,
  delay = 0,
}) {
  const ref = useRef(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [ytReady, setYtReady] = useState(false);
  const [ytMounted, setYtMounted] = useState(false);
  const ytRef = useRef(null);

  // YouTube players mount staggered (by `delay`) and unmount when disallowed.
  useEffect(() => {
    if (frame.type !== "youtube") return undefined;
    if (!allowVideo) {
      setYtMounted(false);
      setYtReady(false);
      return undefined;
    }
    const t = window.setTimeout(() => setYtMounted(true), delay);
    return () => window.clearTimeout(t);
  }, [allowVideo, delay, frame.type]);

  // Restart a finished video (see onYtLoad below for why we don't use loop=1).
  useEffect(() => {
    if (!ytMounted) return undefined;
    const onMessage = (e) => {
      const win = ytRef.current?.contentWindow;
      if (!win || e.source !== win || typeof e.data !== "string") return;
      let msg;
      try {
        msg = JSON.parse(e.data);
      } catch {
        return;
      }
      if (msg.event === "onStateChange" && msg.info === 0) {
        win.postMessage(
          JSON.stringify({ event: "command", func: "seekTo", args: [0, true] }),
          "*",
        );
        win.postMessage(
          JSON.stringify({ event: "command", func: "playVideo", args: [] }),
          "*",
        );
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [ytMounted]);

  useEffect(() => {
    if (!allowVideo || frame.type !== "video" || !frame.videoKey) return undefined;

    let cancelled = false;
    const el = ref.current;
    const start = () => {
      loadVideos().then((map) => {
        if (!cancelled) setVideoSrc(map[frame.videoKey] || null);
      });
    };

    if (!el || typeof IntersectionObserver === "undefined") {
      const idle =
        typeof requestIdleCallback === "function"
          ? requestIdleCallback(start, { timeout: 3500 })
          : setTimeout(start, 2000);
      return () => {
        cancelled = true;
        if (typeof cancelIdleCallback === "function") cancelIdleCallback(idle);
        else clearTimeout(idle);
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          start();
        }
      },
      { rootMargin: "120px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, [allowVideo, frame.type, frame.videoKey]);

  if (frame.type === "youtube") {
    // `loop=1` needs a playlist, which adds prev/next arrows to the player, so
    // restart the video ourselves when it ends.
    const onYtLoad = () => {
      setYtReady(true);
      ytRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "listening", id: frame.youtubeId }),
        "*",
      );
    };
    // Cover the card and push YouTube's title bar and logo outside it: a Short is 9:16 inside a 16:9 player, and 16:9 videos are enlarged past the card edges.
    const playerStyle = frame.vertical
      ? { width: "340%", aspectRatio: "16 / 9" }
      : { height: "135%", aspectRatio: "16 / 9" };
    return (
      <>
        <img
          src={frame.src}
          alt=""
          width={width}
          height={height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority="low"
          className={className}
        />
        {allowVideo && ytMounted ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${frame.youtubeId}?autoplay=1&mute=1&controls=0&enablejsapi=1&playsinline=1&rel=0&modestbranding=1&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0`}
            title=""
            aria-hidden
            tabIndex={-1}
            allow="autoplay; encrypted-media"
            ref={ytRef}
            onLoad={onYtLoad}
            className={`pointer-events-none absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 border-0 transition-opacity duration-500 ${ytReady ? "opacity-100" : "opacity-0"}`}
            style={playerStyle}
          />
        ) : null}
      </>
    );
  }

  if (frame.type === "video") {
    if (videoSrc) {
      return (
        <video
          ref={ref}
          src={videoSrc}
          poster={frame.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className={className}
        />
      );
    }
    return (
      <img
        ref={ref}
        src={frame.poster}
        alt=""
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority="low"
        className={className}
      />
    );
  }

  return (
    <img
      src={frame.src}
      alt=""
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority="low"
      className={className}
    />
  );
}

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
}) {
  const ref = useRef(null);
  const [videoSrc, setVideoSrc] = useState(null);

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

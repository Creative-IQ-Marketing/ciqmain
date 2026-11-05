import { useEffect } from "react";
import { X } from "lucide-react";
import { YOUTUBE_CHANNEL_URL } from "../../data/heroArcFrames";

/** Lightbox player for a hero video. The iframe mounts only while open. */
export default function HeroVideoModal({ frame, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const frameClass = frame.vertical
    ? "aspect-[9/16] h-[min(82vh,760px)]"
    : "aspect-video w-[min(92vw,960px)]";

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={frame.label}
    >
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />
      <div
        className="relative flex flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X size={18} />
        </button>
        <div
          className={`${frameClass} max-w-full overflow-hidden rounded-[var(--radius-card)] bg-black shadow-2xl`}
        >
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${frame.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3`}
            title={frame.label}
            className="h-full w-full border-0"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
        <a
          href={YOUTUBE_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-sm text-white/70 underline-offset-4 transition hover:text-white hover:underline"
        >
          More on our YouTube channel
        </a>
      </div>
    </div>
  );
}

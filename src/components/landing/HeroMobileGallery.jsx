import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HERO_ARC_FRAMES } from "../../data/heroArcFrames";
import { executeHeroFrameAction } from "../../utils/heroFrameAction";

const FEATURED = HERO_ARC_FRAMES[0];
const GRID = HERO_ARC_FRAMES.slice(1);

function FrameMedia({ frame, className = "" }) {
  if (frame.type === "video") {
    return (
      <video
        src={frame.src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={`size-full object-cover ${className}`}
      />
    );
  }

  return (
    <img
      src={frame.src}
      alt=""
      loading="eager"
      decoding="async"
      className={`size-full object-cover ${className}`}
    />
  );
}

function GalleryTile({ frame, className = "", aspectClass, delay = 0, onSelect }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelect(frame)}
      className={`group relative overflow-hidden rounded-2xl bg-[#111] p-0 text-left shadow-[0_12px_32px_-12px_rgba(0,0,0,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B6FF0] ${aspectClass} ${className}`}
      aria-label={frame.label}
    >
      <FrameMedia frame={frame} />
      {frame.overlayLogo ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/15">
          <img
            src={frame.overlayLogo}
            alt=""
            loading="eager"
            className="size-9 object-contain drop-shadow-md"
          />
        </div>
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-90 transition group-active:from-black/65" />
      <span className="absolute bottom-2.5 left-3 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
        {frame.label}
      </span>
    </motion.button>
  );
}

export default function HeroMobileGallery() {
  const navigate = useNavigate();

  useEffect(() => {
    HERO_ARC_FRAMES.forEach((frame) => {
      if (frame.type !== "video") return;
      const video = document.createElement("video");
      video.src = frame.src;
      video.preload = "auto";
      video.muted = true;
      video.load();
    });
  }, []);

  const handleSelect = (frame) => {
    executeHeroFrameAction(frame, navigate, "hero_mobile_frame");
  };

  return (
    <div className="mt-7 w-full lg:hidden">
      <p className="mb-3 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3B6FF0]">
        What we build
      </p>

      <div className="relative left-1/2 w-screen -translate-x-1/2 px-2.5">
        <div className="grid grid-cols-2 gap-1">
        <GalleryTile
          frame={FEATURED}
          className="col-span-2"
          aspectClass="aspect-[16/9]"
          delay={0.04}
          onSelect={handleSelect}
        />

        {GRID.map((frame, index) => (
          <GalleryTile
            key={frame.id}
            frame={frame}
            aspectClass="aspect-[4/5]"
            delay={0.08 + index * 0.04}
            onSelect={handleSelect}
          />
        ))}
        </div>
      </div>
    </div>
  );
}

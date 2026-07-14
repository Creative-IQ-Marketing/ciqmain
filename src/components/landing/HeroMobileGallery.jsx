import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HERO_ARC_FRAMES } from "../../data/heroArcFrames";
import { executeHeroFrameAction } from "../../utils/heroFrameAction";

function FrameMedia({ frame }) {
  if (frame.type === "video") {
    return (
      <video
        src={frame.src}
        poster={frame.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="size-full object-cover"
      />
    );
  }
  return (
    <img
      src={frame.src}
      alt=""
      loading="eager"
      decoding="async"
      className="size-full object-cover"
    />
  );
}

function GalleryTile({ frame, className = "", aspectClass, delay = 0, onSelect, reduce }) {
  return (
    <motion.button
      type="button"
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelect(frame)}
      className={`group relative overflow-hidden bg-[#111] p-0 text-left shadow-[var(--shadow-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] ${aspectClass} ${className}`}
      style={{ borderRadius: "var(--radius-card)" }}
      aria-label={frame.label}
    >
      <FrameMedia frame={frame} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-85" />
      <span className="absolute bottom-2.5 left-3 font-sans text-[11px] font-semibold tracking-[0.04em] text-white">
        {frame.label}
      </span>
    </motion.button>
  );
}

export default function HeroMobileGallery({ reducedMotion = false }) {
  const navigate = useNavigate();
  const framerReduced = useReducedMotion();
  const reduce = reducedMotion || framerReduced;
  const featured = HERO_ARC_FRAMES[0];
  const grid = HERO_ARC_FRAMES.slice(1, 5);

  return (
    <div className="mt-7 w-full lg:hidden">
      <div className="relative left-1/2 w-screen -translate-x-1/2 px-2.5">
        <div className="grid grid-cols-2 gap-1.5">
          <GalleryTile
            frame={featured}
            className="col-span-2"
            aspectClass="aspect-[16/9]"
            delay={0.04}
            onSelect={(f) => executeHeroFrameAction(f, navigate, "hero_mobile_frame")}
            reduce={reduce}
          />
          {grid.map((frame, index) => (
            <GalleryTile
              key={frame.id}
              frame={frame}
              aspectClass="aspect-[3/4]"
              delay={0.08 + index * 0.04}
              onSelect={(f) => executeHeroFrameAction(f, navigate, "hero_mobile_frame")}
              reduce={reduce}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

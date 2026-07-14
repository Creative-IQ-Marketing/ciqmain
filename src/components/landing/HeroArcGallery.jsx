import { useEffect, useState } from "react";
import { useAnimationFrame } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HERO_ARC_FRAMES } from "../../data/heroArcFrames";
import { executeHeroFrameAction } from "../../utils/heroFrameAction";

const CARD_W = 188;
const CARD_H = 251;
const FRAME_COUNT = HERO_ARC_FRAMES.length;
const CENTER = Math.floor(FRAME_COUNT / 2);
const CYCLES = [-1, 0, 1];
const SPEED = 0.00011;
const ARC_SPAN = 3.35;

/** Concave cylinder: center recessed & dipped, edges forward & lifted */
function arcValues(offset) {
  const abs = Math.abs(offset);
  const t = Math.min(abs / ARC_SPAN, 1);
  const t2 = t * t;

  const z = -300 + t * 370;
  const y = 32 * (1 - t2);
  const rotY = offset * (-10 - t * 6);
  const rotX = -t2 * 5;
  const xSpread = 1 + t * 0.1;

  return { z, y, rotY, rotX, xSpread };
}

function arcTransform(rel) {
  const p = arcValues(rel);
  const x = rel * (CARD_W - 1) * p.xSpread;
  return `translateX(${x}px) translateY(${p.y}px) translateZ(${p.z}px) rotateY(${p.rotY}deg) rotateX(${p.rotX}deg)`;
}

export default function HeroArcGallery() {
  const navigate = useNavigate();
  const [paused, setPaused] = useState(false);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    HERO_ARC_FRAMES.forEach((frame) => {
      if (frame.type === "video") {
        const video = document.createElement("video");
        video.src = frame.src;
        video.preload = "auto";
        video.muted = true;
        video.load();
        return;
      }
      const img = new Image();
      img.src = frame.src;
      if (frame.overlayLogo) {
        const logo = new Image();
        logo.src = frame.overlayLogo;
      }
    });
  }, []);

  useAnimationFrame((_, delta) => {
    if (paused) return;
    setScroll((prev) => prev + delta * SPEED);
  });

  const phase = scroll % FRAME_COUNT;

  const handleSelect = (frame) => {
    executeHeroFrameAction(frame, navigate);
  };

  return (
    <div
      className="relative mt-auto hidden h-[min(340px,40vh)] w-full overflow-hidden [perspective:2000px] [perspective-origin:50%_32%] lg:block"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]"
        style={{ width: CARD_W, height: CARD_H }}
      >
        {CYCLES.flatMap((cycle) =>
          HERO_ARC_FRAMES.map((frame, index) => {
            const virtual = cycle * FRAME_COUNT + index;
            const rel = virtual - CENTER - phase;
            const isActive = Math.abs(rel) <= 3.6;
            const depth = arcValues(rel);

            return (
              <button
                key={`${cycle}-${frame.id}`}
                type="button"
                onClick={() => isActive && handleSelect(frame)}
                tabIndex={isActive ? 0 : -1}
                aria-hidden={!isActive}
                className="absolute left-0 top-0 cursor-pointer overflow-hidden rounded-[20px] border-0 bg-[#111] p-0 shadow-[0_20px_48px_-14px_rgba(0,0,0,0.32)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B6FF0] [backface-visibility:hidden] [transform-origin:center_center] [transform-style:preserve-3d] will-change-transform"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  transform: arcTransform(rel),
                  zIndex: Math.round(10 + depth.z / 40),
                  pointerEvents: isActive ? "auto" : "none",
                }}
                aria-label={frame.label}
              >
                {frame.type === "video" ? (
                  <video
                    src={frame.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="size-full object-cover"
                  />
                ) : (
                  <img
                    src={frame.src}
                    alt=""
                    loading="eager"
                    decoding="async"
                    className="size-full object-cover"
                  />
                )}
                {frame.overlayLogo ? (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10">
                    <img
                      src={frame.overlayLogo}
                      alt=""
                      loading="eager"
                      className="size-10 object-contain drop-shadow-md"
                    />
                  </div>
                ) : null}
              </button>
            );
          }),
        )}
      </div>
    </div>
  );
}

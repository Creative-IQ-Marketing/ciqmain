import { useEffect, useRef, useState } from "react";
import { useAnimationFrame } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HERO_ARC_FRAMES } from "../../data/heroArcFrames";
import { executeHeroFrameAction } from "../../utils/heroFrameAction";

const CARD_W = 196;
const CARD_H = 262;
const FRAME_COUNT = HERO_ARC_FRAMES.length;
const CENTER = Math.floor(FRAME_COUNT / 2);
const CYCLES = [-1, 0, 1];
const SPEED = 0.000085;
const ARC_SPAN = 3.45;

function arcValues(offset) {
  const abs = Math.abs(offset);
  const t = Math.min(abs / ARC_SPAN, 1);
  const t2 = t * t;
  const z = -340 + t * 400;
  const y = 36 * (1 - t2);
  const rotY = offset * (-12 - t * 7);
  const rotX = -t2 * 6;
  const xSpread = 1 + t * 0.12;
  return { z, y, rotY, rotX, xSpread };
}

function arcTransform(rel) {
  const p = arcValues(rel);
  const x = rel * (CARD_W - 4) * p.xSpread;
  return `translateX(${x}px) translateY(${p.y}px) translateZ(${p.z}px) rotateY(${p.rotY}deg) rotateX(${p.rotX}deg)`;
}

function FrameMedia({ frame, eager }) {
  if (frame.type === "video") {
    return (
      <video
        src={frame.src}
        poster={frame.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="size-full object-cover"
      />
    );
  }
  return (
    <img
      src={frame.src}
      alt=""
      width={CARD_W}
      height={CARD_H}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority="low"
      className="size-full object-cover"
    />
  );
}

export default function HeroArcGallery({ reducedMotion = false }) {
  const navigate = useNavigate();
  const [paused, setPaused] = useState(false);
  const [scroll, setScroll] = useState(0);
  const tiltRef = useRef({ x: 0, y: 0 });
  const stageRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const stage = stageRef.current;
    if (!stage) return undefined;
    const onMove = (e) => {
      const rect = stage.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      tiltRef.current = { x: nx, y: ny };
    };
    const onLeave = () => {
      tiltRef.current = { x: 0, y: 0 };
    };
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, [reducedMotion]);

  useAnimationFrame((_, delta) => {
    if (reducedMotion || paused) return;
    setScroll((prev) => prev + delta * SPEED);
    const stage = stageRef.current?.querySelector("[data-tilt-stage]");
    if (stage) {
      const { x, y } = tiltRef.current;
      stage.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 5}deg)`;
    }
  });

  const phase = reducedMotion ? 0 : scroll % FRAME_COUNT;

  return (
    <div
      ref={stageRef}
      className="relative hidden h-[min(380px,44vh)] w-full overflow-hidden [perspective:2200px] [perspective-origin:50%_28%] lg:block"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="pointer-events-none absolute inset-x-[12%] bottom-0 h-24 rounded-[100%] opacity-40 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59,111,240,0.35), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{
          background:
            "linear-gradient(to top, rgba(255,255,255,0.95), transparent)",
        }}
        aria-hidden
      />

      <div
        data-tilt-stage
        className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out [transform-style:preserve-3d]"
        style={{ width: CARD_W, height: CARD_H }}
      >
        {CYCLES.flatMap((cycle) =>
          HERO_ARC_FRAMES.map((frame, index) => {
            const virtual = cycle * FRAME_COUNT + index;
            const rel = virtual - CENTER - phase;
            const isActive = Math.abs(rel) <= 3.7;
            const depth = arcValues(rel);
            const near = Math.abs(rel) < 0.55;

            return (
              <button
                key={`${cycle}-${frame.id}`}
                type="button"
                onClick={() => isActive && executeHeroFrameAction(frame, navigate)}
                tabIndex={isActive ? 0 : -1}
                aria-hidden={!isActive}
                className="absolute left-0 top-0 cursor-pointer overflow-hidden border-0 bg-[#0a0a0a] p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] [backface-visibility:hidden] [transform-origin:center_center] [transform-style:preserve-3d] will-change-transform"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  borderRadius: "var(--radius-card)",
                  transform: arcTransform(rel),
                  zIndex: Math.round(10 + depth.z / 40),
                  pointerEvents: isActive ? "auto" : "none",
                  boxShadow: near
                    ? "0 28px 60px -18px rgba(15,15,15,0.5), 0 0 0 1px rgba(59,111,240,0.35)"
                    : "var(--shadow-frame)",
                }}
                aria-label={frame.label}
              >
                <FrameMedia frame={frame} eager={false} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-white/5" />
                {near ? (
                  <span className="absolute bottom-3 left-3 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90">
                    {frame.label}
                  </span>
                ) : null}
              </button>
            );
          }),
        )}
      </div>
    </div>
  );
}

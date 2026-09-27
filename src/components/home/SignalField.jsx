import { useEffect, useRef } from "react";

/**
 * Particle field: thousands of points drift as noise, then lock onto the
 * "CiQ" glyphs — the brand resolving out of the internet. Points flee the
 * cursor. `progressRef.current` (0→1, hero scroll) blows them back apart.
 */
export default function SignalField({ progressRef, formed = true, className = "" }) {
  const canvasRef = useRef(null);
  const formedRef = useRef(formed);
  formedRef.current = formed;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d", { alpha: true });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0;
    let H = 0;
    let pts = [];
    let raf = 0;
    let visible = true;
    let form = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    const sampleGlyphs = () => {
      const off = document.createElement("canvas");
      const mobile = W < 768;
      off.width = W;
      off.height = H;
      const o = off.getContext("2d");
      const size = mobile ? W * 0.46 : Math.min(H * 0.62, W * 0.3);
      o.fillStyle = "#fff";
      o.textBaseline = "middle";
      o.textAlign = "center";
      const cx = mobile ? W * 0.5 : W * 0.7;
      const cy = mobile ? H * 0.34 : H * 0.44;
      o.font = `800 ${size}px "Inter Tight", system-ui, sans-serif`;
      const cW = o.measureText("C").width;
      o.font = `italic 400 ${size * 1.08}px "Instrument Serif", Georgia, serif`;
      const iW = o.measureText("i").width;
      o.font = `800 ${size}px "Inter Tight", system-ui, sans-serif`;
      const qW = o.measureText("Q").width;
      const total = cW + iW + qW - size * 0.06;
      let x = cx - total / 2;
      o.textAlign = "left";
      o.fillText("C", x, cy);
      x += cW - size * 0.03;
      o.font = `italic 400 ${size * 1.08}px "Instrument Serif", Georgia, serif`;
      o.fillText("i", x, cy + size * 0.02);
      x += iW - size * 0.03;
      o.font = `800 ${size}px "Inter Tight", system-ui, sans-serif`;
      o.fillText("Q", x, cy);

      const data = o.getImageData(0, 0, W, H).data;
      const step = Math.max(4, Math.round(Math.sqrt((W * H) / (mobile ? 5200 : 9000)) * 0.6));
      const homes = [];
      for (let y = 0; y < H; y += step) {
        for (let xx = 0; xx < W; xx += step) {
          if (data[(y * W + xx) * 4 + 3] > 128) homes.push([xx, y]);
        }
      }
      return homes;
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      W = Math.max(1, Math.floor(rect.width));
      H = Math.max(1, Math.floor(rect.height));
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const homes = sampleGlyphs();
      const ambient = Math.round((W * H) / 2600);
      pts = [];
      for (let i = 0; i < homes.length + ambient; i++) {
        const home = homes[i];
        const x = Math.random() * W;
        const y = Math.random() * H;
        pts.push({
          x,
          y,
          vx: 0,
          vy: 0,
          hx: home ? home[0] : x,
          hy: home ? home[1] : y,
          glyph: Boolean(home),
          seed: Math.random() * 1000,
          sx: (Math.random() - 0.5) * 2,
          sy: (Math.random() - 0.5) * 2,
          hot: Math.random() < 0.09,
          r: home ? 1.6 : Math.random() * 1.1 + 0.35,
        });
      }
    };

    const draw = (t) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      const time = t * 0.00022;
      const scatter = progressRef?.current ?? 0;
      form += ((formedRef.current ? 1 : 0) - form) * 0.018;
      const pull = form * (1 - scatter);
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        // Flow-field drift (cheap pseudo-curl).
        const a = Math.sin(p.x * 0.004 + time * 3 + p.seed) + Math.cos(p.y * 0.005 - time * 2);
        let fx = Math.cos(a * 2.2) * 0.06;
        let fy = Math.sin(a * 2.2) * 0.06;

        if (p.glyph) {
          const tx = p.hx + p.sx * scatter * W * 0.55;
          const ty = p.hy + p.sy * scatter * H * 0.9 - scatter * 120;
          fx += (tx - p.x) * 0.012 * (pull + scatter * 0.6);
          fy += (ty - p.y) * 0.012 * (pull + scatter * 0.6);
          fx *= 1;
        }

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          const R = 130;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / R) * 2.4;
            fx += (dx / d) * f;
            fy += (dy / d) * f;
          }
        }

        p.vx = (p.vx + fx) * 0.9;
        p.vy = (p.vy + fy) * 0.9;
        p.x += p.vx;
        p.y += p.vy;
        if (!p.glyph) {
          if (p.x < 0) p.x += W;
          if (p.x > W) p.x -= W;
          if (p.y < 0) p.y += H;
          if (p.y > H) p.y -= H;
        }

        const speed = Math.min(1, Math.abs(p.vx) + Math.abs(p.vy));
        if (p.hot) {
          ctx.fillStyle = `rgba(110,150,255,${0.55 + speed * 0.45})`;
        } else if (p.glyph) {
          ctx.fillStyle = `rgba(241,240,235,${0.4 + pull * 0.6})`;
        } else {
          ctx.fillStyle = `rgba(241,240,235,${0.12 + speed * 0.3})`;
        }
        const s = p.r + speed * 0.8;
        ctx.fillRect(p.x, p.y, s, s);
      }
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = mouse.y > 0 && mouse.y < r.height;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    let resizeTimer = 0;
    let lastW = window.innerWidth;
    const onResize = () => {
      if (Math.abs(window.innerWidth - lastW) < 2) return; // ignore mobile URL-bar jitter
      lastW = window.innerWidth;
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 200);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    let cancelled = false;
    const fontsReady = document.fonts
      ? Promise.all([
          document.fonts.load('800 100px "Inter Tight"'),
          document.fonts.load('italic 400 100px "Instrument Serif"'),
        ]).catch(() => null)
      : Promise.resolve();

    fontsReady.then(() => {
      if (cancelled) return;
      build();
      if (reduce) {
        form = 1;
        formedRef.current = true;
        draw(0);
        cancelAnimationFrame(raf);
        // Settle a static frame.
        for (let k = 0; k < 400; k++) {
          pts.forEach((p) => {
            p.x += (p.hx - p.x) * 0.1;
            p.y += (p.hy - p.y) * 0.1;
          });
        }
        draw(0);
        cancelAnimationFrame(raf);
        return;
      }
      raf = requestAnimationFrame(draw);
    });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [progressRef]);

  return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} aria-hidden />;
}

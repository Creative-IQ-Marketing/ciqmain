/**
 * Event passes — the 3D artwork for the homepage Events section.
 *
 * Every CIQ event is a physical, laminated event badge with its flyer printed
 * on the front. The upcoming event hangs in front on a CIQ-blue lanyard; past
 * events sit behind it. Scroll fans the stack out in depth; the pointer tilts
 * it. Renders only while on screen; a single still frame under reduced motion.
 */
import {
  ACESFilmicToneMapping,
  CanvasTexture,
  Color,
  DirectionalLight,
  Group,
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  RepeatWrapping,
  Scene,
  Shape,
  ShapeGeometry,
  SRGBColorSpace,
  TextureLoader,
  TorusGeometry,
  WebGLRenderer,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const ACCENT = "#3b6ff0";
const INK = "#0f0f0f";

// Pass dimensions (world units). Origin of each pass group = the clip point,
// so rotations swing like a badge hanging from a lanyard.
const W = 1;
const H = 1.56;
const D = 0.034;
const HEADER = 0.2; // top strip with the lanyard slot
const PRINT_W = W - 0.06;
const PRINT_H = H - HEADER - 0.04;

function roundedRect(w, h, r) {
  const s = new Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/** ShapeGeometry with UVs normalized to 0..1 across its bounds. */
function roundedPlane(w, h, r) {
  const geo = new ShapeGeometry(roundedRect(w, h, r), 6);
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    uv.setXY(i, pos.getX(i) / w + 0.5, pos.getY(i) / h + 0.5);
  }
  return geo;
}

function coverCrop(tex, planeAspect) {
  const img = tex.image;
  const imgAspect = img.width / img.height;
  if (imgAspect > planeAspect) {
    tex.repeat.set(planeAspect / imgAspect, 1);
    tex.offset.set((1 - tex.repeat.x) / 2, 0);
  } else {
    tex.repeat.set(1, imgAspect / planeAspect);
    tex.offset.set(0, (1 - tex.repeat.y) / 2);
  }
}

function backTexture(pass, maxAniso) {
  const c = document.createElement("canvas");
  c.width = 600;
  c.height = Math.round(600 * (PRINT_H / PRINT_W));
  const g = c.getContext("2d");
  g.fillStyle = INK;
  g.fillRect(0, 0, c.width, c.height);
  // blue corner glow
  const grad = g.createRadialGradient(c.width, 0, 0, c.width, 0, c.width * 1.1);
  grad.addColorStop(0, "rgba(59,111,240,0.45)");
  grad.addColorStop(1, "rgba(59,111,240,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, c.width, c.height);

  const pad = 52;
  g.textBaseline = "top";
  g.font = "800 54px 'Plus Jakarta Sans', system-ui, sans-serif";
  g.fillStyle = "#ffffff";
  g.fillText("Creative", pad, pad);
  const cw = g.measureText("Creative").width;
  g.fillStyle = ACCENT;
  g.fillText("IQ", pad + cw, pad);

  g.font = "700 22px 'Plus Jakarta Sans', system-ui, sans-serif";
  g.fillStyle = "rgba(255,255,255,0.55)";
  g.fillText("E V E N T S", pad, pad + 74);

  g.fillStyle = "#ffffff";
  g.font = "800 64px 'Plus Jakarta Sans', system-ui, sans-serif";
  const words = pass.name.split(" ");
  let line = "";
  let y = c.height * 0.46;
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (g.measureText(test).width > c.width - pad * 2 && line) {
      g.fillText(line, pad, y);
      line = w;
      y += 70;
    } else line = test;
  }
  g.fillText(line, pad, y);
  g.font = "600 30px 'Plus Jakarta Sans', system-ui, sans-serif";
  g.fillStyle = ACCENT;
  g.fillText(pass.dateLabel, pad, y + 86);

  // admit-one strip + barcode
  const by = c.height - pad - 90;
  g.fillStyle = "rgba(255,255,255,0.08)";
  g.fillRect(pad, by - 30, c.width - pad * 2, 2);
  g.font = "700 22px 'Plus Jakarta Sans', system-ui, sans-serif";
  g.fillStyle = "rgba(255,255,255,0.6)";
  g.fillText("ADMIT ONE", pad, by);
  let x = c.width - pad;
  for (let i = 0; x > c.width * 0.45; i++) {
    const bw = [3, 6, 2, 4, 8, 2][i % 6];
    g.fillStyle = "rgba(255,255,255,0.75)";
    g.fillRect(x - bw, by - 4, bw, 70);
    x -= bw + [4, 3, 6, 2][i % 4];
  }
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = maxAniso;
  return tex;
}

/** Desaturate + dim (pixel loop — canvas filters are unreliable in Safari). */
function grayscaleTexture(src) {
  const img = src.image;
  const c = document.createElement("canvas");
  c.width = img.width;
  c.height = img.height;
  const g = c.getContext("2d");
  g.drawImage(img, 0, 0);
  const d = g.getImageData(0, 0, c.width, c.height);
  const px = d.data;
  for (let i = 0; i < px.length; i += 4) {
    const y = (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) * 0.62;
    px[i] = px[i + 1] = px[i + 2] = y;
  }
  g.putImageData(d, 0, 0);
  return new CanvasTexture(c);
}

function lanyardTexture() {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 1024;
  const g = c.getContext("2d");
  g.fillStyle = ACCENT;
  g.fillRect(0, 0, c.width, c.height);
  g.save();
  g.translate(c.width / 2, c.height);
  g.rotate(-Math.PI / 2);
  g.font = "800 46px 'Plus Jakarta Sans', system-ui, sans-serif";
  g.fillStyle = "rgba(255,255,255,0.92)";
  g.textBaseline = "middle";
  g.fillText("CREATIVEIQ  ·  EVENTS  ·  CREATIVEIQ  ·  EVENTS  ·", 12, 0);
  g.restore();
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.wrapT = RepeatWrapping;
  return tex;
}

export function createEventPassScene(canvas, { passes, reducedMotion = false }) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = envRT.texture;

  const camera = new PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0, 6.2);

  const key = new DirectionalLight("#ffffff", 1.4);
  key.position.set(2.5, 3, 4);
  const rim = new DirectionalLight(new Color(ACCENT), 3.2);
  rim.position.set(-4, 1.5, -2.5);
  scene.add(key, rim);

  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  const loader = new TextureLoader();
  const disposables = [envRT, pmrem];

  // Shared geometry / materials
  const bodyGeo = new RoundedBoxGeometry(W, H, D, 4, 0.06);
  const printGeo = roundedPlane(PRINT_W, PRINT_H, 0.035);
  const slotGeo = roundedPlane(0.26, 0.05, 0.025);
  const clipGeo = new RoundedBoxGeometry(0.16, 0.12, 0.05, 3, 0.02);
  const ringGeo = new TorusGeometry(0.07, 0.014, 12, 32);
  const strapGeo = new PlaneGeometry(0.16, 4.2);
  const metal = new MeshStandardMaterial({ color: "#c9ccd2", metalness: 1, roughness: 0.28 });
  const slotMat = new MeshStandardMaterial({ color: "#050505", roughness: 0.9 });
  const strapTex = lanyardTexture();
  strapTex.repeat.set(1, 3.2);
  const strapMat = new MeshStandardMaterial({ map: strapTex, roughness: 0.75 });
  disposables.push(bodyGeo, printGeo, slotGeo, clipGeo, ringGeo, strapGeo, metal, slotMat, strapTex, strapMat);

  const root = new Group();
  scene.add(root);

  const items = passes.map((pass, i) => {
    const group = new Group(); // pivot = clip point
    const card = new Group();
    card.position.y = -0.12 - H / 2; // hang below the clip
    group.add(card);

    const bodyMat = new MeshPhysicalMaterial({
      color: pass.featured ? ACCENT : "#1b1c20",
      roughness: 0.32,
      metalness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
    });
    const body = new Mesh(bodyGeo, bodyMat);
    card.add(body);

    const printMat = new MeshPhysicalMaterial({
      color: "#ffffff",
      roughness: 0.38,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    });
    const print = new Mesh(printGeo, printMat);
    print.position.set(0, -HEADER / 2 + 0.01, D / 2 + 0.0015);
    card.add(print);

    const backMat = new MeshPhysicalMaterial({
      map: backTexture(pass, maxAniso),
      roughness: 0.4,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
    const back = new Mesh(printGeo, backMat);
    back.rotation.y = Math.PI;
    back.position.set(0, -HEADER / 2 + 0.01, -D / 2 - 0.0015);
    card.add(back);

    const slot = new Mesh(slotGeo, slotMat);
    slot.position.set(0, H / 2 - HEADER / 2 + 0.01, D / 2 + 0.002);
    card.add(slot);

    const clip = new Mesh(clipGeo, metal);
    clip.position.y = -0.03;
    const ring = new Mesh(ringGeo, metal);
    ring.position.y = 0.06;
    group.add(clip, ring);

    if (pass.featured) {
      const strap = new Mesh(strapGeo, strapMat);
      strap.position.y = 0.1 + 2.1;
      group.add(strap);
    }

    disposables.push(bodyMat, printMat, backMat, backMat.map);

    const tex = loader.load(pass.flyer, (t) => {
      // Past events: drained of colour, so only the upcoming badge reads as live.
      const map = pass.featured ? t : grayscaleTexture(t);
      map.colorSpace = SRGBColorSpace;
      map.anisotropy = maxAniso;
      coverCrop(map, PRINT_W / PRINT_H);
      map.needsUpdate = true;
      printMat.map = map;
      printMat.needsUpdate = true;
      if (map !== t) disposables.push(map);
      invalidate();
    });
    tex.colorSpace = SRGBColorSpace;
    tex.anisotropy = maxAniso;
    disposables.push(tex);

    root.add(group);
    return { group, featured: pass.featured, index: i, seed: Math.random() * 10 };
  });

  // ── State ────────────────────────────────────────────────────────────
  const target = { progress: 0, px: 0, py: 0 };
  const current = { progress: 0, px: 0, py: 0 };
  let compact = false;
  let halfWidth = 1.6; // visible half-width at z=0, set on resize
  let visible = false;
  let raf = 0;
  let time = 0;
  let last = performance.now();

  function layout() {
    const p = MathUtils.smootherstep(current.progress, 0, 1);
    const spreadX = compact ? 0.42 : 0.7;
    const spreadZ = compact ? 0.5 : 0.75;
    const t = time;
    for (const it of items) {
      const { group, index, seed } = it;
      const k = index; // 0 = featured, 1.. = past
      // stacked → fanned
      // Desktop: canvas bleeds to the viewport edge, so lead from its left side.
      const lead = compact ? -0.3 : -halfWidth * 0.5;
      const stackX = lead + 0.04 * k;
      const fanX = lead + spreadX * k;
      group.position.x = MathUtils.lerp(stackX, fanX, p);
      group.position.y = (compact ? 0.74 : 0.46) + (k === 0 ? 0 : MathUtils.lerp(-0.02 * k, -0.18 * k, p));
      group.position.z = MathUtils.lerp(-0.05 * k, k === 0 ? 0.35 : -spreadZ * k, p);

      const sway = reducedMotion ? 0 : Math.sin(t * 0.9 + seed) * 0.018;
      const baseY = k === 0 ? MathUtils.lerp(-0.62, -0.1, p) : MathUtils.lerp(-0.2, -0.24, p);
      group.rotation.y = baseY + current.px * 0.22 + sway;
      group.rotation.x = current.py * 0.1 + (k === 0 ? 0.02 : 0);
      group.rotation.z = (k === 0 ? 0 : MathUtils.lerp(0.02 * k, 0.05 * k, p)) + sway * 0.6;
    }
    root.rotation.y = current.px * 0.06;
  }

  function resize() {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    compact = w < 560;
    camera.position.z = compact ? 3.9 : 6.2;
    camera.updateProjectionMatrix();
    halfWidth = Math.tan(MathUtils.degToRad(camera.fov / 2)) * camera.position.z * camera.aspect;
    invalidate();
  }

  function frame(now) {
    raf = 0;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    time += dt;
    const ease = 1 - Math.exp(-dt * 6);
    current.progress += (target.progress - current.progress) * ease;
    current.px += (target.px - current.px) * ease;
    current.py += (target.py - current.py) * ease;
    layout();
    renderer.render(scene, camera);
    if (visible && !reducedMotion) raf = requestAnimationFrame(frame);
  }

  function invalidate() {
    if (raf) return;
    if (reducedMotion || !visible) {
      // one settled frame
      current.progress = target.progress;
      current.px = target.px;
      current.py = target.py;
      layout();
      renderer.render(scene, camera);
      return;
    }
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  return {
    setProgress(p) {
      target.progress = MathUtils.clamp(p, 0, 1);
      if (reducedMotion) invalidate();
    },
    setPointer(x, y) {
      if (reducedMotion) return;
      target.px = x;
      target.py = y;
    },
    setVisible(v) {
      visible = v;
      if (v) invalidate();
      else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    },
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      for (const d of disposables) d.dispose?.();
      renderer.dispose();
    },
  };
}

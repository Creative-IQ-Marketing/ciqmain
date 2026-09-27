import { useEffect, useRef } from "react";
import * as THREE from "three";
import logoSample from "../../assets/brand/logo-sample.png";

/**
 * The CreativeIQ mark rebuilt as a 3D constellation.
 *  - crescent  → bowed back in depth like the limb of a moon
 *  - IQ        → sits forward, crisp
 *  - ring text → "DIGITAL MARKETING" slowly orbits the mark
 * Points assemble from a scattered cloud on boot, part around the pointer,
 * and on scroll the camera flies through them into the starfield.
 *
 * props.progressRef.current: 0..1 hero scroll progress
 * props.formed: boolean — start the assembly
 */

const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uForm;
  uniform float uScatter;
  uniform float uPixel;
  uniform vec3  uMouse;
  uniform float uMouseStrength;
  uniform float uOrbit;

  attribute vec3  aStart;
  attribute vec3  aDir;
  attribute float aDelay;
  attribute float aSize;
  attribute float aKind;   // 0 crescent, 1 IQ, 2 ring text, 3 star
  attribute float aSeed;

  varying float vAlpha;
  varying float vKind;
  varying float vTw;

  mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }

  void main() {
    vec3 home = position;

    // Ring text orbits the mark.
    if (aKind > 1.5 && aKind < 2.5) {
      home.xy = rot(uOrbit) * home.xy;
    }

    // Gentle breathing so the mark never sits dead still.
    float breathe = sin(uTime * 0.9 + aSeed * 6.2831) * 0.012;
    home += normalize(home + 0.0001) * breathe * step(aKind, 2.5);

    // Assembly: each point lands on its own schedule.
    float t = clamp((uForm - aDelay) / 0.55, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);
    vec3 p = mix(aStart, home, aKind > 2.5 ? 1.0 : t);

    // Scroll: burst outward along a per-point direction.
    float s = uScatter * uScatter;
    p += aDir * s * (aKind > 2.5 ? 0.0 : 9.0);

    // Pointer: points part around the cursor and lift toward the viewer.
    vec3 toP = p - uMouse;
    float d = length(toP.xy);
    float push = smoothstep(0.9, 0.0, d) * uMouseStrength * step(aKind, 2.5);
    p.xy += normalize(toP.xy + 0.0001) * push * 0.45;
    p.z  += push * 0.6;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float tw = 0.65 + 0.35 * sin(uTime * (1.2 + aSeed * 2.0) + aSeed * 40.0);
    vTw = tw;
    gl_PointSize = aSize * uPixel * (1.0 + push * 1.6) * (6.0 / -mv.z);

    float starA = 0.25 + 0.55 * tw;
    float boost = (aKind > 1.5 && aKind < 2.5) ? 1.6 : (aKind > 0.5 ? 1.25 : 1.0);
    vAlpha = aKind > 2.5 ? starA : (0.25 + 0.75 * t) * (1.0 - s * 0.6) * boost;
    vKind = aKind;
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uPaper;
  uniform vec3 uRose;
  varying float vAlpha;
  varying float vKind;
  varying float vTw;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float core = smoothstep(0.5, 0.0, r);
    float glow = pow(core, 1.6);
    vec3 col = uPaper;
    if (vKind > 1.5 && vKind < 2.5) col = uRose;
    if (vKind > 2.5) col = mix(uPaper, uRose, step(0.86, fract(vTw * 13.7)));
    gl_FragColor = vec4(col, glow * vAlpha);
  }
`;

function loadImage(src) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}

/** Reads the logo raster into typed point clouds. */
function sampleLogo(img, step) {
  const c = document.createElement("canvas");
  c.width = img.width;
  c.height = img.height;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);
  const { data } = ctx.getImageData(0, 0, c.width, c.height);
  const out = [];
  const W = c.width;
  const H = c.height;
  const scale = 4.2 / H;
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      const i = (y * W + x) * 4;
      const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
      if (a < 140) continue;
      const lum = (r + g + b) / 3;
      const sat = Math.max(r, g, b) - Math.min(r, g, b);
      if (lum > 200 && sat < 30) continue; // white paper
      const u = x / W;
      const v = y / H;
      let kind;
      if (sat > 30) kind = 2;
      else if (u > 0.28 && u < 0.78 && v > 0.23 && v < 0.76) kind = 1;
      else kind = 0;
      const px = (x - W * 0.47) * scale;
      const py = -(y - H * 0.5) * scale;
      out.push([px, py, kind]);
    }
  }
  return out;
}

export default function LogoCosmos({ progressRef, formed = true, className = "" }) {
  const mount = useRef(null);
  const formedRef = useRef(formed);
  formedRef.current = formed;

  useEffect(() => {
    const el = mount.current;
    if (!el) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch {
      return undefined; // No WebGL: the hero still reads as type on ink.
    }
    const DPR = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(DPR);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const rig = new THREE.Group(); // tilt with pointer
    const mark = new THREE.Group(); // the logo, offset per layout
    rig.add(mark);
    scene.add(rig);

    const uniforms = {
      uTime: { value: 0 },
      uForm: { value: reduce ? 2 : 0 },
      uScatter: { value: 0 },
      uPixel: { value: DPR },
      uMouse: { value: new THREE.Vector3(99, 99, 0) },
      uMouseStrength: { value: 0 },
      uOrbit: { value: 0 },
      uPaper: { value: new THREE.Color("#f1f0eb") },
      uRose: { value: new THREE.Color("#d39a95") },
    };
    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    let points;
    let stars;
    let disposed = false;
    let layoutMobile = null;

    const buildStars = () => {
      const N = window.innerWidth < 768 ? 900 : 2200;
      const pos = new Float32Array(N * 3);
      const zeros = new Float32Array(N * 3);
      const size = new Float32Array(N);
      const kind = new Float32Array(N).fill(3);
      const seed = new Float32Array(N);
      const delay = new Float32Array(N);
      for (let i = 0; i < N; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 30;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
        pos[i * 3 + 2] = -Math.random() * 40 + 6;
        size[i] = Math.random() * 2.2 + 0.6;
        seed[i] = Math.random();
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      g.setAttribute("aStart", new THREE.BufferAttribute(pos.slice(), 3));
      g.setAttribute("aDir", new THREE.BufferAttribute(zeros, 3));
      g.setAttribute("aDelay", new THREE.BufferAttribute(delay, 1));
      g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
      g.setAttribute("aKind", new THREE.BufferAttribute(kind, 1));
      g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
      stars = new THREE.Points(g, material);
      scene.add(stars);
    };

    const buildMark = async () => {
      const img = await loadImage(logoSample);
      if (disposed) return;
      const mobile = window.innerWidth < 768;
      const pts = sampleLogo(img, mobile ? 4 : 3);
      const N = pts.length;
      const pos = new Float32Array(N * 3);
      const start = new Float32Array(N * 3);
      const dir = new Float32Array(N * 3);
      const delay = new Float32Array(N);
      const size = new Float32Array(N);
      const kind = new Float32Array(N);
      const seed = new Float32Array(N);
      const R = 2.25;
      for (let i = 0; i < N; i++) {
        const [x, y, k] = pts[i];
        let z;
        if (k === 0) {
          // Crescent bows away like the limb of a sphere.
          const rr = Math.min(1, Math.hypot(x, y) / R);
          z = -Math.sqrt(Math.max(0, 1 - rr * rr)) * 0.2 - (1 - Math.abs(x) / R) * 0.9 + 0.35;
        } else if (k === 1) {
          z = 0.55 + (Math.random() - 0.5) * 0.08;
        } else {
          z = 0.25 + (Math.random() - 0.5) * 0.05;
        }
        pos.set([x, y, z], i * 3);
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        const rad = 5 + Math.random() * 7;
        start.set(
          [Math.sin(ph) * Math.cos(th) * rad, Math.sin(ph) * Math.sin(th) * rad * 0.6, Math.cos(ph) * rad - 3],
          i * 3,
        );
        const d = new THREE.Vector3(x, y, z + 0.4).normalize();
        d.x += (Math.random() - 0.5) * 0.8;
        d.y += (Math.random() - 0.5) * 0.8;
        d.z += Math.random() * 1.2;
        dir.set([d.x, d.y, d.z], i * 3);
        // Assemble from the crescent's tip around, then IQ, then the ring.
        const ang = (Math.atan2(y, x) + Math.PI) / (Math.PI * 2);
        delay[i] = (k === 0 ? ang * 0.35 : k === 1 ? 0.25 + Math.random() * 0.2 : 0.4 + ang * 0.3) + Math.random() * 0.08;
        size[i] = k === 2 ? 3.6 : k === 1 ? 3.0 : 3.1;
        kind[i] = k;
        seed[i] = Math.random();
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      g.setAttribute("aStart", new THREE.BufferAttribute(start, 3));
      g.setAttribute("aDir", new THREE.BufferAttribute(dir, 3));
      g.setAttribute("aDelay", new THREE.BufferAttribute(delay, 1));
      g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
      g.setAttribute("aKind", new THREE.BufferAttribute(kind, 1));
      g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
      points = new THREE.Points(g, material);
      mark.add(points);
      layout();
    };

    const layout = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const mobile = w < 768;
      layoutMobile = mobile;
      // Place the mark: right side on desktop, upper centre on phones.
      const visH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const visW = visH * camera.aspect;
      if (mobile) {
        mark.position.set(0, visH * 0.2, 0);
        mark.scale.setScalar(Math.min(0.62, (visW * 0.78) / 4.6));
      } else {
        mark.position.set(visW * 0.2, visH * 0.04, 0);
        mark.scale.setScalar(Math.min(1.08, (visH * 0.72) / 4.2));
      }
    };

    buildStars();
    buildMark().catch(() => {});

    // Pointer → world (on the z=0 plane of the mark).
    const ndc = new THREE.Vector2(0, 0);
    const target = new THREE.Vector2(0, 0);
    const ray = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const hit = new THREE.Vector3();
    let pointerIn = false;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      pointerIn = e.clientY >= r.top && e.clientY <= r.bottom;
      target.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    let lastW = window.innerWidth;
    const onResize = () => {
      if (Math.abs(window.innerWidth - lastW) < 2 && layoutMobile !== null) {
        layout();
        return;
      }
      lastW = window.innerWidth;
      layout();
    };
    window.addEventListener("resize", onResize);
    layout();

    const clock = new THREE.Clock();
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;
      uniforms.uTime.value = t;
      if (formedRef.current && uniforms.uForm.value < 2) uniforms.uForm.value += dt * 0.42;
      uniforms.uOrbit.value = reduce ? 0 : Math.sin(t * 0.12) * 0.22;

      const scroll = progressRef?.current ?? 0;
      uniforms.uScatter.value += (scroll - uniforms.uScatter.value) * 0.12;

      ndc.lerp(target, 0.06);
      rig.rotation.y = ndc.x * 0.32 + Math.sin(t * 0.25) * 0.05;
      rig.rotation.x = -ndc.y * 0.2 + Math.cos(t * 0.21) * 0.03;
      camera.position.z = 8.5 - scroll * 6.5;
      camera.position.y = -scroll * 0.6;

      ray.setFromCamera(target, camera);
      mark.updateMatrixWorld();
      const local = plane.clone().applyMatrix4(mark.matrixWorld);
      if (ray.ray.intersectPlane(local, hit)) {
        mark.worldToLocal(hit);
        uniforms.uMouse.value.lerp(hit, 0.25);
      }
      const want = pointerIn && !reduce ? 1 : 0;
      uniforms.uMouseStrength.value += (want - uniforms.uMouseStrength.value) * 0.08;

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      points?.geometry.dispose();
      stars?.geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [progressRef]);

  return <div ref={mount} className={`h-full w-full ${className}`} aria-hidden />;
}

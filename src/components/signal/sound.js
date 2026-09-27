/**
 * Optional UI sound: soft synthesized ticks, no audio files. Off by default;
 * the header toggle turns it on and the choice is remembered per browser.
 */
let ctx = null;
let enabled = false;
const KEY = "ciq_sound";

try {
  enabled = localStorage.getItem(KEY) === "1";
} catch {
  enabled = false;
}

function audio() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function blip(freq, dur, gain, type = "sine") {
  if (!enabled) return;
  const a = audio();
  if (!a) return;
  const t = a.currentTime;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  o.frequency.exponentialRampToValueAtTime(freq * 0.6, t + dur);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(a.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}

export const sound = {
  get enabled() {
    return enabled;
  },
  set(on) {
    enabled = on;
    try {
      localStorage.setItem(KEY, on ? "1" : "0");
    } catch {
      /* storage blocked */
    }
    if (on) blip(880, 0.18, 0.05);
  },
  hover: () => blip(1760, 0.05, 0.012),
  click: () => blip(620, 0.12, 0.05, "triangle"),
};

let last = 0;
/** Wires hover/click ticks to every interactive element once. */
export function installSoundHooks() {
  const over = (e) => {
    if (!enabled) return;
    const el = e.target.closest?.("a, button");
    if (!el || el.contains(e.relatedTarget)) return;
    const now = performance.now();
    if (now - last < 60) return;
    last = now;
    sound.hover();
  };
  const down = (e) => {
    if (enabled && e.target.closest?.("a, button")) sound.click();
  };
  document.addEventListener("pointerover", over, { passive: true });
  document.addEventListener("pointerdown", down, { passive: true });
  return () => {
    document.removeEventListener("pointerover", over);
    document.removeEventListener("pointerdown", down);
  };
}

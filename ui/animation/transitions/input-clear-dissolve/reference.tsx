/* Use when: Clearing a text field — search box, filter input, any field with a clear (×) button. The typed text flies down + blurs + fades while a soft per-word streak ignites under each word, and the placeholder falls in from above. Per-frame JS is required: the streak envelope and per-word gradient stack cannot be expressed as static @keyframes.
 * Source: transitions.dev — React tab. */

import "./styles.css";

import { useEffect, useRef } from "react";

// Pair with the CSS from the CSS tab.
// Per-frame JS is unavoidable here: the per-word streak's
// rise → peak → fall envelope can't be expressed as a static
// @keyframe, so we tween transform/opacity/filter ourselves.
//
// Use it as:
//   <ClearInput defaultValue="How do transitions work?"
//               placeholder="Search anything" />
//
// Bring your own search icon, container size, and theming.
export function ClearInput({ defaultValue = "", placeholder = "" }) {
  const wrapRef    = useRef(null);
  const inputRef   = useRef(null);
  const mirrorRef  = useRef(null);
  const fakePhRef  = useRef(null);
  const glowRef    = useRef(null);
  const isClearing = useRef(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const input = inputRef.current;
    if (!wrap || !input) return;
    const sync = () => {
      const has = input.value.length > 0;
      wrap.classList.toggle("has-value", has);
      if (has && mirrorRef.current) {
        mirrorRef.current.textContent = input.value.replace(/ /g, "\u00a0");
      }
    };
    input.addEventListener("input", sync);
    sync();
    return () => input.removeEventListener("input", sync);
  }, []);

  const onClear = () => {
    const wrap = wrapRef.current;
    const input = inputRef.current;
    const mirror = mirrorRef.current;
    const fakePh = fakePhRef.current;
    const glow = glowRef.current;
    if (!wrap || !input || !mirror || !fakePh || !glow) return;
    if (isClearing.current || !input.value) return;
    isClearing.current = true;
    const wasFocused = document.activeElement === input;
    mirror.textContent = input.value.replace(/ /g, "\u00a0");
    const bg = buildLayers(wrap, mirror.textContent);
    const peakAt   = readNum("--glow-peak-at", 0.15);
    const opacity  = readNum("--glow-opacity", 0.42);
    const total    = readNum("--clear-dur", 1000);
    const outDur   = readNum("--clear-out-dur", 400);
    const inDur    = readNum("--clear-in-dur", 400);
    const outFly   = readNum("--clear-out-fly", 12);
    const inFly    = readNum("--clear-in-fly", 12);
    const blurPx   = readNum("--clear-blur", 2);
    const glowDly  = readNum("--glow-delay", 50);
    const eOut = makeEase(readEase("--clear-out-ease", "cubic-bezier(0.22, 1, 0.36, 1)"));
    const eIn  = makeEase(readEase("--clear-in-ease",  "cubic-bezier(0.22, 1, 0.36, 1)"));

    input.value = "";
    wrap.classList.remove("has-value");
    wrap.classList.add("is-clearing");
    fakePh.style.transform = `translateY(-${inFly}px)`;
    fakePh.style.opacity = "0.9";
    fakePh.style.filter = `blur(${blurPx}px)`;
    glow.style.background = bg;
    glow.style.opacity = "0";

    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const p  = Math.min(1, elapsed / total);
      const e  = eOut(Math.min(1, elapsed / outDur));
      mirror.style.transform = `translateY(${(e * outFly).toFixed(1)}px)`;
      mirror.style.opacity = (1 - e).toFixed(3);
      mirror.style.filter = `blur(${(e * blurPx).toFixed(1)}px)`;
      const pe = eIn(Math.min(1, elapsed / inDur));
      fakePh.style.transform = `translateY(${(-inFly + pe * inFly).toFixed(1)}px)`;
      fakePh.style.opacity = (0.9 + pe * 0.1).toFixed(3);
      fakePh.style.filter = `blur(${(blurPx - pe * blurPx).toFixed(1)}px)`;
      let g = 0;
      if (elapsed > glowDly) {
        const remaining = Math.max(1, total - glowDly);
        const gp = Math.min(1, (elapsed - glowDly) / remaining);
        g = gp < peakAt ? gp / peakAt : 1 - (gp - peakAt) / (1 - peakAt);
      }
      glow.style.opacity = (g * opacity).toFixed(3);
      if (p < 1) requestAnimationFrame(tick);
      else {
        wrap.classList.remove("is-clearing");
        for (const el of [mirror, fakePh]) el.style.cssText = "";
        mirror.textContent = "";
        glow.style.opacity = "0";
        glow.style.background = "";
        isClearing.current = false;
        if (wasFocused) input.focus({ preventScroll: true });
      }
    };
    requestAnimationFrame(tick);
  };

  return (
    <div ref={wrapRef} className="t-clear">
      <input
        ref={inputRef}
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
      <div ref={mirrorRef} className="t-clear-mirror" aria-hidden="true" />
      <div ref={fakePhRef} className="t-clear-placeholder" aria-hidden="true">
        {placeholder}
      </div>
      <div ref={glowRef} className="t-clear-glow" aria-hidden="true" />
      <button
        type="button"
        className="t-clear-btn"
        aria-label="Clear"
        // Trap focus on the input across pointer + mouse so the button
        // never steals it during the clear animation.
        onPointerDown={(e) => { if (document.activeElement === inputRef.current) e.preventDefault(); }}
        onMouseDown={(e) => { if (document.activeElement === inputRef.current) e.preventDefault(); }}
        onClick={onClear}
      >×</button>
    </div>
  );
}

function buildLayers(wrap, text) {
  const inputW = wrap.clientWidth || 280;
  const padLeft = 32;
  const segments = text.split(/(\s+)/);
  const spread = readNum("--glow-spread", 1.5);
  const ctx = (buildLayers._ctx ||= (() => {
    const c = document.createElement("canvas").getContext("2d");
    c.font = "400 13px Inter, sans-serif";
    return c;
  })());
  // Light mode paints black gradients (multiply blend); dark mode
  // paints white (screen blend). Pair this with the matching
  // `mix-blend-mode` rule on .t-clear-glow in your theme CSS.
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const rgb = isDark ? "255,255,255" : "0,0,0";
  const layers = [];
  let x = 0;
  for (const seg of segments) {
    const w = ctx.measureText(seg).width;
    if (seg.trim()) {
      const cx = padLeft + x + w / 2;
      const hw = Math.max(w * 0.45, 8) * spread;
      const stops = [
        { dx: 0,         rw: hw * 0.8,  rh: 7, a: 0.22 },
        { dx: hw * 0.45, rw: hw * 0.55, rh: 8, a: 0.18 },
        { dx: -hw * 0.4, rw: hw * 0.65, rh: 6, a: 0.16 },
        { dx: hw * 0.15, rw: hw * 0.9,  rh: 5, a: 0.14 },
      ];
      for (const l of stops) {
        const lx = ((cx + l.dx) / inputW * 100).toFixed(2);
        layers.push(
          `radial-gradient(ellipse ${Math.max(l.rw, 2).toFixed(1)}px ${l.rh}px at ${lx}% 100%, rgba(${rgb},${l.a.toFixed(3)}), transparent)`
        );
      }
    }
    x += w;
  }
  return layers.join(", ");
}
function readNum(name, fb) {
  const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));
  return Number.isFinite(v) ? v : fb;
}
function readEase(name, fb) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fb;
}
function makeEase(ease) {
  const m = ease.match(/cubic-bezier\s*\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/i);
  if (!m) return (t) => t;
  const [x1, y1, x2, y2] = [m[1], m[2], m[3], m[4]].map(parseFloat);
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sX = (s) => ((ax * s + bx) * s + cx) * s;
  const sY = (s) => ((ay * s + by) * s + cy) * s;
  const dX = (s) => (3 * ax * s + 2 * bx) * s + cx;
  return (t) => {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    let s = t;
    for (let i = 0; i < 8; i++) {
      const dx = sX(s) - t;
      if (Math.abs(dx) < 1e-6) break;
      const d = dX(s);
      if (d === 0) break;
      s -= dx / d;
    }
    return sY(s);
  };
}

/**
 * Twin Galaxy Rings — Originkit (source supplied by the user), canvas 2D. Dot colours come from
 * `--galaxy-a` / `--galaxy-b` and the backdrop from `--galaxy-bg` / `--galaxy-glow`, declared on the root
 * with the upstream values; `colors` / `background` props override them.
 */
import { useEffect, useRef, type CSSProperties } from "react";

type Props = { background?: string; colors?: string[]; density?: number; dotSize?: number; speed?: number; hoverSpeed?: number; direction?: "ccw" | "cw"; distance?: number; innerVoid?: number; armThickness?: number; armCount?: number; tilt?: { tilt?: number; sideTilt?: number }; style?: CSSProperties; className?: string };
const TAU = Math.PI * 2;
const random = (seed: number) => () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

/** Two-colour dot spiral drifting along its arms; hovering speeds it up and brightens dots near the pointer. */
export function TwinGalaxyRings({ background = "var(--galaxy-bg)", colors: colorsProp, density = 29, dotSize = 2, speed = 47, hoverSpeed = 85, direction = "cw", innerVoid = 14, armThickness = 100, armCount = 5, tilt = { tilt: 26, sideTilt: -8 }, style, className }: Props) {
  const colors = colorsProp ?? [];
  const canvas = useRef<HTMLCanvasElement>(null); const host = useRef<HTMLDivElement>(null); const values = useRef({ colors, density, dotSize, speed, hoverSpeed, direction, innerVoid, armThickness, armCount, tilt });
  values.current = { colors, density, dotSize, speed, hoverSpeed, direction, innerVoid, armThickness, armCount, tilt };
  useEffect(() => {
    const node = canvas.current; const box = host.current; if (!node || !box) return; const css = getComputedStyle(box); const declared = [css.getPropertyValue("--galaxy-a").trim(), css.getPropertyValue("--galaxy-b").trim()]; const ctx = node.getContext("2d")!; let frame = 0; let last = performance.now(); let stream = 0; let hover = 0; let target = 0; let px = -9999; let py = -9999;
    const resize = () => { const dpr = Math.min(devicePixelRatio || 1, 1.5); node.width = Math.max(1, box.clientWidth * dpr); node.height = Math.max(1, box.clientHeight * dpr); node.style.width = `${box.clientWidth}px`; node.style.height = `${box.clientHeight}px`; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const observer = new ResizeObserver(resize); observer.observe(box); resize();
    const move = (e: PointerEvent) => { const r = box.getBoundingClientRect(); px = e.clientX - r.left; py = e.clientY - r.top; target = 1; }; const leave = () => { target = 0; }; box.addEventListener("pointermove", move); box.addEventListener("pointerleave", leave);
    const draw = (now: number) => { frame = requestAnimationFrame(draw); const dt = Math.min(.05, (now - last) / 1000); last = now; const v = values.current; hover += (target - hover) * Math.min(1, dt * 5); stream += dt * ((v.speed + (v.hoverSpeed - v.speed) * hover) / 50) * (v.direction === "cw" ? -1 : 1); const w = box.clientWidth; const h = box.clientHeight; ctx.clearRect(0, 0, w, h); ctx.globalCompositeOperation = "lighter"; const rnd = random(0x9a1a1); const arms = Math.max(1, Math.round(v.armCount)); const samples = Math.max(160, Math.min(800, Math.round(v.density * 16))); const max = Math.min(w, h) * .58; const min = max * Math.max(.01, Math.min(.9, v.innerVoid / 100)); const pitch = ((v.tilt.tilt ?? 26) * Math.PI) / 180; const roll = ((v.tilt.sideTilt ?? -8) * Math.PI) / 180; const armW = (34 * v.armThickness) / 100; const armH = (16 * v.armThickness) / 100;
      for (let arm = 0; arm < arms; arm++) for (let s = 0; s < samples; s++) { const p = ((s / samples + stream * .04) % 1 + 1) % 1; const theta = p * TAU * 5 + arm * TAU / arms; const radius = min * Math.pow(max / min, p); const jitter = (rnd() - .5) * armW * (0.4 + p); const x0 = radius * Math.cos(theta) - Math.sin(theta) * jitter; const y0 = radius * Math.sin(theta) + Math.cos(theta) * jitter; const y = y0 * Math.cos(pitch) + (rnd() - .5) * armH; const x = x0 * Math.cos(roll) - y * Math.sin(roll) + w / 2; const yy = x0 * Math.sin(roll) + y * Math.cos(roll) + h / 2; const d = Math.hypot(x - px, yy - py); const glow = hover * Math.exp(-(d * d) / Math.max(1, max * .025)); const palette = v.colors.length ? v.colors : declared; const color = palette[Math.min(palette.length - 1, Math.floor(rnd() * palette.length))] || declared[0]; const alpha = (.12 + rnd() * .45) * (1 + glow * 1.5) * Math.min(1, p * 8, (1 - p) * 8); ctx.fillStyle = color; ctx.globalAlpha = alpha; const size = Math.max(.4, v.dotSize * (.55 + rnd() * 1.4) * (1 + glow)); ctx.fillRect(x, yy, size, size); }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over";
    }; frame = requestAnimationFrame(draw); return () => { cancelAnimationFrame(frame); observer.disconnect(); box.removeEventListener("pointermove", move); box.removeEventListener("pointerleave", leave); };
  }, []);
  return <div ref={host} className={["[--galaxy-a:oklch(0.618_0.245_300.1)] [--galaxy-b:oklch(0.872_0.029_256.5)] [--galaxy-bg:oklch(0.144_0.024_260.2)] [--galaxy-glow:oklch(0.674_0.096_263.6/0.1)]", className].filter(Boolean).join(" ")} style={{ position: "relative", width: "100%", height: "100%", minWidth: 320, minHeight: 320, overflow: "hidden", background: `radial-gradient(46% 40% at 6% 4%, var(--galaxy-glow), transparent 72%), ${background}`, ...style }}><canvas ref={canvas} style={{ position: "absolute", inset: 0, display: "block" }} /></div>;
}

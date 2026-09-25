import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "./lib/utils";
import "./input-clear-dissolve.css";

export type ClearInputProps = {
  defaultValue?: string;
  placeholder?: string;
  /** Fires on every edit and with `""` when the clear button empties the field. */
  onValueChange?: (value: string) => void;
  /** Fires when the clear animation starts. */
  onClear?: () => void;
  /** Leading adornment (e.g. a search icon), placed in the 32 px left gutter. */
  icon?: ReactNode;
  "aria-label"?: string;
  className?: string;
};

/** Left padding of the text inside the field; the glow maths measures words from here. */
const PAD_LEFT = 32;

/**
 * Text field whose clear (×) button dissolves the typed text: it flies down, blurs and fades while
 * a soft streak ignites under each word and the placeholder falls in from above. The value is
 * uncontrolled (the animation owns the clear); listen with `onValueChange`.
 */
export function ClearInput({ defaultValue = "", placeholder = "", onValueChange, onClear, icon, className, ...aria }: ClearInputProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);
  const fakePhRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const isClearing = useRef(false);

  const sync = () => {
    const wrap = wrapRef.current;
    const input = inputRef.current;
    if (!wrap || !input) return;
    const has = input.value.length > 0;
    wrap.classList.toggle("has-value", has);
    if (has && mirrorRef.current) mirrorRef.current.textContent = input.value.replace(/ /g, " ");
  };

  useEffect(sync, []);

  const onClearClick = () => {
    const wrap = wrapRef.current;
    const input = inputRef.current;
    const mirror = mirrorRef.current;
    const fakePh = fakePhRef.current;
    const glow = glowRef.current;
    if (!wrap || !input || !mirror || !fakePh || !glow) return;
    if (isClearing.current || !input.value) return;
    isClearing.current = true;
    onClear?.();
    const wasFocused = document.activeElement === input;
    mirror.textContent = input.value.replace(/ /g, " ");
    const cs = getComputedStyle(wrap);
    const num = (name: string, fb: number) => {
      const v = parseFloat(cs.getPropertyValue(name));
      return Number.isFinite(v) ? v : fb;
    };
    const bg = buildLayers(wrap, input, mirror.textContent, num("--glow-spread", 1.5));
    const peakAt = num("--glow-peak-at", 0.15);
    const opacity = num("--glow-opacity", 0.42);
    const total = num("--clear-dur", 1000);
    const outDur = num("--clear-out-dur", 400);
    const inDur = num("--clear-in-dur", 400);
    const outFly = num("--clear-out-fly", 12);
    const inFly = num("--clear-in-fly", 12);
    const blurPx = num("--clear-blur", 2);
    const glowDly = num("--glow-delay", 50);
    const eOut = makeEase(cs.getPropertyValue("--clear-out-ease").trim() || "cubic-bezier(0.22, 1, 0.36, 1)");
    const eIn = makeEase(cs.getPropertyValue("--clear-in-ease").trim() || "cubic-bezier(0.22, 1, 0.36, 1)");

    input.value = "";
    onValueChange?.("");
    wrap.classList.remove("has-value");
    wrap.classList.add("is-clearing");
    fakePh.style.transform = `translateY(-${inFly}px)`;
    fakePh.style.opacity = "0.9";
    fakePh.style.filter = `blur(${blurPx}px)`;
    glow.style.background = bg;
    glow.style.opacity = "0";

    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / total);
      const e = eOut(Math.min(1, elapsed / outDur));
      mirror.style.transform = `translateY(${(e * outFly).toFixed(1)}px)`;
      mirror.style.opacity = (1 - e).toFixed(3);
      mirror.style.filter = `blur(${(e * blurPx).toFixed(1)}px)`;
      const pe = eIn(Math.min(1, elapsed / inDur));
      fakePh.style.transform = `translateY(${(-inFly + pe * inFly).toFixed(1)}px)`;
      fakePh.style.opacity = (0.9 + pe * 0.1).toFixed(3);
      fakePh.style.filter = `blur(${(blurPx - pe * blurPx).toFixed(1)}px)`;
      let g = 0;
      if (elapsed > glowDly) {
        const gp = Math.min(1, (elapsed - glowDly) / Math.max(1, total - glowDly));
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

  // Keep focus on the input so the button never steals it during the clear.
  const keepFocus = (e: { preventDefault: () => void }) => {
    if (document.activeElement === inputRef.current) e.preventDefault();
  };

  return (
    <div
      ref={wrapRef}
      className={cn(
        "t-clear h-9 w-64 rounded-full bg-secondary text-sm text-secondary-foreground [--clear-glow:var(--foreground)]",
        className,
      )}
    >
      <input
        ref={inputRef}
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        onInput={() => {
          sync();
          onValueChange?.(inputRef.current?.value ?? "");
        }}
        className="size-full rounded-full bg-transparent pr-9 font-medium outline-none placeholder:text-transparent focus-visible:ring-[3px] focus-visible:ring-ring/50"
        style={{ paddingLeft: PAD_LEFT }}
        {...aria}
      />
      {icon && (
        <span className="pointer-events-none absolute inset-y-0 left-3 z-[1] flex items-center text-muted-foreground" aria-hidden="true">
          {icon}
        </span>
      )}
      <div ref={mirrorRef} className="t-clear-mirror font-medium" style={{ paddingLeft: PAD_LEFT }} aria-hidden="true" />
      <div ref={fakePhRef} className="t-clear-placeholder font-medium text-muted-foreground" style={{ paddingLeft: PAD_LEFT }} aria-hidden="true">
        {placeholder}
      </div>
      <div ref={glowRef} className="t-clear-glow mix-blend-multiply dark:mix-blend-screen" aria-hidden="true" />
      <button
        type="button"
        aria-label="Clear"
        onPointerDown={keepFocus}
        onMouseDown={keepFocus}
        onClick={onClearClick}
        className="absolute top-1/2 right-2.5 z-[4] grid size-4 -translate-y-1/2 place-items-center rounded-full bg-muted-foreground/70 text-background outline-none hover:bg-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        <X className="size-2.5" strokeWidth={3} />
      </button>
    </div>
  );
}

/** One stack of soft radial streaks per word, coloured with the declared `--clear-glow`. */
function buildLayers(wrap: HTMLElement, input: HTMLInputElement, text: string, spread: number) {
  const inputW = wrap.clientWidth || 280;
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return "";
  const cs = getComputedStyle(input);
  ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  const layers: string[] = [];
  let x = 0;
  for (const seg of text.split(/(\s+)/)) {
    const w = ctx.measureText(seg).width;
    if (seg.trim()) {
      const cx = PAD_LEFT + x + w / 2;
      const hw = Math.max(w * 0.45, 8) * spread;
      const stops = [
        { dx: 0, rw: hw * 0.8, rh: 7, a: 0.22 },
        { dx: hw * 0.45, rw: hw * 0.55, rh: 8, a: 0.18 },
        { dx: -hw * 0.4, rw: hw * 0.65, rh: 6, a: 0.16 },
        { dx: hw * 0.15, rw: hw * 0.9, rh: 5, a: 0.14 },
      ];
      for (const l of stops) {
        const lx = (((cx + l.dx) / inputW) * 100).toFixed(2);
        layers.push(
          `radial-gradient(ellipse ${Math.max(l.rw, 2).toFixed(1)}px ${l.rh}px at ${lx}% 100%, color-mix(in oklch, var(--clear-glow) ${(l.a * 100).toFixed(1)}%, transparent), transparent)`,
        );
      }
    }
    x += w;
  }
  return layers.join(", ");
}

/** cubic-bezier(x1, y1, x2, y2) → easing function (Newton-Raphson on x). */
function makeEase(ease: string) {
  const m = ease.match(/cubic-bezier\s*\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/i);
  if (!m) return (t: number) => t;
  const [x1, y1, x2, y2] = [m[1], m[2], m[3], m[4]].map(parseFloat);
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sX = (s: number) => ((ax * s + bx) * s + cx) * s;
  const sY = (s: number) => ((ay * s + by) * s + cy) * s;
  const dX = (s: number) => (3 * ax * s + 2 * bx) * s + cx;
  return (t: number) => {
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

// Button depth by technique, not by colour: one markup, ten materials. The look lives in
// `color-depth.css` (layered gradients, inset shadows, ::before/::after sheens); this file adds the
// two behaviours the upstream companion script provided — pointer-tracked glints for Metal and Foil,
// and the toggle's on/off state — plus the Glass refraction filter.

import { useRef, type ButtonHTMLAttributes, type PointerEvent, type ReactNode } from "react";
import { cn } from "./lib/utils";
import "./color-depth.css";

export type DepthMaterial =
  | "glossy"
  | "glow"
  | "metal"
  | "layered"
  | "inset"
  | "glass"
  | "neon"
  | "duotone"
  | "satin"
  | "foil";

export const DEPTH_MATERIALS: DepthMaterial[] = ["glossy", "glow", "metal", "layered", "inset", "glass", "neon", "duotone", "satin", "foil"];

// Metal and Foil: write the pointer position as CSS variables (smoothing lives in CSS transitions).
function usePointerVars(enabled: boolean) {
  const raf = useRef(0);
  const pos = useRef({ x: 0.5, y: 0.5 });
  const write = (el: HTMLElement) => {
    raf.current = 0;
    const { x, y } = pos.current;
    const s = el.style;
    s.setProperty("--pointer-x", `${(x * 100).toFixed(1)}%`);
    s.setProperty("--pointer-y", `${(y * 100).toFixed(1)}%`);
    s.setProperty("--glare-x", `${(x * 100).toFixed(1)}%`);
    s.setProperty("--glare-y", `${(y * 100).toFixed(1)}%`);
    s.setProperty("--shine-angle", `${(110 + (x - 0.5) * 50).toFixed(1)}deg`);
  };
  const schedule = (el: HTMLElement) => {
    if (!raf.current) raf.current = requestAnimationFrame(() => write(el));
  };
  if (!enabled || (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)) return {};
  return {
    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      if (r.width && r.height) {
        pos.current = {
          x: Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)),
          y: Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)),
        };
      }
      schedule(e.currentTarget);
    },
    onPointerLeave: (e: PointerEvent<HTMLElement>) => {
      pos.current = { x: 0.5, y: 0.5 };
      schedule(e.currentTarget);
    },
  };
}

/** The Glass refraction filter (a displacement map that bends what is behind the button at its rim).
 *  `.depth-glass` references it as `backdrop-filter: url(#liquid-glass-filter)`; DepthButton renders it
 *  for glass buttons. The map is data, not styling: red/green/blue/yellow channels encode x/y shift. */
export function GlassFilter() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <filter id="liquid-glass-filter" colorInterpolationFilters="sRGB">
          <feImage
            x="0"
            y="0"
            width="100%"
            height="100%"
            href="data:image/svg+xml,%3Csvg%20viewBox%3D%270%200%20200%2080%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cdefs%3E%3ClinearGradient%20id%3D%27r%27%20x2%3D%27100%25%27%3E%3Cstop%20stop-color%3D%27%23f00%27%2F%3E%3Cstop%20offset%3D%2750%25%27%20stop-color%3D%27%23808080%27%2F%3E%3Cstop%20offset%3D%27100%25%27%20stop-color%3D%27%230f0%27%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%27b%27%20y2%3D%27100%25%27%3E%3Cstop%20stop-color%3D%27%2300f%27%2F%3E%3Cstop%20offset%3D%2750%25%27%20stop-color%3D%27%23808080%27%2F%3E%3Cstop%20offset%3D%27100%25%27%20stop-color%3D%27%23ff0%27%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%27200%27%20height%3D%2780%27%20rx%3D%2740%27%20fill%3D%27url%28%23r%29%27%2F%3E%3Crect%20width%3D%27200%27%20height%3D%2780%27%20rx%3D%2740%27%20fill%3D%27url%28%23b%29%27%20style%3D%27mix-blend-mode%3Aoverlay%27%2F%3E%3Crect%20x%3D%2714%27%20y%3D%2714%27%20width%3D%27172%27%20height%3D%2752%27%20rx%3D%2726%27%20fill%3D%27%23808080%27%20style%3D%27filter%3Ablur%2814px%29%27%2F%3E%3C%2Fsvg%3E"
            result="map"
          />
          <feDisplacementMap in="SourceGraphic" in2="map" scale="-14" xChannelSelector="R" yChannelSelector="G" result="dispRed" />
          <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
          <feDisplacementMap in="SourceGraphic" in2="map" scale="-13" xChannelSelector="R" yChannelSelector="G" result="dispGreen" />
          <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
          <feDisplacementMap in="SourceGraphic" in2="map" scale="-12" xChannelSelector="R" yChannelSelector="G" result="dispBlue" />
          <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
          <feBlend in="red" in2="green" mode="screen" result="rg" />
          <feBlend in="rg" in2="blue" mode="screen" result="output" />
          <feGaussianBlur in="output" stdDeviation="0.4" />
        </filter>
      </defs>
    </svg>
  );
}

export interface DepthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  material: DepthMaterial;
  /** `pill` (44 px tall, 22 px side padding) or `icon` (44 × 44 square). */
  shape?: "pill" | "icon";
  children: ReactNode;
}

export function DepthButton({ material, shape = "pill", className, children, type = "button", ...props }: DepthButtonProps) {
  const pointer = usePointerVars(material === "metal" || material === "foil");
  return (
    <button
      type={type}
      {...props}
      {...pointer}
      className={cn("depth-btn", `depth-${material}`, shape === "icon" && "depth-icon", className)}
    >
      {material === "glass" && <GlassFilter />}
      {material === "foil" ? (
        <>
          <span aria-hidden className="depth-foil-l depth-foil-base" />
          <span aria-hidden className="depth-foil-l depth-foil-film" />
          <span aria-hidden className="depth-foil-l depth-foil-pearl" />
          <span className="depth-label">{children}</span>
          <span aria-hidden className="depth-foil-l depth-foil-shine" />
          <span aria-hidden className="depth-foil-l depth-foil-glare" />
        </>
      ) : (
        <span className="depth-label">{children}</span>
      )}
    </button>
  );
}

export interface DepthToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  material: Exclude<DepthMaterial, "foil">;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

/** A 76 × 44 switch: the material is the track, a 30 px textured knob slides 32 px on top. */
export function DepthToggle({ material, checked, onCheckedChange, className, ...props }: DepthToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      {...props}
      data-on={checked ? "true" : "false"}
      onClick={() => onCheckedChange(!checked)}
      className={cn("depth-btn depth-toggle", `depth-${material}`, className)}
    >
      {material === "glass" && <GlassFilter />}
      <span aria-hidden className="depth-knob" />
    </button>
  );
}

// Squircle components sharing one glossy neutral surface.
//
// GlossySquircle is a deep stack of very low-opacity greyscale layers, each clipped to the squircle:
//   surface: porcelain gradient · corner vignette · centre glow · fine grain · brushed streaks ·
//            diagonal light sweep · middle sheen band
//   light:   side edge-lights · top sheen · glass rim · bottom counter-sheen · light lift ·
//            grounding shadow
//   edge:    tri-stop bevel border · inner shadow wall · fresnel edge-brighten · AO ring ·
//            corner glints · double outer hairline
// Colours come from the `--sq-*` variables in `squircle.css`, declared on each part's root.

import { useId, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "./lib/utils";
import { Squircle } from "./squircle";
import { shapePath } from "./superellipse";
import { CONTROL_H, CONTROL_H_SM, radiusFor, TEXT, TRACKING } from "./tokens";
import "./squircle.css";

export interface Shape {
  /** Corner radius, px (the parts derive their own from the control height; kept for API parity). */
  radius?: number;
  /** Corner extent along the edge, 0..1 (1 = full corner, 0.6 = iOS). */
  smoothing: number;
  /** Superellipse exponent (squareness): 2 = circle, 5 = squircle, higher = boxier. */
  exponent?: number;
  /** Swap every shape to a plain border-radius for comparison. */
  compare?: boolean;
}

const pct = (a: number) => `${+(a * 100).toFixed(2)}%`;
/** Highlight / shade at alpha `a`, from the material variables. */
const hi = (a: number) => `color-mix(in srgb, var(--sq-hi) ${pct(a)}, transparent)`;
const lo = (a: number) => `color-mix(in srgb, var(--sq-lo) ${pct(a)}, transparent)`;
const HI0 = hi(0);

const FACE = "linear-gradient(180deg, var(--sq-face-top) 0%, var(--sq-face-mid) 52%, var(--sq-face-bottom) 100%)";
const BEVEL = ["var(--sq-bevel-top)", "var(--sq-bevel-mid)", "var(--sq-bevel-bottom)"];
// double outer hairline only (faint dark contact ring, near-white cut), no shadow
const HAIRLINE = `drop-shadow(0 0 0.5px ${lo(0.18)}) drop-shadow(0 0.5px 0.5px ${hi(0.9)})`;
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const GLOSS_LAYERS: CSSProperties[] = [
  // corner vignette
  { background: `radial-gradient(120% 130% at 50% 50%, ${lo(0)} 62%, ${lo(0.045)} 100%)` },
  // centre glow
  { background: `radial-gradient(70% 120% at 50% 45%, ${hi(0.55)} 0%, ${HI0} 70%)` },
  // fine grain
  { opacity: 0.05, mixBlendMode: "overlay", backgroundImage: GRAIN },
  // brushed streaks
  {
    opacity: 0.5,
    mixBlendMode: "overlay",
    backgroundImage: `repeating-linear-gradient(90deg, ${hi(0.06)} 0px, ${lo(0.03)} 1px, ${hi(0.06)} 2px)`,
  },
  // diagonal light sweep
  { mixBlendMode: "screen", background: `linear-gradient(115deg, ${HI0} 30%, ${hi(0.28)} 46%, ${HI0} 60%)` },
  // middle sheen band
  { background: `linear-gradient(180deg, ${HI0} 34%, ${hi(0.5)} 50%, ${HI0} 66%)`, opacity: 0.45 },
  // side edge-lights
  { background: `linear-gradient(90deg, ${hi(0.5)} 0%, ${HI0} 8%, ${HI0} 92%, ${hi(0.5)} 100%)`, opacity: 0.5 },
  // top sheen
  { background: `radial-gradient(78% 82% at 50% -34%, ${hi(0.85)} 0%, ${hi(0.28)} 42%, ${HI0} 72%)` },
  // glass rim
  { boxShadow: `inset 0 2px 0 -1px ${hi(0.85)}` },
  // bottom counter-sheen
  { mixBlendMode: "screen", background: `radial-gradient(90% 60% at 50% 118%, ${hi(0.5)} 0%, ${HI0} 60%)` },
  // light lift along the bottom
  { mixBlendMode: "screen", boxShadow: `inset 0 -15px 2px -12px ${hi(0.25)}` },
  // grounding shadow along the bottom
  { mixBlendMode: "color-burn", boxShadow: "inset 0 -6px 5px -2px var(--sq-ground)" },
  // inner shadow wall
  { boxShadow: `inset 0 0 0 0.5px ${lo(0.06)}` },
  // fresnel edge-brighten
  { mixBlendMode: "screen", boxShadow: `inset 0 0 0 1px ${hi(0.28)}` },
  // ambient occlusion ring
  { boxShadow: `inset 0 0 6px 0 ${lo(0.05)}` },
  // corner glints
  {
    mixBlendMode: "screen",
    background: `radial-gradient(6px 5px at 14% 14%, ${hi(0.75)} 0%, ${HI0} 100%), radial-gradient(6px 5px at 86% 14%, ${hi(0.75)} 0%, ${HI0} 100%)`,
  },
];

/** The glossy neutral surface. Pass a fixed size (w/h px) or omit both to size to content. */
export function GlossySquircle({
  w,
  h,
  radius,
  smoothing,
  exponent,
  compare,
  children,
  className,
  contentClassName,
  interactive = true,
}: Shape & {
  w?: number;
  h?: number;
  radius: number;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  /** Press feedback (scale 0.97 + brightness). Off for passive surfaces. */
  interactive?: boolean;
}) {
  const auto = w === undefined || h === undefined;
  const measureRef = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState({ w: w ?? 0, h: h ?? 0 });
  useLayoutEffect(() => {
    if (!auto) return;
    const el = measureRef.current;
    if (!el) return;
    const m = () =>
      setSize((p) => (p.w === el.offsetWidth && p.h === el.offsetHeight ? p : { w: el.offsetWidth, h: el.offsetHeight }));
    m();
    const ro = new ResizeObserver(m);
    ro.observe(el);
    return () => ro.disconnect();
  }, [auto]);

  const cw = auto ? size.w : (w as number);
  const ch = auto ? size.h : (h as number);
  const clip = cw && ch ? `path("${shapePath({ width: cw, height: ch, radius, smoothing, exponent, plain: compare })}")` : "none";
  const press = interactive ? "active:scale-[0.97] active:brightness-[1.04] transition-[transform,filter] duration-150" : "";

  const gloss = GLOSS_LAYERS.map((style, i) => (
    <span key={i} aria-hidden className="pointer-events-none absolute inset-0" style={{ clipPath: clip, WebkitClipPath: clip, ...style }} />
  ));
  const shape = { radius, smoothing, exponent, compare, fill: FACE, strokeGradient: BEVEL, strokeWidth: 1 };

  if (!auto) {
    return (
      <Squircle
        {...shape}
        contentClassName={contentClassName}
        className={cn("squircle-material", press, className)}
        style={{ width: w, height: h, filter: HAIRLINE }}
      >
        {gloss}
        {children}
      </Squircle>
    );
  }

  return (
    <span className={cn("squircle-material relative inline-flex", press, className)} style={{ filter: HAIRLINE }}>
      {cw > 0 && ch > 0 && (
        <Squircle {...shape} style={{ position: "absolute", inset: 0 }}>
          {gloss}
        </Squircle>
      )}
      <span ref={measureRef} className={cn("relative z-[1] inline-flex items-center justify-center", contentClassName)}>
        {children}
      </span>
    </span>
  );
}

/** Debossed near-black label cut into the surface (halo, bottom highlight, chiselled top). */
export function InkLabel({
  children,
  size = TEXT,
  tracking = TRACKING,
  className,
}: {
  children: ReactNode;
  size?: number;
  tracking?: number;
  className?: string;
}) {
  const ls = `${tracking}px`;
  return (
    <span className={cn("relative inline-flex items-center justify-center whitespace-nowrap", className)}>
      <span
        aria-hidden
        className="pointer-events-none absolute font-medium text-(--sq-lo)/20 blur-[2px]"
        style={{ fontSize: size, letterSpacing: ls }}
      >
        {children}
      </span>
      <span
        className="relative z-[2] font-medium"
        style={{
          fontSize: size,
          letterSpacing: ls,
          padding: "0 0.5px", // so background-clip:text never clips a glyph edge
          backgroundImage: "linear-gradient(180deg, var(--sq-ink-top) 0%, var(--sq-ink-bottom) 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          filter: `drop-shadow(0 1px 1px ${hi(0.8)}) drop-shadow(0 -0.5px 0.3px ${hi(0.5)}) drop-shadow(0 -0.5px 0.5px ${lo(0.12)})`,
        }}
      >
        {children}
      </span>
    </span>
  );
}

/** A glossy squircle button (132 × 36). */
export function SquircleGlossyButton({
  smoothing,
  exponent,
  compare,
  label = "Get the app",
  onClick,
}: Shape & { label?: string; onClick?: () => void }) {
  const h = CONTROL_H;
  return (
    <GlossySquircle w={132} h={h} radius={radiusFor(h)} smoothing={smoothing} exponent={exponent} compare={compare} className="cursor-pointer">
      <span className="pointer-events-none">
        <InkLabel>{label}</InkLabel>
      </span>
      <button type="button" onClick={onClick} className="absolute inset-0 z-[4] rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={label} />
    </GlossySquircle>
  );
}

export type ChatMessage = { from: "user" | "assistant"; text: string };

/** A chat column: user messages in glossy bubbles (right), assistant replies as quiet text. */
export function SquircleChat({ smoothing, exponent, compare, messages }: Shape & { messages: ChatMessage[] }) {
  const br = radiusFor(CONTROL_H);
  return (
    <div className="squircle-material flex w-[300px] flex-col gap-2.5">
      {messages.map((m, i) =>
        m.from === "user" ? (
          <div key={i} className="flex justify-end">
            <GlossySquircle radius={br} smoothing={smoothing} exponent={exponent} compare={compare} interactive={false} contentClassName="px-3 py-2">
              <InkLabel>{m.text}</InkLabel>
            </GlossySquircle>
          </div>
        ) : (
          <p key={i} className="max-w-[86%] text-[14px] text-muted-foreground leading-[1.5]">
            {m.text}
          </p>
        ),
      )}
    </div>
  );
}

/** iOS segmented control: a recessed squircle track with a glossy thumb under the active item. */
export function SquircleTabs({
  smoothing,
  exponent,
  compare,
  items = ["Design", "Code", "Ship"],
  active = 0,
  onChange,
  width = 224,
}: Shape & { items?: string[]; active?: number; onChange?: (i: number) => void; width?: number }) {
  const W = width;
  const H = CONTROL_H;
  const pad = 3;
  const seg = (W - pad * 2) / items.length;
  const trackClip = `path("${shapePath({ width: W, height: H, radius: radiusFor(H), smoothing, exponent, plain: compare })}")`;

  return (
    <div role="tablist" className="squircle-material relative" style={{ width: W, height: H }}>
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          clipPath: trackClip,
          WebkitClipPath: trackClip,
          background: "linear-gradient(180deg, var(--sq-well-top) 0%, var(--sq-well-bottom) 100%)",
          boxShadow: `inset 0 1px 3px ${lo(0.12)}`,
        }}
      />
      <div
        className="absolute transition-[left] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{ top: pad, left: pad + active * seg, width: seg, height: H - pad * 2 }}
      >
        <GlossySquircle w={seg} h={H - pad * 2} radius={radiusFor(H - pad * 2)} smoothing={smoothing} exponent={exponent} compare={compare} interactive={false} />
      </div>
      <div className="absolute inset-0 flex items-center" style={{ padding: pad }}>
        {items.map((it, i) => (
          <button
            key={it}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => onChange?.(i)}
            className={cn(
              "relative z-[1] flex h-full flex-1 items-center justify-center rounded-md font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
              i === active ? "text-transparent" : "text-muted-foreground",
            )}
            style={{ fontSize: TEXT, letterSpacing: `${TRACKING}px` }}
          >
            {i === active ? <InkLabel>{it}</InkLabel> : it}
          </button>
        ))}
      </div>
    </div>
  );
}

/** iOS toggle switch (45 × 28): a glossy squircle thumb in a squircle track. */
export function SquircleToggle({
  smoothing,
  exponent,
  compare,
  on = false,
  onChange,
  label = "Toggle",
}: Shape & { on?: boolean; onChange?: (v: boolean) => void; label?: string }) {
  const H = CONTROL_H_SM;
  const W = Math.round(H * 1.6);
  const pad = 4;
  const thumb = H - pad * 2;
  const trackClip = `path("${shapePath({ width: W, height: H, radius: radiusFor(H), smoothing, exponent, plain: compare })}")`;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange?.(!on)}
      className="squircle-material relative rounded-full outline-none transition-[filter] duration-150 focus-visible:ring-2 focus-visible:ring-ring active:brightness-[1.04]"
      style={{ width: W, height: H }}
    >
      <span
        aria-hidden
        className="absolute inset-0 transition-[background] duration-300"
        style={{
          clipPath: trackClip,
          WebkitClipPath: trackClip,
          background: on
            ? "linear-gradient(180deg, var(--sq-switch-on-top) 0%, var(--sq-switch-on-bottom) 100%)"
            : "linear-gradient(180deg, var(--sq-switch-off-top) 0%, var(--sq-switch-off-bottom) 100%)",
          boxShadow: `inset 0 1px 2px ${lo(on ? 0.35 : 0.14)}`,
        }}
      />
      <div
        className="absolute transition-[left] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{ top: pad, left: on ? W - pad - thumb : pad, width: thumb, height: thumb }}
      >
        <GlossySquircle w={thumb} h={thumb} radius={radiusFor(thumb)} smoothing={smoothing} exponent={exponent} compare={compare} interactive={false} />
      </div>
    </button>
  );
}

/** A recessed squircle well with a hairline border (input fields, menus). Content is not clipped. */
export function RecessedSquircle({
  w,
  h,
  radius,
  smoothing,
  exponent,
  compare,
  children,
  contentClassName,
}: Shape & { w: number; h: number; radius: number; children?: ReactNode; contentClassName?: string }) {
  const uid = useId().replace(/[^\w-]/g, "");
  const path = shapePath({ width: w, height: h, radius, smoothing, exponent, plain: compare });
  const clip = `path("${path}")`;
  return (
    <span className="squircle-material relative inline-flex" style={{ width: w, height: h }}>
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          clipPath: clip,
          WebkitClipPath: clip,
          background: "linear-gradient(180deg, var(--sq-field-top) 0%, var(--sq-field-bottom) 100%)",
          boxShadow: `inset 0 1.5px 3px ${lo(0.1)}`,
        }}
      />
      {/* hairline on the outline, clipped to itself so only the inner half shows */}
      <svg aria-hidden width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="pointer-events-none absolute inset-0 z-[1]">
        <clipPath id={`rec-${uid}`}>
          <path d={path} />
        </clipPath>
        <path d={path} fill="none" strokeWidth={2} clipPath={`url(#rec-${uid})`} style={{ stroke: "var(--sq-field-border)" }} />
      </svg>
      <span className={cn("relative z-[2] flex w-full", contentClassName)}>{children}</span>
    </span>
  );
}

/** A recessed squircle search field (200 × 36). */
export function SquircleInput({
  smoothing,
  exponent,
  compare,
  placeholder = "Search",
  value,
  onChange,
}: Shape & { placeholder?: string; value?: string; onChange?: (v: string) => void }) {
  const h = CONTROL_H;
  return (
    <RecessedSquircle w={200} h={h} radius={radiusFor(h)} smoothing={smoothing} exponent={exponent} compare={compare} contentClassName="h-full items-center gap-1.5 px-3">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0 text-muted-foreground/70" aria-hidden>
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        aria-label={placeholder}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="min-w-0 flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground/70"
        style={{ fontSize: TEXT }}
      />
    </RecessedSquircle>
  );
}

/** Stepper: − / value / + as glossy squircle keys (28 × 28) around a readout. */
export function SquircleStepper({
  smoothing,
  exponent,
  compare,
  value,
  onValueChange,
  min = 0,
  max = Infinity,
}: Shape & { value: number; onValueChange: (v: number) => void; min?: number; max?: number }) {
  const h = CONTROL_H_SM;
  const key = (label: string, aria: string, onClick: () => void) => (
    <GlossySquircle w={h} h={h} radius={radiusFor(h)} smoothing={smoothing} exponent={exponent} compare={compare} className="cursor-pointer">
      <span className="pointer-events-none">
        <InkLabel>{label}</InkLabel>
      </span>
      <button type="button" onClick={onClick} className="absolute inset-0 z-[4] rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={aria} />
    </GlossySquircle>
  );
  return (
    <div className="squircle-material flex items-center gap-2">
      {key("−", "Decrease", () => onValueChange(Math.max(min, value - 1)))}
      <output aria-live="polite" className="w-6 text-center font-medium text-foreground tabular-nums" style={{ fontSize: TEXT }}>
        {value}
      </output>
      {key("+", "Increase", () => onValueChange(Math.min(max, value + 1)))}
    </div>
  );
}

/** A glossy squircle select (180 × 36) that opens a recessed squircle menu upward. */
export function SquircleDropdown({
  smoothing,
  exponent,
  compare,
  options,
  value,
  onValueChange,
}: Shape & { options: string[]; value: number; onValueChange: (i: number) => void }) {
  const [open, setOpen] = useState(false);
  const W = 180;
  const r = radiusFor(CONTROL_H);
  return (
    <div className="squircle-material relative">
      <GlossySquircle
        w={W}
        h={CONTROL_H}
        radius={r}
        smoothing={smoothing}
        exponent={exponent}
        compare={compare}
        className="cursor-pointer"
        contentClassName="justify-between px-3 pointer-events-none"
      >
        <InkLabel>{options[value]}</InkLabel>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className="ml-2 shrink-0 text-muted-foreground transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : undefined }}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          className="pointer-events-auto absolute inset-0 z-[4] rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={options[value]}
        />
      </GlossySquircle>

      {open && (
        <div className="absolute bottom-full left-0 z-10 mb-2" style={{ width: W }}>
          <RecessedSquircle w={W} h={options.length * 34 + 8} radius={r} smoothing={smoothing} exponent={exponent} compare={compare} contentClassName="flex-col p-1">
            <div role="listbox" className="flex w-full flex-col">
              {options.map((o, i) => (
                <button
                  key={o}
                  type="button"
                  role="option"
                  aria-selected={i === value}
                  onClick={() => {
                    onValueChange(i);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex h-[34px] w-full items-center rounded-lg px-3 text-left outline-none transition-colors hover:bg-foreground/5 focus-visible:bg-foreground/5",
                    i === value ? "font-semibold text-foreground" : "font-normal text-muted-foreground",
                  )}
                  style={{ fontSize: TEXT }}
                >
                  {o}
                </button>
              ))}
            </div>
          </RecessedSquircle>
        </div>
      )}
    </div>
  );
}

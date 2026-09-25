import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Liquid, easingFunction } from "./liquid-gooey";
import { cn } from "./lib/utils";
import "./gooey-avatar-group.css";

/** Drop / push / dissolve timing. Defaults are the upstream demo's tuned values. */
export interface GooeyAvatarGroupTuning {
  /** Ms the dissolve takes to clear after release. */
  releaseMs: number;
  /** Ms the melt's fade-out runs. */
  fadeMs: number;
  /** Ms the released avatar travels into its gap. */
  dropDuration: number;
  /** 0..1 — overshoot of the drop travel (bezier y1 = 1 + 0.8·bounce). */
  dropBounce: number;
  /** Px the neighbours get shoved outward when the avatar lands (0 = off). */
  push: number;
  /** 0..1 — springiness of the shove chain. */
  pushBounce: number;
  /** Ms after release the shove starts. */
  pushDelay: number;
  /** Anchor-spring stiffness (1/s²). */
  pushSpeed: number;
  /** Neighbour coupling — how far the wave carries down the row. */
  pushSpread: number;
}

export const GOOEY_AVATAR_GROUP_TUNING: GooeyAvatarGroupTuning = {
  releaseMs: 380,
  fadeMs: 320,
  dropDuration: 400,
  dropBounce: 0.5,
  push: 9,
  pushBounce: 0,
  pushDelay: 110,
  pushSpeed: 80,
  pushSpread: 0,
};

export interface GooeyAvatarGroupProps {
  /** Image srcs of the avatars already in the group (unique; used as keys). */
  avatars: string[];
  /** Image src of the loose, draggable avatar. */
  chipSrc: string;
  /** Accessible name of the loose avatar image. */
  chipAlt?: string;
  /** Text inside the pill. */
  label?: string;
  /** Drag affordance text next to the arrow. */
  dragHint?: string;
  resetLabel?: string;
  /** 0..1 — dissolve intensity where the dragged face touches the pill. */
  dissolve?: number;
  /** Goo blur sigma (px). */
  blur?: number;
  /** Alpha-contrast slope of the liquid edge. */
  contrast?: number;
  /** `box-shadow` syntax, drawn on the merged liquid silhouette. */
  shadow?: string;
  tuning?: Partial<GooeyAvatarGroupTuning>;
  /** Fires when the dropped avatar joins the group, with its slot index. */
  onJoin?: (index: number) => void;
  onReset?: () => void;
  className?: string;
}

const DEFAULT_SHADOW = "0 0 0 1px var(--border) inset, 0 2px 6px var(--gooey-drop)";

/** Drop easing from a 0..1 bounce knob: y1 rises past 1 for overshoot. */
function dropEase(bounce: number): string {
  return `cubic-bezier(0.34, ${(1 + 0.8 * bounce).toFixed(2)}, 0.64, 1)`;
}

/** The loose chip is 40px, a stack avatar 32px: the chip scales down to hand off. */
const CHIP_PX = 40;
const SLOT_PX = 32;
const ABSORB_SCALE = SLOT_PX / CHIP_PX;
/** Edge hairline as it must look once seated. */
const RING_PX = 1;
/** 32px avatars overlapped by 8 → 24px pitch; the hover gap opens by one pitch. */
const PITCH = 24;

function DragArrow() {
  return (
    <svg
      width="50"
      height="49"
      viewBox="0 0 50 49"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-none"
    >
      <path d="M45 23c-8-8-22-9-35-1" />
      <path d="M10 22l6.5-4.5M10 22l7.5 2" />
    </svg>
  );
}

export function GooeyAvatarGroup({
  avatars,
  chipSrc,
  chipAlt = "Drag into the group",
  label = "Share",
  dragHint = "Drag me",
  resetLabel = "Reset",
  dissolve = 1,
  blur = 6,
  contrast = 18,
  shadow = DEFAULT_SHADOW,
  tuning,
  onJoin,
  onReset,
  className,
}: GooeyAvatarGroupProps) {
  const melt = { ...GOOEY_AVATAR_GROUP_TUNING, ...tuning };
  const [group, setGroup] = useState(avatars);
  const [gapIndex, setGapIndex] = useState<number | null>(null);
  const [consumed, setConsumed] = useState(false);
  const [absorbing, setAbsorbing] = useState(false);
  /** True for the frame the gap is swapped for the real avatar (transitions off). */
  const [swapping, setSwapping] = useState(false);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const avatarEls = useRef<Array<HTMLImageElement | null>>([]);
  const shove = useRef<{ x: number[]; v: number[]; raf: number; last: number } | null>(null);
  const shoveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [seated, setSeated] = useState(false);
  const seatTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const meltRef = useRef(melt);
  meltRef.current = melt;
  const joined = useRef(onJoin);
  joined.current = onJoin;

  useEffect(() => () => {
    if (seatTimer.current) clearTimeout(seatTimer.current);
  }, []);

  const stopShove = () => {
    if (shove.current) cancelAnimationFrame(shove.current.raf);
    shove.current = null;
    for (const el of avatarEls.current) el?.style.removeProperty("transform");
  };
  useEffect(() => () => {
    if (shoveTimer.current) clearTimeout(shoveTimer.current);
    if (shove.current) cancelAnimationFrame(shove.current.raf);
  }, []);

  /** Coupled spring chain: each avatar is a spring-mass anchored to its slot and tied to its
   *  neighbours; substepped at ≤1/120 s. */
  const stepShove = (now: number) => {
    const st = shove.current;
    if (!st) return;
    const wall = Math.min(0.25, (now - st.last) / 1000);
    st.last = now;
    const K = meltRef.current.pushSpeed;
    const KC = meltRef.current.pushSpread;
    const zeta = 1.05 - 0.85 * Math.min(1, Math.max(0, meltRef.current.pushBounce));
    const C = 2 * zeta * Math.sqrt(K);
    const n = st.x.length;
    let steps = Math.max(1, Math.ceil(wall * 120));
    const dt = wall / steps;
    while (steps-- > 0) {
      for (let i = 0; i < n; i++) {
        let f = -K * st.x[i] - C * st.v[i];
        if (i > 0) f += KC * (st.x[i - 1] - st.x[i]);
        if (i < n - 1) f += KC * (st.x[i + 1] - st.x[i]);
        st.v[i] += f * dt;
      }
      for (let i = 0; i < n; i++) st.x[i] += st.v[i] * dt;
    }
    let live = false;
    for (let i = 0; i < n; i++) {
      if (Math.abs(st.x[i]) > 0.05 || Math.abs(st.v[i]) > 2) live = true;
      avatarEls.current[i]?.style.setProperty("transform", `translateX(${st.x[i].toFixed(2)}px)`);
    }
    if (live) st.raf = requestAnimationFrame(stepShove);
    else stopShove();
  };
  /** Impulse into the slot's immediate neighbours (old indices g-1 and g). */
  const startShove = (g: number, count: number) => {
    stopShove();
    const x = Array(count).fill(0);
    const v = Array(count).fill(0);
    const m = meltRef.current;
    const v0 = m.push * Math.sqrt(m.pushSpeed + m.pushSpread * 2) * 1.55;
    if (g - 1 >= 0) v[g - 1] = -v0;
    if (g < count) v[g] = v0;
    shove.current = { x, v, raf: 0, last: performance.now() };
    shove.current.raf = requestAnimationFrame(stepShove);
  };

  const chipRef = useRef<HTMLDivElement | null>(null);
  const pillRef = useRef<HTMLDivElement | null>(null);
  const stackRef = useRef<HTMLSpanElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  /** The chip's transform is owned imperatively; outside a flight keep it in step with `pos`. */
  useEffect(() => {
    if (!absorbing) {
      chipRef.current?.style.setProperty("transform", `translate(${pos.x}px, ${pos.y}px)`);
    }
  });
  const origin = useRef({ x: 0, y: 0 });
  const absorbTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (absorbTimer.current) clearTimeout(absorbTimer.current);
  }, []);
  const stableGap = useRef<number | null>(null);

  /** Insertion slot under the chip (null when not within 18px of the pill), with hysteresis:
   *  a settled slot only flips once the chip centre moves ≥0.72 pitch from it. */
  const hoverGap = (): number | null => {
    const c = chipRef.current?.getBoundingClientRect();
    const p = pillRef.current?.getBoundingClientRect();
    const s = stackRef.current?.getBoundingClientRect();
    if (!c || !p || !s) return null;
    const pad = 18;
    const near =
      c.left < p.right + pad && c.right > p.left - pad && c.top < p.bottom + pad && c.bottom > p.top - pad;
    if (!near) {
      stableGap.current = null;
      return null;
    }
    const chipCx = c.left + c.width / 2;
    const raw = Math.min(group.length, Math.max(0, (chipCx - s.left) / PITCH));
    const prev = stableGap.current;
    const g = prev != null && Math.abs(raw - prev) < 0.72 ? prev : Math.round(raw);
    stableGap.current = g;
    return g;
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (absorbing) return;
    stableGap.current = null;
    try {
      chipRef.current?.setPointerCapture(e.pointerId);
    } catch {
      /* synthetic events have no active pointer */
    }
    origin.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    setDragging(true);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const next = { x: e.clientX - origin.current.x, y: e.clientY - origin.current.y };
    // Written now so the liquid engine (which measures at rAF) never renders a frame behind.
    if (!absorbing && chipRef.current) {
      chipRef.current.style.transform = `translate(${next.x}px, ${next.y}px)`;
    }
    setPos(next);
    setGapIndex(hoverGap());
  };
  /** The flight runs on rAF (same clock as the liquid engine), not a CSS transition. */
  const flightRaf = useRef(0);
  const flyChip = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    cancelAnimationFrame(flightRaf.current);
    const ease = easingFunction(dropEase(meltRef.current.dropBounce));
    const dur = meltRef.current.dropDuration;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const e = ease(p);
      const x = from.x + (to.x - from.x) * e;
      const y = from.y + (to.y - from.y) * e;
      const s = 1 + (ABSORB_SCALE - 1) * e;
      chipRef.current?.style.setProperty("transform", `translate(${x}px, ${y}px) scale(${s})`);
      if (p < 1) flightRaf.current = requestAnimationFrame(tick);
    };
    flightRaf.current = requestAnimationFrame(tick);
  };
  useEffect(() => () => cancelAnimationFrame(flightRaf.current), []);

  const endDrag = () => {
    if (!dragging) return;
    setDragging(false);
    const g = hoverGap();
    const c = chipRef.current?.getBoundingClientRect();
    const s = stackRef.current?.getBoundingClientRect();
    if (g != null && c && s) {
      const targetCx = s.left + g * PITCH + 16;
      const targetCy = s.top + s.height / 2;
      setAbsorbing(true);
      setDropIndex(g);
      const to = {
        x: pos.x + (targetCx - (c.left + c.width / 2)),
        y: pos.y + (targetCy - (c.top + c.height / 2)),
      };
      flyChip(pos, to);
      setPos(to);
      // The separator crescents grow across the flight.
      setSeated(false);
      if (seatTimer.current) clearTimeout(seatTimer.current);
      seatTimer.current = setTimeout(() => setSeated(true), 30);
      if (melt.push > 0) {
        if (shoveTimer.current) clearTimeout(shoveTimer.current);
        const count = group.length;
        if (melt.pushDelay <= 0) startShove(g, count);
        else shoveTimer.current = setTimeout(() => startShove(g, count), melt.pushDelay);
      }
      absorbTimer.current = setTimeout(() => {
        setSwapping(true);
        setGroup((gr) => [...gr.slice(0, g), chipSrc, ...gr.slice(g)]);
        setGapIndex(null);
        setConsumed(true);
        setAbsorbing(false);
        if (shove.current) {
          shove.current.x.splice(g, 0, 0);
          shove.current.v.splice(g, 0, 0);
        }
        requestAnimationFrame(() => requestAnimationFrame(() => setSwapping(false)));
        joined.current?.(g);
      }, melt.dropDuration);
    } else {
      setGapIndex(null);
      setPos({ x: 0, y: 0 });
    }
  };

  const reset = () => {
    cancelAnimationFrame(flightRaf.current);
    if (absorbTimer.current) clearTimeout(absorbTimer.current);
    if (shoveTimer.current) clearTimeout(shoveTimer.current);
    if (seatTimer.current) clearTimeout(seatTimer.current);
    setSeated(false);
    stopShove();
    stableGap.current = null;
    setSwapping(true);
    setGroup(avatars);
    setGapIndex(null);
    setConsumed(false);
    setAbsorbing(false);
    setDropIndex(null);
    setDragging(false);
    setPos({ x: 0, y: 0 });
    requestAnimationFrame(() => requestAnimationFrame(() => setSwapping(false)));
    onReset?.();
  };

  const seatDur = `${Math.round(melt.dropDuration * 0.6)}ms`;
  const chipMask =
    "radial-gradient(circle at 50px 20px, transparent calc(var(--seat, 1) * 22.5px - 0.6px), black calc(var(--seat, 1) * 22.5px), black 140px)";

  return (
    <Liquid
      blur={blur}
      contrast={contrast}
      fill="var(--popover)"
      shadow={shadow}
      className={cn(
        "h-[250px] w-[290px] [--gooey-drop:oklch(0_0_0/0.08)] [--photo-edge:oklch(0_0_0/0.2)] [--photo-lift:oklch(0_0_0/0.16)] dark:[--gooey-drop:oklch(0_0_0/0.24)] dark:[--photo-edge:oklch(1_0_0/0.08)] dark:[--photo-lift:oklch(0_0_0/0.55)]",
        className,
      )}
    >
      {!consumed && (
        <p
          className={cn(
            "pointer-events-none absolute top-0.5 right-[66px] m-0 flex items-start gap-[3px] whitespace-nowrap text-[13px] leading-[19px] text-muted-foreground opacity-55 transition-opacity duration-[220ms] ease-[ease]",
            (dragging || absorbing) && "opacity-0",
          )}
          aria-hidden="true"
        >
          <span className="mt-[27px]">{dragHint}</span>
          <DragArrow />
        </p>
      )}
      <button
        type="button"
        onClick={reset}
        className="absolute bottom-2.5 left-1/2 z-3 inline-flex h-9 -translate-x-1/2 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-full border-0 bg-secondary px-3 py-1.5 font-sans text-[13px] leading-4 font-medium text-secondary-foreground transition-[background-color,filter] duration-150 hover:brightness-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:brightness-95"
      >
        {resetLabel}
      </button>
      {/* Pill: resizes only (mass and size springs identical, critically damped, no travel). */}
      <Liquid.Item
        morph={{
          shape: true,
          advanced: {
            evolve: {
              contentBlur: 0,
              sizeStiffness: 380,
              sizeDamping: 40,
              massStiffness: 380,
              massDamping: 40,
              anticipation: 0,
              travel: 0,
              roundness: 0,
            },
          },
        }}
      >
        <div
          ref={pillRef}
          className="absolute top-[82px] left-5 flex h-14 items-center gap-2.5 rounded-full py-0 pr-3 pl-[17px]"
          style={{ "--gag-seat-dur": seatDur } as CSSProperties}
        >
          <span className="whitespace-nowrap text-[14px] leading-[22px] text-foreground">{label}</span>
          <span className="flex items-center" ref={stackRef}>
            {group.map((src, i) => {
              // Separator crescent carved out of this avatar around its right neighbour.
              const incomingRight = absorbing && dropIndex != null && i === dropIndex - 1;
              const nextMl = incomingRight
                ? -8
                : i < group.length - 1
                  ? gapIndex === i + 1
                    ? PITCH - 8
                    : -8
                  : null;
              // The far `black 140px` stop keeps WebKit from erasing the avatar when every
              // other stop falls outside the box.
              const sep =
                nextMl != null
                  ? `radial-gradient(circle at ${16 + 32 + nextMl}px 16px, transparent calc(var(--seat, 1) * 18px - 0.5px), black calc(var(--seat, 1) * 18px), black 140px)`
                  : undefined;
              return (
                <img
                  key={src}
                  ref={(el) => {
                    avatarEls.current[i] = el;
                  }}
                  className="gag-avatar relative size-8 rounded-full object-cover"
                  src={src}
                  alt=""
                  draggable={false}
                  style={
                    {
                      marginLeft: i === 0 ? 0 : gapIndex === i ? PITCH - 8 : -8,
                      transition: swapping ? "none" : undefined,
                      maskImage: sep,
                      WebkitMaskImage: sep,
                      ...(incomingRight
                        ? { "--seat": seated ? 1 : 0 }
                        : gapIndex === i + 1
                          ? { "--seat": 0 }
                          : null),
                      zIndex: absorbing && dropIndex != null && i >= dropIndex ? i + 1 : i,
                    } as CSSProperties
                  }
                />
              );
            })}
            <span
              className="gag-endgap inline-block h-px"
              style={{
                width: gapIndex === group.length ? PITCH : 0,
                transition: swapping ? "none" : undefined,
              }}
            />
          </span>
        </div>
      </Liquid.Item>
      {!consumed && (
        <Liquid.Item
          morph={{ advanced: { blobInset: 2, bridgeGrow: 8 } }}
          dissolve={{
            strength: dissolve,
            pull: 0,
            active: dragging,
            releaseMs: melt.releaseMs,
            fadeMs: melt.fadeMs,
          }}
        >
          <div
            ref={chipRef}
            className={cn(
              "gag-chip absolute top-[22px] right-5 size-10 cursor-grab touch-none select-none rounded-full",
              dragging && "gag-dragging",
              absorbing && "gag-absorbing",
              (absorbing || (dragging && gapIndex != null)) && "gag-ringed",
            )}
            style={
              {
                zIndex: absorbing && dropIndex != null ? dropIndex : 20,
                ...(absorbing && dropIndex != null && dropIndex < group.length
                  ? { maskImage: chipMask, WebkitMaskImage: chipMask }
                  : null),
                "--seat": absorbing ? (seated ? 1 : 0) : 0,
                "--gag-seat-dur": seatDur,
                "--gag-ring": `${RING_PX / ABSORB_SCALE}px`,
              } as CSSProperties
            }
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <img
              src={chipSrc}
              alt={chipAlt}
              draggable={false}
              className="pointer-events-none block size-full rounded-full object-cover"
            />
          </div>
        </Liquid.Item>
      )}
    </Liquid>
  );
}

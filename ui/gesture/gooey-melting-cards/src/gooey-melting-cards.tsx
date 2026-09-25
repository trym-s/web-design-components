import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Liquid } from "./liquid-gooey";
import { cn } from "./lib/utils";

/** Stage is 320x210; cards are 96px squares anchored at the stage centre. */
const CARD = 96;
const CLAMP_X = 160 - CARD / 2 - 6;
const CLAMP_Y = 105 - CARD / 2 - 6;
/** Horizontal distance between neighbouring cards at rest (two cards: ±78px). */
const SPACING = 156;

export type MeltingCard = { src: string; label?: string };

export type GooeyMeltingCardsProps = {
  /** Photos, one card each; they start side by side around the stage centre. */
  cards: MeltingCard[];
  /** Goo blur sigma in px. */
  blur?: number;
  /** Alpha-contrast slope of the liquid edge. */
  contrast?: number;
  /** `box-shadow` syntax, rendered on the merged liquid silhouette. */
  shadow?: string;
  /** 0..1 — overall dissolve intensity (scales warp, melt blur, mix, gravity). */
  strength?: number;
  /** Displacement strength of the liquid warp. */
  warp?: number;
  /** 0..1 — two-liquid mixing at the seam. */
  mix?: number;
  /** Px the melt is drawn toward the neighbour's centre. */
  gravity?: number;
  /** Size of the melt zone around the contact, px. */
  zone?: number;
  /** Distance where melting starts, px. */
  range?: number;
  className?: string;
};

export function GooeyMeltingCards({
  cards,
  blur = 6,
  contrast = 18,
  shadow = "0 0 0 1px var(--border) inset, 0 2px 6px var(--gooey-drop)",
  strength = 1,
  warp = 26,
  mix = 0.7,
  gravity = 60,
  zone = 26,
  range = 44,
  className,
}: GooeyMeltingCardsProps) {
  const [pos, setPos] = useState(() =>
    cards.map((_, i) => ({ x: (i - (cards.length - 1) / 2) * SPACING, y: 0 })),
  );
  const drag = useRef<{ id: number; index: number; dx: number; dy: number } | null>(null);

  const onPointerDown = (index: number) => (e: ReactPointerEvent<HTMLDivElement>) => {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* synthetic events have no active pointer */
    }
    drag.current = {
      id: e.pointerId,
      index,
      dx: e.clientX - pos[index].x,
      dy: e.clientY - pos[index].y,
    };
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    const x = Math.max(-CLAMP_X, Math.min(CLAMP_X, e.clientX - d.dx));
    const y = Math.max(-CLAMP_Y, Math.min(CLAMP_Y, e.clientY - d.dy));
    setPos((prev) => prev.map((p, i) => (i === d.index ? { x, y } : p)));
  };
  const endDrag = () => {
    drag.current = null;
  };

  const k = strength;
  const dissolve = {
    warp: warp * k,
    // Lower than the avatar tuning: at the seam of two large photos a heavy
    // blur reads as fog over the neck, not as liquid.
    blur: 5 * k,
    mix: mix * k,
    gravity: gravity * k,
    taper: 0.95,
    warpFreq: 1,
    flowSpeed: 26,
    detail: 2,
    zone,
    range,
    releaseMs: 110,
    fadeMs: 320,
  };

  return (
    <Liquid
      blur={blur}
      contrast={contrast}
      fill="var(--popover)"
      shadow={shadow}
      className={cn(
        "h-[210px] w-[320px] [--gooey-drop:oklch(0_0_0/0.08)] dark:[--gooey-drop:oklch(0_0_0/0.24)]",
        className,
      )}
    >
      {cards.map((card, i) => (
        <Liquid.Item
          key={i}
          // Both cards dissolve: each melts its own imagery toward the other,
          // so the seam mixes two liquids — always armed, the engine's
          // proximity ramp does the gating.
          dissolve={dissolve}
          morph={{ advanced: { blobInset: 2, bridgeGrow: 10 } }}
        >
          <div
            className="absolute left-1/2 top-1/2 -ml-12 -mt-12 size-24 cursor-grab touch-none select-none rounded-[calc(var(--radius)+6px)] active:cursor-grabbing"
            role="img"
            aria-label={card.label ?? `Draggable photo card ${i + 1}`}
            style={{ transform: `translate(${pos[i]?.x ?? 0}px, ${pos[i]?.y ?? 0}px)` }}
            onPointerDown={onPointerDown(i)}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <img
              src={card.src}
              alt=""
              draggable={false}
              className="pointer-events-none block size-full rounded-[calc(var(--radius)+6px)] bg-muted object-cover"
            />
          </div>
        </Liquid.Item>
      ))}
    </Liquid>
  );
}

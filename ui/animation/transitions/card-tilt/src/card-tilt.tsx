import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "./lib/utils";
import "./card-tilt.css";

export type TiltCardProps = {
  children: ReactNode;
  /** Total tilt range in degrees across the card (±max/2 at the edges). */
  max?: number;
  /** Classes for the tilting card (size, surface). */
  className?: string;
};

/**
 * Card that tilts in 3D toward the pointer with a cursor-tracked glare. The pointer is tracked on
 * a flat outer wrapper that never transforms, so the rotating card cannot slide out from under
 * the cursor. Glare colour: `--tilt-glare` (declared on the wrapper, default white).
 */
export function TiltCard({ children, max = 32, className }: TiltCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent) => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;
    const r = wrap.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    wrap.classList.add("is-hover");
    card.classList.add("is-tilting");
    card.style.setProperty("--tilt-ry", ((px - 0.5) * max).toFixed(2) + "deg");
    card.style.setProperty("--tilt-rx", ((0.5 - py) * max).toFixed(2) + "deg");
    card.style.setProperty("--tilt-gx", (px * 100).toFixed(1) + "%");
    card.style.setProperty("--tilt-gy", (py * 100).toFixed(1) + "%");
  };

  const onLeave = () => {
    wrapRef.current?.classList.remove("is-hover");
    const card = cardRef.current;
    if (!card) return;
    card.classList.remove("is-tilting");
    card.style.setProperty("--tilt-rx", "0deg");
    card.style.setProperty("--tilt-ry", "0deg");
  };

  return (
    <div
      ref={wrapRef}
      className="t-tilt inline-block [--tilt-glare:oklch(1_0_0)]"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div ref={cardRef} className={cn("t-tilt-card rounded-[calc(var(--radius)+2px)]", className)}>
        {children}
        <div className="t-tilt-glare" aria-hidden="true" />
      </div>
    </div>
  );
}

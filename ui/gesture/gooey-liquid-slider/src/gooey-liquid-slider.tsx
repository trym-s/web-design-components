import {
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Liquid } from "./liquid-gooey";
import { cn } from "./lib/utils";

// Track spans 14..226 (240 - 14px insets each side); thumb is 24px, so its
// left offset travels 0..188 to stay flush with the track ends.
const TRAVEL = 188;

export type GooeyLiquidSliderProps = {
  /** Controlled value, `min…max`. */
  value?: number;
  /** Uncontrolled start value (upstream: thumb at 84px of 188px travel). */
  defaultValue?: number;
  min?: number;
  max?: number;
  /** Keyboard step. */
  step?: number;
  onValueChange?: (value: number) => void;
  /** Goo blur sigma in px. */
  blur?: number;
  /** Alpha-contrast slope of the liquid edge. */
  contrast?: number;
  /** `box-shadow` syntax, rendered on the liquid thumb (so it rides the lagging drop). */
  shadow?: string;
  /** Move tuning, 0..1: how tightly the liquid chases the thumb. */
  springiness?: number;
  /** Move tuning, 0..1: velocity stretch of the drop. */
  stretch?: number;
  /** Move tuning, 0..1: trailing droplet size. */
  trail?: number;
  "aria-label"?: string;
  className?: string;
};

export function GooeyLiquidSlider({
  value,
  defaultValue = (84 / TRAVEL) * 100,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  blur = 6,
  contrast = 18,
  shadow = "0 0 0 1px var(--border), 0 1px 5px var(--gooey-drop)",
  springiness = 0.5,
  stretch = 0.6,
  trail = 0.35,
  "aria-label": ariaLabel = "Value",
  className,
}: GooeyLiquidSliderProps) {
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;
  const x = ((Math.min(max, Math.max(min, current)) - min) / (max - min || 1)) * TRAVEL;
  const drag = useRef<number | null>(null);

  const commit = (next: number) => {
    const v = Math.min(max, Math.max(min, next));
    if (value === undefined) setInner(v);
    onValueChange?.(v);
  };
  const fromX = (px: number) => min + (Math.min(TRAVEL, Math.max(0, px)) / TRAVEL) * (max - min);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* synthetic events have no active pointer */
    }
    drag.current = e.clientX - x;
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (drag.current == null) return;
    commit(fromX(e.clientX - drag.current));
  };
  const endDrag = () => {
    drag.current = null;
  };
  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const big = (max - min) / 10;
    const next =
      e.key === "ArrowRight" || e.key === "ArrowUp"
        ? current + step
        : e.key === "ArrowLeft" || e.key === "ArrowDown"
          ? current - step
          : e.key === "PageUp"
            ? current + big
            : e.key === "PageDown"
              ? current - big
              : e.key === "Home"
                ? min
                : e.key === "End"
                  ? max
                  : null;
    if (next === null) return;
    e.preventDefault();
    commit(next);
  };

  return (
    <Liquid
      blur={blur}
      contrast={contrast}
      fill="var(--gooey-thumb)"
      shadow={shadow}
      className={cn(
        "h-20 w-60 [--gooey-drop:oklch(0_0_0/0.08)] [--gooey-thumb:oklch(1_0_0)] dark:[--gooey-drop:oklch(0_0_0/0.24)] dark:[--gooey-thumb:oklch(0.44_0_0)]",
        className,
      )}
    >
      {/* Below the goo layer (svg sits at z -1): the liquid thumb and its tail
          paint over the track, not sliced by it. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-3.5 top-[38px] -z-2 h-2 rounded-full bg-foreground/10 ring-1 ring-border ring-inset"
      />
      <Liquid.Item effect="move" move={{ springiness, stretch, trail }}>
        {/* Unstyled geometry carrier: its surface and shadow are the liquid blob. */}
        <div
          role="slider"
          aria-label={ariaLabel}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={Math.round(current)}
          tabIndex={0}
          className="absolute left-3.5 top-[30px] size-6 cursor-grab touch-none select-none rounded-full outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring active:cursor-grabbing"
          style={{ transform: `translateX(${x}px)` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={onKeyDown}
        />
      </Liquid.Item>
    </Liquid>
  );
}

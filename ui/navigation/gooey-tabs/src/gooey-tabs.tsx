import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Liquid } from "./liquid-gooey";
import { cn } from "./lib/utils";

export type GooeyTab = { value: string; label: ReactNode };

export type GooeyTabsProps = {
  tabs: GooeyTab[];
  /** Controlled selected value. */
  value?: string;
  /** Uncontrolled initial value (defaults to the first tab). */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Accessible name of the tablist. */
  "aria-label"?: string;
  /** Indicator slide duration in ms. */
  duration?: number;
  /** Indicator slide easing (CSS timing function). */
  easing?: string;
  /** 0..1 — how tightly the liquid chases the indicator. */
  springiness?: number;
  /** 0..1 — trailing droplet size. */
  trail?: number;
  /** Goo blur sigma in px; keep it small, the pill is only 30px tall. */
  blur?: number;
  /** Alpha-contrast slope of the liquid edge. */
  contrast?: number;
  /** `box-shadow` syntax, rendered on the merged liquid pill. */
  shadow?: string;
  className?: string;
};

const PILL_SHADOW = "0 1px 3px var(--gooey-tab-shadow-1), 0 1px 1px var(--gooey-tab-shadow-2)";

export function GooeyTabs({
  tabs,
  value,
  defaultValue,
  onValueChange,
  "aria-label": ariaLabel = "Mode",
  duration = 250,
  easing = "cubic-bezier(0.3, 1.05, 0.4, 1)",
  springiness = 0.5,
  trail = 0.575,
  blur = 3.5,
  contrast = 18,
  shadow = PILL_SHADOW,
  className,
}: GooeyTabsProps) {
  const [inner, setInner] = useState(defaultValue ?? tabs[0]?.value);
  const selected = value ?? inner;
  const active = Math.max(0, tabs.findIndex((t) => t.value === selected));
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [ind, setInd] = useState({ x: 3, w: 0 });

  useLayoutEffect(() => {
    const el = tabRefs.current[active];
    if (el) setInd({ x: el.offsetLeft, w: el.offsetWidth });
  }, [active, tabs]);

  const select = (next: string) => {
    if (value === undefined) setInner(next);
    onValueChange?.(next);
  };

  return (
    <Liquid
      blur={blur}
      contrast={contrast}
      fill="var(--primary)"
      shadow={shadow}
      className={cn(
        "inline-flex items-center gap-[3px] rounded-full p-[3px]",
        "[--gooey-tab-shadow-1:oklch(0_0_0/0.11)] [--gooey-tab-shadow-2:oklch(0_0_0/0.07)] dark:[--gooey-tab-shadow-1:oklch(0_0_0/0.5)] dark:[--gooey-tab-shadow-2:oklch(0_0_0/0.35)]",
        className,
      )}
      style={{ "--tb-dur": `${duration}ms`, "--tb-ease": easing } as CSSProperties}
    >
      {/* Geometry box the tabs measure against; no fill — the liquid pill is the only surface. */}
      <div aria-hidden="true" className="absolute inset-0 -z-2 rounded-full" />
      <Liquid.Item effect="move" move={{ springiness, trail }}>
        {/* Invisible geometry carrier: CSS slides it, the liquid renders it. */}
        <div
          className="pointer-events-none absolute left-0 top-[3px] h-[30px] rounded-full transition-[transform,width] duration-(--tb-dur) ease-(--tb-ease) motion-reduce:transition-none"
          style={{ transform: `translateX(${ind.x}px)`, width: ind.w || 0 }}
        />
      </Liquid.Item>
      <div className="contents" role="tablist" aria-label={ariaLabel}>
        {tabs.map((tab, i) => (
          <button
            key={tab.value}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => select(tab.value)}
            className={cn(
              "z-1 box-border h-[30px] cursor-pointer appearance-none whitespace-nowrap rounded-full border border-transparent bg-transparent px-3 py-1 font-[inherit] text-[13px] font-medium leading-[1.4] [-webkit-tap-highlight-color:transparent]",
              "transition-[color,border-color] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              i === active ? "text-primary-foreground" : "text-foreground/75 hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </Liquid>
  );
}

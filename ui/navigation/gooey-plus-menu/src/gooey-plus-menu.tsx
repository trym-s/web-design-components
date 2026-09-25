import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Liquid } from "./liquid-gooey";
import { cn } from "./lib/utils";
import "./gooey-plus-menu.css";

export type GooeyPlusMenuItem = {
  /** Accessible name of the satellite button. */
  label: string;
  /** 16px icon riding the satellite. */
  icon: ReactNode;
  /** Open offset from the main button, px (scaled by `spread`). */
  x: number;
  y: number;
  onSelect?: () => void;
};

export type GooeyPlusMenuProps = {
  items: GooeyPlusMenuItem[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  openLabel?: string;
  closeLabel?: string;
  /** Open flight: duration ms, easing, per-item stagger ms. */
  openDuration?: number;
  openEasing?: string;
  openStagger?: number;
  /** Close flight: duration ms, easing, per-item stagger ms. */
  closeDuration?: number;
  closeEasing?: string;
  closeStagger?: number;
  /** Multiplier on every item offset. */
  spread?: number;
  /** Satellite icon fade-in duration and delay, ms. */
  iconFade?: number;
  iconDelay?: number;
  /** Close anticipation dip: distance px (0 disables) and duration ms. */
  anticipationDistance?: number;
  anticipationDuration?: number;
  /** Goo blur sigma px / alpha-contrast slope. */
  blur?: number;
  contrast?: number;
  /** `box-shadow` syntax, rendered on the merged liquid. */
  shadow?: string;
  className?: string;
};

const BUTTON =
  "grid size-10 cursor-pointer place-items-center rounded-full border-0 bg-transparent p-0 text-popover-foreground [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function GooeyPlusMenu({
  items,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  openLabel = "Open menu",
  closeLabel = "Close menu",
  openDuration = 550,
  openEasing = "cubic-bezier(0.34, 1.56, 0.64, 1)",
  openStagger = 40,
  closeDuration = 250,
  closeEasing = "cubic-bezier(0.22, 1, 0.36, 1)",
  closeStagger = 0,
  spread = 1,
  iconFade = 180,
  iconDelay = 120,
  anticipationDistance = 5,
  anticipationDuration = 700,
  blur = 6,
  contrast = 18,
  shadow = "0 0 0 1px var(--border) inset, 0 2px 6px var(--gooey-drop)",
  className,
}: GooeyPlusMenuProps) {
  const [inner, setInner] = useState(defaultOpen);
  const open = openProp ?? inner;
  const [anticipating, setAnticipating] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wasOpen = useRef(open);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  // Closing plays the anticipation nudge, restarted cleanly so a rapid re-close replays it from zero.
  useEffect(() => {
    const closing = wasOpen.current && !open;
    wasOpen.current = open;
    if (!closing || anticipationDistance <= 0) return;
    if (timer.current) clearTimeout(timer.current);
    setAnticipating(false);
    const raf = requestAnimationFrame(() => setAnticipating(true));
    timer.current = setTimeout(() => setAnticipating(false), anticipationDuration);
    return () => cancelAnimationFrame(raf);
  }, [open, anticipationDistance, anticipationDuration]);

  const setOpen = (next: boolean) => {
    if (openProp === undefined) setInner(next);
    onOpenChange?.(next);
  };

  const phase = open
    ? { duration: openDuration, ease: openEasing, stagger: openStagger }
    : { duration: closeDuration, ease: closeEasing, stagger: closeStagger };

  return (
    <Liquid
      blur={blur}
      contrast={contrast}
      fill="var(--popover)"
      shadow={shadow}
      className={cn(
        "h-[140px] w-[200px] [--gooey-drop:oklch(0_0_0/0.08)] dark:[--gooey-drop:oklch(0_0_0/0.24)]",
        anticipating && "gooey-pm-anticipating",
        className,
      )}
      style={
        {
          "--pm-anticip": `${anticipationDistance}px`,
          "--pm-anticip-dur": `${anticipationDuration}ms`,
        } as CSSProperties
      }
    >
      {items.map((item, i) => (
        <Liquid.Item
          key={item.label}
          className="absolute left-20 top-20"
          x={open ? item.x * spread : 0}
          y={open ? item.y * spread : 0}
          transition={{ duration: phase.duration, ease: phase.ease }}
          delay={i * phase.stagger}
        >
          <button
            type="button"
            aria-label={item.label}
            tabIndex={open ? 0 : -1}
            onClick={() => {
              item.onSelect?.();
              setOpen(!open);
            }}
            className={cn(BUTTON, open ? "pointer-events-auto hover:bg-foreground/5" : "pointer-events-none")}
          >
            {/* Icons hold back while the blob is merged, then materialise with a soft cross-blur. */}
            <span
              className={cn(
                "grid place-items-center transition-[opacity,filter] ease-[ease] motion-reduce:transition-none",
                open ? "opacity-100 blur-[0px]" : "opacity-0 blur-[2px] duration-120",
              )}
              style={{
                transitionDuration: open ? `${iconFade}ms` : undefined,
                transitionDelay: open ? `${iconDelay + i * phase.stagger}ms` : "0ms",
              }}
            >
              {item.icon}
            </span>
          </button>
        </Liquid.Item>
      ))}
      <Liquid.Item className="absolute left-20 top-20">
        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? closeLabel : openLabel}
          onClick={() => setOpen(!open)}
          className={cn(BUTTON, "gooey-pm-main")}
        >
          <span
            className={cn(
              "grid place-items-center transition-transform duration-250 ease-in-out motion-reduce:transition-none",
              open ? "rotate-45" : "rotate-0",
            )}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
              <path d="M10 4V16M4 10H16" />
            </svg>
          </span>
        </button>
      </Liquid.Item>
    </Liquid>
  );
}

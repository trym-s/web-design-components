import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "./lib/utils";
import "./tabs-sliding.css";

export type SlidingTabsProps = {
  /** Tab labels. */
  tabs: string[];
  /** Controlled active index. */
  value?: number;
  /** Initial active index when uncontrolled. */
  defaultValue?: number;
  onValueChange?: (index: number) => void;
  "aria-label"?: string;
  className?: string;
};

/**
 * Segmented control whose active pill slides and resizes to the selected tab (250 ms,
 * ease-out-quint). The pill snaps without animation on first paint and on window resize.
 */
export function SlidingTabs({ tabs, value, defaultValue = 0, onValueChange, className, ...aria }: SlidingTabsProps) {
  const pillRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const placed = useRef(false);
  const [inner, setInner] = useState(defaultValue);
  const active = value ?? inner;

  const select = (index: number) => {
    if (value === undefined) setInner(index);
    onValueChange?.(index);
  };

  useEffect(() => {
    const moveTo = (animate: boolean) => {
      const tab = tabRefs.current[active];
      const pill = pillRef.current;
      if (!tab || !pill) return;
      if (!animate) pill.style.transition = "none";
      pill.style.transform = `translateX(${tab.offsetLeft}px)`;
      pill.style.width = `${tab.offsetWidth}px`;
      if (!animate) {
        void pill.offsetWidth;
        pill.style.transition = "";
      }
    };
    const id = requestAnimationFrame(() => {
      moveTo(placed.current);
      placed.current = true;
    });
    const onResize = () => moveTo(false);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", onResize);
    };
  }, [active]);

  const onKeyDown = (e: KeyboardEvent) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + tabs.length) % tabs.length;
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div role="tablist" className={cn("t-tabs rounded-full bg-secondary text-sm", className)} onKeyDown={onKeyDown} {...aria}>
      <span ref={pillRef} className="t-tabs-pill rounded-full bg-background shadow-xs" aria-hidden="true" />
      {tabs.map((label, i) => (
        <button
          key={label}
          ref={(el) => { tabRefs.current[i] = el; }}
          type="button"
          role="tab"
          aria-selected={i === active}
          tabIndex={i === active ? 0 : -1}
          onClick={() => select(i)}
          className="t-tab rounded-full text-foreground/80 outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-selected:text-foreground"
        >
          {label}
        </button>
      ))}
    </div>
  );
}

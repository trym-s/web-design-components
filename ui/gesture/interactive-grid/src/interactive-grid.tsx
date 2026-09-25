/**
 * Interactive Grid — Originkit (source supplied by the user). A grid of cards: the hovered card lifts
 * (scale 1.15, −20 px), its four direct neighbours follow (scale 1.05, −5 px). Card colours are the
 * `--interactive-grid-*` variables declared on the root with the upstream values.
 */
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import "./interactive-grid.css";

export type InteractiveGridProps = {
  /** Cell contents (logos, icons, images); repeated to fill `columns × rows`. */
  items: ReactNode[];
  padding?: string;
  columns?: number;
  rows?: number;
  gap?: number;
  /** Card radius in px. */
  rounded?: number;
  /** Content size, 1–10 → 20–200 % of the card. */
  logoScale?: number;
  shadow?: boolean;
  glow?: boolean;
  /** 0–100 → glow blur 0–16 px. */
  glowIntensity?: number;
  perspective?: number;
  rotateX?: number;
  rotateY?: number;
  className?: string;
  style?: CSSProperties;
};

const VARS =
  "[--interactive-grid-card:oklch(0_0_0)] [--interactive-grid-border:oklch(0.281_0_0)] [--interactive-grid-shadow:oklch(0.959_0.043_161/0.5)] [--interactive-grid-glow-start:oklch(0.839_0.211_150.7/0.5)] [--interactive-grid-glow-end:oklch(0.839_0.211_150.7)]";

export function InteractiveGrid({
  items, padding = "50px", columns = 3, rows = 3, gap = 0, rounded = 0, logoScale = 3, shadow = false, glow = false,
  glowIntensity = 50, perspective = 1600, rotateX = 0, rotateY = 0, className, style,
}: InteractiveGridProps) {
  const cols = Math.max(1, Math.round(columns));
  const rowCount = Math.max(1, Math.round(rows));
  const count = cols * rowCount;
  const [hovered, setHovered] = useState<number | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);
  const neighbours = useMemo(() => {
    if (hovered === null) return [];
    return [hovered % cols ? hovered - 1 : -1, hovered % cols < cols - 1 ? hovered + 1 : -1, hovered - cols, hovered + cols].filter(
      (index) => index >= 0 && index < count,
    );
  }, [hovered, cols, count]);
  const enter = (index: number) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = null;
    setHovered(index);
  };
  const leave = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setHovered(null), 200);
  };
  const glowBlur = (Math.min(100, Math.max(0, glowIntensity)) / 100) * 16;
  const logoSize = Math.min(10, Math.max(1, Math.round(logoScale))) * 20;

  return (
    <div
      className={[VARS, "relative box-border flex size-full items-center justify-center", className].filter(Boolean).join(" ")}
      style={{ ...style, padding, "--interactive-grid-glow-blur": `${glowBlur.toFixed(1)}px`, "--interactive-grid-glow-blur-small": `${(glowBlur / 2).toFixed(1)}px` } as CSSProperties}
    >
      <div
        onPointerLeave={leave}
        className="grid size-full"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rowCount}, minmax(0, 1fr))`,
          gap,
          transform: `perspective(${perspective}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {Array.from({ length: count }, (_, index) => {
          const big = hovered === index;
          const small = !big && neighbours.includes(index);
          return (
            <div
              key={index}
              onPointerEnter={() => enter(index)}
              className={[
                "interactive-grid-card relative box-border flex min-h-0 min-w-0 items-center justify-center overflow-visible border border-(--interactive-grid-border) bg-(--interactive-grid-card) px-3 py-5",
                shadow && "interactive-grid-shadow",
                big && "interactive-grid-big",
                small && "interactive-grid-small",
                glow && big && "interactive-grid-glow-big",
                glow && small && "interactive-grid-glow-small",
              ].filter(Boolean).join(" ")}
              style={{ borderRadius: rounded, zIndex: big ? count + 1 : index + 1 }}
            >
              <div
                className="interactive-grid-content pointer-events-none flex select-none items-center justify-center [&>*]:size-full [&>*]:object-contain"
                style={{ width: `${logoSize}%`, height: `${logoSize}%` }}
              >
                {items.length ? items[index % items.length] : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

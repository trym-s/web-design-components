/**
 * Interactive Grid Background — Chamaac UI `registry/chamaac/interactive-grid/interactive-grid-background.tsx`
 * (commit 345d79b) without Next.js; the dot colours default to CSS variables instead of hex literals.
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import { useEffect, useRef, type HTMLAttributes } from "react";
import { cn } from "./lib/utils";

export interface InteractiveGridBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  /** Distance between dots, px. */
  gridGap?: number;
  /** Resting dot radius, px. */
  dotSize?: number;
  /** Resting dot colour. Default: `--interactive-grid-dot` (declared as `--muted-foreground`). */
  color?: string;
  /** Colour of dots in the inner half of the pointer radius. Default: `--interactive-grid-highlight` (declared yellow). */
  highlightColor?: string;
  /** Pointer influence radius, px. */
  radius?: number;
}

export function InteractiveGridBackground({
  className,
  children,
  gridGap = 40,
  dotSize = 1.5,
  color,
  highlightColor,
  radius = 300,
  ...props
}: InteractiveGridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const requestRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      // Canvas cannot resolve var(); read the computed custom properties (cached by the browser until styles change).
      const styles = getComputedStyle(container);
      const base = color ?? styles.getPropertyValue("--interactive-grid-dot").trim();
      const highlight = highlightColor ?? styles.getPropertyValue("--interactive-grid-highlight").trim();
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      for (let x = 0; x < width; x += gridGap) {
        for (let y = 0; y < height; y += gridGap) {
          const dist = Math.hypot(x - mouseRef.current.x, y - mouseRef.current.y);
          let currentSize = dotSize;
          let currentAlpha = 0.5;
          let currentColor = base;
          if (dist < radius) {
            const ratio = 1 - dist / radius;
            currentSize = dotSize + ratio * 2;
            currentAlpha = 0.5 + ratio * 0.5;
            if (ratio > 0.5) currentColor = highlight;
          }
          ctx.beginPath();
          ctx.arc(x, y, currentSize, 0, Math.PI * 2);
          ctx.fillStyle = currentColor;
          ctx.globalAlpha = currentAlpha;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gridGap, dotSize, color, highlightColor, radius]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-screen w-full overflow-hidden bg-background [--interactive-grid-dot:var(--muted-foreground)] [--interactive-grid-highlight:yellow]",
        className,
      )}
      {...props}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="pointer-events-none relative z-10 h-full w-full">{children}</div>
    </div>
  );
}

export default InteractiveGridBackground;

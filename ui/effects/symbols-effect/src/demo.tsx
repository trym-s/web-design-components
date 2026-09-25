import { useMemo } from "react";
import { SymbolsCanvas } from "./symbols-canvas";

/** A generated grayscale source (radial light + rings) so the demo needs no network or asset. */
function useSource() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 480;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(170, 150, 20, 240, 240, 330);
    g.addColorStop(0, "oklch(1 0 0)");
    g.addColorStop(1, "oklch(0 0 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 480, 480);
    ctx.lineWidth = 26;
    for (let r = 60; r < 330; r += 70) {
      ctx.strokeStyle = `oklch(${0.25 + r / 700} 0 0)`;
      ctx.beginPath();
      ctx.arc(300, 320, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    return c.toDataURL();
  }, []);
}

export default function Demo() {
  const src = useSource();
  return (
    <div className="aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-lg border">
      <SymbolsCanvas image={src} cell={12} bandStops={[0, 0.25, 0.5, 0.75, 1]} bandGlyphs={[1, 2, 3, 0]} aria-label="Symbols effect" />
    </div>
  );
}

import { useEffect, useState } from "react";
import { GhostReveal, type GhostDirection } from "./ghost-reveal";

const directions: GhostDirection[] = ["up", "down", "left", "right"];

export default function Demo() {
  const [play, setPlay] = useState(false);
  // Start hidden, then reveal after mount so the slide is visible.
  useEffect(() => {
    const id = setTimeout(() => setPlay(true), 100);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="grid grid-cols-2 gap-6">
        {directions.map((direction) => (
          <div key={direction} className="flex flex-col items-center gap-2">
            <GhostReveal direction={direction} duration={1400} play={play}>
              {/* Placeholder "photo" built from chart tokens */}
              <div className="h-40 w-64 rounded-xl bg-linear-140 from-chart-1 via-chart-2 to-chart-4" />
            </GhostReveal>
            <span className="font-mono text-muted-foreground text-xs">{direction}</span>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent"
        onClick={() => setPlay((p) => !p)}
      >
        {play ? "Hide" : "Reveal"}
      </button>
    </div>
  );
}

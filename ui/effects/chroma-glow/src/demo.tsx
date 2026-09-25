import { useState, type CSSProperties } from "react";
import { ChromaGlowText } from "./chroma-glow";

/* Second card: the upstream "Sand / Cobalt" light world, set by overriding the declared variables. */
const SAND = {
  "--chroma-warm": "oklch(0.759 0.147 37)",
  "--chroma-cool": "oklch(0.548 0.227 268.6)",
  "--chroma-fringe": "oklch(0.673 0.192 8)",
  "--chroma-bg": "oklch(0.927 0.036 84.6)",
} as CSSProperties;

export default function Demo() {
  const [word, setWord] = useState("chrome");
  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <ChromaGlowText word={word} />
      <ChromaGlowText word="oof" invert split={9} bloom={1.5} core={1} noise={0.09} style={SAND} />
      <input
        value={word}
        maxLength={14}
        onChange={(e) => setWord(e.target.value)}
        aria-label="Word"
        className="h-8 w-48 rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  );
}

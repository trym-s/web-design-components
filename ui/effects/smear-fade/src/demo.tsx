import type { CSSProperties } from "react";
import { SmearFade } from "./smear-fade";

/* Second card: the upstream "Graphite" light world, set by overriding the declared variables. */
const GRAPHITE = {
  "--smear-bg": "oklch(1.000 0.000 0.0)",
  "--smear-bleed": "oklch(0.626 0.051 291.6)",
  "--smear-halo": "oklch(0.406 0.070 291.7)",
  "--smear-core": "oklch(0.209 0.057 291.4)",
  "--smear-pool-a": "oklch(0.592 0.076 283.8/0.07)",
  "--smear-pool-b": "oklch(0.592 0.076 283.8/0.02)",
  "--smear-vignette": "oklch(0.972 0.007 295.5)",
} as CSSProperties;

export default function Demo() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <SmearFade />
      <SmearFade
        word="graphite"
        mode="subtract"
        alphaScale={0.42}
        trail={{ hue: 250, sat: 14, light: 26, dHue: 8, dSat: -8, dLight: 54 }}
        style={GRAPHITE}
      />
    </div>
  );
}

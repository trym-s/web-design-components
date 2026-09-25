import { useState } from "react";
import { DEPTH_MATERIALS, DepthButton, DepthToggle } from "./depth-button";

export default function Demo() {
  const [on, setOn] = useState(true);
  const [glassOn, setGlassOn] = useState(false);

  return (
    <div className="flex w-full max-w-4xl flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        {DEPTH_MATERIALS.map((m) => (
          <div
            key={m}
            className={
              m === "glass"
                ? "flex h-28 flex-col items-center justify-center gap-2 rounded-xl bg-linear-120 from-chart-1 via-chart-2 to-chart-5"
                : "flex h-28 flex-col items-center justify-center gap-2 rounded-xl border bg-muted/40"
            }
          >
            <DepthButton material={m}>Get Started</DepthButton>
            <span className="font-mono text-[11px] text-muted-foreground">{m}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 rounded-xl border bg-muted/40 p-6">
        <DepthButton material="glossy" shape="icon" aria-label="Go">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </DepthButton>
        <DepthToggle material="glossy" checked={on} onCheckedChange={setOn} aria-label="Glossy toggle" />
        <DepthToggle material="satin" checked={!on} onCheckedChange={(v) => setOn(!v)} aria-label="Satin toggle" />
        <DepthToggle material="metal" checked={glassOn} onCheckedChange={setGlassOn} aria-label="Metal toggle" />
        <DepthButton material="duotone" shape="icon" aria-label="Add">
          +
        </DepthButton>
      </div>
    </div>
  );
}

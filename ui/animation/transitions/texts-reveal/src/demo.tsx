import { useState } from "react";
import { StaggerReveal } from "./texts-reveal";

export default function Demo() {
  const [shown, setShown] = useState(true);

  return (
    <div className="flex h-[260px] w-[296px] flex-col items-center justify-between rounded-xl bg-muted/40 p-4 pt-[76px]">
      <StaggerReveal
        shown={shown}
        primary="Welcome aboard"
        secondary="Your workspace is ready to go."
        className="text-center text-sm leading-relaxed"
      />
      <button
        type="button"
        onClick={() => setShown((v) => !v)}
        className="h-8 rounded-full bg-foreground/[0.06] px-3 text-sm font-medium text-foreground"
      >
        Animate
      </button>
    </div>
  );
}

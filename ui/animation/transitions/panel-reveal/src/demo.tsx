import { useState } from "react";
import { PanelReveal } from "./panel-reveal";

export default function Demo() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-[260px] w-[296px] flex-col overflow-hidden rounded-xl bg-muted/40">
      <div className="flex h-[76px] shrink-0 items-start justify-center pt-5">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="demo-panel"
          onClick={() => setOpen((v) => !v)}
          className="h-8 rounded-full bg-foreground/[0.06] px-3 text-sm font-medium text-foreground"
        >
          Toggle panel
        </button>
      </div>
      <PanelReveal id="demo-panel" open={open} className="flex-1" panelClassName="border-t bg-card px-8 pt-7">
        <div className="flex flex-col gap-1.5">
          <div className="h-2 w-4/5 rounded-full bg-muted" />
          <div className="h-2 w-1/2 rounded-full bg-muted" />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-11 rounded-sm bg-muted" />
          ))}
        </div>
      </PanelReveal>
    </div>
  );
}

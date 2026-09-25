"use client";

import { useState } from "react";
import { ValueFlash } from "./value-flash";

const STEPS = [-120, -17, +25, +140] as const;

const label = (step: number) =>
  `${step > 0 ? "+" : "−"}${Math.abs(step).toLocaleString("en-US")}`;

export default function ValueFlashDemo() {
  const [value, setValue] = useState(1284);

  return (
    <div className="mx-auto flex w-full max-w-[440px] flex-col items-center gap-5">
      <ValueFlash
        value={value}
        format={(n) => n.toLocaleString("en-US")}
        label="Requests per second"
        className="text-[24px]"
      />
      <div className="flex gap-1.5">
        {STEPS.map((step) => (
          <button
            key={step}
            type="button"
            onClick={() =>
              setValue((v) => Math.min(9600, Math.max(1002, v + step)))
            }
            className="border bg-card shadow-xs transition-[transform,background-color,color] duration-150 active:translate-y-px h-8 rounded-[calc(var(--radius)-4px)] px-2.5 text-[12px] font-medium tabular-nums text-muted-foreground hover:text-foreground"
          >
            {label(step)}
          </button>
        ))}
      </div>
    </div>
  );
}

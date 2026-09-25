import { useState } from "react";
import { SpinningCounter } from "./spinning-counter";

export default function Demo() {
  const [value, setValue] = useState(0);

  return (
    <div className="flex h-[260px] w-[296px] flex-col items-center justify-between rounded-xl bg-muted/40 p-4 pt-[82px]">
      <SpinningCounter value={value} className="text-2xl font-medium" />
      <button
        type="button"
        onClick={() => setValue((v) => (v + 1) % 10)}
        className="h-8 rounded-full bg-foreground/[0.06] px-3 text-sm font-medium text-foreground"
      >
        Animate
      </button>
    </div>
  );
}

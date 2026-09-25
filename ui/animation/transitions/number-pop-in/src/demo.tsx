import { useState } from "react";
import { NumberPopIn } from "./number-pop-in";

const VALUES = ["65.78", "71.02", "58.40"];

export default function Demo() {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex h-[260px] w-[296px] flex-col items-center justify-between rounded-xl bg-muted/40 p-4 pt-[82px]">
      <NumberPopIn value={VALUES[index]} className="text-2xl font-medium" />
      <button
        type="button"
        onClick={() => setIndex((i) => (i + 1) % VALUES.length)}
        className="h-8 rounded-full bg-foreground/[0.06] px-3 text-sm font-medium text-foreground"
      >
        Animate
      </button>
    </div>
  );
}

import { useState } from "react";
import { TextStatesSwap } from "./text-states-swap";

const MESSAGES = ["Transaction processing...", "Transaction completed"];

export default function Demo() {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex h-[260px] w-[296px] flex-col items-center justify-between rounded-xl bg-muted/40 p-4 pt-[92px]">
      <TextStatesSwap text={MESSAGES[index]} className="text-sm font-medium" />
      <button
        type="button"
        onClick={() => setIndex((i) => (i + 1) % MESSAGES.length)}
        className="h-8 rounded-full bg-foreground/[0.06] px-3 text-sm font-medium text-foreground"
      >
        Animate
      </button>
    </div>
  );
}

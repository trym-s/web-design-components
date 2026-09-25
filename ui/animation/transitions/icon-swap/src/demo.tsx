import { useState } from "react";
import { Menu, X } from "lucide-react";
import { IconSwap, type IconSwapState } from "./icon-swap";

export default function Demo() {
  const [state, setState] = useState<IconSwapState>("a");

  return (
    <div className="flex h-[260px] w-[296px] flex-col items-center justify-between rounded-xl bg-muted/40 p-4 pt-[92px]">
      <IconSwap
        state={state}
        onStateChange={setState}
        iconA={<Menu className="size-5" />}
        iconB={<X className="size-5" />}
        labelA="Open menu"
        labelB="Close menu"
      />
      <button
        type="button"
        onClick={() => setState((s) => (s === "a" ? "b" : "a"))}
        className="h-8 rounded-full bg-foreground/[0.06] px-3 text-sm font-medium text-foreground"
      >
        Animate
      </button>
    </div>
  );
}

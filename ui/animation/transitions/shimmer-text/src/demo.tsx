import { useState } from "react";
import { Shimmer } from "./shimmer-text";

export default function Demo() {
  const [thinking, setThinking] = useState(true);

  return (
    <div className="flex h-[260px] w-[296px] flex-col items-center justify-between rounded-xl bg-muted/40 p-4 pt-[82px]">
      {thinking ? (
        <Shimmer className="text-sm">Planning next moves</Shimmer>
      ) : (
        <span className="text-sm text-foreground">Plan ready</span>
      )}
      <button
        type="button"
        onClick={() => setThinking((v) => !v)}
        className="h-8 rounded-full bg-foreground/[0.06] px-3 text-sm font-medium text-foreground"
      >
        {thinking ? "Stop" : "Play"}
      </button>
    </div>
  );
}

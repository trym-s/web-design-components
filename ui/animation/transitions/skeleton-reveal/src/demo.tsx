import { useEffect, useRef, useState } from "react";
import { SkeletonReveal } from "./skeleton-reveal";

export default function Demo() {
  const [loading, setLoading] = useState(true);
  const timer = useRef<number | undefined>(undefined);

  // Simulated fetch: one 1 s pulse, then the data arrives.
  const load = () => {
    setLoading(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setLoading(false), 1000);
  };
  useEffect(() => {
    load();
    return () => window.clearTimeout(timer.current);
  }, []);

  return (
    <div className="flex h-[260px] w-[296px] flex-col items-center justify-between rounded-xl bg-muted/40 p-4 pt-[84px]">
      <SkeletonReveal
        loading={loading}
        className="h-[58px] w-full rounded-xl border bg-card text-card-foreground"
        skeleton={
          <div className="flex h-full items-center gap-3 px-4">
            <div className="size-8 shrink-0 rounded-full bg-muted" />
            <div className="flex flex-1 flex-col gap-1.5">
              <div className="h-2 w-3/5 rounded-full bg-muted" />
              <div className="h-2 w-4/5 rounded-full bg-muted" />
            </div>
          </div>
        }
      >
        <div className="flex h-full items-center gap-3 px-4">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-chart-2/15 text-xs font-medium text-chart-2">MR</span>
          <div className="flex flex-col text-sm leading-tight">
            <span className="font-medium">Maya Rivera</span>
            <span className="text-xs text-muted-foreground">Product designer</span>
          </div>
        </div>
      </SkeletonReveal>
      <button
        type="button"
        onClick={load}
        className="h-8 rounded-full bg-foreground/[0.06] px-3 text-sm font-medium text-foreground"
      >
        Animate
      </button>
    </div>
  );
}

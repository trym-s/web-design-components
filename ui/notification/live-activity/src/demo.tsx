import { useEffect, useRef } from "react";
import { LiveActivity, useLiveActivity } from "./live-activity";

const STEPS = 24;
const TICK = 140;

const LINES = ["w-[88%]", "w-[64%]", "w-[76%]", "w-[52%]", "w-[70%]"];

export default function LiveActivityDemo() {
  const pod = useLiveActivity();
  const runs = useRef(0);
  const ticker = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = () => {
    if (ticker.current) clearInterval(ticker.current);
    ticker.current = null;
  };

  const deploy = () => {
    stop();
    runs.current += 1;
    const failing = runs.current % 3 === 0;
    pod.start({ title: "Deploying site", detail: "interior-dev · production", progress: 0 });
    let step = 0;
    ticker.current = setInterval(() => {
      step += 1;
      if (failing && step >= Math.round(STEPS * 0.6)) {
        stop();
        pod.fail(
          { detail: "Build failed at step 14 of 24" },
          { label: "Retry", onClick: deploy },
        );
        return;
      }
      if (step >= STEPS) {
        stop();
        pod.succeed({ detail: "Live at interior-dev.vercel.app" });
        return;
      }
      pod.update({ progress: step / STEPS });
    }, TICK);
  };

  // Show a run in progress on mount so the pod is visible without a click; Deploy plays the full timeline.
  useEffect(() => {
    pod.start({ title: "Deploying site", detail: "interior-dev · production", progress: 0.62 });
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative h-full min-h-[280px] w-full max-w-[440px]">
      <div className="pointer-events-none absolute inset-x-0 top-4 z-10">
        <LiveActivity activity={pod.activity} onDismiss={pod.dismiss} />
      </div>

      <div aria-hidden className="space-y-4 px-6 pt-20">
        {LINES.map((width) => (
          <div
            key={width}
            className={`h-2.5 rounded-[calc(var(--radius)-8px)] bg-foreground/[0.06] ${width}`}
          />
        ))}
      </div>

      <div className="absolute bottom-4 right-4">
        <button
          type="button"
          onClick={deploy}
          className="inline-flex h-8 select-none items-center rounded-[calc(var(--radius)-1px)] border border-border bg-card px-3 text-[12.5px] font-medium text-foreground shadow-sm outline-none transition-[background-color,border-color,box-shadow] duration-150 hover:bg-accent focus-visible:border-primary focus-visible:shadow-md active:translate-y-px"
        >
          Deploy
        </button>
      </div>
    </div>
  );
}

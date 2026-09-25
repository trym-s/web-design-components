import { SlidingTabs } from "./tabs-sliding";

export default function Demo() {
  return (
    <div className="flex h-[260px] w-[296px] items-center justify-center rounded-xl bg-muted/40 p-4">
      <SlidingTabs tabs={["Plan", "Debug", "Ask"]} aria-label="Mode" />
    </div>
  );
}

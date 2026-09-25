import { GooeyTabs } from "./gooey-tabs";

const TABS = [
  { value: "plan", label: "Plan" },
  { value: "debug", label: "Debug" },
  { value: "ask", label: "Ask" },
];

export default function GooeyTabsDemo() {
  return (
    <div className="grid h-[280px] w-full max-w-md place-items-center overflow-hidden rounded-lg bg-muted/30">
      <GooeyTabs tabs={TABS} aria-label="Mode" />
    </div>
  );
}

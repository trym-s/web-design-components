import { useState } from "react";
import {
  SquircleChat,
  SquircleDropdown,
  SquircleGlossyButton,
  SquircleInput,
  SquircleStepper,
  SquircleTabs,
  SquircleToggle,
} from "./parts";

const MESSAGES = [
  { from: "user" as const, text: "hey, what’s a squircle?" },
  { from: "assistant" as const, text: "A corner that eases into the edge with no kink, like on iOS." },
  { from: "user" as const, text: "love it" },
];

export default function Demo() {
  const [smoothing, setSmoothing] = useState(1);
  const [exponent, setExponent] = useState(5);
  const [compare, setCompare] = useState(false);
  const [tab, setTab] = useState(0);
  const [on, setOn] = useState(true);
  const [count, setCount] = useState(3);
  const [shape, setShape] = useState(0);
  const s = { smoothing, exponent, compare };

  return (
    <div className="flex w-full max-w-3xl flex-col gap-6">
      <div className="grid items-center justify-items-center gap-10 rounded-xl border bg-muted/40 px-6 py-12 sm:grid-cols-2">
        <SquircleGlossyButton {...s} />
        <SquircleTabs {...s} active={tab} onChange={setTab} />
        <SquircleToggle {...s} on={on} onChange={setOn} />
        <SquircleInput {...s} />
        <SquircleStepper {...s} value={count} onValueChange={setCount} />
        <SquircleDropdown {...s} options={["Squircle", "Rounded", "Circle"]} value={shape} onValueChange={setShape} />
        <div className="sm:col-span-2">
          <SquircleChat {...s} messages={MESSAGES} />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-6 text-sm">
        <label className="flex items-center gap-2">
          Smoothing
          <input type="range" min={0} max={1} step={0.01} value={smoothing} onChange={(e) => setSmoothing(+e.target.value)} />
          <span className="w-10 font-mono text-muted-foreground tabular-nums">{smoothing.toFixed(2)}</span>
        </label>
        <label className="flex items-center gap-2">
          Squareness
          <input type="range" min={2} max={8} step={0.1} value={exponent} onChange={(e) => setExponent(+e.target.value)} />
          <span className="w-10 font-mono text-muted-foreground tabular-nums">{exponent.toFixed(1)}</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={compare} onChange={(e) => setCompare(e.target.checked)} />
          Compare with border-radius
        </label>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { ToolCallChips, type FileDiff, type ToolCall } from "./tool-call-chips";

const CALLS: ToolCall[] = [
  { icon: "think", label: "Thinking", chip: "Planning the churn schedule…",
    detail: [{ text: "Weekend demand carries pistachio, so it churns first." }, { text: "Batch capacity leaves two evening freezer windows." }] },
  { icon: "write", label: "Write 204 lines", chip: "ChurnSchedule.tsx", mono: true, detailMono: true,
    detail: [{ text: "+ const windows = slots.filter((s) => s.temp <= -12)", tone: "add" }, { text: "+ return schedule(windows, { hero: \"pistachio\" })", tone: "add" }] },
  { icon: "run", label: "Rebuild and verify", chip: "npm run freeze", mono: true, detailMono: true,
    detail: [{ text: "✓ built in 1.2s" }, { text: "✓ 34 checks passed" }] },
  { icon: "read", label: "Read image", chip: "flavor-chart.png", mono: true,
    detail: [{ text: "1280 × 720 · line chart, three summers." }, { text: "Mint chip trends up 12% through July." }] },
];
const DIFFS: FileDiff[] = [
  { file: "flavors.css", add: 13, del: 0 },
  { file: "ChurnSchedule.tsx", add: 74, del: 41 },
  { file: "menu.ts", add: 8, del: 2 },
];

/** Simulated run: one call every 700 ms, then the diff chips. */
export default function Demo() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step > CALLS.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), 700);
    return () => clearTimeout(t);
  }, [step]);
  return (
    <ToolCallChips
      summary="4 tool calls, 2 messages"
      calls={CALLS.slice(0, step)}
      diffs={step > CALLS.length ? DIFFS : undefined}
      moreLabel="+2 more"
    />
  );
}

import { useEffect, useState } from "react";
import { TaskRows, type Task, type TaskStatus } from "./task-rows";

/* The upstream status run: 600 ms row 2 spins; 1500 ms row 2 opens; 3900 ms it closes and row 3
 * fails; 5300 ms row 3 completes. It runs once; rows stay clickable. */
const TICKS = [600, 900, 2400, 1400, 2400, 600];

function useTick(intervals: number[]) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (tick >= intervals.length - 1) return;
    const t = setTimeout(() => setTick((x) => x + 1), intervals[tick]);
    return () => clearTimeout(t);
  }, [tick, intervals]);
  return tick;
}

export default function Demo() {
  const tick = useTick(TICKS);
  const draft: TaskStatus = tick < 3 ? "pending" : tick === 3 ? "failed" : "done";
  const tasks: Task[] = [
    { id: "verify", label: "Verified vendor records", amount: "12 suppliers", status: "done",
      details: [{ label: "Matched tax and contact IDs", meta: "12/12" }, { label: "Flagged stale records", meta: "0" }] },
    { id: "index", label: "Build reorder task list", amount: "7 SKUs", status: "running", step: 2,
      details: [{ label: "Reading POS export", meta: "3 files" }, { label: "Scoring stockout risk", meta: "68%" }] },
    { id: "draft", label: "Draft supplier emails", amount: "2 messages", status: draft, step: 3,
      details: [{ label: "Cone supplier follow-up", meta: "draft" }, { label: "Pistachio reorder note", meta: "draft" }] },
  ];
  return (
    <div className="flex w-full max-w-110 flex-col gap-8">
      <TaskRows tasks={tasks} open={{ index: tick === 2 }} />
      <TaskRows tasks={tasks} variant="list" />
    </div>
  );
}

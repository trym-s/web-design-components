import { useEffect, useState } from "react";
import { DiffTable, type DiffRow } from "./diff-table";

const ROWS: DiffRow[] = [
  { id: "rocky-road", name: "Rocky Road", tag: { label: "Classic", tone: "primary" }, detail: "aurora-scoops", change: "removed" },
  { id: "bubblegum", name: "Bubblegum", tag: { label: "Retro", tone: "muted" }, detail: "kumo-creamery", change: "removed" },
  { id: "mint-chip", name: "Mint Chip", tag: { label: "Classic", tone: "primary" }, detail: "maple-orbit" },
  { id: "pistachio", name: "Pistachio", tag: { label: "Seasonal", tone: "success" }, detail: "maple-orbit", change: "added" },
];

/** Plays the proposal once: plain for 1.8 s, removals at 1.8 s, the addition at 2.8 s, then rests. */
export default function Demo() {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const steps = [800, 1000, 1000];
    if (stage >= steps.length) return;
    const t = setTimeout(() => setStage((s) => s + 1), steps[stage]);
    return () => clearTimeout(t);
  }, [stage]);

  return (
    <DiffTable
      title="Proposed menu cleanup"
      columns={["Flavor", "Category", "Supplier"]}
      rows={ROWS}
      showRemovals={stage >= 2}
      showAdditions={stage >= 3}
    />
  );
}

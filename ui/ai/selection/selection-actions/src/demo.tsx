import { useEffect, useState } from "react";
import { SelectionActions, StreamText, type SelectionAction, type SelectionMode } from "./selection-actions";

const LEAD = "Pistachio holds the top slot all weekend. ";
const PICKED = "Churn it first thing Saturday so the batch has time to firm up before the afternoon rush.";
const REWRITE = "Churn pistachio first thing Saturday so the batch has time to fully firm before the afternoon rush.";
const BUSY: Record<string, string> = { improve: "Improving", shorten: "Shortening", tone: "Changing tone" };

/** Simulated model: 700 ms thinking, then the rewrite streams in; Keep / Discard return to idle. */
export default function Demo() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<SelectionMode>("idle");
  const [action, setAction] = useState("improve");

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 280);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (mode !== "thinking") return;
    const timer = window.setTimeout(() => setMode("streaming"), 700);
    return () => window.clearTimeout(timer);
  }, [mode]);

  const run = (next: SelectionAction | string) => {
    if (next === "explain") return;
    setAction(next);
    setMode("thinking");
  };

  return (
    <SelectionActions
      before={LEAD}
      selection={
        mode === "streaming" ? <StreamText text={REWRITE} onDone={() => setMode("result")} /> : mode === "result" ? REWRITE : PICKED
      }
      open={open}
      mode={mode}
      busyLabel={BUSY[action] ?? "Editing"}
      onAction={run}
      onPrompt={run}
      onKeep={() => setMode("idle")}
      onDiscard={() => setMode("idle")}
      onRetry={() => setMode("thinking")}
    />
  );
}

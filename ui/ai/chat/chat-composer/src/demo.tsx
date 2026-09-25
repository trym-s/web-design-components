import { useEffect, useState } from "react";
import { ChatComposer, type ChatSection } from "./chat-composer";

/* The reply sequence the upstream demo scripts: 500 ms after sending the first
 * section lands, 1.4 s later the second (still resolving), 1.2 s later it settles. */
type Phase = "idle" | "sent" | "reply1" | "reply2" | "done";

export default function Demo() {
  const [phase, setPhase] = useState<Phase>("done");
  const [message, setMessage] = useState("Compare mint chip to last summer");
  const [tab, setTab] = useState("Flavors");

  useEffect(() => {
    const next: Partial<Record<Phase, [Phase, number]>> = { sent: ["reply1", 500], reply1: ["reply2", 1400], reply2: ["done", 1200] };
    const step = next[phase];
    if (!step) return;
    const t = setTimeout(() => setPhase(step[0]), step[1]);
    return () => clearTimeout(t);
  }, [phase]);

  const sections: ChatSection[] = [];
  if (phase === "reply1" || phase === "reply2" || phase === "done")
    sections.push({ label: "Sales History", sub: "Flavor Data", time: "4s", body: "Pulled 3 summers of mint chip sales for comparison." });
  if (phase === "reply2" || phase === "done")
    sections.push({ label: "Comparison", sub: "Trend Detection", time: "2s", body: "Mint chip is up 12% with stronger weekend peaks.", resolving: phase === "reply2" });

  return (
    <ChatComposer
      tabs={["Flavors", "Suppliers"]}
      activeTab={tab}
      onTabChange={setTab}
      userMessage={phase === "idle" ? undefined : message}
      sections={sections}
      onSend={(text) => {
        setMessage(text);
        setPhase("sent");
      }}
    />
  );
}

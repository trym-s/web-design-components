import { useState } from "react";
import { TyperText } from "./typer";

const LINES = ["design engineered by me :)", "type your own below", "states merge into bars"];

export default function Demo() {
  const [replay, setReplay] = useState(0);
  const [custom, setCustom] = useState("hello, world");

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-1 text-center font-semibold text-[clamp(1.4rem,4vw,2.4rem)]">
        {LINES.map((line, i) => (
          <TyperText key={line} text={line} play="in" replayKey={replay} delay={i * 0.15} />
        ))}
      </div>
      <div className="font-semibold text-2xl">
        <TyperText text={custom} play="in" cycles={4} variations={["charFill", "charAccentInverse", "charBorder"]} />
      </div>
      <div className="flex items-center gap-3">
        <input
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          className="h-9 w-64 rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Text to type"
        />
        <button type="button" className="h-9 rounded-md border px-3 text-sm hover:bg-accent" onClick={() => setReplay((r) => r + 1)}>
          Replay
        </button>
      </div>
    </div>
  );
}

import { useRef } from "react";
import { AsciiSwirl, type AsciiSwirlHandle } from "./ascii-swirl";

/* The upstream "Arlan" preset: figlet "slant" rows, kept verbatim. */
const ARLAN = [
  "    ___         __          ",
  "   /   |  _____/ /___ _____ ",
  "  / /| | / ___/ / __ `/ __ \\",
  " / ___ |/ /  / / /_/ / / / /",
  "/_/  |_/_/  /_/\\__,_/_/ /_/ ",
];

export default function Demo() {
  const swirl = useRef<AsciiSwirlHandle>(null);
  return (
    <div className="flex w-full max-w-3xl flex-col items-end gap-2">
      <AsciiSwirl ref={swirl} rows={ARLAN} trail shock className="w-full" />
      <button type="button" onClick={() => swirl.current?.replay()} className="h-8 rounded-md border px-3 text-xs hover:bg-accent">
        Replay
      </button>
    </div>
  );
}

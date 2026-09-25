import { useState } from "react";
import { CardResize } from "./card-resize";

const bar = "h-1.5 rounded-full bg-muted";

export default function Demo() {
  const [small, setSmall] = useState(false);

  return (
    <div className="flex h-[260px] w-[296px] flex-col items-center justify-between gap-2 rounded-xl bg-muted/40 p-3">
      <div className="flex flex-1 items-center">
        <CardResize width={small ? 160 : 260} height={small ? 100 : 180}>
          <div className="flex h-full flex-col gap-2 p-4">
            <div className={`${bar} w-2/5`} />
            <div className={bar} />
            <div className={bar} />
            <div className={`${bar} w-3/4`} />
            <div className={`${bar} mt-auto`} />
          </div>
        </CardResize>
      </div>
      <button
        type="button"
        onClick={() => setSmall((v) => !v)}
        className="h-8 rounded-full bg-foreground/[0.06] px-3 text-sm font-medium text-foreground"
      >
        Animate
      </button>
    </div>
  );
}

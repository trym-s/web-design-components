import { useState } from "react";
import { InputShake } from "./error-state-shake";

export default function Demo() {
  const [shakeKey, setShakeKey] = useState(0);

  return (
    <div className="flex h-[260px] w-[296px] flex-col items-center justify-between rounded-xl bg-muted/40 p-4 pt-10">
      <InputShake message="Please enter a valid email." shakeKey={shakeKey}>
        <input
          type="text"
          defaultValue="John"
          aria-label="Email"
          className="h-9 w-full bg-transparent px-3 text-sm outline-none"
        />
      </InputShake>
      <button
        type="button"
        onClick={() => setShakeKey((k) => k + 1)}
        className="h-8 rounded-full bg-foreground/[0.06] px-3 text-sm font-medium text-foreground"
      >
        Animate
      </button>
    </div>
  );
}

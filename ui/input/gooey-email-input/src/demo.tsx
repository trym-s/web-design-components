import { useState } from "react";
import { GooeyEmailInput } from "./gooey-email-input";

export default function GooeyEmailInputDemo() {
  const [sent, setSent] = useState("");

  return (
    <div className="grid w-full max-w-md gap-3">
      <div className="grid h-[280px] place-items-center overflow-hidden rounded-lg bg-muted/30">
        <GooeyEmailInput onSubmit={setSent} />
      </div>
      <p aria-live="polite" className="h-4 text-center text-xs text-muted-foreground">
        {sent ? `Submitted: ${sent}` : "Focus the field to morph out the submit button."}
      </p>
    </div>
  );
}

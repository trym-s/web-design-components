import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { Toast } from "./toast";

export default function Demo() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-[260px] w-[296px] flex-col items-center justify-end gap-4 rounded-xl bg-muted/40 p-4">
      <Toast open={open}>
        <CircleCheck className="size-4 text-chart-2" />
        Changes saved
      </Toast>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="h-8 rounded-full bg-foreground/[0.06] px-3 text-sm font-medium text-foreground"
      >
        Toggle
      </button>
    </div>
  );
}

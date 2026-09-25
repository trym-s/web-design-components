import { useState } from "react";
import { Modal } from "./modal";

export default function Demo() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-[260px] w-[296px] flex-col items-center justify-end gap-4 rounded-xl bg-muted/40 p-3">
      <div className="flex w-full flex-1 items-center">
        <Modal open={open} onOpenChange={setOpen} aria-labelledby="demo-modal-title">
          <h2 id="demo-modal-title" className="text-sm font-semibold">Discard draft?</h2>
          <p className="mt-1.5 text-xs text-muted-foreground">Your unsaved changes to this post will be lost.</p>
          <div className="mt-5 flex justify-end gap-2">
            <button type="button" onClick={() => setOpen(false)} className="h-8 rounded-md bg-secondary px-3 text-xs font-medium text-secondary-foreground">
              Cancel
            </button>
            <button type="button" onClick={() => setOpen(false)} className="h-8 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground">
              Discard
            </button>
          </div>
        </Modal>
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="h-8 shrink-0 rounded-full bg-foreground/[0.06] px-3 text-sm font-medium text-foreground"
      >
        Toggle modal
      </button>
    </div>
  );
}

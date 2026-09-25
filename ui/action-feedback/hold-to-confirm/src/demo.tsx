"use client";

import { HoldToConfirm } from "./hold-to-confirm";

export default function HoldToConfirmDemo() {
  return (
    <div className="flex justify-center">
      <HoldToConfirm
        onConfirm={() => {}}
        confirmLabel="Workspace deleted"
      >
        Hold to delete workspace
      </HoldToConfirm>
    </div>
  );
}

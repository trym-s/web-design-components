import { useState } from "react";
import { Bell } from "lucide-react";
import { NotificationBadge } from "./notification-badge";

export default function Demo() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-[260px] w-[296px] flex-col items-center justify-between rounded-xl bg-muted/40 p-4 pt-[88px]">
      <NotificationBadge open={open} onOpenChange={setOpen} count={1} aria-label="Notifications">
        <Bell className="size-4" />
      </NotificationBadge>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="h-8 rounded-full bg-foreground/[0.06] px-3 text-sm font-medium text-foreground"
      >
        Animate
      </button>
    </div>
  );
}

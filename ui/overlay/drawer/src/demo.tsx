import { useState } from "react";
import { Drawer } from "./drawer";

const FIELD =
  "h-10 w-full rounded-lg border-2 border-border bg-muted/70 px-3 text-[13px] text-foreground inset-shadow-xs outline-none transition-[border-color,background-color,box-shadow] duration-150 placeholder:text-muted-foreground focus:border-primary focus:bg-card focus:shadow-none";

const LABEL =
  "block text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground";

export default function DrawerDemo() {
  const [open, setOpen] = useState(true);

  return (
    <div className="grid w-full place-items-center">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="border border-border bg-card shadow-xs transition-[transform,background-color] duration-150 hover:bg-accent active:translate-y-px h-9 rounded-[calc(var(--radius)-1px)] px-3.5 text-[13px] font-medium text-foreground"
      >
        Edit profile
      </button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        width={420}
        title="Edit profile"
        description="Visible to everyone in the workspace"
        footer={
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-8 rounded-[calc(var(--radius)-2px)] border border-border px-3 text-[12.5px] font-medium text-foreground outline-none transition-colors duration-150 hover:bg-accent focus-visible:border-primary"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-8 rounded-[calc(var(--radius)-2px)] bg-primary px-3 text-[12.5px] font-medium text-primary-foreground outline-none transition-colors duration-150 hover:bg-primary/90"
            >
              Save changes
            </button>
          </div>
        }
      >
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5">
            <label htmlFor="drawer-name" className={LABEL}>
              Display name
            </label>
            <input
              id="drawer-name"
              defaultValue="Mira Sandoval"
              className={FIELD}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="drawer-role" className={LABEL}>
              Role
            </label>
            <select id="drawer-role" defaultValue="design" className={FIELD}>
              <option value="design">Design</option>
              <option value="eng">Engineering</option>
              <option value="ops">Operations</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="drawer-email" className={LABEL}>
              Email
            </label>
            <input
              id="drawer-email"
              type="email"
              defaultValue="mira@studio.co"
              className={FIELD}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="drawer-bio" className={LABEL}>
              About
            </label>
            <textarea
              id="drawer-bio"
              rows={4}
              defaultValue="Interiors, mostly residential. Currently rebuilding a 1930s terrace in Lisbon."
              className={`${FIELD} h-auto resize-none py-2.5 leading-relaxed`}
            />
          </div>
          <label className="flex cursor-pointer items-center gap-2.5 text-[12.5px] text-muted-foreground">
            <input
              type="checkbox"
              defaultChecked
              className="size-3.5 rounded-[calc(var(--radius)-5px)] accent-primary"
            />
            Show my local time to teammates
          </label>
        </form>
      </Drawer>
    </div>
  );
}

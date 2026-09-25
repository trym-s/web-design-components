import { useState } from "react";
import { LogOut, Settings, User } from "lucide-react";
import { MenuDropdown, MenuDropdownItem } from "./menu-dropdown";

export default function Demo() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-[260px] w-[296px] flex-col items-center rounded-xl bg-muted/40 p-4 pt-5">
      <div className="relative flex flex-col items-center">
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls="demo-menu"
          onClick={() => setOpen((v) => !v)}
          className="h-8 rounded-full bg-foreground/[0.06] px-3 text-sm font-medium text-foreground"
        >
          Toggle menu
        </button>
        <MenuDropdown id="demo-menu" open={open} origin="top-center" className="absolute top-full mt-2">
          <MenuDropdownItem onSelect={() => setOpen(false)}><User className="size-4 text-muted-foreground" />Profile</MenuDropdownItem>
          <MenuDropdownItem onSelect={() => setOpen(false)}><Settings className="size-4 text-muted-foreground" />Settings</MenuDropdownItem>
          <MenuDropdownItem onSelect={() => setOpen(false)}><LogOut className="size-4 text-muted-foreground" />Sign out</MenuDropdownItem>
        </MenuDropdown>
      </div>
    </div>
  );
}

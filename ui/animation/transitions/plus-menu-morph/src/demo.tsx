import { FilePlus, FolderPlus, Image, Upload } from "lucide-react";
import { PlusMenu } from "./plus-menu-morph";

const ITEMS = [
  { icon: FilePlus, label: "New file" },
  { icon: FolderPlus, label: "New folder" },
  { icon: Image, label: "Add image" },
  { icon: Upload, label: "Upload" },
];

export default function Demo() {
  return (
    <div className="flex h-[260px] w-[296px] items-end justify-end rounded-xl bg-muted/40 p-4 pr-14 pb-14">
      <PlusMenu defaultOpen={false}>
        <div className="flex flex-col p-1.5">
          {ITEMS.map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              role="menuitem"
              className="flex h-10 w-[171px] items-center gap-2.5 rounded-lg px-2.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
            >
              <Icon className="size-4 text-muted-foreground" />
              {label}
            </button>
          ))}
        </div>
      </PlusMenu>
    </div>
  );
}

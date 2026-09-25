import { Search } from "lucide-react";
import { ClearInput } from "./input-clear-dissolve";

export default function Demo() {
  return (
    <div className="flex h-[260px] w-[296px] items-center justify-center rounded-xl bg-muted/40 p-4">
      <ClearInput
        defaultValue="How do transitions work?"
        placeholder="Search anything"
        aria-label="Search"
        icon={<Search className="size-3.5" />}
      />
    </div>
  );
}

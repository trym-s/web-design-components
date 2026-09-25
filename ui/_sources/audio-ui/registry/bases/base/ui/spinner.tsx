import { IconPlaceholder } from "../../../../shims/icon-placeholder";
import { cn } from "../lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <IconPlaceholder
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      data-slot="spinner"
      hugeicons="Loading03Icon"
      lucide="Loader2Icon"
      phosphor="SpinnerIcon"
      remixicon="RiLoaderLine"
      role="status"
      tabler="IconLoader"
      {...props}
    />
  );
}

export { Spinner };

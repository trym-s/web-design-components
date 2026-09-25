/**
 * shadcn/ui spinner, base-nova style, as `npx shadcn add` installs it (https://ui.shadcn.com/r/styles/base-nova/spinner.json).
 * MIT License, Copyright (c) 2023 shadcn. Changes: `cn` from ../lib/utils, lucide icons, the "create" style hooks dropped.
 * If the target already has this component, import that instead.
 */
import { cn } from "../lib/utils"

import { Loader2Icon } from "lucide-react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props} />
  )
}

export { Spinner }

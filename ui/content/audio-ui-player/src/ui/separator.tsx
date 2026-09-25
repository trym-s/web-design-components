/**
 * shadcn/ui separator, base-nova style, as `npx shadcn add` installs it (https://ui.shadcn.com/r/styles/base-nova/separator.json).
 * MIT License, Copyright (c) 2023 shadcn. Changes: `cn` from ../lib/utils, lucide icons, the "create" style hooks dropped.
 * If the target already has this component, import that instead.
 */
"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { cn } from "../lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }

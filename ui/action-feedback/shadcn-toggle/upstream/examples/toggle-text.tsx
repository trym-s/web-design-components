import { ItalicIcon } from "lucide-react"

import { Toggle } from "../../../../_sources/shadcn/radix-nova/ui/toggle"

export function ToggleText() {
  return (
    <Toggle aria-label="Toggle italic">
      <ItalicIcon />
      Italic
    </Toggle>
  )
}

import { MinusIcon, PlusIcon } from "lucide-react"

import { Button } from "../../../../_sources/shadcn/radix-nova/ui/button"
import { ButtonGroup } from "../../../../_sources/shadcn/radix-nova/ui/button-group"

export default function ButtonGroupOrientation() {
  return (
    <ButtonGroup
      orientation="vertical"
      aria-label="Media controls"
      className="h-fit"
    >
      <Button variant="outline" size="icon">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon">
        <MinusIcon />
      </Button>
    </ButtonGroup>
  )
}

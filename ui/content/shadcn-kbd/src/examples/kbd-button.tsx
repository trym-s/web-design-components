import { Button } from "../../../../_sources/shadcn/radix-nova/ui/button"
import { Kbd } from "../../../../_sources/shadcn/radix-nova/ui/kbd"

export default function KbdButton() {
  return (
    <Button variant="outline">
      Accept{" "}
      <Kbd data-icon="inline-end" className="translate-x-0.5">
        ⏎
      </Kbd>
    </Button>
  )
}

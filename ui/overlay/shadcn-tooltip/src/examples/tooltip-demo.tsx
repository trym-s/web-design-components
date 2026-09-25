import { Button } from "../../../../_sources/shadcn/radix-nova/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../../_sources/shadcn/radix-nova/ui/tooltip"

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  )
}

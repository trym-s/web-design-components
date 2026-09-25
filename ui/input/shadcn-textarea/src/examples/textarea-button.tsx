import { Button } from "../../../../_sources/shadcn/radix-nova/ui/button"
import { Textarea } from "../../../../_sources/shadcn/radix-nova/ui/textarea"

export function TextareaButton() {
  return (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  )
}

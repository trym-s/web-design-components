import { Field, FieldLabel } from "../../../../_sources/shadcn/radix-nova/ui/field"
import { Textarea } from "../../../../_sources/shadcn/radix-nova/ui/textarea"

export function TextareaDisabled() {
  return (
    <Field data-disabled>
      <FieldLabel htmlFor="textarea-disabled">Message</FieldLabel>
      <Textarea
        id="textarea-disabled"
        placeholder="Type your message here."
        disabled
      />
    </Field>
  )
}

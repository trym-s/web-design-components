import { Button } from "../../../../_sources/shadcn/radix-nova/ui/button"
import { ButtonGroup } from "../../../../_sources/shadcn/radix-nova/ui/button-group"
import { Field, FieldLabel } from "../../../../_sources/shadcn/radix-nova/ui/field"
import { Input } from "../../../../_sources/shadcn/radix-nova/ui/input"

export function InputButtonGroup() {
  return (
    <Field>
      <FieldLabel htmlFor="input-button-group">Search</FieldLabel>
      <ButtonGroup>
        <Input id="input-button-group" placeholder="Type to search..." />
        <Button variant="outline">Search</Button>
      </ButtonGroup>
    </Field>
  )
}

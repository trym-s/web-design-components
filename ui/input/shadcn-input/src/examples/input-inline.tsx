import { Button } from "../../../../_sources/shadcn/radix-nova/ui/button"
import { Field } from "../../../../_sources/shadcn/radix-nova/ui/field"
import { Input } from "../../../../_sources/shadcn/radix-nova/ui/input"

export function InputInline() {
  return (
    <Field orientation="horizontal">
      <Input type="search" placeholder="Search..." />
      <Button>Search</Button>
    </Field>
  )
}

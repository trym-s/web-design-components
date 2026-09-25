import {
  Field,
  FieldDescription,
  FieldLabel,
} from "../../../../_sources/shadcn/radix-nova/ui/field"
import { Input } from "../../../../_sources/shadcn/radix-nova/ui/input"

export function InputDisabled() {
  return (
    <Field data-disabled>
      <FieldLabel htmlFor="input-demo-disabled">Email</FieldLabel>
      <Input
        id="input-demo-disabled"
        type="email"
        placeholder="Email"
        disabled
      />
      <FieldDescription>This field is currently disabled.</FieldDescription>
    </Field>
  )
}

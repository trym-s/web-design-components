import { Badge } from "../../../../_sources/shadcn/radix-nova/ui/badge"
import { Field, FieldLabel } from "../../../../_sources/shadcn/radix-nova/ui/field"
import { Input } from "../../../../_sources/shadcn/radix-nova/ui/input"

export function InputBadge() {
  return (
    <Field>
      <FieldLabel htmlFor="input-badge">
        Webhook URL{" "}
        <Badge variant="secondary" className="ml-auto">
          Beta
        </Badge>
      </FieldLabel>
      <Input
        id="input-badge"
        type="url"
        placeholder="https://api.example.com/webhook"
      />
    </Field>
  )
}

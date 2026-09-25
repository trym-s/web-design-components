import E0 from "./examples/textarea-demo";
import { TextareaField as E1 } from "./examples/textarea-field";
import { TextareaDisabled as E2 } from "./examples/textarea-disabled";
import { TextareaInvalid as E3 } from "./examples/textarea-invalid";
import { TextareaButton as E4 } from "./examples/textarea-button";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "textarea-demo", title: "Textarea Demo", component: E0 },
  { name: "textarea-field", title: "Textarea Field", component: E1 },
  { name: "textarea-disabled", title: "Textarea Disabled", component: E2 },
  { name: "textarea-invalid", title: "Textarea Invalid", component: E3 },
  { name: "textarea-button", title: "Textarea Button", component: E4 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}

import E0 from "./examples/checkbox-demo";
import { CheckboxInvalid as E1 } from "./examples/checkbox-invalid";
import { CheckboxBasic as E2 } from "./examples/checkbox-basic";
import { CheckboxDescription as E3 } from "./examples/checkbox-description";
import { CheckboxDisabled as E4 } from "./examples/checkbox-disabled";
import { CheckboxGroup as E5 } from "./examples/checkbox-group";
import { CheckboxInTable as E6 } from "./examples/checkbox-table";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "checkbox-demo", title: "Checkbox Demo", component: E0 },
  { name: "checkbox-invalid", title: "Checkbox Invalid", component: E1 },
  { name: "checkbox-basic", title: "Checkbox Basic", component: E2 },
  { name: "checkbox-description", title: "Checkbox Description", component: E3 },
  { name: "checkbox-disabled", title: "Checkbox Disabled", component: E4 },
  { name: "checkbox-group", title: "Checkbox Group", component: E5 },
  { name: "checkbox-table", title: "Checkbox Table", component: E6 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}

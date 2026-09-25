import { RadioGroupDemo as E0 } from "./examples/radio-group-demo";
import { RadioGroupDescription as E1 } from "./examples/radio-group-description";
import { RadioGroupChoiceCard as E2 } from "./examples/radio-group-choice-card";
import { RadioGroupFieldset as E3 } from "./examples/radio-group-fieldset";
import { RadioGroupDisabled as E4 } from "./examples/radio-group-disabled";
import { RadioGroupInvalid as E5 } from "./examples/radio-group-invalid";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "radio-group-demo", title: "Radio Group Demo", component: E0 },
  { name: "radio-group-description", title: "Radio Group Description", component: E1 },
  { name: "radio-group-choice-card", title: "Radio Group Choice Card", component: E2 },
  { name: "radio-group-fieldset", title: "Radio Group Fieldset", component: E3 },
  { name: "radio-group-disabled", title: "Radio Group Disabled", component: E4 },
  { name: "radio-group-invalid", title: "Radio Group Invalid", component: E5 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}

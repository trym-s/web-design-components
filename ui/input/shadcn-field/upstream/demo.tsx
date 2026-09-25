import E0 from "./examples/field-demo";
import E1 from "./examples/field-input";
import E2 from "./examples/field-textarea";
import E3 from "./examples/field-select";
import E4 from "./examples/field-slider";
import { FieldFieldset as E5 } from "./examples/field-fieldset";
import { FieldCheckbox as E6 } from "./examples/field-checkbox";
import { FieldRadio as E7 } from "./examples/field-radio";
import E8 from "./examples/field-switch";
import E9 from "./examples/field-choice-card";
import E10 from "./examples/field-group";
import { FieldResponsive as E11 } from "./examples/field-responsive";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "field-demo", title: "Field Demo", component: E0 },
  { name: "field-input", title: "Field Input", component: E1 },
  { name: "field-textarea", title: "Field Textarea", component: E2 },
  { name: "field-select", title: "Field Select", component: E3 },
  { name: "field-slider", title: "Field Slider", component: E4 },
  { name: "field-fieldset", title: "Field Fieldset", component: E5 },
  { name: "field-checkbox", title: "Field Checkbox", component: E6 },
  { name: "field-radio", title: "Field Radio", component: E7 },
  { name: "field-switch", title: "Field Switch", component: E8 },
  { name: "field-choice-card", title: "Field Choice Card", component: E9 },
  { name: "field-group", title: "Field Group", component: E10 },
  { name: "field-responsive", title: "Field Responsive", component: E11 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}

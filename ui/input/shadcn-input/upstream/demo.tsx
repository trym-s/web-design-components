import { InputDemo as E0 } from "./examples/input-demo";
import { InputBasic as E1 } from "./examples/input-basic";
import { InputField as E2 } from "./examples/input-field";
import { InputFieldgroup as E3 } from "./examples/input-fieldgroup";
import { InputDisabled as E4 } from "./examples/input-disabled";
import { InputInvalid as E5 } from "./examples/input-invalid";
import { InputFile as E6 } from "./examples/input-file";
import { InputInline as E7 } from "./examples/input-inline";
import { InputGrid as E8 } from "./examples/input-grid";
import { InputRequired as E9 } from "./examples/input-required";
import { InputBadge as E10 } from "./examples/input-badge";
import { InputInputGroup as E11 } from "./examples/input-input-group";
import { InputButtonGroup as E12 } from "./examples/input-button-group";
import { InputForm as E13 } from "./examples/input-form";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "input-demo", title: "Input Demo", component: E0 },
  { name: "input-basic", title: "Input Basic", component: E1 },
  { name: "input-field", title: "Input Field", component: E2 },
  { name: "input-fieldgroup", title: "Input Fieldgroup", component: E3 },
  { name: "input-disabled", title: "Input Disabled", component: E4 },
  { name: "input-invalid", title: "Input Invalid", component: E5 },
  { name: "input-file", title: "Input File", component: E6 },
  { name: "input-inline", title: "Input Inline", component: E7 },
  { name: "input-grid", title: "Input Grid", component: E8 },
  { name: "input-required", title: "Input Required", component: E9 },
  { name: "input-badge", title: "Input Badge", component: E10 },
  { name: "input-input-group", title: "Input Input Group", component: E11 },
  { name: "input-button-group", title: "Input Button Group", component: E12 },
  { name: "input-form", title: "Input Form", component: E13 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}

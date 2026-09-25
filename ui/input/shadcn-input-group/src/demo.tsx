import { InputGroupDemo as E0 } from "./examples/input-group-demo";
import { InputGroupInlineStart as E1 } from "./examples/input-group-inline-start";
import { InputGroupInlineEnd as E2 } from "./examples/input-group-inline-end";
import { InputGroupBlockStart as E3 } from "./examples/input-group-block-start";
import { InputGroupBlockEnd as E4 } from "./examples/input-group-block-end";
import E5 from "./examples/input-group-icon";
import E6 from "./examples/input-group-text";
import E7 from "./examples/input-group-button";
import { InputGroupKbd as E8 } from "./examples/input-group-kbd";
import E9 from "./examples/input-group-dropdown";
import E10 from "./examples/input-group-spinner";
import E11 from "./examples/input-group-textarea";
import E12 from "./examples/input-group-custom";
import { InputGroupBasic as E13 } from "./examples/input-group-basic";
import E14 from "./examples/input-group-button-group";
import { InputGroupInCard as E15 } from "./examples/input-group-in-card";
import E16 from "./examples/input-group-label";
import { InputGroupTextareaExamples as E17 } from "./examples/input-group-textarea-examples";
import E18 from "./examples/input-group-tooltip";
import { InputGroupWithAddons as E19 } from "./examples/input-group-with-addons";
import { InputGroupWithButtons as E20 } from "./examples/input-group-with-buttons";
import { InputGroupWithKbd as E21 } from "./examples/input-group-with-kbd";
import { InputGroupWithTooltip as E22 } from "./examples/input-group-with-tooltip";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "input-group-demo", title: "Input Group Demo", component: E0 },
  { name: "input-group-inline-start", title: "Input Group Inline Start", component: E1 },
  { name: "input-group-inline-end", title: "Input Group Inline End", component: E2 },
  { name: "input-group-block-start", title: "Input Group Block Start", component: E3 },
  { name: "input-group-block-end", title: "Input Group Block End", component: E4 },
  { name: "input-group-icon", title: "Input Group Icon", component: E5 },
  { name: "input-group-text", title: "Input Group Text", component: E6 },
  { name: "input-group-button", title: "Input Group Button", component: E7 },
  { name: "input-group-kbd", title: "Input Group Kbd", component: E8 },
  { name: "input-group-dropdown", title: "Input Group Dropdown", component: E9 },
  { name: "input-group-spinner", title: "Input Group Spinner", component: E10 },
  { name: "input-group-textarea", title: "Input Group Textarea", component: E11 },
  { name: "input-group-custom", title: "Input Group Custom", component: E12 },
  { name: "input-group-basic", title: "Input Group Basic · not on docs page", component: E13 },
  { name: "input-group-button-group", title: "Input Group Button Group · not on docs page", component: E14 },
  { name: "input-group-in-card", title: "Input Group In Card · not on docs page", component: E15 },
  { name: "input-group-label", title: "Input Group Label · not on docs page", component: E16 },
  { name: "input-group-textarea-examples", title: "Input Group Textarea Examples · not on docs page", component: E17 },
  { name: "input-group-tooltip", title: "Input Group Tooltip · not on docs page", component: E18 },
  { name: "input-group-with-addons", title: "Input Group With Addons · not on docs page", component: E19 },
  { name: "input-group-with-buttons", title: "Input Group With Buttons · not on docs page", component: E20 },
  { name: "input-group-with-kbd", title: "Input Group With Kbd · not on docs page", component: E21 },
  { name: "input-group-with-tooltip", title: "Input Group With Tooltip · not on docs page", component: E22 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}

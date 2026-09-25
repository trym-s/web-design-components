import E0 from "./examples/combobox-demo";
import E1 from "./examples/combobox-basic";
import { ComboboxMultiple as E2 } from "./examples/combobox-multiple";
import { ComboboxWithClear as E3 } from "./examples/combobox-clear";
import { ComboboxWithGroupsAndSeparator as E4 } from "./examples/combobox-groups";
import { ComboboxWithCustomItems as E5 } from "./examples/combobox-custom";
import { ComboboxInvalid as E6 } from "./examples/combobox-invalid";
import { ComboboxDisabled as E7 } from "./examples/combobox-disabled";
import { ComboboxAutoHighlight as E8 } from "./examples/combobox-auto-highlight";
import { ComboboxPopup as E9 } from "./examples/combobox-popup";
import { ComboxboxInputGroup as E10 } from "./examples/combobox-input-group";
import { ComboboxAutoHighlight as E11 } from "./examples/combobox-auto-highlight";
import E12 from "./examples/combobox-basic";
import { ComboboxWithClear as E13 } from "./examples/combobox-clear";
import { ComboboxWithCustomItems as E14 } from "./examples/combobox-custom";
import E15 from "./examples/combobox-demo";
import { ComboboxDisabled as E16 } from "./examples/combobox-disabled";
import { ComboboxWithGroupsAndSeparator as E17 } from "./examples/combobox-groups";
import { ComboboxInvalid as E18 } from "./examples/combobox-invalid";
import { ComboboxMultiple as E19 } from "./examples/combobox-multiple";
import { ComboboxPopup as E20 } from "./examples/combobox-popup";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "combobox-demo", title: "Combobox Demo (base-nova)", component: E0 },
  { name: "combobox-basic", title: "Combobox Basic (base-nova)", component: E1 },
  { name: "combobox-multiple", title: "Combobox Multiple (base-nova)", component: E2 },
  { name: "combobox-clear", title: "Combobox Clear (base-nova)", component: E3 },
  { name: "combobox-groups", title: "Combobox Groups (base-nova)", component: E4 },
  { name: "combobox-custom", title: "Combobox Custom (base-nova)", component: E5 },
  { name: "combobox-invalid", title: "Combobox Invalid (base-nova)", component: E6 },
  { name: "combobox-disabled", title: "Combobox Disabled (base-nova)", component: E7 },
  { name: "combobox-auto-highlight", title: "Combobox Auto Highlight (base-nova)", component: E8 },
  { name: "combobox-popup", title: "Combobox Popup (base-nova)", component: E9 },
  { name: "combobox-input-group", title: "Combobox Input Group", component: E10 },
  { name: "combobox-auto-highlight", title: "Combobox Auto Highlight · not on docs page", component: E11 },
  { name: "combobox-basic", title: "Combobox Basic · not on docs page", component: E12 },
  { name: "combobox-clear", title: "Combobox Clear · not on docs page", component: E13 },
  { name: "combobox-custom", title: "Combobox Custom · not on docs page", component: E14 },
  { name: "combobox-demo", title: "Combobox Demo · not on docs page", component: E15 },
  { name: "combobox-disabled", title: "Combobox Disabled · not on docs page", component: E16 },
  { name: "combobox-groups", title: "Combobox Groups · not on docs page", component: E17 },
  { name: "combobox-invalid", title: "Combobox Invalid · not on docs page", component: E18 },
  { name: "combobox-multiple", title: "Combobox Multiple · not on docs page", component: E19 },
  { name: "combobox-popup", title: "Combobox Popup · not on docs page", component: E20 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}

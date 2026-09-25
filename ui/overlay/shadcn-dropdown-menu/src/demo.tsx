import { DropdownMenuDemo as E0 } from "./examples/dropdown-menu-demo";
import { DropdownMenuBasic as E1 } from "./examples/dropdown-menu-basic";
import { DropdownMenuSubmenu as E2 } from "./examples/dropdown-menu-submenu";
import { DropdownMenuShortcuts as E3 } from "./examples/dropdown-menu-shortcuts";
import { DropdownMenuIcons as E4 } from "./examples/dropdown-menu-icons";
import { DropdownMenuCheckboxes as E5 } from "./examples/dropdown-menu-checkboxes";
import { DropdownMenuCheckboxesIcons as E6 } from "./examples/dropdown-menu-checkboxes-icons";
import { DropdownMenuRadioGroupDemo as E7 } from "./examples/dropdown-menu-radio-group";
import { DropdownMenuRadioIcons as E8 } from "./examples/dropdown-menu-radio-icons";
import { DropdownMenuDestructive as E9 } from "./examples/dropdown-menu-destructive";
import { DropdownMenuAvatar as E10 } from "./examples/dropdown-menu-avatar";
import { DropdownMenuComplex as E11 } from "./examples/dropdown-menu-complex";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "dropdown-menu-demo", title: "Dropdown Menu Demo", component: E0 },
  { name: "dropdown-menu-basic", title: "Dropdown Menu Basic", component: E1 },
  { name: "dropdown-menu-submenu", title: "Dropdown Menu Submenu", component: E2 },
  { name: "dropdown-menu-shortcuts", title: "Dropdown Menu Shortcuts", component: E3 },
  { name: "dropdown-menu-icons", title: "Dropdown Menu Icons", component: E4 },
  { name: "dropdown-menu-checkboxes", title: "Dropdown Menu Checkboxes", component: E5 },
  { name: "dropdown-menu-checkboxes-icons", title: "Dropdown Menu Checkboxes Icons", component: E6 },
  { name: "dropdown-menu-radio-group", title: "Dropdown Menu Radio Group", component: E7 },
  { name: "dropdown-menu-radio-icons", title: "Dropdown Menu Radio Icons", component: E8 },
  { name: "dropdown-menu-destructive", title: "Dropdown Menu Destructive", component: E9 },
  { name: "dropdown-menu-avatar", title: "Dropdown Menu Avatar", component: E10 },
  { name: "dropdown-menu-complex", title: "Dropdown Menu Complex", component: E11 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}

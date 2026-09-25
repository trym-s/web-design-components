import E0 from "./examples/menubar-demo";
import { MenubarCheckbox as E1 } from "./examples/menubar-checkbox";
import { MenubarRadio as E2 } from "./examples/menubar-radio";
import { MenubarSubmenu as E3 } from "./examples/menubar-submenu";
import { MenubarIcons as E4 } from "./examples/menubar-icons";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "menubar-demo", title: "Menubar Demo", component: E0 },
  { name: "menubar-checkbox", title: "Menubar Checkbox", component: E1 },
  { name: "menubar-radio", title: "Menubar Radio", component: E2 },
  { name: "menubar-submenu", title: "Menubar Submenu", component: E3 },
  { name: "menubar-icons", title: "Menubar Icons", component: E4 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}

import E0 from "./examples/DropdownMenuItemShowcase.tsx";
import E1 from "./examples/DropdownMenuShowcase.tsx";
import E2 from "./examples/DropdownMenuActions.tsx";
import E3 from "./examples/DropdownMenuBottomSheet.tsx";
import E4 from "./examples/DropdownMenuItemBasic.tsx";
import E5 from "./examples/DropdownMenuNoChevron.tsx";
import E6 from "./examples/DropdownMenuWithDisabledItems.tsx";
import E7 from "./examples/DropdownMenuWithSections.tsx";
import E8 from "./examples/DropdownMenuWithSubmenu.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "DropdownMenuItemShowcase", title: "Dropdown Menu Item", component: E0 },
  { name: "DropdownMenuShowcase", title: "Dropdown Menu", component: E1 },
  { name: "DropdownMenuActions", title: "DropdownMenu — Actions", component: E2 },
  { name: "DropdownMenuBottomSheet", title: "DropdownMenu — Adaptive presentation", component: E3 },
  { name: "DropdownMenuItemBasic", title: "DropdownMenuItem — Basic", component: E4 },
  { name: "DropdownMenuNoChevron", title: "DropdownMenu — Icon Trigger", component: E5 },
  { name: "DropdownMenuWithDisabledItems", title: "DropdownMenu — Disabled", component: E6 },
  { name: "DropdownMenuWithSections", title: "DropdownMenu — Sections", component: E7 },
  { name: "DropdownMenuWithSubmenu", title: "DropdownMenu — Submenu", component: E8 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}

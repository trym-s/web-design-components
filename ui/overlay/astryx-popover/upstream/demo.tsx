import E0 from "./examples/PopoverShowcase.tsx";
import E1 from "./examples/PopoverBottomSheetAlternative.tsx";
import E2 from "./examples/PopoverConfirmAction.tsx";
import E3 from "./examples/PopoverFilterPanel.tsx";
import E4 from "./examples/PopoverKeyboardShortcuts.tsx";
import E5 from "./examples/PopoverSettingsPanel.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "PopoverShowcase", title: "Popover", component: E0 },
  { name: "PopoverBottomSheetAlternative", title: "Popover — Bottom Sheet Alternative", component: E1 },
  { name: "PopoverConfirmAction", title: "Popover — Confirm Action", component: E2 },
  { name: "PopoverFilterPanel", title: "Popover — Filter Panel", component: E3 },
  { name: "PopoverKeyboardShortcuts", title: "Popover — Keyboard Shortcuts", component: E4 },
  { name: "PopoverSettingsPanel", title: "Popover — Settings Panel", component: E5 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}

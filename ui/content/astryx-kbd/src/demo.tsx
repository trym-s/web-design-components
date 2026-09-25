import E0 from "./examples/KbdShowcase.tsx";
import E1 from "./examples/KbdInlineInstructions.tsx";
import E2 from "./examples/KbdMenuShortcuts.tsx";
import E3 from "./examples/KbdModifierCombos.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "KbdShowcase", title: "Kbd", component: E0 },
  { name: "KbdInlineInstructions", title: "Kbd — Inline Instructions", component: E1 },
  { name: "KbdMenuShortcuts", title: "Kbd — Menu Shortcuts", component: E2 },
  { name: "KbdModifierCombos", title: "Kbd — Modifier Combinations", component: E3 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}

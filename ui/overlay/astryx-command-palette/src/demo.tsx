import E0 from "./examples/CommandPaletteEmptyShowcase.tsx";
import E1 from "./examples/CommandPaletteFooterShowcase.tsx";
import E2 from "./examples/CommandPaletteGroupShowcase.tsx";
import E3 from "./examples/CommandPaletteInputShowcase.tsx";
import E4 from "./examples/CommandPaletteItemShowcase.tsx";
import E5 from "./examples/CommandPaletteListShowcase.tsx";
import E6 from "./examples/CommandPaletteShowcase.tsx";
import E7 from "./examples/CommandPaletteAsyncSearch.tsx";
import E8 from "./examples/CommandPaletteAutoGrouped.tsx";
import E9 from "./examples/CommandPaletteCustomFooter.tsx";
import E10 from "./examples/CommandPaletteEmptyBasic.tsx";
import E11 from "./examples/CommandPaletteFooterBasic.tsx";
import E12 from "./examples/CommandPaletteGroupBasic.tsx";
import E13 from "./examples/CommandPaletteInputBasic.tsx";
import E14 from "./examples/CommandPaletteItemBasic.tsx";
import E15 from "./examples/CommandPaletteListBasic.tsx";
import E16 from "./examples/CommandPalettePickerMode.tsx";
import E17 from "./examples/CommandPaletteRichItems.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "CommandPaletteEmptyShowcase", title: "Command Palette Empty", component: E0 },
  { name: "CommandPaletteFooterShowcase", title: "Command Palette Footer", component: E1 },
  { name: "CommandPaletteGroupShowcase", title: "Command Palette Group", component: E2 },
  { name: "CommandPaletteInputShowcase", title: "Command Palette Input", component: E3 },
  { name: "CommandPaletteItemShowcase", title: "Command Palette Item", component: E4 },
  { name: "CommandPaletteListShowcase", title: "Command Palette List", component: E5 },
  { name: "CommandPaletteShowcase", title: "Command Palette", component: E6 },
  { name: "CommandPaletteAsyncSearch", title: "CommandPalette — Async Search", component: E7 },
  { name: "CommandPaletteAutoGrouped", title: "CommandPalette — Grouped", component: E8 },
  { name: "CommandPaletteCustomFooter", title: "CommandPalette — Custom Footer", component: E9 },
  { name: "CommandPaletteEmptyBasic", title: "CommandPaletteEmpty — Basic", component: E10 },
  { name: "CommandPaletteFooterBasic", title: "CommandPaletteFooter — Basic", component: E11 },
  { name: "CommandPaletteGroupBasic", title: "CommandPaletteGroup — Basic", component: E12 },
  { name: "CommandPaletteInputBasic", title: "CommandPaletteInput — With End Content", component: E13 },
  { name: "CommandPaletteItemBasic", title: "CommandPaletteItem — Basic", component: E14 },
  { name: "CommandPaletteListBasic", title: "CommandPaletteList — Item States", component: E15 },
  { name: "CommandPalettePickerMode", title: "CommandPalette — Picker Mode", component: E16 },
  { name: "CommandPaletteRichItems", title: "CommandPalette — Rich Items", component: E17 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}

import E0 from "./examples/MultiSelectorShowcase.tsx";
import E1 from "./examples/MultiSelectorBottomSheet.tsx";
import E2 from "./examples/MultiSelectorColumnVisibilitySelector.tsx";
import E3 from "./examples/MultiSelectorForm.tsx";
import E4 from "./examples/MultiSelectorGhostToolbar.tsx";
import E5 from "./examples/MultiSelectorSearchableMultiSelector.tsx";
import E6 from "./examples/MultiSelectorSectionedMultiSelector.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "MultiSelectorShowcase", title: "Multi Selector", component: E0 },
  { name: "MultiSelectorBottomSheet", title: "MultiSelector — Bottom Sheet", component: E1 },
  { name: "MultiSelectorColumnVisibilitySelector", title: "MultiSelector — Column Visibility", component: E2 },
  { name: "MultiSelectorForm", title: "MultiSelector — Form Composition", component: E3 },
  { name: "MultiSelectorGhostToolbar", title: "MultiSelector — Ghost Toolbar", component: E4 },
  { name: "MultiSelectorSearchableMultiSelector", title: "MultiSelector — Searchable", component: E5 },
  { name: "MultiSelectorSectionedMultiSelector", title: "MultiSelector — Sectioned Permissions", component: E6 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}

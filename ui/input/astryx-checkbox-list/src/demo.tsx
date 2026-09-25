import E0 from "./examples/CheckboxListItemShowcase.tsx";
import E1 from "./examples/CheckboxListShowcase.tsx";
import E2 from "./examples/CheckboxListItemBasic.tsx";
import E3 from "./examples/CheckboxListSelectAllPattern.tsx";
import E4 from "./examples/CheckboxListWithEndContent.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "CheckboxListItemShowcase", title: "Checkbox List Item", component: E0 },
  { name: "CheckboxListShowcase", title: "Checkbox List", component: E1 },
  { name: "CheckboxListItemBasic", title: "CheckboxListItem — Basic", component: E2 },
  { name: "CheckboxListSelectAllPattern", title: "CheckboxList — Select All With Indeterminate", component: E3 },
  { name: "CheckboxListWithEndContent", title: "CheckboxList — With End Content", component: E4 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}

import E0 from "./examples/collapsible-demo";
import { CollapsibleBasic as E1 } from "./examples/collapsible-basic";
import { CollapsibleSettings as E2 } from "./examples/collapsible-settings";
import { CollapsibleFileTree as E3 } from "./examples/collapsible-file-tree";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "collapsible-demo", title: "Collapsible Demo", component: E0 },
  { name: "collapsible-basic", title: "Collapsible Basic", component: E1 },
  { name: "collapsible-settings", title: "Collapsible Settings", component: E2 },
  { name: "collapsible-file-tree", title: "Collapsible File Tree", component: E3 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}

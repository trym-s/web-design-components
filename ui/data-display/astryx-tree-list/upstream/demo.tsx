import E0 from "./examples/TreeListShowcase.tsx";
import E1 from "./examples/TreeListFileTreeWithIcons.tsx";
import E2 from "./examples/TreeListInteractiveSettings.tsx";
import E3 from "./examples/TreeListMailboxTree.tsx";
import E4 from "./examples/TreeListNavigationTree.tsx";
import E5 from "./examples/TreeListVariants.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "TreeListShowcase", title: "Tree List", component: E0 },
  { name: "TreeListFileTreeWithIcons", title: "TreeList — File Tree With Icons", component: E1 },
  { name: "TreeListInteractiveSettings", title: "TreeList — Interactive Settings", component: E2 },
  { name: "TreeListMailboxTree", title: "TreeList — Mailbox Tree", component: E3 },
  { name: "TreeListNavigationTree", title: "TreeList — Navigation Tree", component: E4 },
  { name: "TreeListVariants", title: "Tree List — Variants", component: E5 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}

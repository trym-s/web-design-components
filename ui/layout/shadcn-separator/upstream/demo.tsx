import E0 from "./examples/separator-demo";
import { SeparatorVertical as E1 } from "./examples/separator-vertical";
import { SeparatorMenu as E2 } from "./examples/separator-menu";
import { SeparatorList as E3 } from "./examples/separator-list";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "separator-demo", title: "Separator Demo", component: E0 },
  { name: "separator-vertical", title: "Separator Vertical", component: E1 },
  { name: "separator-menu", title: "Separator Menu", component: E2 },
  { name: "separator-list", title: "Separator List", component: E3 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}

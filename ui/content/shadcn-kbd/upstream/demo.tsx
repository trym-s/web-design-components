import E0 from "./examples/kbd-demo";
import E1 from "./examples/kbd-group";
import E2 from "./examples/kbd-button";
import E3 from "./examples/kbd-tooltip";
import E4 from "./examples/kbd-input-group";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "kbd-demo", title: "Kbd Demo", component: E0 },
  { name: "kbd-group", title: "Kbd Group", component: E1 },
  { name: "kbd-button", title: "Kbd Button", component: E2 },
  { name: "kbd-tooltip", title: "Kbd Tooltip", component: E3 },
  { name: "kbd-input-group", title: "Kbd Input Group", component: E4 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}

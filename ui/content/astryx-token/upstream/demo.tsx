import E0 from "./examples/TokenShowcase.tsx";
import E1 from "./examples/TokenClickable.tsx";
import E2 from "./examples/TokenColors.tsx";
import E3 from "./examples/TokenEndContent.tsx";
import E4 from "./examples/TokenIcon.tsx";
import E5 from "./examples/TokenRemovable.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "TokenShowcase", title: "Token", component: E0 },
  { name: "TokenClickable", title: "Token — Clickable", component: E1 },
  { name: "TokenColors", title: "Token — Colors", component: E2 },
  { name: "TokenEndContent", title: "Token — End Content", component: E3 },
  { name: "TokenIcon", title: "Token — Icon", component: E4 },
  { name: "TokenRemovable", title: "Token — Removable", component: E5 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}

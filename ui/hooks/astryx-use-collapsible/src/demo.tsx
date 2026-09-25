import E0 from "./examples/CollapsibleHookUsage.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "CollapsibleHookUsage", title: "useCollapsible — Custom Disclosure", component: E0 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}

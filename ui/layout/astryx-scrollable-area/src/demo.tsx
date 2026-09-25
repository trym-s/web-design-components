import { ScrollableArea } from "@astryxdesign/core/ScrollableArea";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const Component = ScrollableArea as any;
const examples = [{ name: "playground", title: "Playground defaults", component: () => <Component {...{"axis":"block","label":"Scrollable example","children":"Add enough content to exceed a constrained viewport."}} /> }];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}

import { Indicator } from "@astryxdesign/core/Indicator";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const Component = Indicator as any;
const examples = [{ name: "playground", title: "Playground defaults", component: () => <Component {...{}} /> }];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}

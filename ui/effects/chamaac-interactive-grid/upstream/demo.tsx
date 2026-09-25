import Example from "./examples/interactive-grid-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "interactive-grid", title: "Interactive Grid Background", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}

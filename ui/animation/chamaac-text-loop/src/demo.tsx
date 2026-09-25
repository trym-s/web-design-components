import Example from "./examples/text-loop-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "text-loop", title: "Text Loop", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}

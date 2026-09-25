import Example from "./examples/dancing-letters-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "dancing-letters", title: "Dancing Letters", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}

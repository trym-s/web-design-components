import Example from "./examples/nebula-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "nebula", title: "Nebula", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}

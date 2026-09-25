import Example from "./examples/deform-tunnel-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "deform-tunnel", title: "Deform Tunnel", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}

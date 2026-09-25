import Example from "./examples/orbiting-icons-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "orbiting-icons", title: "Orbiting Icons", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}

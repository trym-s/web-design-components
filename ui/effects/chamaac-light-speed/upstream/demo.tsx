import Example from "./examples/light-speed-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "light-speed", title: "Light Speed", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}

import Example from "./examples/dock-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "dock", title: "Dock", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}

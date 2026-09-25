import Example from "./examples/waves-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "waves", title: "Waves", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}

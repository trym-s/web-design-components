import Example from "./examples/glowing-border-button-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "glowing-border-button", title: "Glowing Border Button", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}

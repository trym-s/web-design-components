import Example from "./examples/ai-input-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "ai-input", title: "AI Input", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}

import Example from "./examples/how-it-works-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "how-it-works", title: "How It Works", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}

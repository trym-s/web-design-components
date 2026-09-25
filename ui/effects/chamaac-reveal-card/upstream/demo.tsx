import Example from "./examples/reveal-card-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "reveal-card", title: "Reveal Card", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}

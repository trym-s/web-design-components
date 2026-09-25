import Example from "./examples/electric-mist-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "electric-mist", title: "Electric Mist", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}

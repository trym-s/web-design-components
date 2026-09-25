import Example from "./examples/neo-brutalist-button-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "neo-brutalist-button", title: "Neo Brutalist Button", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}

import Example from "./examples/stats-cards-demo";
import { ChamaacFrame } from "../../../_sources/chamaac/frame";

const examples = [{ name: "stats-cards", title: "Stats Cards", component: Example }];

export default function Demo() {
  return <ChamaacFrame examples={examples} />;
}

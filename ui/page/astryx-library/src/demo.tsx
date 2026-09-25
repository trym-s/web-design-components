import Page from "./page";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [{ name: "page", title: "Card Grid", component: Page }];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}

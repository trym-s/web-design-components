import { chocolateTheme } from "@astryxdesign/theme-chocolate/built";
import Page from "../../../page/astryx-theme-showcase/upstream/page";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [{ name: "theme", title: "Chocolate", component: Page }];

export default function Demo() {
  return <AstryxFrame examples={examples} theme={chocolateTheme} />;
}

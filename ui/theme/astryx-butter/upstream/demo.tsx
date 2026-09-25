import { butterTheme } from "@astryxdesign/theme-butter/built";
import Page from "../../../page/astryx-theme-showcase/upstream/page";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [{ name: "theme", title: "Butter", component: Page }];

export default function Demo() {
  return <AstryxFrame examples={examples} theme={butterTheme} />;
}

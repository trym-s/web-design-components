import { stoneTheme } from "@astryxdesign/theme-stone/built";
import Page from "../../../page/astryx-theme-showcase/upstream/page";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [{ name: "theme", title: "Stone", component: Page }];

export default function Demo() {
  return <AstryxFrame examples={examples} theme={stoneTheme} />;
}

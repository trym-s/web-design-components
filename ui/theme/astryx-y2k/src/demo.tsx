import { y2kTheme } from "@astryxdesign/theme-y2k/built";
import Page from "../../../page/astryx-theme-showcase/src/page";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [{ name: "theme", title: "Y2K", component: Page }];

export default function Demo() {
  return <AstryxFrame examples={examples} theme={y2kTheme} />;
}

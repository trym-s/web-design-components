import { neutralTheme } from "@astryxdesign/theme-neutral/built";
import Page from "../../../page/astryx-theme-showcase/src/page";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [{ name: "theme", title: "Neutral", component: Page }];

export default function Demo() {
  return <AstryxFrame examples={examples} theme={neutralTheme} />;
}

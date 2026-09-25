import { matchaTheme } from "@astryxdesign/theme-matcha/built";
import Page from "../../../page/astryx-theme-showcase/src/page";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [{ name: "theme", title: "Matcha", component: Page }];

export default function Demo() {
  return <AstryxFrame examples={examples} theme={matchaTheme} />;
}

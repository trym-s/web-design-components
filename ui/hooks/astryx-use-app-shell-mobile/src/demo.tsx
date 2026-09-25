import E0 from "./examples/AppShellMobileHookUsage.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "AppShellMobileHookUsage", title: "useAppShellMobile — Custom Mobile Trigger", component: E0 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}

import E0 from "./examples/AppShellShowcase.tsx";
import E1 from "./examples/AppShellContentOnly.tsx";
import E2 from "./examples/AppShellSideNavOnly.tsx";
import E3 from "./examples/AppShellTopNavOnly.tsx";
import E4 from "./examples/AppShellTopNavWithSideNav.tsx";
import E5 from "./examples/AppShellWithBanner.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "AppShellShowcase", title: "App Shell", component: E0 },
  { name: "AppShellContentOnly", title: "AppShell — Content Only", component: E1 },
  { name: "AppShellSideNavOnly", title: "AppShell — Side Nav Only", component: E2 },
  { name: "AppShellTopNavOnly", title: "AppShell — Top Nav Only", component: E3 },
  { name: "AppShellTopNavWithSideNav", title: "AppShell — Top Nav with Side Nav", component: E4 },
  { name: "AppShellWithBanner", title: "AppShell — With Banner", component: E5 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}

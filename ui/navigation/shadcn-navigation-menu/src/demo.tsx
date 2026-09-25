import E0 from "./examples/navigation-menu-demo";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "navigation-menu-demo", title: "Navigation Menu Demo", component: E0 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}

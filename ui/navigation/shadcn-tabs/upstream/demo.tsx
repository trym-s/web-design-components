import { TabsDemo as E0 } from "./examples/tabs-demo";
import { TabsLine as E1 } from "./examples/tabs-line";
import { TabsVertical as E2 } from "./examples/tabs-vertical";
import { TabsDisabled as E3 } from "./examples/tabs-disabled";
import { TabsIcons as E4 } from "./examples/tabs-icons";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "tabs-demo", title: "Tabs Demo", component: E0 },
  { name: "tabs-line", title: "Tabs Line", component: E1 },
  { name: "tabs-vertical", title: "Tabs Vertical", component: E2 },
  { name: "tabs-disabled", title: "Tabs Disabled", component: E3 },
  { name: "tabs-icons", title: "Tabs Icons", component: E4 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}

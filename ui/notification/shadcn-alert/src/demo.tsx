import E0 from "./examples/alert-demo";
import E1 from "./examples/alert-basic";
import E2 from "./examples/alert-destructive";
import E3 from "./examples/alert-action";
import E4 from "./examples/alert-colors";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "alert-demo", title: "Alert Demo", component: E0 },
  { name: "alert-basic", title: "Alert Basic", component: E1 },
  { name: "alert-destructive", title: "Alert Destructive", component: E2 },
  { name: "alert-action", title: "Alert Action", component: E3 },
  { name: "alert-colors", title: "Alert Colors", component: E4 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}

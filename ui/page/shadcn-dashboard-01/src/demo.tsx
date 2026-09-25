import E0 from "./page";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "dashboard-01", title: "Dashboard 01", component: E0 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} page />;
}

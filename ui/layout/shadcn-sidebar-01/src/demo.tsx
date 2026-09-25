import E0 from "./page";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "sidebar-01", title: "Sidebar 01", component: E0 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} page />;
}

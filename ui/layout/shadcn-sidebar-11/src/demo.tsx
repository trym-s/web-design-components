import E0 from "./page";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "sidebar-11", title: "Sidebar 11", component: E0 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} page />;
}

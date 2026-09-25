import E0 from "./page";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "sidebar-08", title: "Sidebar 08", component: E0 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} page />;
}

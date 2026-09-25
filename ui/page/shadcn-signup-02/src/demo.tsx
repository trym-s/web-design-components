import E0 from "./page";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "signup-02", title: "Signup 02", component: E0 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} page />;
}

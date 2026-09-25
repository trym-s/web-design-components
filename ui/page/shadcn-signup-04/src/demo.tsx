import E0 from "./page";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "signup-04", title: "Signup 04", component: E0 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} page />;
}

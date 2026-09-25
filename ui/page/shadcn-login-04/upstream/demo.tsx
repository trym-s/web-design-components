import E0 from "./page";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "login-04", title: "Login 04", component: E0 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} page />;
}

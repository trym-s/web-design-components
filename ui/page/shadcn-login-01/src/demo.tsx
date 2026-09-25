import E0 from "./page";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "login-01", title: "Login 01", component: E0 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} page />;
}

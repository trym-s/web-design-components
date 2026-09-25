import E0 from "./page";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "login-05", title: "Login 05", component: E0 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} page />;
}

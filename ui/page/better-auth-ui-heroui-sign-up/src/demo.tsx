import { SignUpDemo as E0 } from "./examples/sign-up";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-heroui";

const examples = [{ name: "sign-up", title: "SignUp", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

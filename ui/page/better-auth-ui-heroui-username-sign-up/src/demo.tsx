import { SignUpUsernameDemo as E0 } from "./examples/sign-up";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-heroui";

const examples = [{ name: "username-sign-up", title: "Username", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

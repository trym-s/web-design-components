import { SignInUsernameDemo as E0 } from "./examples/sign-in";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-heroui";

const examples = [{ name: "username-sign-in", title: "Username", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

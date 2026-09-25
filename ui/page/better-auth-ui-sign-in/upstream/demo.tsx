import { SignInDemo as E0 } from "./examples/sign-in";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-shadcn";

const examples = [{ name: "sign-in", title: "SignIn", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

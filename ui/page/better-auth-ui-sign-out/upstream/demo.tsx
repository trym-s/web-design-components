import { SignOutDemo as E0 } from "./examples/sign-out";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-shadcn";

const examples = [{ name: "sign-out", title: "SignOut", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

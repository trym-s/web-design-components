import { UserButtonDemo as E0 } from "./examples/user-button";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-shadcn";

const examples = [{ name: "user-button", title: "UserButton", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

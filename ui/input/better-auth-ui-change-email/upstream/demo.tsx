import { ChangeEmailDemo as E0 } from "./examples/change-email";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-shadcn";

const examples = [{ name: "change-email", title: "ChangeEmail", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

import { VerifyEmailDemo as E0 } from "./examples/verify-email";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-shadcn";

const examples = [{ name: "verify-email", title: "VerifyEmail", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

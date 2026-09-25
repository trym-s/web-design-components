import { ResetPasswordDemo as E0 } from "./examples/reset-password";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-shadcn";

const examples = [{ name: "reset-password", title: "ResetPassword", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

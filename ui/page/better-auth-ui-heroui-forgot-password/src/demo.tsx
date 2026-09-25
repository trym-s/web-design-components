import { ForgotPasswordDemo as E0 } from "./examples/forgot-password";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-heroui";

const examples = [{ name: "forgot-password", title: "ForgotPassword", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

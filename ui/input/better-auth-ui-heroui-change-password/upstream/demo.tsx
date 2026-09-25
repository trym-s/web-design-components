import { ChangePasswordDemo as E0 } from "./examples/change-password";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-heroui";

const examples = [{ name: "change-password", title: "ChangePassword", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

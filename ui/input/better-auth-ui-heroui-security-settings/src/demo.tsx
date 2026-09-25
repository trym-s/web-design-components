import { SecuritySettingsDemo as E0 } from "./examples/security-settings";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-heroui";

const examples = [{ name: "security-settings", title: "SecuritySettings", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

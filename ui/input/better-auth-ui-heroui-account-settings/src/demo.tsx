import { AccountSettingsDemo as E0 } from "./examples/account-settings";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-heroui";

const examples = [{ name: "account-settings", title: "AccountSettings", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

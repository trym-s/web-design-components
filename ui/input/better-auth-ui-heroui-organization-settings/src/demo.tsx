import { OrganizationSettingsDemo as E0 } from "./examples/organization-settings";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-heroui";

const examples = [{ name: "organization-settings", title: "Organization", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

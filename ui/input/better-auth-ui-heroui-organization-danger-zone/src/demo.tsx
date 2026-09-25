import { OrganizationDangerZoneDemo as E0 } from "./examples/organization-danger-zone";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-heroui";

const examples = [{ name: "organization-danger-zone", title: "Organization", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

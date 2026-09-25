import { OrganizationMembersDemo as E0 } from "./examples/organization-members";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-heroui";

const examples = [{ name: "organization-members", title: "Organization", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

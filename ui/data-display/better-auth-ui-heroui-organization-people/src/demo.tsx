import { OrganizationPeopleDemo as E0 } from "./examples/organization-people";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-heroui";

const examples = [{ name: "organization-people", title: "Organization", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

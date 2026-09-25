import { OrganizationSwitcherDemo as E0 } from "./examples/organization-switcher";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-shadcn";

const examples = [{ name: "organization-switcher", title: "Organization", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

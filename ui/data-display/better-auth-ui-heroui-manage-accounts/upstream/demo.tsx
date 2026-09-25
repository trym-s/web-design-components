import { ManageAccountsDemo as E0 } from "./examples/manage-accounts";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-heroui";

const examples = [{ name: "manage-accounts", title: "Multi Session", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

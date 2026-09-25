import { LinkedAccountsDemo as E0 } from "./examples/linked-accounts";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-heroui";

const examples = [{ name: "linked-accounts", title: "LinkedAccounts", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

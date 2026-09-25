import { UserButtonLinksDemo as E0 } from "./examples/user-button-links";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-heroui";

const examples = [{ name: "user-button-links", title: "UserButton", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

import { MagicLinkDemo as E0 } from "./examples/magic-link";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-shadcn";

const examples = [{ name: "magic-link", title: "Magic Link", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

import { AuthDemo as E0 } from "./examples/auth";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-shadcn";

const examples = [{ name: "auth", title: "Auth", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

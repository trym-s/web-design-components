import { UserProfileDemo as E0 } from "./examples/user-profile";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-shadcn";

const examples = [{ name: "user-profile", title: "UserProfile", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

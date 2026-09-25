import { UserAvatarDemo as E0 } from "./examples/user-avatar";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-shadcn";

const examples = [{ name: "user-avatar", title: "UserAvatar", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

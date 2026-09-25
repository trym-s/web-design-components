import { UserInvitationsDemo as E0 } from "./examples/user-invitations";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-shadcn";

const examples = [{ name: "user-invitations", title: "Organization", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

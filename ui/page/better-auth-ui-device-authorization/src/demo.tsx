import { DeviceAuthorizationDemo as E0 } from "./examples/device-authorization";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-shadcn";

const examples = [{ name: "device-authorization", title: "Device Authorization", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

import { AppearanceDemo as E0 } from "./examples/appearance";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-shadcn";

const examples = [{ name: "theme-appearance", title: "Theme", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}

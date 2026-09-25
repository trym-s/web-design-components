import raw from "../static/email-changed-email.html?raw";
import img0 from "../../../_sources/better-auth-ui/public/favicon-96x96.png";
import img1 from "../../../_sources/better-auth-ui/public/favicon-96x96-inverted.png";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-shadcn";

// `examples/email-changed-email.tsx` renders this template with @react-email/render; the importer ran it.
const html = raw.replaceAll("../../../_sources/better-auth-ui/public/favicon-96x96.png", img0).replaceAll("../../../_sources/better-auth-ui/public/favicon-96x96-inverted.png", img1);
const examples = [{ name: "email-changed-email", title: "EmailChangedEmail", component: () => <iframe title="EmailChangedEmail" srcDoc={html} className="h-[740px] w-full max-w-3xl rounded-md border" /> }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} bare />;
}

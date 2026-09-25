import OrbitingIcons from "./orbiting-icons";
// Brand marks from the Chamaac repository's public/icons, for illustration only.
import gmail from "./demo-assets/gmail.svg";
import linear from "./demo-assets/linear.svg";
import slack from "./demo-assets/slack.svg";
import whatsapp from "./demo-assets/whatsapp.svg";
import x from "./demo-assets/x.svg";

export default function Demo() {
  return (
    <div className="flex h-[500px] w-full items-center justify-center bg-background">
      <OrbitingIcons icons={[gmail, linear, slack, whatsapp, x]} />
    </div>
  );
}

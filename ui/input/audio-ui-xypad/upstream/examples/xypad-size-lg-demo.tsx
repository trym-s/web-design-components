import { XYPad } from "../../../../_sources/audio-ui/registry-audio/bases/base/audio/elements/xypad";

export default function XYPadSizeLgDemo() {
  return (
    <XYPad
      className="aspect-square"
      defaultValue={{ x: 40, y: 65 }}
      size="lg"
    />
  );
}

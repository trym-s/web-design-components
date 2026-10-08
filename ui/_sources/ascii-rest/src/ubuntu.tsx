import * as piece from "../../../icons/ascii-rest/ubuntu/src/ubuntu";
import Frame from "../frame";
export default function Icon({ size = 64, animation }: { size?: number; animation?: string }) { return <Frame piece={piece} size={size} mono={animation === "mono"} />; }

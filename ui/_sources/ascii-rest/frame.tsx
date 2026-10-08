/** Bank harness; the captured renderer and piece control their own motion. */
import { Ascii } from "./src/react";
import type { Piece } from "./src/types";
import type { CSSProperties } from "react";
import "./frame.css";
export default function Frame({ piece, size, mono = false }: { piece: Piece; size?: number; mono?: boolean }) {
  return <div className="ascii-rest-frame" data-bank-frame data-bank-example="default" style={{ "--cols": piece.meta.cols, background: piece.meta.ground ?? "#131518", ...(size ? { width: size } : {}) } as CSSProperties}>
    <Ascii piece={piece} mono={mono} />
  </div>;
}

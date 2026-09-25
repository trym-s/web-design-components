import { useEffect, useState } from "react";
import { CodeBlock, type CodeToken } from "./code-block";

const LINE_MS = 240;
const HOLD_MS = 3200;

const LINES: CodeToken[][] = [
  [{ text: "export async function ", kind: "keyword" }, { text: "churnBatch", kind: "function" }, { text: "() {", kind: "punctuation" }],
  [{ text: "  const ", kind: "keyword" }, { text: "flavor = " }, { text: "await ", kind: "keyword" }, { text: "getFlavor", kind: "function" }, { text: "(", kind: "punctuation" }, { text: "\"pistachio\"", kind: "string" }, { text: ");", kind: "punctuation" }],
  [{ text: "  const ", kind: "keyword" }, { text: "base = " }, { text: "await ", kind: "keyword" }, { text: "dairy." }, { text: "fetch", kind: "function" }, { text: "({ flavor });", kind: "punctuation" }],
  [{ text: "  await ", kind: "keyword" }, { text: "freezer." }, { text: "store", kind: "function" }, { text: "(base, { temp: ", kind: "punctuation" }, { text: "\"-14C\"", kind: "string" }, { text: " });", kind: "punctuation" }],
  [{ text: "  return ", kind: "keyword" }, { text: "base.gallons;" }],
  [{ text: "}", kind: "punctuation" }],
];

/** Simulated agent stream: one line every 240 ms, hold 3.2 s on the full block, restart. */
export default function Demo() {
  const [count, setCount] = useState(0);
  const done = count >= LINES.length;

  useEffect(() => {
    const t = setTimeout(
      () => setCount((c) => (c >= LINES.length ? 0 : c + 1)),
      count === 0 ? 400 : done ? HOLD_MS : LINE_MS,
    );
    return () => clearTimeout(t);
  }, [count, done]);

  return <CodeBlock filename="churn.ts" language="TypeScript" lines={LINES} visibleLines={count} streaming={!done} />;
}

import { useEffect, useState } from "react";
import { StreamingText, type StreamSource, type StreamToken } from "./streaming-text";

/* Simulated stream: one token every 55 ms, a 3.4 s hold on the finished answer, then a restart.
 * The demo opens on the finished answer (hold first), then loops. */
const WORD_MS = 55;
const HOLD_MS = 3400;

const words = (text: string): StreamToken[] => text.split(" ").map((word) => ({ text: word }));
const TOKENS: StreamToken[] = [
  ...words("Pistachio is your fastest-growing flavor — sales are up 23% this month and margins beat vanilla by 8 points."),
  { cite: 0 },
  ...words("Stone-fruit flavors are trending in the same range."),
];

/* Token-coloured placeholder marks instead of the upstream's hex-coloured data-URI logos. */
const mark = (fill: string, glyph: string) => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <rect width="64" height="64" rx="16" className={fill} fill="currentColor" />
    <path d={glyph} fill="none" className="stroke-white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SOURCES: StreamSource[] = [
  { name: "Scoop Data", domain: "scoopdata.io", href: "https://scoopdata.io/", icon: mark("text-chart-2", "M20 36c0 7 5.4 12 12 12s12-5 12-12Z M24 24c4-7 13-7 17 0") },
  { name: "Trends Index", domain: "trends.google.com", href: "https://trends.google.com/trends/", icon: mark("text-chart-3", "M15 43 27 31l8 7 14-18") },
  { name: "Market Basket", domain: "marketbasket.io", href: "https://marketbasket.io/", icon: mark("text-chart-1", "M21 45V27M32 45V18M43 45V32") },
];

export default function Demo() {
  const [count, setCount] = useState(TOKENS.length);
  const done = count >= TOKENS.length;

  useEffect(() => {
    const t = setTimeout(() => setCount((c) => (c >= TOKENS.length ? 0 : c + 1)), done ? HOLD_MS : WORD_MS);
    return () => clearTimeout(t);
  }, [count, done]);

  return (
    <StreamingText
      tokens={TOKENS.slice(0, count)}
      done={done}
      sources={SOURCES}
      sourcesLabel="10 sources"
      followUps={["Which flavors sell best in winter", "Compare gelato and soft serve margins"]}
      onFollowUp={(text) => console.log("follow-up", text)}
    />
  );
}

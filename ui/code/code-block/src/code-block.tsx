/**
 * Code block — Beautiful UI's streaming code card (reference.tsx), styled with shadcn tokens.
 * Syntax colours: keyword → primary, string → --success, number → --warning, function → foreground,
 * punctuation/line numbers → muted-foreground.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "./lib/utils";
import "./code-block.css";

export type CodeTokenKind = "keyword" | "string" | "number" | "function" | "punctuation";
export type CodeToken = { text: string; kind?: CodeTokenKind };

const TOKEN_CLASS: Record<CodeTokenKind, string> = {
  keyword: "text-primary",
  string: "text-(--success)",
  number: "text-(--warning)",
  function: "text-foreground",
  punctuation: "text-muted-foreground",
};

export type CodeBlockProps = {
  filename: string;
  language?: string;
  /** Tokenised lines. */
  lines: CodeToken[][];
  /** How many lines are shown (streaming); defaults to all. */
  visibleLines?: number;
  /** Shows the caret after the last visible line while it is still streaming. */
  streaming?: boolean;
  /** Text written to the clipboard; defaults to the joined tokens. */
  copyText?: string;
  onCopy?: (text: string) => void;
  className?: string;
};

export function CodeBlock({
  filename,
  language,
  lines,
  visibleLines = lines.length,
  streaming = false,
  copyText,
  onCopy,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(() => {
    const text = copyText ?? lines.map((l) => l.map((t) => t.text).join("")).join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      onCopy?.(text);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    });
  }, [copyText, lines, onCopy]);

  const shown = lines.slice(0, visibleLines);

  return (
    <div
      className={cn(
        "w-full max-w-95 overflow-hidden rounded-lg bg-card shadow-xs ring-1 ring-border [--success:oklch(0.603_0.155_150.9)] [--warning:oklch(0.689_0.179_49.9)] dark:[--success:oklch(0.705_0.154_153.8)] dark:[--warning:oklch(0.746_0.156_55.6)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
        <span className="flex items-baseline gap-2">
          <span className="font-mono text-[12px] font-medium text-foreground">{filename}</span>
          {language && <span className="text-[11.5px] text-muted-foreground">{language}</span>}
        </span>
        <button
          type="button"
          aria-label="Copy code"
          onClick={copy}
          className={cn(
            "flex h-6 items-center gap-1 rounded-sm px-1.5 text-[11.5px] font-medium transition-colors duration-100 hover:bg-accent",
            copied ? "text-(--success)" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {copied ? (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="12" height="12" rx="2.5" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre className="min-h-[137px] bg-muted px-3 py-2.5 font-mono text-[11.5px] leading-[1.7]">
        {shown.map((line, i) => (
          <div key={i} className="flex" style={{ animation: "fade-up 250ms cubic-bezier(0.23,1,0.32,1) both" }}>
            <span className="w-5 shrink-0 select-none text-right text-[10.5px] leading-[1.86] text-muted-foreground/60">
              {i + 1}
            </span>
            <span className="whitespace-pre pl-2.5">
              {line.map((tok, j) => (
                <span key={j} className={tok.kind ? TOKEN_CLASS[tok.kind] : "text-muted-foreground"}>
                  {tok.text}
                </span>
              ))}
              {streaming && i === shown.length - 1 && (
                <span className="ml-0.5 inline-block h-3 w-[3px] translate-y-0.5 rounded-full bg-primary" />
              )}
            </span>
          </div>
        ))}
      </pre>
    </div>
  );
}

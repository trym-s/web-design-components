/**
 * Shared state for live previews: which cards are playing (capped, oldest wins
 * eviction) and what each iframe reported back about its mount.
 */
import { useEffect, useState } from "react";
import { VANILLA_PAGE } from "./overrides";

export const MAX_LIVE = 4;

type Reported = { status: "ok" | "broken"; reason?: string };

const reported = new Map<string, Reported>();
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

addEventListener("message", (e: MessageEvent) => {
  const d = e.data;
  if (d?.type !== "preview-status" || !d.id) return;
  reported.set(d.id, { status: d.status, reason: d.reason });
  notify();
});

export function useReported(id: string): Reported | undefined {
  const [, bump] = useState(0);
  useEffect(() => {
    const l = () => bump((n) => n + 1);
    listeners.add(l);
    return () => void listeners.delete(l);
  }, []);
  return reported.get(id);
}

export function previewUrl(id: string, variant?: string) {
  return VANILLA_PAGE(id) ?? `/dashboard/preview.html?id=${encodeURIComponent(id)}${variant ? `&variant=${encodeURIComponent(variant)}` : ""}`;
}

/** Play queue with a hard cap so a wall of WebGL cards cannot all run at once. */
export function useLiveQueue() {
  const [live, setLive] = useState<string[]>([]);
  const play = (id: string) =>
    setLive((prev) => (prev.includes(id) ? prev : [...prev, id].slice(-MAX_LIVE)));
  const stop = (id: string) => setLive((prev) => prev.filter((x) => x !== id));
  return { live, play, stop };
}

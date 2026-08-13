/**
 * Registry — discovers every reference in `ui/` at load time.
 *
 * Nothing here is hand-maintained: the component list, docs, previews and source
 * panes are all derived from globs over the untouched bank. The only curated bit
 * lives in `overrides.ts`, for facts a path cannot tell us (CSS profile, kind).
 */
import { OVERRIDES, type CssProfile, type Kind, type Status } from "./overrides";
import catalog from "../../catalog/catalog.json";

export type SourceName = "beautiful-ui" | "transitions.dev" | "arlan-vault" | "interior.dev" | "liquid-gooey" | "standalone";

export interface Entry {
  id: string; // "ai/chat/chat-composer"
  dir: string; // "/ui/ai/chat/chat-composer"
  category: string; // "ai"
  name: string; // "chat-composer"
  title: string;
  source: SourceName;
  useWhen: string;
  nature?: string;
  medium?: string;
  entryPoint?: string;
  readme?: string;
  sourceDoc?: string;
  prompt?: string;
  preview?: string;
  files: { path: string; code: string }[];
  load?: () => Promise<any>;
  cssProfile: CssProfile;
  kind: Kind;
  status: Status;
  statusReason?: string;
  evidence: "verified" | "review" | "limited" | "blocked";
  roles: ("structure" | "behavior" | "visual")[];
}

const refLoaders = import.meta.glob("/ui/**/reference.tsx");
const refRaw = import.meta.glob("/ui/**/reference.{tsx,md}", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const docsRaw = import.meta.glob("/ui/**/{README,SOURCE,PROMPT}.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const previews = import.meta.glob("/ui/**/preview.png", { query: "?url", import: "default", eager: true }) as Record<string, string>;
const srcRaw = import.meta.glob("/ui/**/{src,registry}/**/*.{ts,tsx,js,jsx,css,html,md}", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

const dirOf = (p: string) => p.slice(0, p.lastIndexOf("/"));

function titleize(name: string) {
  return name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function useWhenOf(raw: string | undefined, dir: string): string {
  if (!raw) return "";
  // reference.tsx: leading block comment. reference.md: "# Use when" section.
  const block = raw.match(/\/\*\s*Use when:\s*([\s\S]*?)\*\//);
  if (block) return block[1].replace(/^\s*\*\s?/gm, "").replace(/\s+/g, " ").trim();
  const md = raw.match(/#\s*Use when\s*\n+([\s\S]*?)(?:\n\n|$)/i);
  if (md) return md[1].replace(/\s+/g, " ").trim();
  return "";
}

function readClassification(readme: string | undefined) {
  if (!readme) return {};
  const grab = (label: string) => {
    const m = readme.match(new RegExp(`^- ${label}: (.*)$`, "m"));
    return m ? m[1].replace(/`/g, "").trim() : undefined;
  };
  const cat = grab("Category");
  return {
    nature: cat?.includes("—") ? cat.split("—")[1].trim() : undefined,
    medium: grab("Medium"),
    entryPoint: grab("Entry point"),
  };
}

function sourceOf(dir: string, has: (f: string) => boolean): SourceName {
  if (dir.startsWith("/ui/animation/transitions/")) return "transitions.dev";
  if (has("PROMPT.md")) return "arlan-vault";
  if (docsRaw[`${dir}/SOURCE.md`]?.includes("www.interior.dev")) return "interior.dev";
  if (docsRaw[`${dir}/SOURCE.md`]?.includes("gooey.jakubantalik.com")) return "liquid-gooey";
  if (has("SOURCE.md") || has("README.md")) return "standalone";
  return "beautiful-ui";
}

function build(): Entry[] {
  const dirs = new Set<string>();
  for (const p of Object.keys(refRaw)) dirs.add(dirOf(p));

  const entries: Entry[] = [];
  for (const dir of dirs) {
    const has = (f: string) => `${dir}/${f}` in docsRaw || `${dir}/${f}` in previews;
    const readme = docsRaw[`${dir}/README.md`];
    const raw = refRaw[`${dir}/reference.tsx`] ?? refRaw[`${dir}/reference.md`];
    const rel = dir.replace(/^\/ui\//, "");
    const seg = rel.split("/");
    const id = rel;
    const name = seg[seg.length - 1];
    const src = sourceOf(dir, has);
    const ov = OVERRIDES[id] ?? {};
    const metadata = catalog.entries.find((entry) => entry.id === id);
    if (!metadata) throw new Error(`Catalog metadata missing for ${id}`);

    const files = Object.keys(srcRaw)
      .filter((p) => p.startsWith(dir + "/"))
      .sort()
      .map((p) => ({ path: p.slice(dir.length + 1), code: srcRaw[p] }));
    if (refRaw[`${dir}/reference.tsx`]) {
      files.unshift({ path: "reference.tsx", code: refRaw[`${dir}/reference.tsx`] });
    }

    entries.push({
      id,
      dir,
      category: seg[0],
      name,
      title: titleize(name),
      source: src,
      useWhen: useWhenOf(raw, dir),
      ...readClassification(readme),
      readme,
      sourceDoc: docsRaw[`${dir}/SOURCE.md`],
      prompt: docsRaw[`${dir}/PROMPT.md`],
      preview: previews[`${dir}/preview.png`],
      files,
      load: refLoaders[`${dir}/reference.tsx`],
      cssProfile: ov.cssProfile ?? (src === "beautiful-ui" ? "beautiful-ui" : "none"),
      kind: ov.kind ?? "react",
      status: metadata.status as Status,
      statusReason: metadata.statusReason,
      evidence: metadata.evidence as Entry["evidence"],
      roles: metadata.roles as Entry["roles"],
    });
  }
  return entries.sort((a, b) => a.id.localeCompare(b.id));
}

export const ENTRIES = build();
export const BY_ID = new Map(ENTRIES.map((e) => [e.id, e]));

export const CATEGORIES = [...new Set(ENTRIES.map((e) => e.category))].sort();
export const SOURCES = [...new Set(ENTRIES.map((e) => e.source))].sort();
export const NATURES = [...new Set(ENTRIES.map((e) => e.nature).filter(Boolean))].sort() as string[];

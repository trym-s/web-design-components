/**
 * Registry — discovers every reference in `ui/` at load time.
 *
 * Nothing here is hand-maintained: the component list, docs, previews and source
 * panes are all derived from globs over the untouched bank. The only curated bit
 * lives in `overrides.ts`, for facts a path cannot tell us (CSS profile, kind).
 */
import { OVERRIDES, type CssProfile, type Kind, type Status } from "./overrides";
import catalog from "../../catalog/catalog.json";

export type SourceName = string;

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
  files: { path: string; code?: string; load?: () => Promise<string> }[];
  load?: () => Promise<any>;
  cssProfile: CssProfile;
  kind: Kind;
  status: Status;
  statusReason?: string;
  evidence: "verified" | "review" | "limited" | "blocked";
  roles: ("structure" | "behavior" | "visual")[];
  framework?: string;
  availability?: "public" | "personal-cache";
  variants?: string[];
  installation?: {
    method: "shadcn" | "source";
    command?: string;
    registryUrl?: string;
    fallbackPath?: string;
  };
  bundled: boolean;
}

type CatalogEntry = (typeof catalog.entries)[number] & { files?: string[] };
const RAW_ROOT = "https://raw.githubusercontent.com/trym-s/web-design-components/main/";
const raw = (path: string) => `${RAW_ROOT}${path}`;

const refLoaders = import.meta.glob("/ui/**/reference.tsx");
// The icon sets are 97% of the bank and their reference/README files are
// three-line boilerplate the catalog already carries. Loading them eagerly
// costs ~12k module requests before first paint, so the eager text globs stop
// at the icon boundary and icon entries are built from catalog metadata below.
const refRaw = import.meta.glob(["/ui/**/reference.{tsx,md}", "!/ui/icons/**"], { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const docsRaw = import.meta.glob(["/ui/**/{README,SOURCE,PROMPT}.md", "!/ui/icons/**"], { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const previews = import.meta.glob("/ui/**/preview.png", { query: "?url", import: "default", eager: true }) as Record<string, string>;
const srcRaw = import.meta.glob("/ui/**/{src,registry}/**/*.{ts,tsx,js,jsx,css,html,md,vue,svelte,svg,json}", { query: "?raw", import: "default" }) as Record<string, () => Promise<string>>;

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

/** Icon entries come straight from the catalog; only their sources load lazily. */
function fromCatalog(metadata: CatalogEntry): Entry {
  const dir = `/${metadata.paths.directory}`;
  return {
    id: metadata.id,
    dir,
    category: metadata.category,
    name: metadata.id.split("/").at(-1)!,
    title: metadata.title,
    source: metadata.source,
    useWhen: metadata.useWhen,
    nature: metadata.nature,
    medium: metadata.medium,
    entryPoint: metadata.entryPoint,
    files: Object.keys(srcRaw)
      .filter((path) => path.startsWith(`${dir}/`))
      .sort()
      .map((path) => ({ path: path.slice(dir.length + 1), load: srcRaw[path] })),
    cssProfile: "none",
    kind: "react",
    status: metadata.status as Status,
    statusReason: metadata.statusReason,
    evidence: metadata.evidence as Entry["evidence"],
    roles: metadata.roles as Entry["roles"],
    framework: metadata.framework,
    availability: metadata.availability,
    variants: metadata.variants,
    installation: metadata.installation,
    bundled: true,
  };
}

function build(): Entry[] {
  const dirs = new Set<string>();
  for (const p of Object.keys(refRaw)) dirs.add(dirOf(p));

  const entries: Entry[] = catalog.entries
    .filter((metadata) => metadata.category === "icons")
    .map(fromCatalog);
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
      .map((p) => ({ path: p.slice(dir.length + 1), load: srcRaw[p] }));
    if (refRaw[`${dir}/reference.tsx`]) {
      files.unshift({ path: "reference.tsx", code: refRaw[`${dir}/reference.tsx`] });
    }

    entries.push({
      id,
      dir,
      category: seg[0],
      name,
      title: titleize(name),
      // The catalog is authoritative for provenance; the path heuristic below is
      // only a fallback for a directory the catalog build has not seen yet.
      source: metadata.source ?? src,
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
      framework: metadata.framework,
      availability: metadata.availability,
      variants: metadata.variants,
      installation: metadata.installation,
      bundled: true,
    });
  }
  return entries.sort((a, b) => a.id.localeCompare(b.id));
}

export let ENTRIES = build();
export let BY_ID = new Map(ENTRIES.map((e) => [e.id, e]));
export let CATEGORIES = [...new Set(ENTRIES.map((e) => e.category))].sort();
export let SOURCES = [...new Set(ENTRIES.map((e) => e.source))].sort();
export let NATURES = [...new Set(ENTRIES.map((e) => e.nature).filter(Boolean))].sort() as string[];

export async function loadLiveCatalog() {
  const response = await fetch(raw("catalog/catalog.json"), { cache: "no-cache" });
  if (!response.ok) throw new Error(`Live catalog: ${response.status}`);
  const live = (await response.json()).entries as CatalogEntry[];
  const bundled = new Map(ENTRIES.map((entry) => [entry.id, entry]));

  ENTRIES = live.map((metadata) => bundled.get(metadata.id) ?? {
    id: metadata.id,
    dir: `/${metadata.paths.directory}`,
    category: metadata.category,
    name: metadata.id.split("/").at(-1)!,
    title: metadata.title,
    source: metadata.source,
    useWhen: metadata.useWhen,
    nature: metadata.nature,
    medium: metadata.medium,
    entryPoint: metadata.entryPoint,
    preview: metadata.paths.preview ? raw(metadata.paths.preview) : undefined,
    files: (metadata.files ?? []).map((path) => ({
      path,
      load: () => fetch(raw(`${metadata.paths.directory}/${path}`)).then((result) => {
        if (!result.ok) throw new Error(`${result.status} ${result.statusText}`);
        return result.text();
      }),
    })),
    cssProfile: "none",
    kind: "react",
    status: metadata.status,
    statusReason: metadata.statusReason,
    evidence: metadata.evidence,
    roles: metadata.roles,
    framework: metadata.framework,
    availability: metadata.availability,
    variants: metadata.variants,
    installation: metadata.installation,
    bundled: false,
  });
  BY_ID = new Map(ENTRIES.map((entry) => [entry.id, entry]));
  CATEGORIES = [...new Set(ENTRIES.map((entry) => entry.category))].sort();
  SOURCES = [...new Set(ENTRIES.map((entry) => entry.source))].sort();
  NATURES = [...new Set(ENTRIES.map((entry) => entry.nature).filter(Boolean))].sort() as string[];
}

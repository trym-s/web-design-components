/**
 * Lazy module maps for the icon sets, shared by the in-shell glyph tiles and
 * the iframe preview so both resolve an icon through exactly one glob set (a
 * second set would duplicate every chunk in the build).
 */

export const reactIcons = import.meta.glob(
  "/ui/_sources/{lucide-animated,animateicons-lucide,heroicons-animated,itshover}/src/*.tsx",
);
export const vueIcons = import.meta.glob("/ui/_sources/lucide-motion-vue/src/icons/*.vue");
export const svelteIcons = import.meta.glob("/ui/_sources/movingicons/src/*.svelte");
export const svgIcons = import.meta.glob("/ui/_sources/line-md/src/*.svg", {
  query: "?raw",
  import: "default",
});

const EXT = { react: "tsx", vue: "vue", svelte: "svelte", svg: "svg" } as const;

export interface IconRef {
  source: string;
  name: string;
  framework?: string;
}

export function iconPath(entry: IconRef) {
  const folder = entry.framework === "vue" ? "icons/" : "";
  return `/ui/_sources/${entry.source}/src/${folder}${entry.name}.${EXT[entry.framework as keyof typeof EXT]}`;
}

export function iconLoader(entry: IconRef) {
  const key = iconPath(entry);
  if (entry.framework === "react") return reactIcons[key];
  if (entry.framework === "vue") return vueIcons[key];
  if (entry.framework === "svelte") return svelteIcons[key];
  if (entry.framework === "svg") return svgIcons[key];
  return undefined;
}

/** React and raw SVG mount directly in the shell; the rest need their own runtime. */
export const mountsInShell = (entry: IconRef) =>
  entry.framework === "react" || entry.framework === "svg";

export function pickIconComponent(mod: Record<string, unknown>) {
  if (typeof mod.default === "function" || typeof mod.default === "object") return mod.default;
  return Object.entries(mod).find(
    ([name, value]) => /^[A-Z]/.test(name) && (typeof value === "function" || typeof value === "object"),
  )?.[1];
}

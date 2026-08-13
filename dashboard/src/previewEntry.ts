/**
 * Minimal entry resolution for the preview document.
 *
 * The shell's registry imports `catalog/catalog.json`, which is 5.9 MB. Every
 * live preview runs in its own iframe, so importing the registry there made
 * each play parse the whole catalog before it could mount a single component.
 * Nothing in a preview needs the catalog: the module to mount, the stylesheet
 * profile and the icon framework are all derivable from the path.
 */
import { OVERRIDES } from "./overrides";

export const refLoaders = import.meta.glob("/ui/**/reference.tsx");
// Lazy globs hand back a path→loader map without fetching anything, so this is
// a directory listing, not a download.
// Icons are excluded because they are always `none`, and because a glob over
// their directories would emit a chunk per file — ~8k of them.
const docPaths = import.meta.glob(["/ui/**/{README,SOURCE}.md", "!/ui/icons/**"], {
  query: "?raw",
  import: "default",
});

const SOURCE_FRAMEWORK: Record<string, string> = {
  "line-md": "svg",
  movingicons: "svelte",
  "lucide-motion-vue": "vue",
  "animateicons-lucide": "react",
  "lucide-animated": "react",
  "heroicons-animated": "react",
  itshover: "react",
  "react-useanimations": "lottie",
};

export interface PreviewEntry {
  id: string;
  dir: string;
  category: string;
  name: string;
  source: string;
  framework?: string;
  cssProfile: "beautiful-ui" | "none";
  load?: () => Promise<any>;
}

export function resolvePreview(id: string): PreviewEntry | null {
  if (!id) return null;
  const segments = id.split("/");
  const dir = `/ui/${id}`;
  const load = refLoaders[`${dir}/reference.tsx`];
  const category = segments[0];
  const source = category === "icons" ? segments[1] : "";
  const documented = `${dir}/README.md` in docPaths || `${dir}/SOURCE.md` in docPaths;

  if (category !== "icons" && !load && !OVERRIDES[id]) return null;

  return {
    id,
    dir,
    category,
    name: segments[segments.length - 1],
    source,
    framework: SOURCE_FRAMEWORK[source],
    // Matches the registry's provenance fallback: an undocumented directory is a
    // Beautiful UI capture, and only those need the shared compiled sheet.
    cssProfile:
      OVERRIDES[id]?.cssProfile ?? (category === "icons" || documented ? "none" : "beautiful-ui"),
    load,
  };
}

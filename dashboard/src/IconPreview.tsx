import { useEffect, useMemo, useState } from "react";
import lottie from "lottie-web";
import type { Entry } from "./registry";

const reactIcons = import.meta.glob("/ui/_sources/{lucide-animated,animateicons-lucide,heroicons-animated,itshover}/src/*.tsx");
const vueIcons = import.meta.glob("/ui/_sources/lucide-motion-vue/src/icons/*.vue");
const svelteIcons = import.meta.glob("/ui/_sources/movingicons/src/*.svelte");
const svgIcons = import.meta.glob("/ui/_sources/line-md/src/*.svg", { query: "?raw", import: "default" });

const ext = { react: "tsx", vue: "vue", svelte: "svelte", svg: "svg" } as const;

function pathOf(entry: Entry) {
  return `/ui/_sources/${entry.source}/src/${entry.framework === "vue" ? "icons/" : ""}${entry.name}.${ext[entry.framework as keyof typeof ext]}`;
}

function exported(mod: Record<string, unknown>) {
  if (typeof mod.default === "function" || typeof mod.default === "object") return mod.default;
  return Object.entries(mod).find(([name, value]) => /^[A-Z]/.test(name) && (typeof value === "function" || typeof value === "object"))?.[1];
}

export function IconPreview({ entry, variant }: { entry: Entry; variant?: string }) {
  const [loaded, setLoaded] = useState<unknown>();
  const [error, setError] = useState<string>();
  const key = entry.framework === "lottie" ? entry.name : pathOf(entry);

  useEffect(() => {
    let alive = true;
    const loader = entry.framework === "react" ? reactIcons[key] : entry.framework === "vue" ? vueIcons[key] : entry.framework === "svelte" ? svelteIcons[key] : entry.framework === "svg" ? svgIcons[key] : undefined;
    const promise = entry.framework === "lottie"
      ? fetch(`/__personal-icons/${encodeURIComponent(entry.name)}.json`).then((response) => {
          if (!response.ok) throw new Error("Personal cache is unavailable. Run npm run dev:personal.");
          return response.json();
        })
      : loader?.();
    if (!promise) setError(`No ${entry.framework} loader for ${key}`);
    else Promise.resolve(promise).then((mod) => alive && setLoaded(mod)).catch((cause) => alive && setError(String(cause)));
    return () => { alive = false; };
  }, [key, entry.framework]);

  if (error) return <div className="pv-error"><strong>needs shim</strong><pre>{error}</pre></div>;
  if (!loaded) return <div className="pv-loading">loading…</div>;
  if (entry.framework === "svg") return <div className="icon-preview-svg" dangerouslySetInnerHTML={{ __html: loaded as string }} />;
  if (entry.framework === "lottie") return <LottieIcon data={loaded} />;

  const Component = exported(loaded as Record<string, unknown>) as any;
  if (!Component) return <div className="pv-error">Module exports no icon.</div>;
  return <Component size={64} animate animateOnHover animation={variant === "default" ? undefined : variant} />;
}

function LottieIcon({ data }: { data: unknown }) {
  const id = useMemo(() => `lottie-${crypto.randomUUID()}`, []);
  useEffect(() => {
    const container = document.getElementById(id);
    if (!container) return;
    const animation = lottie.loadAnimation({ container, renderer: "svg", loop: true, autoplay: true, animationData: data as any });
    return () => animation.destroy();
  }, [data, id]);
  return <div id={id} className="icon-preview-lottie" />;
}

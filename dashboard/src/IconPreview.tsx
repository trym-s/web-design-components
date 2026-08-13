import { useEffect, useMemo, useState } from "react";
import lottie from "lottie-web";
import { iconLoader, iconPath, pickIconComponent, type IconRef } from "./iconModules";

export function IconPreview({ entry, variant }: { entry: IconRef; variant?: string }) {
  const [loaded, setLoaded] = useState<unknown>();
  const [error, setError] = useState<string>();
  const key = entry.framework === "lottie" ? entry.name : iconPath(entry);

  useEffect(() => {
    let alive = true;
    const loader = iconLoader(entry);
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

  const Component = pickIconComponent(loaded as Record<string, unknown>) as any;
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

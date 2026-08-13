import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";

/**
 * The arlan.me vault pages publish each effect's own files but not the app-level
 * helpers they import (haptics, sound cues, the view-transition bridge, the shared
 * playground controls). Nothing is missing from the bank's own snapshot — the
 * upstream page simply never shipped those modules.
 *
 * This plugin fills those specifiers in, and only when the real file is genuinely
 * absent, so a future, more complete capture silently takes precedence.
 */
function bankShims(): Plugin {
  const shim = (f: string) => resolve(__dirname, "dashboard/shims", f);
  const bank = (f: string) => resolve(__dirname, "ui", f);

  const MAP: [RegExp, string][] = [
    [/(^|\/)\.\.\/\.\.\/lib\/haptics$/, shim("haptics.ts")],
    [/(^|\/)\.\.\/\.\.\/lib\/sound$/, shim("sound.ts")],
    [/(^|\/)\.\.\/\.\.\/lib\/view-transition$/, shim("view-transition.ts")],
    [/(^|\/)\.\.\/section-label$/, shim("section-label.tsx")],
    [/(^|\/)\.\/use-magnetism$/, shim("use-magnetism.ts")],
    [/(^|\/)\.\/use-compact$/, shim("liquid-use-compact.ts")],
    [/(^|\/)\.\/cycle$/, shim("arcade-cycle.ts")],
    [/public\/vault\/ransom\/manifest\.json$/, shim("ransom-manifest.json")],
    // These two DO exist in the bank — just under a different entry's src tree.
    [/(^|\/)\.\.\/swirl\/controls$/, bank("effects/ascii-swirl/src/swirl/controls.tsx")],
    [
      /(^|\/)\.\.\/\.\.\/lib\/video-sources$/,
      bank("animation/hover-video-button/src/app/lib/video-sources.ts"),
    ],
  ];

  return {
    name: "bank-shims",
    enforce: "pre",
    resolveId(source, importer) {
      if (!importer || !source.startsWith(".")) return null;
      const real = resolve(dirname(importer), source);
      if ([".ts", ".tsx", ".js", ".jsx", ".css", ".json", ""].some((e) => existsSync(real + e))) {
        return null;
      }
      for (const [re, target] of MAP) if (re.test(source)) return target;
      return null;
    },
  };
}

// Root is the repo root so `ui/` is inside the served tree and import.meta.glob
// can reach the bank. The bank itself is never modified by the dashboard.
export default defineConfig({
  root: ".",
  plugins: [bankShims(), react()],
  define: {
    // hover-video-button reads this Next-flavored env var for its R2 media base.
    "process.env.NEXT_PUBLIC_MEDIA_BASE": JSON.stringify(
      "/ui/_sources/arlan-vault/media",
    ),
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV ?? "development"),
  },
  // Some bank dependencies (liveline) ship their own React copy; without dedupe
  // a second copy loads and every hook call inside them throws.
  resolve: { dedupe: ["react", "react-dom"] },
  server: {
    open: "/dashboard/index.html",
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        shell: resolve(__dirname, "dashboard/index.html"),
        preview: resolve(__dirname, "dashboard/preview.html"),
        "vanilla-color-depth": resolve(__dirname, "dashboard/vanilla/color-depth.html"),
        "vanilla-typer": resolve(__dirname, "dashboard/vanilla/typer.html"),
        "vanilla-symbols": resolve(__dirname, "dashboard/vanilla/symbols-effect.html"),
      },
    },
  },
});

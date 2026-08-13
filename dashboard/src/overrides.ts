/**
 * The only hand-maintained table in the dashboard: facts about an entry that
 * cannot be derived from its path or its README.
 *
 * cssProfile — which stylesheet the preview iframe must load before mounting.
 *   "beautiful-ui" : the captured compiled Tailwind sheet (default for that source)
 *   "none"         : the component imports whatever CSS it needs itself
 * kind — how the preview is rendered: a React module, or a standalone HTML page.
 * Selection status and evidence live in `catalog/catalog.json`.
 */
export type CssProfile = "beautiful-ui" | "none";
export type Kind = "react" | "vanilla";
export type Status = "ok" | "shim" | "broken";

export interface Override {
  cssProfile?: CssProfile;
  kind?: Kind;
  /** For kind: "vanilla" — the wrapper page the iframe loads instead of preview.html. */
  vanillaPage?: string;
}

export const OVERRIDES: Record<string, Override> = {
  "surface/color-depth": {
    kind: "vanilla",
    vanillaPage: "/dashboard/vanilla/color-depth.html",
  },
  "typography/typer": {
    kind: "vanilla",
    vanillaPage: "/dashboard/vanilla/typer.html",
  },
  "effects/symbols-effect": {
    kind: "vanilla",
    vanillaPage: "/dashboard/vanilla/symbols-effect.html",
  },
};

export const VANILLA_PAGE = (id: string) => OVERRIDES[id]?.vanillaPage;

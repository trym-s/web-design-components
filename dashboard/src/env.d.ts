declare module "virtual:documented-dirs" {
  const dirs: string[];
  export default dirs;
}

interface ImportMetaEnv {
  /** GitHub Raw base (trailing slash) for bundled entries' source panes; vite.config.ts defaults it to the built commit. */
  readonly VITE_RAW_ROOT?: string;
}

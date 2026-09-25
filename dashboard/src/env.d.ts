declare module "virtual:documented-dirs" {
  const dirs: string[];
  export default dirs;
}

interface ImportMetaEnv {
  /** GitHub Raw base the viewer fetches the live catalog and source files from (trailing slash). */
  readonly VITE_RAW_ROOT?: string;
}

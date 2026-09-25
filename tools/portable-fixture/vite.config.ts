import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

// Resolves packages from the bank's own node_modules; `tailwind-merge` is the v3 line shadcn's
// Tailwind v4 setup installs (the bank root keeps v2 for older references).
export default defineConfig({
  root: __dirname,
  base: "./",
  logLevel: "warn",
  plugins: [react()],
  resolve: {
    alias: { "@": __dirname, "tailwind-merge": resolve(__dirname, "../../node_modules/tailwind-merge-v3") },
    dedupe: ["react", "react-dom"],
  },
  build: { outDir: process.env.PORTABLE_OUT ?? "dist", emptyOutDir: true, reportCompressedSize: false },
});

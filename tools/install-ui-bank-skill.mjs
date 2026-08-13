#!/usr/bin/env node

import { existsSync, lstatSync, mkdirSync, readlinkSync, symlinkSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, ".agents", "skills", "ui-bank");
const codexHome = resolve(process.env.CODEX_HOME || join(homedir(), ".codex"));
const target = join(codexHome, "skills", "ui-bank");

mkdirSync(dirname(target), { recursive: true });
if (existsSync(target) || (() => { try { lstatSync(target); return true; } catch { return false; } })()) {
  const current = lstatSync(target).isSymbolicLink() ? resolve(dirname(target), readlinkSync(target)) : null;
  if (current === source) {
    console.log(`ui-bank skill already installed: ${target}`);
    process.exit(0);
  }
  throw new Error(`refusing to replace existing path: ${target}`);
}

symlinkSync(source, target, "dir");
console.log(`installed ui-bank skill: ${target} -> ${source}`);

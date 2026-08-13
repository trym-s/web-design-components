#!/usr/bin/env node

import { lstatSync, mkdirSync, readlinkSync, symlinkSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, ".agents", "skills", "ui-bank");

/**
 * Agent runtimes that read user-level skills from `<home>/skills/<name>/SKILL.md`.
 * `.agents` is the cross-runtime alias shared by Codex, Gemini, and Copilot CLI.
 */
const HOSTS = [
  { name: "claude", home: process.env.CLAUDE_CONFIG_DIR || join(homedir(), ".claude") },
  { name: "codex", home: process.env.CODEX_HOME || join(homedir(), ".codex") },
  { name: "hermes", home: process.env.HERMES_HOME || join(homedir(), ".hermes") },
  { name: "antigravity", home: process.env.ANTIGRAVITY_HOME || join(homedir(), ".gemini") },
  { name: "agents", home: process.env.AGENTS_HOME || join(homedir(), ".agents") },
];

const stat = (path) => {
  try {
    return lstatSync(path);
  } catch {
    return null;
  }
};

const args = process.argv.slice(2);
const all = args.includes("--all");
const requested = args.flatMap((value, index) => (value === "--host" ? [args[index + 1]] : []));

const unknown = requested.filter((name) => !HOSTS.some((host) => host.name === name));
if (unknown.length > 0) {
  console.error(`unknown host: ${unknown.join(", ")} (known: ${HOSTS.map((host) => host.name).join(", ")})`);
  process.exit(2);
}

const selected = requested.length > 0 ? HOSTS.filter((host) => requested.includes(host.name)) : HOSTS;
const failures = [];
let installed = 0;
let present = 0;

for (const host of selected) {
  const target = join(host.home, "skills", "ui-bank");

  // Without --host or --all, only install where the runtime is already set up,
  // so a clone does not scatter skill directories for agents the user lacks.
  if (requested.length === 0 && !all && !stat(host.home)) {
    console.log(`skipped ${host.name}: ${host.home} not present`);
    continue;
  }

  const existing = stat(target);
  if (existing) {
    const current = existing.isSymbolicLink() ? resolve(dirname(target), readlinkSync(target)) : null;
    if (current === source) {
      console.log(`already installed  ${host.name}: ${target}`);
      present += 1;
      continue;
    }
    failures.push(`${host.name}: refusing to replace existing path ${target}`);
    continue;
  }

  mkdirSync(dirname(target), { recursive: true });
  symlinkSync(source, target, "dir");
  installed += 1;
  console.log(`installed         ${host.name}: ${target} -> ${source}`);
}

if (installed === 0 && present === 0 && failures.length === 0 && selected.length > 0) {
  console.log("nothing to do; rerun with --all to create skill directories for absent runtimes");
}

for (const failure of failures) console.error(failure);
process.exit(failures.length > 0 ? 1 : 0);

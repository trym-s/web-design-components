#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

const root = process.cwd();

async function download(url, destination) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  mkdirSync(join(destination, ".."), { recursive: true });
  writeFileSync(destination, Buffer.from(await response.arrayBuffer()));
}

const beautifulRoot = join(root, "ui/_sources/beautiful-ui");
const beautifulCssPath = join(beautifulRoot, "styles.css");
let beautifulCss = readFileSync(beautifulCssPath, "utf8");
const beautifulFonts = [...new Set([...beautifulCss.matchAll(/url\((\/_next\/static\/media\/[^)]+\.woff2)\)/g)].map((m) => m[1]))];
for (const path of beautifulFonts) {
  const filename = basename(path);
  await download(`https://beautiful-ui-five.vercel.app${path}`, join(beautifulRoot, "fonts", filename));
  beautifulCss = beautifulCss.replaceAll(path, `./fonts/${filename}`);
}
writeFileSync(beautifulCssPath, beautifulCss);

const arlanRoot = join(root, "ui/_sources/arlan-vault");
const mediaRoot = join(arlanRoot, "media");
const r2 = "https://pub-58a0dfd4417141169bd84ab545cd7830.r2.dev";
const r2Assets = [
  "vault/arcade-moire.webp",
  "vault/arcade-grain.webp",
  "vault/arcade-dust.webp",
  "vault/emboss-plaster.webp",
  "vault/emboss-grunge.webp",
  "holo/kamila.webp",
  "vault/amo.av1.webm",
  "vault/amo.vp9.webm",
  "vault/amo.mp4",
];
for (const path of r2Assets) await download(`${r2}/${path}`, join(mediaRoot, path));

const manifestResponse = await fetch("https://www.arlan.me/vault/ransom/manifest.json");
if (!manifestResponse.ok) throw new Error(`${manifestResponse.status} ransom manifest`);
const manifest = await manifestResponse.json();
const ransomRoot = join(mediaRoot, "vault/ransom");
mkdirSync(ransomRoot, { recursive: true });
writeFileSync(join(ransomRoot, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
const ransomFiles = [...new Set(Object.values(manifest).flat().map((item) => item.file))];
await Promise.all(
  ransomFiles.map((file) =>
    download(`${r2}/vault/ransom/${file}`, join(ransomRoot, file)),
  ),
);

console.log(
  `Localized ${beautifulFonts.length} Beautiful UI fonts, ${r2Assets.length} Arlan media files, and ${ransomFiles.length} ransom-note scraps.`,
);

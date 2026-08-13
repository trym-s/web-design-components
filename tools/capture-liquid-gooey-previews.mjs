import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const ROOT = resolve(import.meta.dirname, "..");
const SITE = "https://gooey.jakubantalik.com/?lab";
const targets = new Map([
  ["Morph — plus menu", "ui/navigation/gooey-plus-menu/preview.png"],
  ["Move — gooey tabs", "ui/navigation/gooey-tabs/preview.png"],
  ["Morph — avatar group", "ui/gesture/gooey-avatar-group/preview.png"],
  ["Morph — melting cards", "ui/gesture/gooey-melting-cards/preview.png"],
  ["Morph — email input", "ui/input/gooey-email-input/preview.png"],
  ["Move — liquid rubber", "ui/gesture/gooey-liquid-slider/preview.png"],
]);

const profile = mkdtempSync(join(tmpdir(), "liquid-gooey-chromium-"));
const browser = spawn("chromium", [
  "--headless=new",
  "--no-sandbox",
  "--disable-dev-shm-usage",
  "--hide-scrollbars",
  "--force-device-scale-factor=1",
  "--remote-debugging-port=0",
  `--user-data-dir=${profile}`,
  "about:blank",
], { stdio: "ignore" });

let socket;
try {
  const portFile = join(profile, "DevToolsActivePort");
  for (let i = 0; i < 100 && !readable(portFile); i++) await delay(50);
  const [port] = readFileSync(portFile, "utf8").trim().split("\n");
  const page = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(SITE)}`, { method: "PUT" }).then(r => r.json());
  socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((ok, fail) => { socket.onopen = ok; socket.onerror = fail; });

  let seq = 0;
  const pending = new Map();
  socket.onmessage = event => {
    const message = JSON.parse(event.data);
    if (!message.id) return;
    const waiter = pending.get(message.id);
    if (!waiter) return;
    pending.delete(message.id);
    message.error ? waiter.reject(new Error(JSON.stringify(message.error))) : waiter.resolve(message.result);
  };
  const cdp = (method, params = {}) => new Promise((resolvePromise, reject) => {
    const id = ++seq;
    pending.set(id, { resolve: resolvePromise, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });

  await cdp("Page.enable");
  await cdp("Runtime.enable");
  await cdp("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1200, deviceScaleFactor: 1, mobile: false });
  await cdp("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: "dark" }] });
  await cdp("Page.navigate", { url: SITE });
  for (let i = 0; i < 100; i++) {
    const state = await cdp("Runtime.evaluate", { expression: "document.readyState", returnByValue: true });
    if (state.result.value === "complete") break;
    await delay(100);
  }
  await delay(2500);

  const cards = await cdp("Runtime.evaluate", {
    expression: `Array.from(document.querySelectorAll('.card')).map(card => {
      const r = card.getBoundingClientRect();
      return { label: card.querySelector('.card-label')?.textContent?.trim(), x: r.x, y: r.y + scrollY, width: r.width, height: r.height };
    })`,
    returnByValue: true,
  });

  let captured = 0;
  for (const card of cards.result.value) {
    const relative = targets.get(card.label);
    if (!relative) continue;
    const shot = await cdp("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      clip: { x: Math.max(0, card.x), y: Math.max(0, card.y), width: card.width, height: card.height, scale: 1 },
    });
    const output = join(ROOT, relative);
    mkdirSync(resolve(output, ".."), { recursive: true });
    writeFileSync(output, Buffer.from(shot.data, "base64"));
    captured++;
  }
  if (captured !== targets.size) throw new Error(`Expected ${targets.size} cards, captured ${captured}.`);
  console.log(`Captured ${captured} upstream previews from ${SITE}.`);
} finally {
  socket?.close();
  browser.kill("SIGTERM");
  rmSync(profile, { recursive: true, force: true });
}

function readable(path) {
  try { readFileSync(path); return true; } catch { return false; }
}

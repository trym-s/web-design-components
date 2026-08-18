"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const FACE_VALUES = [1, 6, 2, 5, 3, 4];
const FACE_NORMALS: Array<[number, number, number]> = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
const PIPS: Record<number, Array<[number, number]>> = {
  1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]],
  4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
  6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]],
};

type Transition = { type?: string; duration?: number; ease?: string | number[] };
type Config = { count: number; bodyColor: string; numberColor: string; spread: number; turns: number; hop: number; transition: Transition; shadow: boolean; idleSpin: number; sizePercent: number };
const DEFAULTS: Config = { count: 2, bodyColor: "#F5F2EA", numberColor: "#151515", spread: 55, turns: 3, hop: 45, transition: { type: "tween", duration: 1.1, ease: "circOut" }, shadow: true, idleSpin: 20, sizePercent: 90 };
const EASES: Record<string, number[]> = { linear: [0, 0, 1, 1], ease: [0.25, 0.1, 0.25, 1], easeIn: [0.42, 0, 1, 1], easeOut: [0, 0, 0.58, 1], easeInOut: [0.42, 0, 0.58, 1], circIn: [0.55, 0, 1, 0.45], circOut: [0, 0.55, 0.45, 1], circInOut: [0.85, 0, 0.15, 1], backIn: [0.36, 0, 0.66, -0.56], backOut: [0.34, 1.56, 0.64, 1], backInOut: [0.68, -0.6, 0.32, 1.6] };
const clamp = (v: number, lo: number, hi: number, fallback: number) => Math.max(lo, Math.min(hi, Number.isFinite(v) ? v : fallback));

function makeEase(transition?: Transition) {
  const p = Array.isArray(transition?.ease) && transition.ease.length === 4 ? transition.ease : typeof transition?.ease === "string" && EASES[transition.ease] ? EASES[transition.ease] : EASES.circOut;
  const [x1, y1, x2, y2] = p as number[];
  const bez = (a: number, b: number, t: number) => { const u = 1 - t; return 3 * u * u * t * a + 3 * u * t * t * b + t * t * t; };
  return (t: number) => { let s = Math.max(0, Math.min(1, t)); for (let i = 0; i < 8; i++) { const u = 1 - s; const dx = 3 * u * u * x1 + 6 * u * s * (x2 - x1) + 3 * s * s * (1 - x2); if (Math.abs(dx) < 1e-6) break; s = Math.max(0, Math.min(1, s - (bez(x1, x2, s) - t) / dx)); } return bez(y1, y2, s); };
}

function texture(value: number, body: string, ink: string) {
  const canvas = document.createElement("canvas"); canvas.width = canvas.height = 256;
  const ctx = canvas.getContext("2d")!; ctx.fillStyle = body; ctx.fillRect(0, 0, 256, 256); ctx.strokeStyle = "rgba(0,0,0,.09)"; ctx.lineWidth = 7.7; ctx.strokeRect(4, 4, 248, 248); ctx.fillStyle = ink;
  for (const [x, y] of PIPS[value]) { ctx.beginPath(); ctx.arc(128 + x * 62.7, 128 + y * 62.7, 21, 0, Math.PI * 2); ctx.fill(); }
  const out = new THREE.CanvasTexture(canvas); out.colorSpace = THREE.SRGBColorSpace; out.anisotropy = 4; return out;
}
function shadowTexture() {
  const canvas = document.createElement("canvas"); canvas.width = canvas.height = 128; const ctx = canvas.getContext("2d")!; const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64); g.addColorStop(0, "rgba(0,0,0,.42)"); g.addColorStop(.55, "rgba(0,0,0,.16)"); g.addColorStop(1, "transparent"); ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128); const out = new THREE.CanvasTexture(canvas); out.colorSpace = THREE.SRGBColorSpace; return out;
}
type Die = { mesh: THREE.Mesh; shadow: THREE.Mesh; from: THREE.Quaternion; to: THREE.Quaternion; axis: THREE.Vector3; delay: number };

class DiceScene {
  private dice: Die[] = []; private scene = new THREE.Scene(); private camera = new THREE.PerspectiveCamera(30, 1, .1, 2000); private group = new THREE.Group(); private renderer: THREE.WebGLRenderer; private geometry = new THREE.BoxGeometry(1, 1, 1); private shadowGeometry = new THREE.PlaneGeometry(1.9, 1.9); private shadowMaterial = new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false }); private textures: THREE.Texture[] = []; private materials: THREE.MeshLambertMaterial[] = []; private cfg: Config; private ease: (t: number) => number; private rolling = false; private t = 0; private idle = 0; private idleBlend = 1; private last = 0; private frame = 0; private width = 0; private height = 0;
  constructor(private container: HTMLElement, cfg: Config) {
    this.cfg = cfg; this.ease = makeEase(cfg.transition); this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2)); this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    const el = this.renderer.domElement; Object.assign(el.style, { position: "absolute", inset: "0", width: "100%", height: "100%", cursor: "pointer", touchAction: "none" }); container.appendChild(el);
    const light = new THREE.DirectionalLight(0xffffff, .85); light.position.set(.4, 1, .7); this.camera.add(light); this.scene.add(new THREE.AmbientLight(0xffffff, .72), this.camera, this.group); this.materialsFor(cfg); this.build(); el.addEventListener("click", this.onClick);
  }
  private onClick = () => { if (!this.rolling) this.roll(); };
  private materialsFor(cfg: Config) { this.textures.forEach((x) => x.dispose()); this.materials.forEach((x) => x.dispose()); this.textures = FACE_VALUES.map((v) => texture(v, cfg.bodyColor, cfg.numberColor)); this.materials = this.textures.map((map) => new THREE.MeshLambertMaterial({ map })); this.dice.forEach((d) => d.mesh.material = this.materials); }
  private build() { this.dice.forEach((d) => { d.mesh.removeFromParent(); d.shadow.removeFromParent(); }); this.dice = []; for (let i = 0; i < clamp(this.cfg.count, 1, 5, 2); i++) { const mesh = new THREE.Mesh(this.geometry, this.materials); const shadow = new THREE.Mesh(this.shadowGeometry, this.shadowMaterial.clone()); shadow.rotation.x = -Math.PI / 2; shadow.position.y = -.75; this.group.add(mesh, shadow); this.dice.push({ mesh, shadow, from: new THREE.Quaternion(), to: new THREE.Quaternion(), axis: new THREE.Vector3(), delay: i * .07 }); } this.layout(); this.roll(true); }
  private layout() { const gap = 1 + clamp(this.cfg.spread, 0, 200, 55) / 100; this.dice.forEach((d, i) => { d.mesh.position.x = d.shadow.position.x = (i - (this.dice.length - 1) / 2) * gap; d.shadow.visible = this.cfg.shadow; }); }
  roll(instant = false) { this.dice.forEach((d) => { const face = Math.floor(Math.random() * 6); const normal = new THREE.Vector3(...FACE_NORMALS[face]); const align = new THREE.Quaternion().setFromUnitVectors(normal, new THREE.Vector3(0, 1, 0)); const yaw = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.floor(Math.random() * 4) * Math.PI / 2); d.from.copy(d.mesh.quaternion); d.to.copy(yaw.multiply(align)); d.axis.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize(); if (instant) d.mesh.quaternion.copy(d.to); }); this.t = 0; this.rolling = !instant; }
  setSize(w: number, h: number) { if (w <= 0 || h <= 0) return; this.width = w; this.height = h; this.renderer.setSize(w, h, false); this.cameraUpdate(); }
  update(cfg: Config) { const prev = this.cfg; this.cfg = cfg; this.ease = makeEase(cfg.transition); if (cfg.bodyColor !== prev.bodyColor || cfg.numberColor !== prev.numberColor) this.materialsFor(cfg); if (clamp(cfg.count, 1, 5, 2) !== clamp(prev.count, 1, 5, 2)) this.build(); else this.layout(); this.cameraUpdate(); }
  private cameraUpdate() { const aspect = Math.max(1, this.width) / Math.max(1, this.height); const distance = 1 / .15; const span = Math.max(3, this.dice.length * (1 + clamp(this.cfg.spread, 0, 200, 55) / 100) + 1.4) * (100 / clamp(this.cfg.sizePercent, 20, 200, 90)); const height = aspect < 1 ? span / aspect : span / 1.6; this.camera.aspect = aspect; this.camera.position.set(0, distance * .32, distance); this.camera.lookAt(0, -.1, 0); this.camera.fov = 2 * Math.atan(height / 2 / distance) * 180 / Math.PI; this.camera.near = Math.max(.1, distance - 20); this.camera.far = distance + 20; this.camera.updateProjectionMatrix(); }
  start() { this.last = performance.now(); const loop = () => { this.frame = requestAnimationFrame(loop); this.step(); }; loop(); }
  private step() { const now = performance.now(); const dt = Math.min(.05, Math.max(0, (now - this.last) / 1000)); this.last = now; const duration = Math.max(.15, this.cfg.transition.duration ?? 1.1); if (this.rolling) { this.t += dt; let done = true; this.dice.forEach((d) => { const p = Math.max(0, Math.min(1, (this.t - d.delay) / duration)); if (p < 1) done = false; const e = this.ease(p); d.mesh.quaternion.slerpQuaternions(d.from, d.to, e); d.mesh.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(d.axis, clamp(this.cfg.turns, 1, 8, 3) * Math.PI * 2 * (1 - e))); const y = Math.sin(p * Math.PI) * clamp(this.cfg.hop, 0, 100, 45) / 100 * 1.6; d.mesh.position.y = y; d.shadow.scale.setScalar(1 + y * .55); (d.shadow.material as THREE.MeshBasicMaterial).opacity = Math.max(.12, 1 - y * .8); }); if (done) this.rolling = false; } this.idle += dt; this.idleBlend += ((this.rolling ? 0 : 1) - this.idleBlend) * Math.min(1, dt / .6); this.group.rotation.y = Math.sin(this.idle * .4) * clamp(this.cfg.idleSpin, 0, 40, 20) * .02 * this.idleBlend; this.renderer.render(this.scene, this.camera); }
  dispose() { cancelAnimationFrame(this.frame); this.renderer.domElement.removeEventListener("click", this.onClick); this.dice.forEach((d) => { d.mesh.removeFromParent(); d.shadow.removeFromParent(); (d.shadow.material as THREE.Material).dispose(); }); this.geometry.dispose(); this.shadowGeometry.dispose(); this.shadowMaterial.map?.dispose(); this.shadowMaterial.dispose(); this.textures.forEach((x) => x.dispose()); this.materials.forEach((x) => x.dispose()); this.renderer.dispose(); this.renderer.domElement.remove(); }
}

type DiceRollProps = Partial<Config> & { style?: React.CSSProperties };
export default function DiceRoll(props: DiceRollProps) {
  const cfg = { ...DEFAULTS, ...props, transition: props.transition ?? DEFAULTS.transition };
  const ref = useRef<HTMLDivElement>(null); const scene = useRef<DiceScene | null>(null);
  useEffect(() => { if (!ref.current) return; const instance = new DiceScene(ref.current, cfg); scene.current = instance; instance.setSize(ref.current.clientWidth, ref.current.clientHeight); instance.start(); const observer = new ResizeObserver(() => instance.setSize(ref.current!.clientWidth, ref.current!.clientHeight)); observer.observe(ref.current); return () => { observer.disconnect(); instance.dispose(); scene.current = null; }; }, []);
  useEffect(() => { scene.current?.update(cfg); }, [cfg.count, cfg.bodyColor, cfg.numberColor, cfg.spread, cfg.turns, cfg.hop, cfg.transition, cfg.shadow, cfg.idleSpin, cfg.sizePercent]);
  return <div ref={ref} role="img" aria-label="Rolling dice" style={{ position: "relative", width: "100%", height: "100%", minWidth: 200, minHeight: 160, overflow: "hidden", ...props.style }} />;
}

"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import matcapUrl from "../../../_sources/originkit/polished-metal-matcap.png";

const AXES: Array<"x" | "y" | "z"> = ["y", "x", "z"];
const ORIENTATION: Record<"x" | "y" | "z", [number, number, number]> = { y: [0, 0, 0], x: [Math.PI / 2, 0, 0], z: [0, Math.PI / 2, 0] };
type Config = { rings: number; finish: "metal" | "solid"; tint: string; color: string; thickness: number; innerRadius: number; gap: number; spin: number; hoverBoost: number; dragSensitivity: number; sizePercent: number };
const DEFAULTS: Config = { rings: 6, finish: "metal", tint: "#D8D8D8", color: "#1CFF86", thickness: 5, innerRadius: 40, gap: 13, spin: 2, hoverBoost: 10, dragSensitivity: 1, sizePercent: 104 };
const clamp = (v: number, lo: number, hi: number, fallback: number) => Math.max(lo, Math.min(hi, Number.isFinite(v) ? v : fallback));
const tube = (c: Config) => clamp(c.thickness, 1, 20, 5) * .006;
const radii = (c: Config) => Array.from({ length: clamp(c.rings, 1, 6, 4) }, (_, i) => clamp(c.innerRadius, 20, 200, 40) / 100 + (clamp(c.rings, 1, 6, 4) - i - 1) * (clamp(c.gap, 0, 50, 20) / 100 + tube(c) * 2));
const frameRadius = (c: Config) => clamp(c.innerRadius, 20, 200, 40) / 100 + (clamp(c.rings, 1, 6, 4) - 1) * tube(c) * 2 + tube(c);
type Ring = { pivot: THREE.Group; mesh: THREE.Mesh; axis: "x" | "y" | "z"; rate: number };

class GyroScene {
  private scene = new THREE.Scene(); private camera = new THREE.PerspectiveCamera(30, 1, .1, 2000); private root = new THREE.Group(); private renderer: THREE.WebGLRenderer; private ringList: Ring[] = []; private metal = new THREE.MeshMatcapMaterial({ color: DEFAULTS.tint }); private solid = new THREE.MeshLambertMaterial({ color: DEFAULTS.color }); private ax = .5; private ay = .4; private vx = 0; private vy = 0; private dragging = false; private hover = false; private lastX = 0; private lastY = 0; private boost = 0; private width = 0; private height = 0; private frame = 0; private last = 0; private disposed = false;
  constructor(private container: HTMLElement, private cfg: Config) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2)); this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    const el = this.renderer.domElement; Object.assign(el.style, { position: "absolute", inset: "0", width: "100%", height: "100%", cursor: "grab", touchAction: "none" }); container.appendChild(el);
    const light = new THREE.DirectionalLight(0xffffff, .9); light.position.set(.4, .7, 1); this.camera.add(light); this.scene.add(new THREE.AmbientLight(0xffffff, .65), this.camera, this.root);
    new THREE.TextureLoader().load(matcapUrl, (map) => { if (this.disposed) return; map.colorSpace = THREE.SRGBColorSpace; this.metal.matcap = map; this.metal.needsUpdate = true; }); this.build(); this.bind();
  }
  private material() { return this.cfg.finish === "metal" ? this.metal : this.solid; }
  private clear() { this.ringList.forEach((r) => { r.mesh.geometry.dispose(); r.pivot.removeFromParent(); }); this.ringList = []; this.root.clear(); }
  private build() { this.clear(); let parent: THREE.Object3D = this.root; radii(this.cfg).forEach((radius, i) => { const axis = AXES[i % 3]; const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tube(this.cfg), 14, 96), this.material()); mesh.rotation.set(...ORIENTATION[axis]); const pivot = new THREE.Group(); pivot.add(mesh); parent.add(pivot); parent = pivot; this.ringList.push({ pivot, mesh, axis, rate: (i + 1) * (i % 2 ? -1 : 1) }); }); }
  private down = (e: PointerEvent) => { this.dragging = true; this.lastX = e.clientX; this.lastY = e.clientY; this.vx = this.vy = 0; this.renderer.domElement.style.cursor = "grabbing"; };
  private move = (e: PointerEvent) => { if (!this.dragging) return; const s = clamp(this.cfg.dragSensitivity, 0, 10, 3) * .007; const dx = e.clientX - this.lastX; const dy = e.clientY - this.lastY; this.lastX = e.clientX; this.lastY = e.clientY; this.ay += dx * s; this.ax += dy * s; this.vy = dx * s; this.vx = dy * s; };
  private up = () => { this.dragging = false; this.renderer.domElement.style.cursor = "grab"; };
  private bind() { const el = this.renderer.domElement; el.addEventListener("pointerdown", this.down); window.addEventListener("pointermove", this.move); window.addEventListener("pointerup", this.up); el.addEventListener("pointerenter", this.enter); el.addEventListener("pointerleave", this.leave); }
  private enter = () => { this.hover = true; }; private leave = () => { this.hover = false; this.up(); };
  setSize(w: number, h: number) { if (w <= 0 || h <= 0) return; this.width = w; this.height = h; this.renderer.setSize(w, h, false); this.cameraUpdate(); }
  update(c: Config) { const previous = this.cfg; this.cfg = c; this.metal.color.set(c.tint); this.solid.color.set(c.color); if (c.rings !== previous.rings || c.thickness !== previous.thickness || c.innerRadius !== previous.innerRadius || c.gap !== previous.gap) this.build(); else if (c.finish !== previous.finish) this.ringList.forEach((r) => r.mesh.material = this.material()); this.cameraUpdate(); }
  private cameraUpdate() { const aspect = Math.max(1, this.width) / Math.max(1, this.height); const distance = 1 / .15; const span = frameRadius(this.cfg) * 2.9 * (100 / clamp(this.cfg.sizePercent, 20, 200, 90)); const visible = aspect < 1 ? span / aspect : span; this.camera.aspect = aspect; this.camera.position.set(0, 0, distance); this.camera.lookAt(0, 0, 0); this.camera.fov = 2 * Math.atan(visible / 2 / distance) * 180 / Math.PI; this.camera.near = Math.max(.1, distance - 20); this.camera.far = distance + 20; this.camera.updateProjectionMatrix(); }
  start() { this.last = performance.now(); const loop = () => { this.frame = requestAnimationFrame(loop); this.step(); }; loop(); }
  private step() { const now = performance.now(); const dt = Math.min(.05, Math.max(0, (now - this.last) / 1000)); this.last = now; if (!this.dragging) { const decay = Math.exp(-dt * 2.6); this.ay += this.vy; this.ax += this.vx; this.vx *= decay; this.vy *= decay; } this.root.rotation.set(this.ax, this.ay, 0); const want = this.hover ? clamp(this.cfg.hoverBoost, 0, 10, 5) / 5 : 0; this.boost += (want - this.boost) * (1 - Math.exp(-dt * 4)); const speed = clamp(this.cfg.spin, 1, 20, 6) * .09 * (1 + this.boost); this.ringList.forEach((r) => { r.pivot.rotation[r.axis] += speed * r.rate * dt; }); this.renderer.render(this.scene, this.camera); }
  dispose() { this.disposed = true; cancelAnimationFrame(this.frame); const el = this.renderer.domElement; el.removeEventListener("pointerdown", this.down); window.removeEventListener("pointermove", this.move); window.removeEventListener("pointerup", this.up); el.removeEventListener("pointerenter", this.enter); el.removeEventListener("pointerleave", this.leave); this.clear(); this.metal.matcap?.dispose(); this.metal.dispose(); this.solid.dispose(); this.renderer.dispose(); el.remove(); }
}

type Props = Partial<Config> & { style?: React.CSSProperties };
export default function GyroRings(props: Props) {
  const cfg = { ...DEFAULTS, ...props }; const ref = useRef<HTMLDivElement>(null); const scene = useRef<GyroScene | null>(null);
  useEffect(() => { if (!ref.current) return; const instance = new GyroScene(ref.current, cfg); scene.current = instance; instance.setSize(ref.current.clientWidth, ref.current.clientHeight); instance.start(); const observer = new ResizeObserver(() => instance.setSize(ref.current!.clientWidth, ref.current!.clientHeight)); observer.observe(ref.current); return () => { observer.disconnect(); instance.dispose(); scene.current = null; }; }, []);
  useEffect(() => { scene.current?.update(cfg); }, [cfg.rings, cfg.finish, cfg.tint, cfg.color, cfg.thickness, cfg.innerRadius, cfg.gap, cfg.spin, cfg.hoverBoost, cfg.dragSensitivity, cfg.sizePercent]);
  return <div ref={ref} role="img" aria-label="Gyroscope rings" style={{ position: "relative", width: "100%", height: "100%", minWidth: 180, minHeight: 180, overflow: "hidden", ...props.style }} />;
}

/**
 * Modern Smoke — Chamaac UI `registry/chamaac/modern-smoke/page.tsx` (commit 345d79b) without Next.js.
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "./lib/utils";
import { useReducedMotion } from "./lib/use-reduced-motion";

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uBaseColor;
  uniform vec3 uMidColor;
  uniform vec3 uHighlightColor;
  uniform float uDensity;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(
      0.211324865405187,
      0.366025403784439,
      -0.577350269189626,
      0.024390243902439
    );

    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;

    i = mod289(i);
    vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0)
    );

    vec3 m = max(
      0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)),
      0.0
    );
    m = m * m;
    m = m * m;

    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;

    return 130.0 * dot(m, g);
  }

  mat2 rot(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    mat2 m = rot(0.55);

    for (int i = 0; i < 5; i++) {
      value += amplitude * snoise(p);
      p = m * p * 2.0 + vec2(12.7, 4.3);
      amplitude *= 0.5;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.18;

    vec2 layerA = rot(0.35) * p * 1.25 + vec2(t * 1.2, -t * 0.45);
    vec2 layerB = rot(-0.55) * p * 1.75 + vec2(-t * 0.7, t * 0.35);
    vec2 layerC = rot(0.9) * p * 2.4 + vec2(t * 0.35, -t * 0.8);

    float smokeA = fbm(layerA + fbm(layerB + vec2(2.0, -1.0)));
    float smokeB = fbm(layerB - smokeA * 0.45 + vec2(-3.0, 2.5));
    float smokeC = fbm(layerC + smokeB * 0.35);

    float structure = smokeA * 0.55 + smokeB * 0.3 + smokeC * 0.15;
    float silhouette = 1.0 - smoothstep(0.15, 1.4, length(p * vec2(0.8, 1.0)));
    float body = smoothstep(-0.28, 0.95, structure * 0.9 + silhouette * 0.4 + uDensity);
    float wisps = smoothstep(0.15, 0.85, smokeB * 0.5 + smokeC * 0.55 + 0.3);
    float glow = smoothstep(0.35, 1.0, body * 0.7 + wisps * 0.45);

    vec3 color = mix(uBaseColor, uMidColor, body);
    color = mix(color, uHighlightColor, glow * (0.3 + wisps * 0.55));
    color += uHighlightColor * pow(glow, 3.0) * 0.12;

    float vignette = smoothstep(1.25, 0.15, length(p * vec2(0.9, 1.05)));
    color *= 0.72 + vignette * 0.28;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export interface ModernSmokeProps {
  className?: string;
  /** Animation speed multiplier. */
  speed?: number;
  /** Added to the smoke body; higher fills more of the frame. */
  density?: number;
  /** Background / darkest colour; also the container colour while the canvas loads. */
  baseColor?: string;
  /** Smoke body colour. */
  midColor?: string;
  /** Glow and wisp colour; the soft light overlay is tinted from it. */
  highlightColor?: string;
}

function Effect({ speed, density, baseColor, midColor, highlightColor }: Required<Omit<ModernSmokeProps, "className">>) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2() },
      uBaseColor: { value: new THREE.Color(baseColor) },
      uMidColor: { value: new THREE.Color(midColor) },
      uHighlightColor: { value: new THREE.Color(highlightColor) },
      uDensity: { value: density },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- created once; the effect below keeps them current
    [],
  );

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uBaseColor.value.set(baseColor);
    materialRef.current.uniforms.uMidColor.value.set(midColor);
    materialRef.current.uniforms.uHighlightColor.value.set(highlightColor);
    materialRef.current.uniforms.uDensity.value = density;
  }, [baseColor, midColor, highlightColor, density]);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime() * speed;
    materialRef.current.uniforms.uResolution.value.set(state.size.width * state.viewport.dpr, state.size.height * state.viewport.dpr);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={materialRef} vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
    </mesh>
  );
}

const GRAIN =
  'url("data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.85%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")';

/** Block-level shader panel: fills its parent (at least 400 px tall). */
export default function ModernSmoke({
  className,
  speed = 1.2,
  density = 0.08,
  baseColor = "#05070a",
  midColor = "#173432",
  highlightColor = "#9ac6bf",
}: ModernSmokeProps) {
  const reducedMotion = useReducedMotion();
  // Upstream tints these light pools with fixed rgba values taken from the default palette; here they follow the props.
  const tint = (color: string, amount: number) => `color-mix(in srgb, ${color} ${amount}%, transparent)`;
  const light = [
    `radial-gradient(circle at 20% 20%, ${tint(highlightColor, 18)}, transparent 32%)`,
    `radial-gradient(circle at 80% 30%, ${tint(`color-mix(in srgb, ${midColor}, ${highlightColor})`, 14)}, transparent 30%)`,
    `radial-gradient(circle at 50% 80%, ${tint("white", 8)}, transparent 38%)`,
  ].join(", ");
  return (
    <div className={cn("relative h-full min-h-[400px] w-full overflow-hidden", className)} style={{ backgroundColor: baseColor }}>
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]} frameloop={reducedMotion ? "demand" : "always"}>
        <Effect speed={speed} density={density} baseColor={baseColor} midColor={midColor} highlightColor={highlightColor} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-screen" style={{ backgroundImage: light }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-soft-light" style={{ backgroundImage: GRAIN }} />
    </div>
  );
}

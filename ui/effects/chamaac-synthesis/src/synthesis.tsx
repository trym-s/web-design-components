/**
 * Synthesis — Chamaac UI `registry/chamaac/synthesis/synthesis.tsx` (commit 345d79b) without Next.js.
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
  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float uScale;
  uniform float uComplexity;
  uniform float uDistortion;
  uniform float uGlowIntensity;
  uniform float uFlowFrequency;
  uniform float uContrast;

  mat2 rot(float a) {
      float s = sin(a), c = cos(a);
      return mat2(c, -s, s, c);
  }

  void main() {
    float minRes = min(uResolution.x, uResolution.y);
    vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / minRes;
    
    vec2 p = uv * uScale;
    float t = uTime;
    
    // Multi-layered domain warping with dynamic complexity
    for(float i = 1.0; i < 20.0; i++) {
        if(i >= uComplexity) break;
        p *= rot(t * 0.08 + i * 0.15);
        p += vec2(
            sin(p.x * i + t),
            cos(p.x * i - t)
        ) * (uDistortion / i);
    }
    
    // Wave flow blending with dynamic frequency
    float flow1 = 0.5 + 0.5 * sin(p.x * (uFlowFrequency * 0.8) + t);
    float flow2 = 0.5 + 0.5 * sin(p.y * uFlowFrequency + t * 1.1);
    
    // Mix theme colors (color1, color2, color3)
    vec3 color = mix(uColor1, uColor2, flow1);
    color = mix(color, uColor3, flow2);
    
    // Core glow
    float dist = length(uv);
    float glow = exp(-dist * 1.5);
    color += uColor3 * glow * uGlowIntensity;
    
    // Dynamic contrast and saturation mapping
    color = smoothstep(0.0, uContrast, color);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export interface SynthesisProps {
  className?: string;
  /** Animation speed multiplier. */
  speed?: number;
  /** Base colour. */
  color1?: string;
  /** Mid colour. */
  color2?: string;
  /** Glow / highlight colour. */
  color3?: string;
  /** Pattern zoom. */
  scale?: number;
  /** Number of folding iterations. */
  complexity?: number;
  /** Domain distortion strength. */
  distortion?: number;
  /** Strength of the glow lines. */
  glowIntensity?: number;
  /** Frequency of the flowing bands. */
  flowFrequency?: number;
  /** Output contrast. */
  contrast?: number;
  /** Container colour behind the canvas. */
  backgroundColor?: string;
}

function Effect({
  speed,
  color1,
  color2,
  color3,
  scale,
  complexity,
  distortion,
  glowIntensity,
  flowFrequency,
  contrast,
}: Required<Omit<SynthesisProps, "className" | "backgroundColor">>) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2() },
      uColor1: { value: new THREE.Color(color1) },
      uColor2: { value: new THREE.Color(color2) },
      uColor3: { value: new THREE.Color(color3) },
      uScale: { value: scale },
      uComplexity: { value: complexity },
      uDistortion: { value: distortion },
      uGlowIntensity: { value: glowIntensity },
      uFlowFrequency: { value: flowFrequency },
      uContrast: { value: contrast },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- created once; the effect below keeps them current
    [],
  );

  useEffect(() => {
    if (!materialRef.current) return;
    const u = materialRef.current.uniforms;
    u.uColor1.value.set(color1);
    u.uColor2.value.set(color2);
    u.uColor3.value.set(color3);
    u.uScale.value = scale;
    u.uComplexity.value = complexity;
    u.uDistortion.value = distortion;
    u.uGlowIntensity.value = glowIntensity;
    u.uFlowFrequency.value = flowFrequency;
    u.uContrast.value = contrast;
  }, [color1, color2, color3, scale, complexity, distortion, glowIntensity, flowFrequency, contrast]);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime() * speed;
    materialRef.current.uniforms.uResolution.value.set(state.size.width, state.size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={materialRef} vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
    </mesh>
  );
}

/** Full-bleed shader background: fills its nearest positioned ancestor and ignores the pointer. */
export default function Synthesis({
  className,
  speed = 0.4,
  color1 = "#0f172a",
  color2 = "#3b0764",
  color3 = "#0ea5e9",
  scale = 1.0,
  complexity = 6.0,
  distortion = 0.6,
  glowIntensity = 0.4,
  flowFrequency = 3.0,
  contrast = 1.2,
  backgroundColor = "#000000",
}: SynthesisProps) {
  const reducedMotion = useReducedMotion();
  return (
    <div className={cn("pointer-events-none absolute inset-0 h-full w-full overflow-hidden", className)} style={{ backgroundColor }}>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={1}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <Effect
          speed={speed}
          color1={color1}
          color2={color2}
          color3={color3}
          scale={scale}
          complexity={complexity}
          distortion={distortion}
          glowIntensity={glowIntensity}
          flowFrequency={flowFrequency}
          contrast={contrast}
        />
      </Canvas>
    </div>
  );
}

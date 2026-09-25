/**
 * Glassy Boxes — Chamaac UI `registry/chamaac/glassy-boxes/glassy-boxes.tsx` (commit 345d79b) without Next.js.
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  
  varying vec2 vUv;

  // Function for creating rounded box distance
  float sdRoundRect(vec2 p, vec2 b, float r) {
      vec2 d = abs(p) - b + vec2(r);
      return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
  }

  void main() {
      // Setup coordinates with aspect ratio
      vec2 st = gl_FragCoord.xy / uResolution.xy;
      float aspect = uResolution.x / uResolution.y;
      vec2 stAspect = vec2(vUv.x * aspect, vUv.y);
      
      // Moving gradient points
      vec2 p1 = vec2(0.2 * aspect, 0.2) + vec2(sin(uTime * 0.3)*0.2, cos(uTime * 0.5)*0.2);
      vec2 p2 = vec2(0.8 * aspect, 0.2) + vec2(cos(uTime * 0.4)*0.2, sin(uTime * 0.2)*0.2);
      vec2 p3 = vec2(0.5 * aspect, 0.6) + vec2(sin(uTime * 0.6)*0.2, cos(uTime * 0.3)*0.1);
      
      // Inverse square weighting for blending
      float w1 = 1.0 / (pow(length(stAspect - p1), 2.0) + 0.05);
      float w2 = 1.0 / (pow(length(stAspect - p2), 2.0) + 0.05);
      float w3 = 1.0 / (pow(length(stAspect - p3), 2.0) + 0.05);
      float wScale = w1 + w2 + w3;
      
      vec3 baseCol = (uColor1 * w1 + uColor2 * w2 + uColor3 * w3) / wScale;
      
      // Fade to white at the top
      float whiteFade = smoothstep(0.4, 0.9, vUv.y);
      baseCol = mix(baseCol, vec3(1.0), whiteFade);

      // Grid setup
      float cellSize = 154.0; // 100px box + 4px gap
      vec2 pixelCoord = gl_FragCoord.xy;
      vec2 gridUv = pixelCoord / cellSize;
      vec2 gv = fract(gridUv) - 0.5; // -0.5 to 0.5 inside cell
      
      float halfBox = 75.0 / cellSize;
      float radius = 12.0 / cellSize;
      float dist = sdRoundRect(gv, vec2(halfBox), radius);
      
      // Compute final color
      vec3 finalCol = baseCol;
      
      // A mask to control where boxes appear: mostly sides and bottom
      float mask = smoothstep(0.5, 0.1, vUv.y) + smoothstep(0.3, 0.0, vUv.x) + smoothstep(0.7, 1.0, vUv.x);
      mask = clamp(mask, 0.0, 1.0);
      
      if (dist < 0.0 && mask > 0.0) {
          // Inside a box - compute glass refraction
          vec2 offset = gv * 0.05 * mask;
          vec2 rStAspect = stAspect - offset;
          
          float rw1 = 1.0 / (pow(length(rStAspect - p1), 2.0) + 0.05);
          float rw2 = 1.0 / (pow(length(rStAspect - p2), 2.0) + 0.05);
          float rw3 = 1.0 / (pow(length(rStAspect - p3), 2.0) + 0.05);
          float rScale = rw1 + rw2 + rw3;
          
          vec3 rCol = (uColor1 * rw1 + uColor2 * rw2 + uColor3 * rw3) / rScale;
          rCol = mix(rCol, vec3(1.0), smoothstep(0.4, 0.9, vUv.y));
          
          // Glass borders / shading
          vec2 lightDir = normalize(vec2(-1.0, 1.0)); // Top-left light
          float lighting = dot(normalize(gv), lightDir);
          
          float highlight = smoothstep(-0.02, 0.0, dist) * max(0.0, lighting);
          float shadow = smoothstep(-0.02, 0.0, dist) * max(0.0, -lighting);
          
          rCol = rCol + highlight * 0.4 - shadow * 0.1 + lighting * 0.05;
          rCol = mix(rCol, vec3(1.0), 0.1); // Slight frost
          
          finalCol = mix(baseCol, rCol, mask);
      } else {
        if(mask > 0.0) {
           // Gaps between boxes
           finalCol = mix(baseCol, baseCol * 0.95, mask);
        }
      }
      
      gl_FragColor = vec4(finalCol, 1.0);
  }
`;

type Palette = { color1: string; color2: string; color3: string };

function GlassyBoxesEffect({ color1, color2, color3 }: Palette) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uColor1: { value: new THREE.Color(color1) },
      uColor2: { value: new THREE.Color(color2) },
      uColor3: { value: new THREE.Color(color3) },
    }),
    [size, color1, color2, color3],
  );

  useFrame((state) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value = state.clock.getElapsedTime();
    material.current.uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={material} vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
    </mesh>
  );
}

export interface GlassyBoxesProps extends Partial<Palette> {
  className?: string;
}

/**
 * Block-level shader panel: fills its parent. Three drifting colour points blend under a white fade at the top;
 * frosted rounded boxes (100 px on a 154 px grid, in device pixels) refract them along the sides and bottom.
 */
export default function GlassyBoxes({ className, color1 = "#2c73d2", color2 = "#00a6a6", color3 = "#f1e3a0" }: GlassyBoxesProps) {
  const reducedMotion = useReducedMotion();
  return (
    <div className={cn("relative h-full w-full", className)}>
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]} frameloop={reducedMotion ? "demand" : "always"}>
        <GlassyBoxesEffect color1={color1} color2={color2} color3={color3} />
      </Canvas>
    </div>
  );
}

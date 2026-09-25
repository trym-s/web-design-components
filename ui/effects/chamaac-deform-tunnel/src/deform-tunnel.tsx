/**
 * Deform Tunnel — Chamaac UI `registry/chamaac/deform-tunnel/deform-tunnel.tsx` (commit 345d79b) without Next.js.
 * The texture is a required prop (upstream defaulted to a remote Unsplash photo).
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
uniform float iTime;
uniform vec2 iResolution;
uniform sampler2D iChannel0;
uniform float uSpeed;
uniform vec2 uWobble;
uniform float uDepth;
uniform float uScale;
uniform float uDecay;
uniform float uExposure;
uniform vec2 uMouse;
uniform float uHover;
varying vec2 vUv;

vec3 deform( in vec2 p )
{
    float time = 0.5 * iTime * uSpeed;
    
    // Distance from mouse to pixel
    float dist = length(p - uMouse);
    
    // Localized ripple effect based on distance and hover state
    float ripple = exp(-dist * 0.5) * uHover;
    
    // Increased mouse shift to wobble for stronger localized displacement
    vec2 q = sin( uWobble * time + p + uMouse * 0.6 * ripple );

    float a = atan( q.y, q.x );
    float r = sqrt( dot(q,q) );

    // Increase depth push significantly around the mouse
    float localDepth = uDepth - ripple * 5.0;

    vec2 uv = p * sqrt(max(0.0, localDepth + r*r));
    uv += sin( vec2(0.0, 0.6) + vec2(1.0, 1.1) * time);
    
    // Stronger texture shift with mouse
    uv += uMouse * 1.0 * ripple;
         
    return texture2D( iChannel0, uv * uScale).yxx;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 p = -1.0 + 2.0*fragCoord/iResolution.xy;

    vec3  col = vec3(0.0);
    // Base tunnel center
    vec2 center = vec2(0.0);
    
    vec2  d = (center-p)/64.0;
    
    // Localized interaction for 3D perspective bending
    float dist = length(p - uMouse);
    float ripple = exp(-dist * 0.5) * uHover;
    
    // Stronger localized bend to ray direction for more perspective interaction
    d += (p - uMouse) * ripple * 0.035;

    float w = 1.0;
    vec2  s = p;
    for( int i=0; i<64; i++ )
    {
        vec3 res = deform( s );
        col += w*smoothstep( 0.0, 1.0, res );
        w *= uDecay;
        s += d;
    }
    col = col * uExposure / 64.0;

	fragColor = vec4( col, 1.0 );
}

void main() {
    mainImage(gl_FragColor, vUv * iResolution);
}
`;

interface ShaderPlaneProps {
  imageSrc: string;
  speed: number;
  wobble: [number, number];
  depth: number;
  scale: number;
  decay: number;
  exposure: number;
}

function ShaderPlane({ imageSrc, speed, wobble, depth, scale, decay, exposure }: ShaderPlaneProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const hoverStateRef = useRef(false);

  const texture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(imageSrc);
    tex.wrapS = THREE.MirroredRepeatWrapping;
    tex.wrapT = THREE.MirroredRepeatWrapping;
    return tex;
  }, [imageSrc]);

  const uniformsRef = useRef({
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2() },
    iChannel0: { value: texture },
    uSpeed: { value: speed },
    uWobble: { value: new THREE.Vector2(wobble[0], wobble[1]) },
    uDepth: { value: depth },
    uScale: { value: scale },
    uDecay: { value: decay },
    uExposure: { value: exposure },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uHover: { value: 0 },
  });

  useEffect(() => {
    const u = uniformsRef.current;
    u.uSpeed.value = speed;
    u.uWobble.value.set(wobble[0], wobble[1]);
    u.uDepth.value = depth;
    u.uScale.value = scale;
    u.uDecay.value = decay;
    u.uExposure.value = exposure;
  }, [speed, wobble, depth, scale, decay, exposure]);

  useEffect(() => {
    uniformsRef.current.iChannel0.value = texture;
  }, [texture]);

  useFrame((state) => {
    if (!materialRef.current) return;
    const u = materialRef.current.uniforms;
    u.iTime.value = state.clock.elapsedTime;
    u.iResolution.value.set(state.size.width * state.viewport.dpr, state.size.height * state.viewport.dpr);
    // Ease the pointer (normalized -1…1) and the hover amount with a 0.05 damping factor.
    const target = state.pointer;
    u.uMouse.value.x += (target.x - u.uMouse.value.x) * 0.05;
    u.uMouse.value.y += (target.y - u.uMouse.value.y) * 0.05;
    u.uHover.value += ((hoverStateRef.current ? 1 : 0) - u.uHover.value) * 0.05;
  });

  return (
    <mesh onPointerOver={() => (hoverStateRef.current = true)} onPointerOut={() => (hoverStateRef.current = false)}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniformsRef.current}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export interface DeformTunnelProps {
  className?: string;
  /** Texture URL for the tunnel walls (any same-origin or CORS-enabled image). */
  imageSrc: string;
  /** Animation speed multiplier. */
  speed?: number;
  /** Wobble intensity [x, y]. */
  wobble?: [number, number];
  /** Tunnel depth intensity. */
  depth?: number;
  /** Texture scale. */
  scale?: number;
  /** Glow decay per ray-march step (0…1). */
  decay?: number;
  /** Overall exposure / brightness. */
  exposure?: number;
  /** Container colour behind the canvas. */
  backgroundColor?: string;
}

/** Full-bleed interactive background: fills its nearest positioned ancestor; hovering bends the tunnel toward the pointer. */
export default function DeformTunnel({
  className,
  imageSrc,
  speed = 1.0,
  wobble = [2.5, 1.2],
  depth = 5.0,
  scale = 0.3,
  decay = 0.8,
  exposure = 8.5,
  backgroundColor = "#000000",
}: DeformTunnelProps) {
  const reducedMotion = useReducedMotion();
  return (
    <div className={cn("absolute inset-0 h-full w-full cursor-crosshair", className)} style={{ backgroundColor }}>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: false, alpha: false }}
        dpr={[1, 2]}
        frameloop={reducedMotion ? "demand" : "always"}
      >
        <ShaderPlane imageSrc={imageSrc} speed={speed} wobble={wobble} depth={depth} scale={scale} decay={decay} exposure={exposure} />
      </Canvas>
    </div>
  );
}

/**
 * Light Speed — Chamaac UI `registry/chamaac/light-speed/light-speed.tsx` (commit 345d79b) without Next.js.
 * The `@react-three/postprocessing` Bloom is rebuilt on three.js's own EffectComposer + UnrealBloomPass, and the
 * frame delta is clamped so a background tab does not bunch every streak into one wave on return.
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { cn } from "./lib/utils";
import { useReducedMotion } from "./lib/use-reduced-motion";

export interface LightSpeedProps {
  /** Number of streaks. */
  particleCount?: number;
  /** Base warp speed. */
  speed?: number;
  /** Streak colour before the bloom boost. */
  lightColor?: string;
  /** Multiplier on `lightColor`; values above 1 push the streaks into the bloom. */
  intensity?: number;
  /** Radius of the cylinder the streaks spawn in. */
  radius?: number;
  /** Length of the cylinder before streaks loop back. */
  cylinderLength?: number;
  /** Scene clear colour and the colour distant streaks fade into. */
  backgroundColor?: string;
  className?: string;
}

type ParticlesProps = { count: number; baseSpeed: number; lightColor: string; intensity: number; radius: number; cylinderLength: number };

function Particles({ count, baseSpeed, lightColor, intensity, radius, cylinderLength }: ParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      // Start away from the axis to leave a tunnel for the camera.
      const r = 2 + Math.random() * (radius - 2);
      let z = (Math.random() - 0.5) * cylinderLength;
      let speedMultiplier = 0.5 + Math.random() * 0.5;
      // Pre-warm the simulation by 1.5 seconds.
      for (let j = 0; j < 90; j++) {
        z += baseSpeed * speedMultiplier * (1 / 60) * 50;
        if (z > 5) {
          z = -cylinderLength / 2;
          speedMultiplier = 0.5 + Math.random() * 0.5;
        }
      }
      temp.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r, z, speedMultiplier, length: 1 + Math.random() * 2 });
    }
    return temp;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- baseSpeed only pre-warms; changing it must not respawn
  }, [count, radius, cylinderLength]);

  const bloomColor = useMemo(() => new THREE.Color(lightColor).multiplyScalar(intensity), [lightColor, intensity]);

  useFrame((_, frameDelta) => {
    const delta = Math.min(frameDelta, 0.1);
    const mesh = meshRef.current;
    if (!mesh) return;
    particles.forEach((particle, i) => {
      // Move toward the camera (+Z); past it, loop back to the far end.
      particle.z += baseSpeed * particle.speedMultiplier * delta * 50;
      if (particle.z > 5) {
        particle.z = -cylinderLength / 2;
        particle.speedMultiplier = 0.5 + Math.random() * 0.5;
      }
      dummy.position.set(particle.x, particle.y, particle.z);
      // Thin spheres stretched along Z read as motion-blurred streaks; faster ones stretch more.
      dummy.scale.set(0.04, 0.04, particle.length + baseSpeed * particle.speedMultiplier * 0.5);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={bloomColor} toneMapped={false} transparent opacity={0.9} />
    </instancedMesh>
  );
}

/** Renders the scene through a bloom pass; takes over R3F's render loop (priority 1). */
function Bloom({ strength, radius, threshold }: { strength: number; radius: number; threshold: number }) {
  const { gl, scene, camera, size } = useThree();
  // Built in an effect (not a memo) so StrictMode's mount/unmount/mount never renders through a disposed composer.
  const [composer, setComposer] = useState<EffectComposer | null>(null);
  useEffect(() => {
    const c = new EffectComposer(gl);
    c.addPass(new RenderPass(scene, camera));
    c.addPass(new UnrealBloomPass(new THREE.Vector2(256, 256), strength, radius, threshold));
    c.addPass(new OutputPass());
    setComposer(c);
    return () => {
      c.dispose();
      setComposer(null);
    };
  }, [gl, scene, camera, strength, radius, threshold]);

  useEffect(() => {
    if (!composer) return;
    composer.setPixelRatio(gl.getPixelRatio());
    composer.setSize(size.width, size.height);
  }, [composer, gl, size]);
  useFrame((_, delta) => (composer ? composer.render(delta) : gl.render(scene, camera)), 1);
  return null;
}

/** Full-bleed 3D background: fills its nearest positioned ancestor and ignores the pointer. */
export function LightSpeed({
  particleCount = 1000,
  speed = 2.4,
  lightColor = "#b026ff",
  intensity = 3.0,
  radius = 25,
  cylinderLength = 150,
  backgroundColor = "#000000",
  className,
}: LightSpeedProps) {
  const reducedMotion = useReducedMotion();
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 h-full w-full overflow-hidden", className)}
      style={{ backgroundColor }}
    >
      {/* The camera looks down -Z from inside a cylinder of streaks; FOV 90 widens the warp. */}
      <Canvas camera={{ position: [0, 0, 5], fov: 90 }} dpr={[1, 2]} frameloop={reducedMotion ? "demand" : "always"}>
        {/* Exponential fog fades the far end of the cylinder into the background. */}
        <fogExp2 attach="fog" args={[backgroundColor, 0.025]} />
        <color attach="background" args={[backgroundColor]} />
        <Particles
          count={particleCount}
          baseSpeed={speed}
          lightColor={lightColor}
          intensity={intensity}
          radius={radius}
          cylinderLength={cylinderLength}
        />
        <Bloom strength={0.4} radius={0.1} threshold={0.2} />
      </Canvas>
    </div>
  );
}

export default LightSpeed;

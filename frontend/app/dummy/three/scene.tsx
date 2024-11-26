"use client";

import { ContactShadows, Environment, Float, Lightformer, OrbitControls } from "@react-three/drei";
import { Knot } from "./models";

export function Scene() {
  return (
    <>
      <OrbitControls />
      <color attach="background" args={["#e0e0e0"]} />
      <spotLight position={[20, 20, 10]} penumbra={1} castShadow angle={0.2} />
      <Float floatIntensity={2}>
        <Knot />
      </Float>
      <ContactShadows scale={100} position={[0, -7.5, 0]} blur={1} far={100} opacity={0.85} />
      <Environment preset="city">
        <Lightformer intensity={8} position={[10, 5, 0]} scale={[10, 50, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
      </Environment>
    </>
  );
}

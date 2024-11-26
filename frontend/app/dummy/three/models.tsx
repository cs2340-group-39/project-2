import { MeshTransmissionMaterial } from "@react-three/drei";

export function Knot() {
    return (
        <mesh receiveShadow castShadow>
            <torusKnotGeometry args={[3, 1, 256, 32]} />
            <MeshTransmissionMaterial clearcoat={1} samples={3} thickness={40} chromaticAberration={0.25} anisotropy={0.4} />
        </mesh>
    );
}

"use client";

import { Bloom, EffectComposer, FXAA, N8AO, SMAA, TiltShift2, ToneMapping } from "@react-three/postprocessing";

export function Effects() {
  return (
    <EffectComposer>
      <ToneMapping />
      <FXAA />
      <SMAA />
      <N8AO halfRes aoSamples={5} aoRadius={0.4} distanceFalloff={0.75} intensity={1} />
      <TiltShift2 samples={5} blur={0.1} />
      <Bloom luminanceThreshold={0.7} mipmapBlur luminanceSmoothing={0.0} intensity={5} />
    </EffectComposer>
  );
}

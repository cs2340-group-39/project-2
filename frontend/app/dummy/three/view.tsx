"use client";

import dynamic from "next/dynamic";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { Effects } from "./effects";
import { Scene } from "./scene";

function View() {
    return (
        <Suspense>
            <div className="w-screen h-screen">
                <Canvas>
                    <Scene />
                    <Effects />
                </Canvas>
            </div>
        </Suspense>
    );
}

export default dynamic(() => Promise.resolve(View), {
    ssr: false,
});

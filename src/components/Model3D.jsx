import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Fourth_eye } from "./models/Fourth_eye.jsx";

// registry of available interactive models
const MODELS = {
  fourth_eye: { Component: Fourth_eye, minDist: 0, maxDist: 2 },
};

export default function Model3D({ name }) {
  const entry = MODELS[name];
  if (!entry) return null;
  const { Component, minDist, maxDist } = entry;
  return (
    <div className="ov-model">
      <Canvas camera={{ position: [0, 0, 1.5] }}>
        <ambientLight />
        <OrbitControls
          minDistance={minDist}
          maxDistance={maxDist}
          enableZoom={false}
          enablePan={false}
        />
        <Suspense fallback={null}>
          <Component />
        </Suspense>
        <Environment preset="sunset" />
      </Canvas>
      <span className="ov-model-hint mono">drag to rotate</span>
    </div>
  );
}

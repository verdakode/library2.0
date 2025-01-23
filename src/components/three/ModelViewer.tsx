import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface ModelViewerProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
}

export const ModelViewer: React.FC<ModelViewerProps> = ({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
}) => {
  const gltf = useLoader(GLTFLoader, modelPath);

  return <primitive object={gltf.scene} scale={scale} position={position} />;
};

export default ModelViewer;

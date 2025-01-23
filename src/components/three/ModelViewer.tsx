import React from "react";
import { useGLTF } from "@react-three/drei";

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
  const { scene } = useGLTF(modelPath);

  return <primitive object={scene} scale={scale} position={position} />;
};

export default ModelViewer;

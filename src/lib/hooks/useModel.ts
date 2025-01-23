import { useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import type { Group } from "three";

interface UseModelReturn {
  model: Group | null;
  loading: boolean;
  error: Error | null;
}

export const useModel = (modelPath: string): UseModelReturn => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const { scene } = useGLTF(modelPath);
  
  useEffect(() => {
    if (scene) {
      setLoading(false);
    }
  }, [scene]);

  return { model: scene, loading, error };
};

export default useModel;

import { useState, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

interface UseModelReturn {
  model: GLTF | null;
  loading: boolean;
  error: Error | null;
}

export const useModel = (modelPath: string): UseModelReturn => {
  const [model, setModel] = useState<GLTF | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loader = new GLTFLoader();

    loader.load(
      modelPath,
      (gltf) => {
        setModel(gltf);
        setLoading(false);
      },
      undefined,
      (err) => {
        setError(err);
        setLoading(false);
      }
    );
  }, [modelPath]);

  return { model, loading, error };
};

export default useModel; 
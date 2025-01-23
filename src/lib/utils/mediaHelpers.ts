export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

export const isAudioFile = (filename: string): boolean => {
  const audioExtensions = ['mp3', 'wav', 'ogg', 'm4a', 'aac'];
  return audioExtensions.includes(getFileExtension(filename));
};

export const is3DModel = (filename: string): boolean => {
  const modelExtensions = ['gltf', 'glb', 'obj', 'fbx'];
  return modelExtensions.includes(getFileExtension(filename));
};

export const getMediaType = (filename: string): 'audio' | 'model' | 'unknown' => {
  if (isAudioFile(filename)) return 'audio';
  if (is3DModel(filename)) return 'model';
  return 'unknown';
}; 
interface AssetMetadata {
  name: string;
  path: string;
  type: "audio" | "model" | "image" | "document";
  size?: number;
  lastModified?: number;
}

export const loadAssetMetadata = async (path: string): Promise<AssetMetadata> => {
  try {
    const response = await fetch(path);
    const blob = await response.blob();

    return {
      name: path.split("/").pop() || "",
      path,
      type: getAssetType(path),
      size: blob.size,
      lastModified: new Date().getTime(),
    };
  } catch (error) {
    throw new Error(`Failed to load asset metadata: ${error}`);
  }
};

export const getAssetType = (path: string): AssetMetadata["type"] => {
  const extension = path.split(".").pop()?.toLowerCase() || "";

  const typeMap: Record<string, AssetMetadata["type"]> = {
    mp3: "audio",
    wav: "audio",
    ogg: "audio",
    gltf: "model",
    glb: "model",
    obj: "model",
    png: "image",
    jpg: "image",
    jpeg: "image",
    pdf: "document",
    doc: "document",
    docx: "document",
  };

  return typeMap[extension] || "document";
};

export const preloadAsset = async (path: string): Promise<void> => {
  const type = getAssetType(path);

  switch (type) {
    case "image":
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = path;
      });
      break;
    case "audio":
      await new Promise((resolve, reject) => {
        const audio = new Audio();
        audio.oncanplaythrough = resolve;
        audio.onerror = reject;
        audio.src = path;
      });
      break;
    default:
      await fetch(path);
  }
};

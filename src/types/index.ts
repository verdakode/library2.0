export interface AudioTrack {
  id: string;
  title: string;
  artist?: string;
  duration: number;
  src: string;
  coverArt?: string;
}

export interface Model3D {
  id: string;
  name: string;
  description?: string;
  src: string;
  thumbnail?: string;
  category: "character" | "environment";
}

export interface Document {
  id: string;
  title: string;
  author?: string;
  type: "article" | "transcript";
  content: string;
  dateCreated: Date;
  lastModified: Date;
}

export type AssetType = "audio" | "model" | "image" | "document";

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  path: string;
  metadata: Record<string, unknown>;
  dateAdded: Date;
  lastAccessed?: Date;
}

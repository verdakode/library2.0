export const IMAGES = {
  ART: {
    PAINTINGS: {
      LIBRARY: '/images/librarypic.jpeg'
    },
  },
  BOOKS: {
    COVERS: {
      // Add book cover paths here
    },
  },
  ICONS: {
    // Add icon paths here
  },
} as const;

export const ASSETS = {
  MODELS: {
    // Add 3D model paths here
  },
  AUDIO: {
    // Add audio file paths here
  },
  DOCUMENTS: {
    // Add document paths here
  },
} as const;

export const ROUTES = {
  HOME: '/',
  ENTRANCE: '/entrance',
  LIBRARY: '/library',
  LIBRARY_ROOM: '/library-room',
  ART_ROOM: '/art-room',
  READING_ROOM: '/reading-room',
  BOOKS: '/books',
  SHELVES: '/shelves',
} as const; 
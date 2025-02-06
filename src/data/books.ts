export interface Book {
  id: string;
  title: string;
  content: string;
  color: string;
}

export interface ShelfBooks {
  [shelfId: string]: Book[];
}

// Vibrant, rich colors for books
export const BOOK_COLORS = [
  '#8B0000', // Dark Red
  '#006400', // Dark Green
  '#00008B', // Dark Blue
  '#4B0082', // Indigo
  '#800080', // Purple
  '#8B4513', // Saddle Brown
  '#556B2F', // Dark Olive Green
  '#2F4F4F', // Dark Slate Gray
  '#191970', // Midnight Blue
  '#8B008B', // Dark Magenta
  '#CD853F', // Peru
  '#DAA520', // Goldenrod
  '#B8860B', // Dark Goldenrod
  '#D2691E', // Chocolate
  '#A0522D', // Sienna
] as const;

// Book data organized by shelf
export const SHELF_BOOKS: ShelfBooks = {
  "000": [
    {
      id: "000-1",
      title: "Tools & Methods",
      content: `# Tools & Methods

## Overview
A collection of useful tools, methods, and approaches I've learned and developed.

### Key Topics
1. Problem-Solving Frameworks
2. Productivity Systems
3. Learning Techniques
4. Digital Tools

*More content coming soon...*`,
      color: BOOK_COLORS[0]
    },
    // Add more books for this shelf...
  ],
  "100": [
    {
      id: "100-1",
      title: "Life Philosophy",
      content: `# Life Philosophy

## Personal Beliefs
Exploring the fundamental questions and principles that guide my life.

### Key Topics
1. Core Values
2. Decision Making
3. Personal Growth
4. Ethics & Morality

*More content coming soon...*`,
      color: BOOK_COLORS[1]
    },
    // Add more books...
  ],
  // Add more shelves...
} as const;

// Helper function to get random book color
export const getRandomBookColor = () => {
  return BOOK_COLORS[Math.floor(Math.random() * BOOK_COLORS.length)];
}; 
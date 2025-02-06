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
      title: "Life Chronicles: Volume I",
      content: `# Life Chronicles: Volume I

## Personal History and Memories
A comprehensive collection of life events, milestones, and memories.

### Chapters
1. Early Years
2. Family History
3. Educational Journey
4. Career Path
5. Major Life Events

*Includes photographs and personal memorabilia*`,
      color: BOOK_COLORS[0]
    },
  ],
  "100": [
    {
      id: "100-1",
      title: "Dreams & Aspirations",
      content: `# Dreams & Aspirations

## Personal Goals and Future Plans
A living document of hopes, dreams, and concrete plans for the future.

### Contents
1. Life Goals
2. Career Aspirations
3. Personal Development
4. Future Projects
5. Travel Plans`,
      color: BOOK_COLORS[1]
    },
  ],
  "200": [
    {
      id: "200-1",
      title: "Inspiring Individuals",
      content: `# Inspiring Individuals

## Profiles of Notable People
Collection of stories and insights about people who have made an impact.

### Featured Profiles
- Innovators
- Mentors
- Leaders
- Artists
- Scientists`,
      color: BOOK_COLORS[2]
    },
  ],
  "300": [
    {
      id: "300-1",
      title: "Project Portfolio",
      content: `# Project Portfolio

## Complete Project Archives
Comprehensive documentation of all projects undertaken.

### Categories
1. Personal Projects
2. Professional Work
3. Collaborative Efforts
4. Research Projects
5. Creative Works`,
      color: BOOK_COLORS[3]
    },
  ],
  "400": [
    {
      id: "400-1",
      title: "Tips & Techniques",
      content: `# Tips & Techniques

## Collected Knowledge
A compilation of useful methods, tricks, and solutions.

### Topics
1. Problem-Solving Approaches
2. Technical Solutions
3. Life Hacks
4. Professional Tips
5. Learning Methods`,
      color: BOOK_COLORS[4]
    },
  ],
  "500": [
    {
      id: "500-1",
      title: "Michigan Chronicles",
      content: `# Michigan Chronicles

## State History and Culture
Exploration of Michigan's heritage and personal connections.

### Sections
1. Local History
2. Cultural Heritage
3. Notable Locations
4. Personal Experiences
5. Community Stories`,
      color: BOOK_COLORS[5]
    },
  ],
  "600": [
    {
      id: "600-1",
      title: "Personal Library",
      content: `# Personal Library

## Reading Collection
Catalog of books, reviews, and reading experiences.

### Contents
1. Book List
2. Reading Notes
3. Favorite Quotes
4. Reviews
5. Reading Goals`,
      color: BOOK_COLORS[6]
    },
  ],
  "700": [
    {
      id: "700-1",
      title: "Health Records",
      content: `# Health Records

## Personal Health Documentation
Comprehensive health and wellness information.

### Sections
1. Medical History
2. Fitness Journey
3. Wellness Goals
4. Health Tracking
5. Medical References`,
      color: BOOK_COLORS[7]
    },
  ],
  "800": [
    {
      id: "800-1",
      title: "3D Printing Guide",
      content: `# 3D Printing Guide

## Technical Documentation
Comprehensive guide to 3D printing technology and projects.`,
      color: BOOK_COLORS[8]
    },
    {
      id: "800-2",
      title: "Robotics Manual",
      content: `# Robotics Manual

## Project Documentation
Collection of robotics projects and technical knowledge.`,
      color: BOOK_COLORS[9]
    },
    {
      id: "800-3",
      title: "Programming Reference",
      content: `# Programming Reference

## Code Documentation
Programming languages, projects, and technical notes.`,
      color: BOOK_COLORS[10]
    },
  ],
  "900": [
    {
      id: "900-1",
      title: "Guest Book",
      content: `# Guest Book

## Visitor Registry
A collection of signatures and messages from visitors.

### Contents
- Visitor Signatures
- Messages
- Dates
- Special Notes`,
      color: BOOK_COLORS[11]
    },
  ],
};

// Helper function to get random book color
export const getRandomBookColor = () => {
  return BOOK_COLORS[Math.floor(Math.random() * BOOK_COLORS.length)];
}; 
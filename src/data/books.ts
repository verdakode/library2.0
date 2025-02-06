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
      title: "Personal Memoirs Vol. I",
      content: `# Personal Memoirs Volume I: Early Years
A chronological documentation of formative experiences and early development.`,
      color: BOOK_COLORS[0]
    },
    {
      id: "000-2",
      title: "Photographic Records",
      content: `# Photographic Documentation
A curated collection of visual historical records and significant moments.`,
      color: BOOK_COLORS[1]
    },
    {
      id: "000-3",
      title: "Family Records",
      content: `# Family Historical Documentation
Genealogical records and family historical documentation.`,
      color: BOOK_COLORS[2]
    }
  ],
  "100": [
    {
      id: "100-1",
      title: "Strategic Planning",
      content: `# Strategic Life Planning
Documentation of long-term objectives and methodological approaches.`,
      color: BOOK_COLORS[3]
    },
    {
      id: "100-2",
      title: "Growth Analysis",
      content: `# Personal Development Analysis
Systematic review of growth trajectories and milestone achievements.`,
      color: BOOK_COLORS[4]
    }
  ],
  "200": [
    {
      id: "200-1",
      title: "Influence Analysis",
      content: `# Analysis of Notable Influences
Detailed studies of significant figures and their impact.`,
      color: BOOK_COLORS[5]
    },
    {
      id: "200-2",
      title: "Mentor Documentation",
      content: `# Mentorship Records
Documentation of guidance and influential relationships.`,
      color: BOOK_COLORS[6]
    }
  ],
  "300": [
    {
      id: "300-1",
      title: "Project Specifications",
      content: `# Technical Project Specifications
Detailed documentation of project parameters and outcomes.`,
      color: BOOK_COLORS[7]
    },
    {
      id: "300-2",
      title: "Research Records",
      content: `# Research Documentation
Comprehensive records of research methodologies and findings.`,
      color: BOOK_COLORS[8]
    }
  ],
  "400": [
    {
      id: "400-1",
      title: "Technical Procedures",
      content: `# Procedural Documentation
Systematic documentation of technical methodologies.`,
      color: BOOK_COLORS[9]
    },
    {
      id: "400-2",
      title: "Solution Archives",
      content: `# Problem-Solving Records
Archive of technical solutions and methodological approaches.`,
      color: BOOK_COLORS[10]
    }
  ],
  "500": [
    {
      id: "500-1",
      title: "Michigan Historical Record",
      content: `# Michigan Historical Documentation
Comprehensive study of regional history and development.`,
      color: BOOK_COLORS[11]
    },
    {
      id: "500-2",
      title: "Local Cultural Studies",
      content: `# Cultural Documentation
Analysis of local customs and community development.`,
      color: BOOK_COLORS[12]
    }
  ],
  "600": [
    {
      id: "600-1",
      title: "Literary Catalog",
      content: `# Literary Collection Documentation
Systematic catalog of literary acquisitions and analyses.`,
      color: BOOK_COLORS[13]
    },
    {
      id: "600-2",
      title: "Reading Records",
      content: `# Reading Documentation
Chronological documentation of literary consumption and review.`,
      color: BOOK_COLORS[14]
    }
  ],
  "700": [
    {
      id: "700-1",
      title: "Medical Documentation",
      content: `# Health Records
Systematic documentation of medical history and wellness data.`,
      color: BOOK_COLORS[0]
    },
    {
      id: "700-2",
      title: "Wellness Records",
      content: `# Wellness Documentation
Records of physical maintenance and health optimization.`,
      color: BOOK_COLORS[1]
    }
  ],
  "800": [
    {
      id: "800-1",
      title: "Additive Manufacturing",
      content: `# 3D Printing Technical Documentation
Comprehensive documentation of additive manufacturing processes.`,
      color: BOOK_COLORS[2]
    },
    {
      id: "800-2",
      title: "Robotics Systems",
      content: `# Robotics Technical Documentation
Systematic documentation of robotics development and implementation.`,
      color: BOOK_COLORS[3]
    },
    {
      id: "800-3",
      title: "Programming Documentation",
      content: `# Software Development Records
Technical documentation of programming methodologies and implementations.`,
      color: BOOK_COLORS[4]
    }
  ],
  "900": [
    {
      id: "900-1",
      title: "Visitor Documentation",
      content: `# Visitor Records
Chronological documentation of visitation and guest entries.`,
      color: BOOK_COLORS[5]
    },
    {
      id: "900-2",
      title: "Guest Registry",
      content: `# Guest Registration Records
Formal documentation of visitor signatures and messages.`,
      color: BOOK_COLORS[6]
    }
  ]
};

// Helper function to get random book color
export const getRandomBookColor = () => {
  return BOOK_COLORS[Math.floor(Math.random() * BOOK_COLORS.length)];
}; 
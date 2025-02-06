"use client";

import React from "react";
import { useRouter } from "next/navigation";

const shelves = [
  {
    id: "000",
    name: "Generalities",
    description: "Tools, Hacks, General Knowledge",
    color: "from-[#4A3B27] to-[#785C38]",
  },
  {
    id: "100",
    name: "Philosophy",
    description: "Personal Philosophy, Life Events",
    color: "from-[#5C4033] to-[#8B4513]",
  },
  {
    id: "200",
    name: "Spirituality",
    description: "Personal Growth, Meditation",
    color: "from-[#785C38] to-[#C4A484]",
  },
  {
    id: "300",
    name: "Social",
    description: "Guestbook, Social Connections",
    color: "from-[#8B4513] to-[#D2691E]",
  },
  {
    id: "400",
    name: "Language",
    description: "Writing, Blog Posts",
    color: "from-[#4A3B27] to-[#785C38]",
  },
  {
    id: "500",
    name: "Science",
    description: "Health Tracking, Data",
    color: "from-[#5C4033] to-[#8B4513]",
  },
  {
    id: "600",
    name: "Technology",
    description: "Tech Projects Archive",
    color: "from-[#785C38] to-[#C4A484]",
  },
  {
    id: "700",
    name: "Arts",
    description: "Media Consumption, Creative Works",
    color: "from-[#8B4513] to-[#D2691E]",
  },
  {
    id: "800",
    name: "Literature",
    description: "Reading List, Book Notes",
    color: "from-[#4A3B27] to-[#785C38]",
  },
  {
    id: "900",
    name: "History",
    description: "Personal Timeline, Memory Archive",
    color: "from-[#5C4033] to-[#8B4513]",
  },
];

const leftShelves = shelves.slice(0, 3);
const centerShelves = shelves.slice(3, 7);
const rightShelves = shelves.slice(7);

interface Shelf {
  id: string;
  name: string;
  description: string;
  color: string;
}

interface ShelfUnitProps {
  shelf: Shelf;
  position: "left" | "center" | "right";
}

const bookColors = [
  "var(--leather-dark)",
  "var(--leather-medium)",
  "var(--leather-light)",
  "var(--book-brown1)",
  "var(--book-brown2)",
  "var(--book-brown3)",
  "var(--book-brown1)",
  "var(--book-brown2)",
  "var(--book-red)",
  "var(--book-green)",
  "var(--book-blue)",
  "var(--book-burgundy)",
];

const sampleBooks = [
  { 
    title: "Introduction to Library Science",
    content: `# Introduction to Library Science

In this comprehensive guide, we explore the fundamental principles of library science and its evolution in the digital age.

## Key Topics

1. Organization Systems
   - Dewey Decimal System
   - Library of Congress Classification
   - Digital Cataloging Methods

2. Information Access
   - Physical Collections
   - Digital Resources
   - Hybrid Library Models

3. Modern Library Technologies
   - Database Management
   - Digital Archives
   - Search Systems

## The Future of Libraries

As we move further into the digital age, libraries continue to evolve...`,
    height: "85%"
  },
  { 
    title: "Digital Archives",
    content: "An exploration of modern archival techniques and digital preservation strategies...",
    height: "90%"
  },
  { 
    title: "Library Architecture",
    content: "A study of library design principles and their impact on user experience...",
    height: "95%"
  },
  { 
    title: "Collection Management",
    content: "Best practices for maintaining and growing library collections...",
    height: "88%"
  },
  { 
    title: "Information Science",
    content: "Understanding the principles of information organization and retrieval...",
    height: "92%"
  }
];

const getBookContent = (shelf: Shelf, index: number) => {
  return {
    title: `${shelf.name} - Volume ${index + 1}`,
    content: `# ${shelf.name} - Volume ${index + 1}

## Overview
This section of the library contains knowledge about ${shelf.name.toLowerCase()}.

### About This Section
${shelf.description}

### Contents
1. Introduction to ${shelf.name}
2. Key Concepts
3. Modern Applications
4. Future Developments

*This book is still being written. Check back soon for more content!*`
  };
};

const ShelfUnit = ({ shelf, position }: ShelfUnitProps) => {
  const router = useRouter();
  const isCenter = position === "center";

  const handleBookClick = (index: number) => {
    router.push(`/books/${shelf.id}-${index + 1}`);
  };

  return (
    <div className={`bookshelf-unit ${isCenter ? "h-56" : "h-72"}`}>
      <div className="p-2">
        <h2 className={`text-[#F4E4BC] font-semibold ${isCenter ? "text-lg" : "text-xl"}`} data-dewey={shelf.id}>
          {shelf.name}
        </h2>
        <p className="text-[#F4E4BC]/80 text-xs">{shelf.description}</p>
      </div>
      <div className={`book-row ${isCenter ? "h-36" : "h-48"} pt-0`} style={{ 
        marginTop: isCenter ? "0" : "-2rem",
        position: 'relative',
        zIndex: 1000,
        transformStyle: 'preserve-3d'
      }}>
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            className="book-spine"
            onClick={() => handleBookClick(i)}
            style={{
              height: isCenter ? "85%" : "65%",
              backgroundColor: bookColors[Math.floor(Math.random() * bookColors.length)],
              cursor: 'pointer',
              minWidth: isCenter ? "8px" : "10px",
              maxWidth: isCenter ? "20px" : "22px",
              transform: 'translateY(-10%) translateZ(50px)',
              zIndex: 1000,
              border: 'none',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              touchAction: 'manipulation',
              transformStyle: 'preserve-3d',
              pointerEvents: 'auto'
            }}
          >
            <h3 className={isCenter ? "text-xs" : "text-sm"}>{getBookContent(shelf, i).title}</h3>
          </button>
        ))}
      </div>
    </div>
  );
};

export default function LibraryRoom() {
  const router = useRouter();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="library-room" style={{ touchAction: 'none', pointerEvents: 'none' }}>
      {/* Back button */}
      <button
        onClick={() => router.push('/entrance')}
        className="fixed top-4 left-4 px-4 py-2 bg-[#2B1810] text-[#F5E6D3] rounded-lg 
                  hover:bg-[#5E3023] transition-colors z-[2000]
                  shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        style={{ pointerEvents: 'auto' }}
      >
        ← Back to Entrance
      </button>

      {/* Room lighting effect */}
      <div className="room-lighting" />

      {/* Wooden floor */}
      <div className="wooden-floor" />

      <div style={{ 
        width: '100%',
        height: '100%',
        position: 'fixed',
        inset: 0,
        transformStyle: 'preserve-3d',
        perspective: '2000px',
        perspectiveOrigin: '50% 50%',
        pointerEvents: 'none'
      }}>
        <div style={{ 
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          pointerEvents: 'none'
        }}>
          {/* Left Wall */}
          <div className="bookshelf-wall left space-y-8" style={{ 
            transform: `translateY(-55%) rotateY(20deg) translateZ(-150px)`, 
            position: 'absolute', 
            top: '45%', 
            left: '0%', 
            width: '25%',
            transformStyle: 'preserve-3d',
            pointerEvents: 'auto'
          }}>
            {leftShelves.map((shelf) => (
              <ShelfUnit key={shelf.id} shelf={shelf} position="left" />
            ))}
          </div>

          {/* Center Wall */}
          <div className="bookshelf-wall center space-y-4" style={{ 
            transform: `translate(-45%, -60%) translateZ(-200px)`, 
            position: 'absolute', 
            top: '45%', 
            left: '45%', 
            width: '45%',
            transformStyle: 'preserve-3d',
            pointerEvents: 'auto'
          }}>
            {centerShelves.map((shelf) => (
              <ShelfUnit key={shelf.id} shelf={shelf} position="center" />
            ))}
          </div>

          {/* Right Wall */}
          <div className="bookshelf-wall right space-y-8" style={{ 
            transform: `translateY(-55%) rotateY(-20deg) translateZ(-150px)`, 
            position: 'absolute', 
            top: '45%', 
            right: '0%', 
            width: '30%',
            transformStyle: 'preserve-3d',
            pointerEvents: 'auto'
          }}>
            {rightShelves.map((shelf) => (
              <ShelfUnit key={shelf.id} shelf={shelf} position="right" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

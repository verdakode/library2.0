"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SHELF_BOOKS, getRandomBookColor } from '@/data/books';

const shelves = [
  {
    id: "000",
    name: "tools",
    description: "instruments of creation",
    color: "from-[#4A3B27] to-[#785C38]",
  },
  {
    id: "100",
    name: "philosophy",
    description: "why? what?",
    color: "from-[#5C4033] to-[#8B4513]",
  },
  {
    id: "200",
    name: "my life",
    description: "first hand perspective",
    color: "from-[#785C38] to-[#C4A484]",
  },
  {
    id: "300",
    name: "humanity",
    description: "people",
    color: "from-[#8B4513] to-[#D2691E]",
  },
  {
    id: "400",
    name: "language",
    description: "especially that which is unnatural",
    color: "from-[#4A3B27] to-[#785C38]",
  },
  {
    id: "500",
    name: "alchemy",
    description: "tracking, data, tools",
    color: "from-[#5C4033] to-[#8B4513]",
  },
  {
    id: "600",
    name: "technology & the future",
    description: "the infinite possibilities",
    color: "from-[#785C38] to-[#C4A484]",
  },
  {
    id: "700",
    name: "arts",
    description: "media Consumption, creative Works, music",
    color: "from-[#8B4513] to-[#D2691E]",
  },
  {
    id: "800",
    name: "literature",
    description: "reading List, book Notes, books that should exist, reviews, etc.",
    color: "from-[#4A3B27] to-[#785C38]",
  },
  {
    id: "900",
    name: "history",
    description: "the Timeline, memory archive, Various Notable Historical Events",
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
  isMobile: boolean;
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


const ShelfUnit = ({ shelf, position, isMobile }: ShelfUnitProps) => {
  const router = useRouter();
  const isCenter = position === "center";
  const shelfBooks = SHELF_BOOKS[shelf.id] || [];

  const handleBookClick = (index: number) => {
    router.push(`/books/${shelf.id}-${index + 1}`);
  };

  // Calculate random variations for each book
  const bookVariations = [...Array(shelfBooks.length)].map((_, index) => ({
    tilt: Math.random() * 2 - 1,
    width: isCenter 
      ? Math.floor(Math.random() * 8) + 28 
      : Math.floor(Math.random() * 10) + 25,
    height: Math.floor(Math.random() * 8) + 90,
  }));

  // Calculate book positions for mobile with randomized clustering
  const getBookPosition = (index: number) => {
    if (!isMobile) return {};
    
    const totalBooks = shelfBooks.length;
    const shelfWidth = 180; // Mobile shelf width
    const bookWidth = Math.max(18, Math.min(25, bookVariations[index]?.width || 20));
    const availableWidth = shelfWidth - bookWidth;
    
    // Create a seed based on shelf ID for consistent randomization per shelf
    const shelfSeed = parseInt(shelf.id) || 0;
    const seed = shelfSeed * 1000 + index;
    
    // Simple seeded random function
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    
    // Generate positions with clustering
    // Some books will be close together, others further apart
    const positions: number[] = [];
    let currentPos = 0;
    
    for (let i = 0; i < totalBooks; i++) {
      const random = seededRandom(seed + i * 7);
      const clusterChance = seededRandom(seed + i * 13);
      
      if (i === 0) {
        // First book starts at a random position
        currentPos = random * (availableWidth * 0.3);
      } else {
        // Decide if this book should be close to previous or far
        if (clusterChance < 0.3) {
          // Cluster: place close to previous book (12-20px gap)
          currentPos += 12 + random * 8;
        } else if (clusterChance < 0.6) {
          // Medium gap: 20-35px gap
          currentPos += 20 + random * 15;
        } else {
          // Large gap: 35-60px gap
          currentPos += 35 + random * 25;
        }
      }
      
      // Ensure we don't go beyond available width
      currentPos = Math.min(currentPos, availableWidth);
      positions.push(currentPos);
    }
    
    // Normalize positions to use full width if needed
    const maxPos = Math.max(...positions);
    if (maxPos < availableWidth * 0.7) {
      const scale = availableWidth * 0.9 / maxPos;
      positions.forEach((pos, i) => {
        positions[i] = pos * scale;
      });
    }
    
    return {
      left: `${positions[index]}px`,
      zIndex: index + 1
    };
  };

  // Create shelf-specific alignment patterns
  const getShelfAlignment = () => {
    const shelfId = parseInt(shelf.id);
    const alignments = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'];
    return alignments[shelfId % alignments.length];
  };

  const getBookAlignment = (index: number) => {
    const shelfId = parseInt(shelf.id);
    const patterns = [
      // Pattern 0: Start heavy
      index < shelfBooks.length / 2 ? 'flex-start' : 'center',
      // Pattern 1: Center heavy  
      index >= shelfBooks.length / 3 && index < (shelfBooks.length * 2) / 3 ? 'center' : 'flex-start',
      // Pattern 2: End heavy
      index >= shelfBooks.length / 2 ? 'flex-end' : 'center',
      // Pattern 3: Scattered
      index % 3 === 0 ? 'flex-start' : index % 3 === 1 ? 'center' : 'flex-end',
      // Pattern 4: Alternating
      index % 2 === 0 ? 'flex-start' : 'flex-end'
    ];
    return patterns[shelfId % patterns.length];
  };

  // Create varied lighting based on position and shelf ID, emanating from lamp (top-right)
  const getLightingGradient = () => {
    const shelfIndex = parseInt(shelf.id);
    const isEven = shelfIndex % 200 === 0;
    
    if (position === "left") {
      // Left shelves get less direct light, more from upper right
      return isEven 
        ? "radial-gradient(ellipse at 85% 15%, rgba(255,220,180,0.25) 0%, rgba(255,200,140,0.1) 50%, transparent 75%)"
        : "radial-gradient(ellipse at 90% 25%, rgba(255,200,140,0.2) 0%, rgba(255,180,120,0.08) 45%, transparent 70%)";
    } else if (position === "right") {
      // Right shelves get most direct light from lamp
      return isEven
        ? "radial-gradient(ellipse at 30% 10%, rgba(255,240,200,0.4) 0%, rgba(255,220,160,0.2) 40%, transparent 70%)"
        : "radial-gradient(ellipse at 25% 20%, rgba(255,230,180,0.35) 0%, rgba(255,210,150,0.15) 50%, transparent 75%)";
    } else { // center
      // Center shelves get moderate light
      return isEven
        ? "radial-gradient(ellipse at 70% 8%, rgba(255,235,190,0.3) 0%, rgba(255,215,165,0.12) 45%, transparent 80%)"
        : "radial-gradient(ellipse at 75% 18%, rgba(255,225,170,0.28) 0%, rgba(255,205,145,0.1) 50%, transparent 75%)";
    }
  };

  return (
    <div className="bookshelf-unit" style={{
        backgroundImage: `
          linear-gradient(135deg, 
            rgba(255,255,255,0.05) 0%,
            transparent 15%,
            rgba(0,0,0,0.1) 85%,
            rgba(0,0,0,0.25) 100%
          ),
          ${getLightingGradient()}
        `,
        width: isMobile ? '200px' : 'auto',
        maxWidth: isMobile ? '200px' : 'none',
        margin: isMobile ? '0.25rem auto' : '0',
        padding: isMobile ? '0.4rem' : '0.9rem',
        borderRadius: isMobile ? '8px' : '0',
        flexShrink: 0,
        boxShadow: isMobile 
          ? '0 8px 20px rgba(0,0,0,0.5), 0 4px 10px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.3)' 
          : 'none',
        transformStyle: 'preserve-3d',
        position: 'relative'
      }}>
      {/* Back panel - 3D depth */}
      <div className="shelf-back" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: isMobile 
          ? 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.25) 100%)'
          : 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 100%)',
        transform: 'translateZ(-8px)',
        borderRadius: isMobile ? '8px' : '6px',
        zIndex: 0
      }} />

      {/* Left side panel - 3D depth */}
      <div className="shelf-left" style={{
        position: 'absolute',
        left: isMobile ? '-6px' : '-8px',
        top: 0,
        bottom: 0,
        width: isMobile ? '6px' : '8px',
        background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, var(--wood-dark) 50%, var(--wood-medium) 100%)',
        transform: 'rotateY(-90deg) translateZ(4px)',
        transformOrigin: 'left center',
        transformStyle: 'preserve-3d',
        borderRadius: isMobile ? '8px 0 0 8px' : '6px 0 0 6px',
        boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.5), 2px 0 4px rgba(0,0,0,0.3)',
        zIndex: 1
      }} />

      {/* Right side panel - 3D depth */}
      <div className="shelf-right" style={{
        position: 'absolute',
        right: isMobile ? '-6px' : '-8px',
        top: 0,
        bottom: 0,
        width: isMobile ? '6px' : '8px',
        background: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, var(--wood-dark) 50%, var(--wood-medium) 100%)',
        transform: 'rotateY(90deg) translateZ(4px)',
        transformOrigin: 'right center',
        transformStyle: 'preserve-3d',
        borderRadius: isMobile ? '0 8px 8px 0' : '0 6px 6px 0',
        boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.5), -2px 0 4px rgba(0,0,0,0.3)',
        zIndex: 1
      }} />

      {/* Shelf title with improved visibility */}
      <div className="shelf-title" style={{
        marginBottom: isMobile ? '0.25rem' : '0',
        paddingTop: isMobile ? '0.25rem' : '0'
      }}>
        <h2 data-dewey={shelf.id} style={{
          fontSize: isMobile ? '0.95rem' : 'inherit',
          marginBottom: isMobile ? '0.15rem' : '0',
          lineHeight: isMobile ? '1.2' : 'inherit'
        }}>
          {shelf.name}
        </h2>
        <p style={{
          fontSize: isMobile ? '0.7rem' : 'inherit',
          opacity: isMobile ? 0.8 : 1,
          lineHeight: isMobile ? '1.1' : 'inherit',
          marginBottom: isMobile ? '0' : 'inherit'
        }}>{shelf.description}</p>
      </div>

      {/* Top shelf edge - 3D depth */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: isMobile ? '4px' : '6px',
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.3) 100%)',
        transform: 'rotateX(90deg) translateZ(4px)',
        transformOrigin: 'top center',
        transformStyle: 'preserve-3d',
        borderRadius: isMobile ? '8px 8px 0 0' : '6px 6px 0 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
        zIndex: 2
      }} />

      <div className={`book-row`} style={{
        height: isMobile ? '130px' : '150px',
        width: isMobile ? '180px' : 'auto',
        margin: isMobile ? '0 auto' : '0',
        justifyContent: isMobile ? 'space-around' : 'center',
        flexWrap: isMobile ? 'wrap' : 'nowrap',
        gap: isMobile ? '3px' : '0',
        alignItems: isMobile ? 'flex-end' : 'center',
        position: isMobile ? 'relative' : 'static',
        paddingBottom: isMobile ? '15px' : '0',
        zIndex: 3
      }}>
        {shelfBooks.map((book, i) => {
          const bookAlignment = getBookAlignment(i);
          return (
            <button
              key={i}
              className="book-spine"
              onClick={() => handleBookClick(i)}
              style={{
                backgroundColor: book.color,
                width: isMobile 
                  ? `${Math.max(18, Math.min(25, bookVariations[i]?.width || 20))}px`
                  : `${bookVariations[i]?.width || 32}px`,
                height: isMobile ? '115px' : `${bookVariations[i]?.height || 95}%`,
                transformStyle: 'preserve-3d',
                margin: isMobile ? '0' : '0 1px',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                touchAction: 'manipulation',
                pointerEvents: 'auto',
                position: isMobile ? 'absolute' : 'relative',
                borderRadius: isMobile ? '2px' : '0',
                alignSelf: isMobile ? 'auto' : 'auto',
                bottom: isMobile ? '15px' : 'auto',
                transform: isMobile 
                  ? `rotate(${bookVariations[i]?.tilt || 0}deg)`
                  : `rotate(${bookVariations[i]?.tilt || 0}deg)`,
                ...getBookPosition(i)
              }}
            >
              <h3 
                className="whitespace-normal px-1"
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  transform: 'rotate(180deg)',
                  fontSize: isMobile ? '0.5rem' : '0.7rem',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.9)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                  letterSpacing: isMobile ? '0.01em' : '0.05em',
                  lineHeight: '1.1',
                  padding: isMobile ? '0.1rem 0' : '0.25rem 0'
                }}
              >
                {book.title}
              </h3>

              {/* Book preview tooltip */}
              <div className="book-preview">
                <h4>{book.title}</h4>
                <p>{book.content}</p>
                <p className="mt-2 text-xs opacity-70">Click to read more...</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default function LibraryRoom() {
  const router = useRouter();
  const [isMobile, setIsMobile] = React.useState(false);
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [roomRotation, setRoomRotation] = useState({ x: 0, y: 0 });
  const [isGyroAvailable, setIsGyroAvailable] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [initialTouchDistance, setInitialTouchDistance] = useState(0);
  const [currentWall, setCurrentWall] = useState(1); // 0 = left, 1 = center, 2 = right
  const [touchStartX, setTouchStartX] = useState(0);
  const [lastTiltTime, setLastTiltTime] = useState(0);
  const roomRef = useRef<HTMLDivElement>(null);

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    // Limit the rotation range to keep the room visible
    const beta = Math.max(-20, Math.min(20, event.beta || 0)); // x-axis rotation
    const gamma = Math.max(-30, Math.min(30, event.gamma || 0)); // y-axis rotation

    setRoomRotation({
      x: beta / 2, // Reduce the rotation effect
      y: gamma / 2
    });

    // Motion navigation: Use gamma (left-right tilt) for wall navigation (mobile only)
    if (isMobile) {
      const tiltThreshold = 15; // Degrees of tilt needed to trigger navigation
      const gammaAbs = Math.abs(gamma);
      const now = Date.now();
      const debounceTime = 800; // Prevent rapid wall switching

      if (gammaAbs > tiltThreshold && now - lastTiltTime > debounceTime) {
        if (gamma < -tiltThreshold && currentWall < 2) {
          // Tilt left - go to next wall
          setCurrentWall(prev => prev + 1);
          setLastTiltTime(now);
        } else if (gamma > tiltThreshold && currentWall > 0) {
          // Tilt right - go to previous wall
          setCurrentWall(prev => prev - 1);
          setLastTiltTime(now);
        }
      }
    }
  }, [isMobile, currentWall, lastTiltTime]);

  useEffect(() => {
    // Hydration effect - runs only on client
    setIsHydrated(true);
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    setZoom(mobile ? 1.2 : 0.9);

    // Check if device orientation is available
    if (window.DeviceOrientationEvent) {
      // Request permission for iOS devices
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        (DeviceOrientationEvent as any).requestPermission()
          .then((permissionState: string) => {
            if (permissionState === 'granted') {
              setIsGyroAvailable(true);
              window.addEventListener('deviceorientation', handleOrientation);
            }
          })
          .catch(console.error);
      } else {
        // Non-iOS devices
        setIsGyroAvailable(true);
        window.addEventListener('deviceorientation', handleOrientation);
      }
    }

    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setZoom(mobile ? 1.2 : 0.9);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (isGyroAvailable) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, [isGyroAvailable, handleOrientation]);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );

      if (initialTouchDistance > 0) {
        const delta = distance - initialTouchDistance;
        const newZoom = Math.max(0.5, Math.min(1.5, zoom + (delta * 0.005)));
        setZoom(newZoom);
      }
      setInitialTouchDistance(distance);
    }
  };

  const handleTouchEnd = () => {
    setInitialTouchDistance(0);
  };


  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Handle pinch zoom
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setInitialTouchDistance(distance);
    } else if (e.touches.length === 1 && isMobile) {
      // Handle swipe navigation
      setTouchStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEndWithSwipe = (e: React.TouchEvent) => {
    if (e.touches.length === 0 && isMobile && touchStartX !== 0) {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      const threshold = 50; // Minimum swipe distance

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          // Swiped left - go to next wall
          setCurrentWall(prev => prev < 2 ? prev + 1 : 0);
        } else {
          // Swiped right - go to previous wall
          setCurrentWall(prev => prev > 0 ? prev - 1 : 2);
        }
      }
      setTouchStartX(0);
    }
    setInitialTouchDistance(0);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const newZoom = Math.max(0.4, Math.min(1.5, zoom - (e.deltaY * 0.001)));
      setZoom(newZoom);
    }
  };

  return (
    <div
      className="library-room"
      style={{
        touchAction: 'auto',
        pointerEvents: 'auto'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEndWithSwipe}
      onWheel={handleWheel}
      ref={roomRef}
    >
      {/* Back door button */}
      <button
        onClick={() => router.push('/entrance')}
        aria-label="Back to Entrance"
        className="fixed top-4 right-4 cursor-pointer"
        style={{
          width: '48px',
          height: '96px',
          background: 'linear-gradient(to bottom right, var(--wood-medium), var(--wood-dark))',
          border: '2px solid var(--leather-light)',
          borderRadius: '24px 24px 4px 4px',
          padding: 0,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          transformOrigin: 'right center',
          zIndex: 9999,
          pointerEvents: 'auto'
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%) rotate(90deg)',
            color: 'var(--leather-light)',
            fontFamily: 'Cinzel, serif',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            transition: 'all 0.3s ease'
          }}
        >
          EXIT
        </span>
      </button>

      {/* Mobile Navigation with Arrows */}
      {isMobile && (
        <>
          {/* Left Arrow */}
          <button
            onClick={() => setCurrentWall(prev => prev > 0 ? prev - 1 : 2)}
            aria-label="Previous shelf"
            style={{
              position: 'fixed',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--wood-medium), var(--wood-dark))',
              border: '2px solid var(--leather-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 9999,
              pointerEvents: 'auto',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--leather-light)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => setCurrentWall(prev => prev < 2 ? prev + 1 : 0)}
            aria-label="Next shelf"
            style={{
              position: 'fixed',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--wood-medium), var(--wood-dark))',
              border: '2px solid var(--leather-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 9999,
              pointerEvents: 'auto',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--leather-light)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Navigation Indicator */}
          <div
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
            style={{
              display: 'flex',
              gap: '0.5rem',
              zIndex: 9999,
              pointerEvents: 'none'
            }}
          >
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: currentWall === index ? 'var(--leather-light)' : 'rgba(255,255,255,0.3)',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </>
      )}

      {isHydrated ? (
        <>
          {/* 3D Room view content */}
          <div className="room-lighting" />
          <div className="wooden-floor">
            {/* Shoe-shaped home button */}
            <button
              onClick={() => router.push('/entrance')}
              className="shoe-button"
              style={{ pointerEvents: 'auto' }}
            >
              <div style={{
                position: 'absolute',
                inset: '5px',
                border: '2px solid rgba(255,255,255,0.2)',
                clipPath: `path('M 40,0 C 60,0 75,10 75,30 L 75,90 C 75,100 65,110 50,115 C 35,120 15,115 5,100 C 0,90 0,80 0,70 L 0,30 C 0,10 20,0 40,0 Z')`,
              }} />
              <div style={{
                position: 'absolute',
                bottom: '20%',
                left: '50%',
                transform: 'translateX(-50%) rotateX(45deg)',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                whiteSpace: 'nowrap'
              }}>
                HOME
              </div>
            </button>
          </div>
          <div style={{
            width: '100%',
            height: isMobile ? 'auto' : '100%',
            minHeight: isMobile ? '100vh' : '100%',
            position: isMobile ? 'relative' : 'fixed',
            inset: isMobile ? 'auto' : 0,
            transformStyle: 'preserve-3d',
            perspective: '2000px',
            perspectiveOrigin: '50% 50%',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s ease-out',
            paddingTop: isMobile ? '1rem' : '0',
            paddingBottom: isMobile ? '2rem' : '0'
          }}>
            {/* Add decorative back wall with intricate gilded pattern */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '300%',
              height: '300%',
              transform: isMobile 
                ? 'translate(-50%, -50%) translateZ(-500px)' 
                : 'translate(-50%, -50%) translateZ(-1000px)',
              background: `#2b1810`,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='rgba(218, 165, 32, 0.5)' stroke-width='2'%3E%3Cpath d='M30,0 Q30,30 60,30' /%3E%3Cpath d='M30,120 Q30,90 60,90' /%3E%3Cpath d='M90,30 Q90,30 120,30' /%3E%3Cpath d='M90,90 Q90,90 120,90' /%3E%3Ccircle cx='60' cy='60' r='10' stroke='rgba(218, 165, 32, 0.8)' /%3E%3C/g%3E%3Cg fill='none' stroke='rgba(255, 215, 0, 0.4)' stroke-width='2'%3E%3Cpath d='M0,30 Q30,30 60,30' /%3E%3Cpath d='M0,90 Q30,90 60,90' /%3E%3Cpath d='M60,30 Q90,30 120,30' /%3E%3Cpath d='M60,90 Q90,90 120,90' /%3E%3C/g%3E%3C/svg%3E"),
              linear-gradient(
                90deg,
                transparent 0,
                transparent 119px,
                rgba(218, 165, 32, 0.3) 119px,
                rgba(218, 165, 32, 0.3) 120px
              ),
              linear-gradient(
                0deg,
                transparent 0,
                transparent 119px,
                rgba(218, 165, 32, 0.3) 119px,
                rgba(218, 165, 32, 0.3) 120px
              )`,
              backgroundSize: isMobile ? '80px 80px' : '120px 120px',
              backgroundPosition: 'center center',
              boxShadow: `
                inset 0 0 150px rgba(218, 165, 32, 0.3),
                inset 0 0 100px rgba(218, 165, 32, 0.2),
                inset 0 0 50px rgba(218, 165, 32, 0.1)
              `,
              pointerEvents: 'none',
              zIndex: -1,
              WebkitMaskImage: `
                radial-gradient(
                  circle at 50% 50%,
                  black 0%,
                  black 85%,
                  transparent 100%
                )
              `,
              maskImage: `
                radial-gradient(
                  circle at 50% 50%,
                  black 0%,
                  black 85%,
                  transparent 100%
                )
              `
            }} />

            <div style={{
              width: '100%',
              height: isMobile ? '100vh' : '100%',
              position: 'relative',
              transformStyle: isMobile ? 'flat' : 'preserve-3d',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: isMobile 
                ? 'none'
                : `scale(${zoom}) 
                   rotateX(${roomRotation.x}deg) 
                   rotateY(${roomRotation.y}deg)`,
              overflow: isMobile ? 'hidden' : 'visible',
              left: isMobile ? '0' : 'auto',
              right: isMobile ? '0' : 'auto'
            }}>
              {/* Connecting chains/links between shelves */}
              <div style={{
                position: 'absolute',
                top: '20%',
                left: '25%',
                width: '25%',
                height: '2px',
                background: 'linear-gradient(90deg, var(--leather-dark), var(--leather-medium), var(--leather-dark))',
                transform: 'rotateY(15deg) translateZ(-100px)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
                borderRadius: '1px',
                opacity: isMobile ? 0.6 : 0.8
              }} />
              <div style={{
                position: 'absolute',
                top: '40%',
                right: '25%',
                width: '25%',
                height: '2px',
                background: 'linear-gradient(90deg, var(--leather-dark), var(--leather-medium), var(--leather-dark))',
                transform: 'rotateY(-15deg) translateZ(-100px)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
                borderRadius: '1px',
                opacity: isMobile ? 0.6 : 0.8
              }} />
              <div style={{
                position: 'absolute',
                top: '60%',
                left: '30%',
                width: '20%',
                height: '2px',
                background: 'linear-gradient(90deg, var(--leather-dark), var(--leather-medium), var(--leather-dark))',
                transform: 'rotateY(10deg) translateZ(-120px)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
                borderRadius: '1px',
                opacity: isMobile ? 0.6 : 0.8
              }} />
              <div style={{
                position: 'absolute',
                top: '80%',
                right: '30%',
                width: '20%',
                height: '2px',
                background: 'linear-gradient(90deg, var(--leather-dark), var(--leather-medium), var(--leather-dark))',
                transform: 'rotateY(-10deg) translateZ(-120px)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
                borderRadius: '1px',
                opacity: isMobile ? 0.6 : 0.8
              }} />
              
              {/* Library Lamp */}
              <div style={{
                position: 'absolute',
                top: isMobile ? '10%' : '8%',
                right: isMobile ? '15%' : '12%',
                width: isMobile ? '8px' : '12px',
                height: isMobile ? '80px' : '120px',
                transformStyle: 'preserve-3d',
                transform: 'translateZ(50px)',
                zIndex: 5
              }}>
                {/* Lamp post */}
                <div style={{
                  width: '100%',
                  height: '70%',
                  background: 'linear-gradient(90deg, rgba(0,0,0,0.8), #2c1810, rgba(0,0,0,0.6))',
                  borderRadius: '2px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.5)'
                }} />
                
                {/* Lamp shade */}
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: isMobile ? '24px' : '36px',
                  height: isMobile ? '16px' : '24px',
                  background: 'linear-gradient(135deg, #8B4513, #A0522D, #8B4513)',
                  borderRadius: '50% 50% 20% 20%',
                  boxShadow: 
                    'inset 0 2px 4px rgba(255,255,255,0.2), ' +
                    '0 4px 8px rgba(0,0,0,0.6), ' +
                    'inset 0 -2px 4px rgba(0,0,0,0.3)'
                }} />
                
                {/* Light glow */}
                <div style={{
                  position: 'absolute',
                  top: '-5px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: isMobile ? '60px' : '100px',
                  height: isMobile ? '60px' : '100px',
                  background: 'radial-gradient(circle, rgba(255,240,200,0.6) 0%, rgba(255,220,150,0.3) 30%, transparent 70%)',
                  borderRadius: '50%',
                  filter: 'blur(8px)',
                  pointerEvents: 'none'
                }} />
              </div>
              
              {isMobile ? (
                /* Mobile: Sliding carousel with proper shelf styling */
                <div style={{
                  width: '300vw',
                  height: '100vh',
                  display: 'flex',
                  transform: `translateX(-${currentWall * 100}vw)`,
                  transition: 'transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  alignItems: 'center',
                  willChange: 'transform'
                }}>
                  {/* Left Wall */}
                  <div style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem 0.5rem',
                    gap: '0.4rem',
                    flexShrink: 0
                  }}>
                    {leftShelves.map((shelf) => (
                      <ShelfUnit key={shelf.id} shelf={shelf} position="left" isMobile={isMobile} />
                    ))}
                  </div>

                  {/* Center Wall */}
                  <div style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem 0.5rem',
                    gap: '0.4rem',
                    flexShrink: 0
                  }}>
                    {centerShelves.map((shelf) => (
                      <ShelfUnit key={shelf.id} shelf={shelf} position="center" isMobile={isMobile} />
                    ))}
                  </div>

                  {/* Right Wall */}
                  <div style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem 0.5rem',
                    gap: '0.4rem',
                    flexShrink: 0
                  }}>
                    {rightShelves.map((shelf) => (
                      <ShelfUnit key={shelf.id} shelf={shelf} position="right" isMobile={isMobile} />
                    ))}
                  </div>
                </div>
              ) : (
                /* Desktop: Full 3D layout */
                <>
                  {/* Left Wall */}
                  <div className="bookshelf-wall left space-y-12" style={{
                    transform: `translateY(-50%) rotateY(20deg) translateZ(-150px) translateX(-15%)`,
                    position: 'absolute',
                    top: '40%',
                    left: '5%',
                    width: '30%',
                    transformStyle: 'preserve-3d',
                    pointerEvents: 'auto',
                    height: '75vh',
                    gap: '2rem',
                    padding: '2rem'
                  }}>
                    {leftShelves.map((shelf) => (
                      <ShelfUnit key={shelf.id} shelf={shelf} position="left" isMobile={isMobile} />
                    ))}
                  </div>

                  {/* Center Wall */}
                  <div className="bookshelf-wall center space-y-1" style={{
                    transform: `translate(-50%, -50%) translateZ(-600px)`,
                    position: 'absolute',
                    top: '25%',
                    left: '50%',
                    width: '35%',
                    transformStyle: 'preserve-3d',
                    pointerEvents: 'auto',
                    height: '80vh',
                    gap: '1.5rem',
                    padding: '1.5rem'
                  }}>
                    {centerShelves.map((shelf) => (
                      <ShelfUnit key={shelf.id} shelf={shelf} position="center" isMobile={isMobile} />
                    ))}
                  </div>

                  {/* Right Wall */}
                  <div className="bookshelf-wall right space-y-12" style={{
                    transform: `translateY(-50%) rotateY(-20deg) translateZ(-150px) translateX(15%)`,
                    position: 'absolute',
                    top: '40%',
                    right: '5%',
                    width: '30%',
                    transformStyle: 'preserve-3d',
                    pointerEvents: 'auto',
                    height: '75vh',
                    gap: '2rem',
                    padding: '2rem'
                  }}>
                    {rightShelves.map((shelf) => (
                      <ShelfUnit key={shelf.id} shelf={shelf} position="right" isMobile={isMobile} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      )}
    </div>
  );
}

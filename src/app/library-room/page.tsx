"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SHELF_BOOKS, getRandomBookColor } from '@/data/books';

const shelves = [
  {
    id: "000",
    name: "Hacks",
    description: "Tools, Exploits, Esoteric Patterns",
    color: "from-[#4A3B27] to-[#785C38]",
  },
  {
    id: "100",
    name: "Philosophy",
    description: "Philosophy, Theories, More",
    color: "from-[#5C4033] to-[#8B4513]",
  },
  {
    id: "200",
    name: "Verda Korzeniewski",
    description: "Shelf about my life",
    color: "from-[#785C38] to-[#C4A484]",
  },
  {
    id: "300",
    name: "Social",
    description: "The shelf about the lives of people I know",
    color: "from-[#8B4513] to-[#D2691E]",
  },
  {
    id: "400",
    name: "Language",
    description: "Writing, Observations, New Words",
    color: "from-[#4A3B27] to-[#785C38]",
  },
  {
    id: "500",
    name: "Alchemy (otherwise known as science)",
    description: "Tracking, Data, Tools",
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
    description: "Media Consumption, Creative Works, Good Finds, Music",
    color: "from-[#8B4513] to-[#D2691E]",
  },
  {
    id: "800",
    name: "Literature",
    description: "Reading List, Book Notes, Books that should exist, Reviews, etc.",
    color: "from-[#4A3B27] to-[#785C38]",
  },
  {
    id: "900",
    name: "History",
    description: "Personal Timeline, Memory Archive, Various Notable Historical Events",
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
  const shelfBooks = SHELF_BOOKS[shelf.id] || [];

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
        {[...Array(5)].map((_, i) => {
          const book = shelfBooks[i] || {
            title: `${shelf.name} - Volume ${i + 1}`,
            color: getRandomBookColor()
          };
          
          return (
            <button
              key={i}
              className="book-spine"
              onClick={() => handleBookClick(i)}
              style={{
                height: isCenter ? "85%" : "65%",
                backgroundColor: book.color,
                cursor: 'pointer',
                minWidth: isCenter ? "14px" : "18px",
                maxWidth: isCenter ? "30px" : "35px",
                margin: "0 2px",
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
                pointerEvents: 'auto',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              <h3 className={`${isCenter ? "text-xs" : "text-sm"} whitespace-normal px-1`}>{book.title}</h3>
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
  const [roomRotation, setRoomRotation] = useState({ x: 0, y: 0 });
  const [isGyroAvailable, setIsGyroAvailable] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [initialTouchDistance, setInitialTouchDistance] = useState(0);
  const roomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial zoom for mobile
    setZoom(isMobile ? 0.7 : 1);
    
    // Check if device orientation is available
    if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
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

    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setZoom(window.innerWidth <= 768 ? 0.7 : 1);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (isGyroAvailable) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, [isGyroAvailable]);

  const handleOrientation = (event: DeviceOrientationEvent) => {
    // Limit the rotation range to keep the room visible
    const beta = Math.max(-20, Math.min(20, event.beta || 0)); // x-axis rotation
    const gamma = Math.max(-30, Math.min(30, event.gamma || 0)); // y-axis rotation
    
    setRoomRotation({
      x: beta / 2, // Reduce the rotation effect
      y: gamma / 2
    });
  };

  // Handle touch events for pinch zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setInitialTouchDistance(distance);
    }
  };

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

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const newZoom = Math.max(0.5, Math.min(1.5, zoom - (e.deltaY * 0.001)));
      setZoom(newZoom);
    }
  };

  return (
    <div 
      className="library-room" 
      style={{ touchAction: 'none', pointerEvents: 'none' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      ref={roomRef}
    >
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

      {/* Zoom controls for mobile */}
      {isMobile && (
        <div className="fixed bottom-4 right-4 flex gap-2 z-[2000]" style={{ pointerEvents: 'auto' }}>
          <button
            onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}
            className="w-12 h-12 bg-[#2B1810] text-[#F5E6D3] rounded-full 
                      hover:bg-[#5E3023] transition-colors shadow-lg 
                      flex items-center justify-center text-xl"
          >
            +
          </button>
          <button
            onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
            className="w-12 h-12 bg-[#2B1810] text-[#F5E6D3] rounded-full 
                      hover:bg-[#5E3023] transition-colors shadow-lg 
                      flex items-center justify-center text-xl"
          >
            -
          </button>
        </div>
      )}

      {/* Room lighting effect */}
      <div className="room-lighting" />

      {/* Wooden floor */}
      <div className="wooden-floor">
        {/* Shoe-shaped home button */}
        <button
          onClick={() => router.push('/entrance')}
          className="shoe-button"
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '30%',
            transform: 'translate(-50%, 0) rotateX(-45deg)',
            width: '80px',
            height: '120px',
            background: 'linear-gradient(135deg, #8B0000, #B22222)',
            clipPath: `path('M 40,0 C 60,0 75,10 75,30 L 75,90 C 75,100 65,110 50,115 C 35,120 15,115 5,100 C 0,90 0,80 0,70 L 0,30 C 0,10 20,0 40,0 Z')`,
            border: 'none',
            cursor: 'pointer',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.3s ease, filter 0.3s ease',
            filter: 'drop-shadow(0 10px 8px rgba(0, 0, 0, 0.4))',
            pointerEvents: 'auto',
            zIndex: 1000
          }}
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
        height: '100%',
        position: 'fixed',
        inset: 0,
        transformStyle: 'preserve-3d',
        perspective: isMobile ? '2000px' : '2000px',
        perspectiveOrigin: '50% 50%',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.2s ease-out'
      }}>
        {/* Add decorative back wall with intricate gilded pattern */}
        <div style={{
          position: 'absolute',
          width: '300%',
          height: '300%',
          transform: isMobile ? 'translateZ(-500px)' : 'translateZ(-1000px)',
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
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          pointerEvents: 'none',
          transform: `translateY(${isMobile ? '-15%' : '-5%'}) 
                     scale(${zoom}) 
                     rotateX(${roomRotation.x}deg) 
                     rotateY(${roomRotation.y}deg)`
        }}>
          {/* Left Wall */}
          <div className="bookshelf-wall left space-y-12" style={{ 
            transform: isMobile 
              ? `translateY(-50%) rotateY(15deg) translateZ(-150px) translateX(-5%)` 
              : `translateY(-50%) rotateY(20deg) translateZ(-150px) translateX(-15%)`, 
            position: 'absolute', 
            top: isMobile ? '40%' : '50%', 
            left: isMobile ? '0%' : '5%', 
            width: isMobile ? '30%' : '30%',
            transformStyle: 'preserve-3d',
            pointerEvents: 'auto',
            height: '90vh',
            gap: isMobile ? '3rem' : '2rem',
            padding: isMobile ? '4rem 1rem' : '2rem'
          }}>
            {leftShelves.map((shelf) => (
              <ShelfUnit key={shelf.id} shelf={shelf} position="left" />
            ))}
          </div>

          {/* Center Wall */}
          <div className="bookshelf-wall center space-y-8" style={{ 
            transform: isMobile 
              ? `translate(-50%, -50%) translateZ(-200px)` 
              : `translate(-50%, -50%) translateZ(-200px)`, 
            position: 'absolute', 
            top: isMobile ? '40%' : '50%', 
            left: '50%', 
            width: isMobile ? '40%' : '40%',
            transformStyle: 'preserve-3d',
            pointerEvents: 'auto',
            height: '90vh',
            gap: isMobile ? '3rem' : '2rem',
            padding: isMobile ? '4rem 1rem' : '2rem'
          }}>
            {centerShelves.map((shelf) => (
              <ShelfUnit key={shelf.id} shelf={shelf} position="center" />
            ))}
          </div>

          {/* Right Wall */}
          <div className="bookshelf-wall right space-y-12" style={{ 
            transform: isMobile 
              ? `translateY(-50%) rotateY(-15deg) translateZ(-150px) translateX(5%)` 
              : `translateY(-50%) rotateY(-20deg) translateZ(-150px) translateX(15%)`, 
            position: 'absolute', 
            top: isMobile ? '40%' : '50%', 
            right: isMobile ? '0%' : '5%', 
            width: isMobile ? '30%' : '30%',
            transformStyle: 'preserve-3d',
            pointerEvents: 'auto',
            height: '90vh',
            gap: isMobile ? '3rem' : '2rem',
            padding: isMobile ? '4rem 1rem' : '2rem'
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

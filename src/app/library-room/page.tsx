"use client";

import React, { useState, useEffect, useRef } from "react";
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
    name: "a girl's life",
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

  // Calculate random variations for each book
  const bookVariations = [...Array(5)].map(() => ({
    tilt: Math.random() * 2 - 1,
    width: Math.floor(Math.random() * 10) + 25, // Slightly wider books
    height: Math.floor(Math.random() * 5) + 95,
  }));

  return (
    <div className={`bookshelf-unit`}>
      {/* Back panel */}
      <div className="shelf-back" />
      
      {/* Side panels */}
      <div className="shelf-left" />
      <div className="shelf-right" />
      
      {/* Shelf title with improved visibility */}
      <div className="shelf-title">
        <h2 data-dewey={shelf.id}>
          {shelf.id} - {shelf.name}
        </h2>
        <p>{shelf.description}</p>
      </div>
      
      <div className={`book-row ${isCenter ? "h-20" : "h-20"}`}>
        {[...Array(5)].map((_, i) => {
          const book = shelfBooks[i] || {
            title: `${shelf.name} - Volume ${i + 1}`,
            color: getRandomBookColor(),
            content: `This section contains information about ${shelf.name.toLowerCase()}.`
          };
          
          return (
            <button
              key={i}
              className="book-spine"
              onClick={() => handleBookClick(i)}
              style={{
                backgroundColor: book.color,
                width: `${bookVariations[i].width}px`,
                height: `${bookVariations[i].height}%`,
                transform: `rotate(${bookVariations[i].tilt}deg)`,
                transformStyle: 'preserve-3d',
                margin: '0 1px',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                touchAction: 'manipulation',
                pointerEvents: 'auto'
              }}
            >
              <h3 className="whitespace-normal px-1">{book.title}</h3>
              
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
  const [roomRotation, setRoomRotation] = useState({ x: 0, y: 0 });
  const [isGyroAvailable, setIsGyroAvailable] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [initialTouchDistance, setInitialTouchDistance] = useState(0);
  const roomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial zoom for mobile and desktop
    setZoom(isMobile ? 0.75 : 0.9);
    
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
      setZoom(window.innerWidth <= 768 ? 0.75 : 0.9);
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
      const newZoom = Math.max(0.4, Math.min(1.5, zoom - (e.deltaY * 0.001)));
      setZoom(newZoom);
    }
  };

  return (
    <div 
      className="library-room" 
      style={{ 
        touchAction: isMobile ? 'auto' : 'none',
        pointerEvents: isMobile ? 'auto' : 'none'
      }}
      {...(!isMobile && {
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        onWheel: handleWheel
      })}
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

      {!isMobile ? (
        <>
          {/* Desktop view content */}
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
            height: '100%',
            position: 'fixed',
            inset: 0,
            transformStyle: 'preserve-3d',
            perspective: '2000px',
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
                top: isMobile ? '35%' : '35%',
                left: '50%', 
                width: isMobile ? '35%' : '35%',
                transformStyle: 'preserve-3d',
                pointerEvents: 'auto',
                height: isMobile ? '80vh' : '80vh',
                gap: isMobile ? '2rem' : '1.5rem',
                padding: isMobile ? '3rem 1rem' : '1.5rem'
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
        </>
      ) : (
        <div className="w-full">
          {/* Exit door for mobile */}
          <div
            onClick={() => router.push('/entrance')}
            className="fixed top-4 right-4 w-10 h-14 cursor-pointer z-[9999]"
            style={{ 
              pointerEvents: 'auto'
            }}
          >
            {/* Door frame */}
            <div className="absolute inset-0 bg-[#2b1810]"
                 style={{
                   borderRadius: '0 0 4px 4px',
                   borderTopLeftRadius: '999px',
                   borderTopRightRadius: '999px'
                 }}>
              {/* Door frame trim */}
              <div className="absolute inset-0 border border-[#8B4513]"
                   style={{
                     borderRadius: '0 0 4px 4px',
                     borderTopLeftRadius: '999px',
                     borderTopRightRadius: '999px'
                   }} />
            </div>
            
            {/* Door */}
            <div className="absolute inset-0.5 bg-[#5E3023]"
                 style={{
                   borderRadius: '0 0 3px 3px',
                   borderTopLeftRadius: '999px',
                   borderTopRightRadius: '999px'
                 }}>
              {/* Door handle */}
              <div className="absolute right-1 top-1/2 w-1 h-2 bg-[#DEB887] rounded-sm 
                           transform -translate-y-1/2" />
            </div>
          </div>

          <div className="w-full px-4">
            <div className="space-y-6">
              {leftShelves.map((shelf) => (
                <ShelfUnit key={shelf.id} shelf={shelf} position="left" />
              ))}
              {centerShelves.map((shelf) => (
                <ShelfUnit key={shelf.id} shelf={shelf} position="center" />
              ))}
              {rightShelves.map((shelf) => (
                <ShelfUnit key={shelf.id} shelf={shelf} position="right" />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

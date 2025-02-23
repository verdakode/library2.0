"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Position {
  left: number;
  top: number;
}

interface Painting {
  id: string;
  src: string;
  size: [number, number];
  position?: Position;
}

const paintings: Painting[] = [
  {
    id: "1",
    src: "/images/librarypic.jpeg",
    size: [800, 600],
  },
  {
    id: "2",
    src: "/images/minecraftbookshelf.png",
    size: [400, 400],
  },
  //{
   // id: "2",
    //src: "/images/art/painting1.jpg",
    //size: [600, 800],
  //},
  //{
    //id: "3",
    //src: "/images/art/painting2.jpg",
    //size: [700, 500],
  //},
    //{
    //id: "4",
    //src: "/images/librarypic.jpeg",
    //size: [800, 600],
  //},
  //{
    //id: "5",
    //src: "/images/librarypic.jpeg",
    //size: [800, 600],
  //},
  //{
    //id: "6",
    //src: "/images/librarypic.jpeg",
    //size: [800, 600],
  //},
  // Add more paintings as needed
];

export default function ArtRoom() {
  const router = useRouter();
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(null);
  const [positionedPaintings, setPositionedPaintings] = useState<Painting[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const positionPaintings = () => {
      if (!galleryRef.current) return;

      const galleryWidth = galleryRef.current.clientWidth;
      const galleryHeight = galleryRef.current.clientHeight;
      
      if (isMobile) {
        // Mobile layout: stack paintings vertically with consistent sizing
        const maxWidth = Math.min(galleryWidth - 40, 400); // Max width of 400px or gallery width - 40px padding
        
        const result = paintings.map((painting) => {
          const aspectRatio = painting.size[0] / painting.size[1];
          const width = maxWidth;
          const height = width / aspectRatio;

          return {
            ...painting,
            position: { left: 0, top: 0 }, // Position handled by CSS flexbox
            size: [width, height] as [number, number],
          };
        });

        setPositionedPaintings(result);
      } else {
        // Desktop layout: position paintings in a grid
        const padding = 80;
        const spacing = 60;
        const maxGalleryHeight = galleryHeight * 0.8;
        const maxRowWidth = galleryWidth - (padding * 2);

        let currentX = padding;
        let currentRow = 0;
        const rowHeight = maxGalleryHeight / 2;
        
        const result = paintings.map((painting) => {
          const aspectRatio = painting.size[0] / painting.size[1];
          const height = rowHeight;
          const width = height * aspectRatio;

          if (currentX + width > maxRowWidth) {
            currentX = padding;
            currentRow++;
          }

          const position: Position = {
            left: currentX,
            top: padding + (currentRow * (rowHeight + spacing)),
          };

          currentX += width + spacing;

          return {
            ...painting,
            position,
            size: [width, height] as [number, number],
          };
        });

        setPositionedPaintings(result);
      }
    };

    positionPaintings();
    window.addEventListener('resize', positionPaintings);
    return () => window.removeEventListener('resize', positionPaintings);
  }, [isMobile]);

  return (
    <div className="art-room">
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

      {/* Gallery Title */}
      <div className="gallery-title">
        <h1>Verda&apos;s Art</h1>
        <div className="title-underline"></div>
      </div>

      {/* Room lighting effect */}
      <div className="room-lighting" />

      {/* Art Gallery */}
      <div className="art-gallery" ref={galleryRef}>
        <div className="paintings-container">
          {positionedPaintings.map((painting) => (
            <div
              key={painting.id}
              className="painting-frame"
              onClick={() => setSelectedPainting(painting)}
              style={{
                width: `${painting.size[0]}px`,
                height: `${painting.size[1]}px`,
                ...(isMobile ? {} : {
                  position: 'absolute',
                  left: `${painting.position?.left}px`,
                  top: `${painting.position?.top}px`,
                  transform: `rotate(${Math.random() * 2 - 1}deg)`,
                }),
              }}
            >
              <div className="painting">
                <Image
                  src={painting.src}
                  alt=""
                  fill
                  style={{ objectFit: 'cover' }}
                  className="painting-image"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Painting Modal */}
      {selectedPainting && (
        <div 
          className="painting-modal" 
          onClick={() => setSelectedPainting(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2100,
          }}
        >
          <div 
            className="painting-modal-content" 
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              backgroundColor: '#2B1810',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)',
            }}
          >
            <Image
              src={selectedPainting.src}
              alt=""
              width={selectedPainting.size[0] * 1.5}
              height={selectedPainting.size[1] * 1.5}
              className="painting-modal-image"
              style={{
                objectFit: 'contain',
                borderRadius: '0.5rem',
              }}
            />
            <button 
              className="painting-modal-close"
              onClick={() => setSelectedPainting(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#5E3023',
                color: '#F5E6D3',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 
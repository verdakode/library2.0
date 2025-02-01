"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

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
    src: "/images/art/painting1.jpg",
    size: [600, 800],
  },
  {
    id: "3",
    src: "/images/art/painting2.jpg",
    size: [700, 500],
  },
  {
    id: "4",
    src: "/images/librarypic.jpeg",
    size: [800, 600],
  },
  {
    id: "5",
    src: "/images/librarypic.jpeg",
    size: [800, 600],
  },
  {
    id: "6",
    src: "/images/librarypic.jpeg",
    size: [800, 600],
  },
  // Add more paintings as needed
];

export default function ArtRoom() {
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(null);
  const [positionedPaintings, setPositionedPaintings] = useState<Painting[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const positionPaintings = () => {
      if (!galleryRef.current) return;

      const galleryWidth = galleryRef.current.clientWidth;
      const galleryHeight = galleryRef.current.clientHeight;
      const padding = 40; // Padding from gallery edges
      const spacing = 40; // Space between paintings

      // Calculate maximum dimensions that would fit in the gallery
      const maxGalleryHeight = galleryHeight * 0.7; // Use 70% of gallery height
      const maxRowWidth = galleryWidth - (padding * 2); // Available width for paintings

      let currentX = padding;
      let currentRow = 0;
      const rowHeight = maxGalleryHeight / 2; // Two rows of paintings
      
      const result = paintings.map((painting, index) => {
        // Calculate scaled dimensions while maintaining aspect ratio
        const aspectRatio = painting.size[0] / painting.size[1];
        const height = rowHeight;
        const width = height * aspectRatio;

        // Check if we need to move to next row
        if (currentX + width > maxRowWidth) {
          currentX = padding;
          currentRow++;
        }

        // Calculate vertical position
        const top = padding + (currentRow * (rowHeight + spacing));

        // Position painting
        const position: Position = {
          left: currentX,
          top,
        };

        // Update x position for next painting
        currentX += width + spacing;

        return {
          ...painting,
          position,
          size: [width, height] as [number, number],
        };
      });

      setPositionedPaintings(result);
    };

    // Initial positioning
    positionPaintings();

    // Reposition on window resize
    const handleResize = () => {
      positionPaintings();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="art-room">
      {/* Room lighting effect */}
      <div className="room-lighting" />

      {/* Art Gallery */}
      <div className="art-gallery" ref={galleryRef}>
        {positionedPaintings.map((painting) => (
          <div
            key={painting.id}
            className="painting-frame"
            onClick={() => setSelectedPainting(painting)}
            style={{
              left: `${painting.position?.left}px`,
              top: `${painting.position?.top}px`,
              width: `${painting.size[0]}px`,
              height: `${painting.size[1]}px`,
            }}
          >
            <div className="painting">
              <Image
                src={painting.src}
                alt=""
                width={painting.size[0]}
                height={painting.size[1]}
                className="painting-image"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Selected Painting Modal */}
      {selectedPainting && (
        <div className="painting-modal" onClick={() => setSelectedPainting(null)}>
          <div className="painting-modal-content" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedPainting.src}
              alt=""
              width={selectedPainting.size[0]}
              height={selectedPainting.size[1]}
              className="painting-modal-image"
            />
            <button 
              className="painting-modal-close"
              onClick={() => setSelectedPainting(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 
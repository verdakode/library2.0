"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProjectCarousel from "../../components/shared/ProjectCarousel";
import { projectCarousels } from "../../data/projects";

interface Position {
  left: number;
  top: number;
}

interface Painting {
  id: string;
  src: string;
  size: [number, number];
  position?: Position;
  title?: string;
  description?: string;
  additionalImage?: string;
  ref: React.RefObject<HTMLDivElement>;
}

const paintings: Painting[] = [
  {
    id: "1",
    src: "/images/electionneedle2.png",
    size: [800, 600],
    title: "Election Needle Analysis",
    description: "A visual representation of election predictions and their real-time changes. Click to see the comparison between two key moments.",
    additionalImage: "/images/electionneedle1.png",
    ref: React.createRef<HTMLDivElement>()
  },
  {
    id: "2",
    src: "/images/librarypic.jpeg",
    size: [800, 600],
    title: "Digital Library Concept",
    description: "A conceptual visualization of the digital library interface.",
    ref: React.createRef<HTMLDivElement>()
  },
  {
    id: "3",
    src: "/images/minecraftbookshelf.png",
    size: [400, 400],
    title: "Minecraft Bookshelf Icon",
    description: "A pixelated bookshelf icon inspired by Minecraft's aesthetic.",
    ref: React.createRef<HTMLDivElement>()
  },
];


export default function ArtRoom() {
  const router = useRouter();
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(null);
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

      {/* Room lighting effect */}
      <div className="room-lighting" />

      {/* Art Gallery */}
      <div className="art-gallery" ref={galleryRef}>
        <div className="paintings-container">
          {paintings.map((painting) => (
            <div
              key={painting.id}
              className="painting-frame"
              onClick={() => setSelectedPainting(painting)}
              style={{
                '--aspect-ratio': `${painting.size[0]}/${painting.size[1]}`
              } as React.CSSProperties}
            >
              <div className="painting">
                <Image
                  src={painting.src}
                  alt={painting.title || ""}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="painting-image"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              {painting.title && (
                <div className="painting-title">
                  <span>{painting.title}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Project Carousels */}
      <div className="project-carousels-section">
        <h2 className="carousels-section-title">Engineering Projects</h2>
        <div className="project-carousels-container">
          {projectCarousels.map((project, index) => (
            <ProjectCarousel
              key={index}
              title={project.title}
              images={project.images}
              description={project.description}
            />
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
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2100,
            padding: isMobile ? '1rem' : '2rem'
          }}
        >
          <div 
            className="painting-modal-content" 
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '90vw',
              maxHeight: isMobile ? '100vh' : '90vh',
              backgroundColor: '#2B1810',
              padding: isMobile ? '1rem' : '2rem',
              borderRadius: '1rem',
              boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '1rem' : '1.5rem',
              overflowY: 'auto'
            }}
          >
            {selectedPainting.title && (
              <h2 style={{
                color: '#F5E6D3',
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                fontFamily: 'Cinzel, serif',
                marginBottom: '0.5rem',
                textAlign: 'center',
                paddingRight: '3rem'
              }}>
                {selectedPainting.title}
              </h2>
            )}
            
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              width: '100%'
            }}>
              <Image
                src={selectedPainting.src}
                alt=""
                width={selectedPainting.size[0]}
                height={selectedPainting.size[1]}
                className="painting-modal-image"
                style={{
                  objectFit: 'contain',
                  borderRadius: '0.5rem',
                  maxHeight: isMobile ? '40vh' : '60vh',
                  width: 'auto',
                  maxWidth: '100%'
                }}
              />
              
              {selectedPainting.additionalImage && (
                <Image
                  src={selectedPainting.additionalImage}
                  alt=""
                  width={selectedPainting.size[0]}
                  height={selectedPainting.size[1]}
                  className="painting-modal-image"
                  style={{
                    objectFit: 'contain',
                    borderRadius: '0.5rem',
                    maxHeight: isMobile ? '40vh' : '60vh',
                    width: 'auto',
                    maxWidth: '100%'
                  }}
                />
              )}
            </div>

            {selectedPainting.description && (
              <p style={{
                color: '#F5E6D3',
                fontSize: isMobile ? '1rem' : '1.1rem',
                lineHeight: '1.6',
                fontFamily: 'Cormorant Garamond, serif',
                maxWidth: '800px',
                margin: '0 auto',
                textAlign: 'center',
                padding: isMobile ? '0' : '0 1rem'
              }}>
                {selectedPainting.description}
              </p>
            )}

            <button 
              className="painting-modal-close"
              onClick={() => setSelectedPainting(null)}
              style={{
                position: 'absolute',
                top: isMobile ? '0.5rem' : '1rem',
                right: isMobile ? '0.5rem' : '1rem',
                padding: isMobile ? '0.3rem 0.8rem' : '0.5rem 1rem',
                backgroundColor: '#5E3023',
                color: '#F5E6D3',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'Cinzel, serif',
                fontSize: isMobile ? '0.9rem' : '1rem'
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
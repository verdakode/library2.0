"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/paths";

export default function VerdasStoryRoom() {
  const router = useRouter();

  return (
    <div className="library-room" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #2B1810 0%, #1a0f0a 100%)',
      padding: '2rem',
      position: 'relative'
    }}>
      {/* Back button */}
      <button
        onClick={() => router.push(ROUTES.ENTRANCE)}
        aria-label="Back to Entrance"
        className="fixed top-4 left-4 px-4 py-2 bg-[#2B1810] text-[#F5E6D3] rounded-lg 
                  hover:bg-[#5E3023] transition-colors z-50
                  shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
      >
        <span>← Back to Entrance</span>
      </button>

      {/* Under Construction Content */}
      <div style={{
        textAlign: 'center',
        maxWidth: '600px',
        zIndex: 10
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#F5E6D3',
          marginBottom: '1rem',
          fontFamily: 'serif',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}>
          Under Construction
        </h1>
        
        <p style={{
          fontSize: '1.25rem',
          color: '#F5E6D3',
          marginBottom: '2rem',
          opacity: 0.9,
          lineHeight: '1.6'
        }}>
          Verda&apos;s Story Room is currently being built. 
          Please check back soon!
        </p>

        <div style={{
          marginTop: '3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          alignItems: 'center'
        }}>
          <p style={{
            fontSize: '1.1rem',
            color: '#F5E6D3',
            opacity: 0.8,
            marginBottom: '0.5rem'
          }}>
            In the meantime, explore the other rooms:
          </p>

          <button
            onClick={() => router.push(ROUTES.ART_ROOM)}
            className="px-6 py-3 bg-[#2B1810] text-[#F5E6D3] rounded-lg 
                      hover:bg-[#5E3023] transition-colors
                      shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200
                      border-2 border-[#F5E6D3]/30 hover:border-[#F5E6D3]/60"
            style={{
              fontSize: '1.1rem',
              fontWeight: '500',
              minWidth: '200px'
            }}
          >
            🎨 Art Gallery
          </button>

          <button
            onClick={() => router.push(ROUTES.LIBRARY_ROOM)}
            className="px-6 py-3 bg-[#2B1810] text-[#F5E6D3] rounded-lg 
                      hover:bg-[#5E3023] transition-colors
                      shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200
                      border-2 border-[#F5E6D3]/30 hover:border-[#F5E6D3]/60"
            style={{
              fontSize: '1.1rem',
              fontWeight: '500',
              minWidth: '200px'
            }}
          >
            📚 The Library
          </button>
        </div>
      </div>
    </div>
  );
}

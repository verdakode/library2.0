"use client";

import React from "react";

interface LoadingTransitionProps {
  isVisible: boolean;
}

export default function LoadingTransition({ isVisible }: LoadingTransitionProps) {
  if (!isVisible) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#2B1810',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none'
      }}
    >
      <div 
        style={{
          color: '#F5E6D3',
          fontFamily: 'Cinzel, serif',
          fontSize: '1.2rem',
          letterSpacing: '0.1em',
          opacity: 0.8
        }}
      >
        Loading...
      </div>
    </div>
  );
}
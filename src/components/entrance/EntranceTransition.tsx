'use client';

import React, { useEffect, useState } from 'react';

interface EntranceTransitionProps {
  onComplete: () => void;
}

export const EntranceTransition: React.FC<EntranceTransitionProps> = ({ onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      onComplete();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-amber-900 z-50 transition-opacity duration-1000
                 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-amber-50 text-2xl">
          Welcome to the Library
        </div>
      </div>
    </div>
  );
}; 
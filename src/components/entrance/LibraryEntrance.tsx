"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const LibraryEntrance: React.FC = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleEnter = () => {
    setIsHovered(true);
    const doorElement = document.getElementById("library-door");
    if (doorElement) {
      doorElement.style.transform = "perspective(1000px) rotateY(-30deg)";
    }
    setTimeout(() => {
      router.push("/entrance");
    }, 600);
  };

  return (
    <div
      className="relative w-full h-full cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleEnter}
    >
      <div
        className={`absolute inset-0 bg-amber-500/20 mix-blend-soft-light opacity-0 
                      group-hover:opacity-100 transition-opacity duration-500 z-20`}
      />

      <div
        id="library-door"
        className="relative w-full h-full transition-transform duration-500 origin-left"
      >
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300
                        ${isHovered ? "opacity-20" : "opacity-30"} z-10`}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 to-amber-700" />

        {!imageError && (
          <Image
            src="/images/librarypic.jpeg"
            alt="Library Entrance"
            fill
            className="object-cover transition-all duration-500
                     group-hover:scale-105"
            priority
            onError={(e) => {
              console.error("Image failed to load:", e);
              setImageError(true);
            }}
          />
        )}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
        <span
          className="px-8 py-4 bg-amber-800/80 text-amber-50 text-2xl rounded-lg 
                      border-2 border-amber-600/50 backdrop-blur-sm
                      transition-all duration-300 mb-4
                      transform group-hover:scale-110 group-hover:bg-amber-700/80"
        >
          Enter the Library
        </span>
        <span
          className="text-amber-100/80 text-lg transition-opacity duration-300
                      opacity-0 group-hover:opacity-100"
        >
          Click anywhere to enter
        </span>
      </div>
    </div>
  );
};

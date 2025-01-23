"use client";

import React, { useState } from "react";

interface BookSpineProps {
  title: string;
  author?: string;
  color?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}

export const BookSpine: React.FC<BookSpineProps> = ({
  title,
  author,
  color = "bg-amber-700",
  width = 40,
  height = 200,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPulled, setIsPulled] = useState(false);

  const handleClick = () => {
    setIsPulled(true);
    setTimeout(() => {
      onClick?.();
      setIsPulled(false);
    }, 300);
  };

  return (
    <div
      className="relative"
      style={{ width: `${width}px`, height: `${height}px` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPulled(false);
      }}
      onClick={handleClick}
    >
      <div
        className={`absolute inset-0 ${color} rounded-r shadow-lg cursor-pointer
                   transition-all duration-300 origin-left
                   hover:shadow-xl
                   ${isHovered ? "translate-x-2" : ""}
                   ${isPulled ? "translate-x-8 rotate-y-12" : ""}`}
      >
        {/* Book spine content */}
        <div className="h-full flex flex-col items-center justify-center p-2">
          <span
            className="text-white font-medium -rotate-90 whitespace-nowrap text-sm
                     tracking-wide uppercase"
          >
            {title}
          </span>
          {author && (
            <span
              className="text-white/70 font-medium -rotate-90 whitespace-nowrap text-xs
                       tracking-wide mt-2"
            >
              {author}
            </span>
          )}
        </div>

        {/* Book spine decorative elements */}
        <div className="absolute inset-y-4 left-0 w-[2px] bg-amber-200/20" />
        <div className="absolute inset-y-4 right-0 w-[1px] bg-black/20" />
      </div>
    </div>
  );
};

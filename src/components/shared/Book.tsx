"use client";

import React from "react";

interface BookProps {
  title: string;
  author?: string;
  content: string | React.ReactNode;
  onClose: () => void;
}

export const Book: React.FC<BookProps> = ({ title, author, content, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="bg-amber-50 w-full max-w-4xl h-[80vh] rounded-lg shadow-2xl 
                    flex overflow-hidden"
      >
        {/* Left page */}
        <div className="flex-1 p-8 border-r border-amber-200">
          <div className="h-full flex flex-col">
            <h1 className="text-3xl font-bold text-amber-900 mb-2">{title}</h1>
            {author && <h2 className="text-xl text-amber-700 mb-6">by {author}</h2>}
            <div className="flex-1 overflow-y-auto prose prose-amber">{content}</div>
          </div>
        </div>

        {/* Right page - decorative */}
        <div className="flex-1 p-8 bg-amber-100/50">
          <div className="h-full flex flex-col items-center justify-center">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-amber-700 text-amber-50 rounded-lg
                       hover:bg-amber-600 transition-colors"
            >
              Close Book
            </button>
          </div>
        </div>

        {/* Book binding shadow */}
        <div
          className="absolute inset-y-0 left-1/2 w-8 bg-gradient-to-r 
                      from-amber-900/10 to-transparent transform -translate-x-1/2"
        />
      </div>
    </div>
  );
};

"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { SHELF_BOOKS } from '@/data/books';
import { shelves } from '@/data/shelves';

export default function BookPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [shelfId, bookNumber] = params.id.split('-');
  
  const shelf = shelves.find(s => s.id === shelfId);
  if (!shelf) return null;

  const shelfBooks = SHELF_BOOKS[shelfId] || [];
  const bookIndex = parseInt(bookNumber) - 1;
  const book = shelfBooks[bookIndex] || {
    title: `${shelf.name} - Volume ${bookNumber}`,
    content: `# ${shelf.name} - Volume ${bookNumber}

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

  return (
    <div className="min-h-screen bg-[#F5E6D3] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <button
          onClick={() => router.back()}
          className="mb-8 px-4 py-2 bg-[#2B1810] text-[#F5E6D3] rounded-lg hover:bg-[#5E3023] transition-colors
                    shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          ← Back to Library
        </button>

        {/* Book Content */}
        <div className="bg-white rounded-lg shadow-2xl p-12"
             style={{
               backgroundImage: 'linear-gradient(to bottom, #F5E6D3, #E8D5BC)',
               boxShadow: '0 10px 30px rgba(0,0,0,0.3), inset 0 0 100px rgba(255,255,255,0.2)'
             }}>
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-[#2B1810] mb-8 pb-4 border-b border-[#2B1810]/20">
              {book.title}
            </h1>
            <div className="text-[#2B1810] leading-relaxed whitespace-pre-wrap markdown-content">
              {book.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
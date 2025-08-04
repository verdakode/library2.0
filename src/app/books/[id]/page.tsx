"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { SHELF_BOOKS } from '@/data/books';
import { shelves } from '@/data/shelves';
import { marked } from 'marked';

export default function BookPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [shelfId, bookNumber] = params.id.split('-');
  
  const shelf = shelves.find(s => s.id === shelfId);
  if (!shelf) return null;

  const shelfBooks = SHELF_BOOKS[shelfId] || [];
  const bookIndex = parseInt(bookNumber) - 1;
  const book = shelfBooks[bookIndex];
  
  if (!book) {
    return (
      <div className="min-h-screen bg-[#F5E6D3] p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="mb-8 px-4 py-2 bg-[#2B1810] text-[#F5E6D3] rounded-lg hover:bg-[#5E3023] transition-colors
                      shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            ← Back to Library
          </button>
          <div className="bg-white rounded-lg shadow-2xl p-12 text-center">
            <h1 className="text-4xl font-bold text-[#2B1810] mb-8">Book Not Found</h1>
            <p className="text-[#2B1810] text-lg">This book doesn't exist in the collection.</p>
          </div>
        </div>
      </div>
    );
  }

  // Parse markdown with marked
  const parsedContent = marked(book.content, {
    gfm: true, // GitHub Flavored Markdown
    breaks: true, // Convert line breaks to <br>
  });

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
        <div className="bg-white rounded-lg shadow-2xl p-12 overflow-hidden"
             style={{
               backgroundImage: 'linear-gradient(to bottom, #F5E6D3, #E8D5BC)',
               boxShadow: '0 10px 30px rgba(0,0,0,0.3), inset 0 0 100px rgba(255,255,255,0.2)'
             }}>
          <article className="prose prose-lg max-w-none prose-headings:text-[#2B1810] prose-p:text-[#2B1810] prose-strong:text-[#2B1810] prose-em:text-[#2B1810]/80">
            <h1 className="text-4xl font-bold text-[#2B1810] mb-8 pb-4 border-b border-[#2B1810]/20">
              {book.title}
            </h1>
            <div 
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: parsedContent
              }} 
            />
          </article>
        </div>
      </div>
    </div>
  );
} 
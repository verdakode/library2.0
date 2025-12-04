"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { SHELF_BOOKS } from '@/data/books';
import { shelves } from '@/data/shelves';
import { marked } from 'marked';
import { GuestBook } from '@/components/features/guestbook/GuestBook';
import '@/styles/book-page.css';

export default function BookPage() {
  const router = useRouter();
  const params = useParams();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) {
      setLoading(false);
      return;
    }

    const id = typeof params.id === 'string' ? params.id : params.id[0];
    const [shelfId, bookNumber] = id.split('-');
    
    const shelf = shelves.find(s => s.id === shelfId);
    if (!shelf) {
      setLoading(false);
      return;
    }

    const shelfBooks = SHELF_BOOKS[shelfId] || [];
    const bookIndex = parseInt(bookNumber) - 1;
    const foundBook = shelfBooks[bookIndex];
    
    setBook(foundBook);
    setLoading(false);
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5E6D3] p-8 flex items-center justify-center">
        <div className="text-[#2B1810] text-xl">Loading...</div>
      </div>
    );
  }

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
            <p className="text-[#2B1810] text-lg">This book doesn&apos;t exist in the collection.</p>
          </div>
        </div>
      </div>
    );
  }

  // Check if this is the guest book
  const isGuestBook = book.id === '300-1';

  // If it's the guest book, show the GuestBook component instead
  if (isGuestBook) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-amber-50 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <button
            onClick={() => router.back()}
            className="mb-8 px-4 py-2 bg-amber-800 text-amber-50 rounded-lg hover:bg-amber-700 transition-colors
                      shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            ← Back to Library
          </button>

          {/* Guest Book Component */}
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <GuestBook />
          </div>
        </div>
      </div>
    );
  }

  // Parse markdown with marked
  const parsedContent = marked(book.content, {
    gfm: true, // GitHub Flavored Markdown
    breaks: true, // Convert line breaks to <br>
  }) as string;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-amber-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <button
          onClick={() => router.back()}
          className="mb-8 px-4 py-2 bg-amber-800 text-amber-50 rounded-lg hover:bg-amber-700 transition-colors
                    shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          ← Back to Library
        </button>

        {/* Single Book Page */}
        <div className="relative mx-auto max-w-2xl">
          {/* Drop shadow */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-[98%] h-6 bg-black/20 blur-lg rounded-sm"></div>
          
          <div 
            className="bg-white shadow-2xl relative min-h-[800px]"
            style={{
              background: `
                linear-gradient(145deg, #fffef9 0%, #fefbf3 100%),
                url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><defs><pattern id="paper-grain" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"><rect width="100" height="100" fill="%23fffef9"/><circle cx="25" cy="25" r="0.4" fill="%23f0ebe1" opacity="0.15"/><circle cx="75" cy="75" r="0.3" fill="%23e8dcc6" opacity="0.2"/><circle cx="50" cy="10" r="0.2" fill="%23ddd2b8" opacity="0.1"/><circle cx="15" cy="85" r="0.3" fill="%23f0ebe1" opacity="0.18"/></pattern></defs><rect width="100" height="100" fill="url(%23paper-grain)"/></svg>')
              `,
              boxShadow: '0 20px 40px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.1)'
            }}
          >
            {/* Dog ear corner */}
            <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
              <div className="absolute top-0 right-0 w-0 h-0 border-t-12 border-r-12 border-t-amber-50 border-r-transparent"></div>
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-amber-50 to-amber-100 transform rotate-45 origin-top-right -translate-x-6 -translate-y-6 shadow-sm"></div>
            </div>
            
            {/* Left margin line (like notebook paper) */}
            <div className="absolute left-16 top-0 bottom-0 w-px bg-red-300/30"></div>
            
            {/* Page content with FORCED margins */}
            <div style={{
              paddingLeft: '80px',
              paddingRight: '64px', 
              paddingTop: '80px',
              paddingBottom: '80px'
            }}>
              {/* Book title */}
              <div style={{
                textAlign: 'center',
                marginBottom: '64px',
                paddingBottom: '32px',
                borderBottom: '1px solid #e7e5e4'
              }}>
                <h1 style={{
                  fontSize: '2.25rem',
                  fontWeight: 'bold',
                  color: '#292524',
                  marginBottom: '16px',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  lineHeight: '1.2'
                }}>
                  {book.title}
                </h1>
                <div style={{
                  width: '128px',
                  height: '2px',
                  background: 'linear-gradient(to right, transparent, #a8a29e, transparent)',
                  margin: '0 auto'
                }}></div>
              </div>

              {/* Book content with FORCED spacing */}
              <div 
                style={{ 
                  fontFamily: 'Georgia, "Times New Roman", serif !important',
                  fontSize: '16px !important',
                  lineHeight: '1.8 !important',
                  color: '#57534e !important',
                  margin: '0 !important',
                  padding: '0 !important'
                }}
                dangerouslySetInnerHTML={{ 
                  __html: parsedContent.replace(
                    /<([h1-6])[^>]*>/g, 
                    '<$1 style="color: #292524 !important; font-family: Georgia, serif !important; font-weight: bold !important; margin-bottom: 24px !important; margin-top: 32px !important;">'
                  ).replace(
                    /<p[^>]*>/g,
                    '<p style="margin-bottom: 24px !important; line-height: 1.8 !important; color: #57534e !important;">'
                  ).replace(
                    /<ul[^>]*>/g,
                    '<ul style="margin-bottom: 24px !important; margin-left: 24px !important; color: #57534e !important;">'
                  ).replace(
                    /<li[^>]*>/g,
                    '<li style="margin-bottom: 8px !important; padding-left: 8px !important; color: #57534e !important;">'
                  )
                }} 
              />
            </div>
            
            {/* Page number */}
            <div className="absolute bottom-6 right-16">
              <span className="text-sm text-stone-500 font-serif">1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
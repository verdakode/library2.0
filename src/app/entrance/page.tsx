'use client';

import React from 'react';
import Link from 'next/link';

const shelves = [
  {
    id: '000',
    name: 'Generalities',
    description: 'Tools, Hacks, General Knowledge',
    color: 'from-[#4A3B27] to-[#785C38]',
  },
  {
    id: '100',
    name: 'Philosophy',
    description: 'Personal Philosophy, Life Events',
    color: 'from-[#5C4033] to-[#8B4513]',
  },
  {
    id: '200',
    name: 'Spirituality',
    description: 'Personal Growth, Meditation',
    color: 'from-[#785C38] to-[#C4A484]',
  },
  {
    id: '300',
    name: 'Social',
    description: 'Guestbook, Social Connections',
    color: 'from-[#8B4513] to-[#D2691E]',
  },
  {
    id: '400',
    name: 'Language',
    description: 'Writing, Blog Posts',
    color: 'from-[#4A3B27] to-[#785C38]',
  },
  {
    id: '500',
    name: 'Science',
    description: 'Health Tracking, Data',
    color: 'from-[#5C4033] to-[#8B4513]',
  },
  {
    id: '600',
    name: 'Technology',
    description: 'Tech Projects Archive',
    color: 'from-[#785C38] to-[#C4A484]',
  },
  {
    id: '700',
    name: 'Arts',
    description: 'Media Consumption, Creative Works',
    color: 'from-[#8B4513] to-[#D2691E]',
  },
  {
    id: '800',
    name: 'Literature',
    description: 'Reading List, Book Notes',
    color: 'from-[#4A3B27] to-[#785C38]',
  },
  {
    id: '900',
    name: 'History',
    description: 'Personal Timeline, Memory Archive',
    color: 'from-[#5C4033] to-[#8B4513]',
  },
];

// Split shelves into three sections for the walls
const leftShelves = shelves.slice(0, 3);
const centerShelves = shelves.slice(3, 7);
const rightShelves = shelves.slice(7);

interface Shelf {
  id: string;
  name: string;
  description: string;
  color: string;
}

interface ShelfUnitProps {
  shelf: Shelf;
  position: 'left' | 'center' | 'right';
}

const bookColors = [
  'var(--leather-dark)',
  'var(--leather-medium)',
  'var(--leather-light)',
  'var(--book-brown1)',
  'var(--book-brown2)',
  'var(--book-brown3)',
  'var(--book-brown1)',
  'var(--book-brown2)',
  'var(--book-red)',
  'var(--book-green)',
  'var(--book-blue)',
  'var(--book-burgundy)'
];

const ShelfUnit = ({ shelf, position }: ShelfUnitProps) => {
  const isCenter = position === 'center';
  const [selectedBook, setSelectedBook] = React.useState<number | null>(null);
  
  const sampleBooks = [
    { title: "Introduction to " + shelf.name, content: "Sample content about " + shelf.name.toLowerCase() },
    { title: "Guide to " + shelf.name, content: "Exploring " + shelf.name.toLowerCase() },
    { title: "Advanced " + shelf.name, content: "Deep dive into " + shelf.name.toLowerCase() },
    { title: shelf.name + " Principles", content: "Core principles of " + shelf.name.toLowerCase() },
    { title: "Modern " + shelf.name, content: "Contemporary approaches to " + shelf.name.toLowerCase() },
    { title: shelf.name + " Studies", content: "Research in " + shelf.name.toLowerCase() },
  ];

  return (
    <div className={`bookshelf-unit ${isCenter ? 'h-48' : 'h-64'}`}>
      <div className="p-4">
        <h2 className={`text-[#F4E4BC] font-semibold mb-2 ${isCenter ? 'text-lg' : 'text-xl'}`} data-dewey={shelf.id}>
          {shelf.name}
        </h2>
        <p className="text-[#F4E4BC]/80 text-sm">{shelf.description}</p>
      </div>
      <div className={`book-row ${isCenter ? 'h-24' : 'h-32'}`}>
        {sampleBooks.map((book, i) => (
          <div
            key={i}
            className="book-spine"
            onClick={() => setSelectedBook(i)}
            style={{
              height: `${80 + Math.random() * 20}%`,
              backgroundColor: bookColors[Math.floor(Math.random() * bookColors.length)],
            }}
          >
            <h3 className={isCenter ? 'text-xs' : 'text-sm'}>{book.title}</h3>
          </div>
        ))}
      </div>
      
      {selectedBook !== null && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-8 z-50" onClick={() => setSelectedBook(null)}>
          <div className="bg-[#F5E6D3] p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-lg shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-[#2B1810] text-2xl font-bold mb-4">{sampleBooks[selectedBook].title}</h2>
            <p className="text-[#2B1810] text-lg leading-relaxed">{sampleBooks[selectedBook].content}</p>
            <button 
              className="mt-6 px-4 py-2 bg-[#2B1810] text-[#F5E6D3] rounded hover:bg-[#5E3023] transition-colors"
              onClick={() => setSelectedBook(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Entrance() {
  return (
    <div className="library-room">
      {/* Room lighting effect */}
      <div className="room-lighting" />
      
      {/* Wooden floor */}
      <div className="wooden-floor" />
      
      {/* Title */}
      <div className="fixed top-8 left-0 right-0 text-center z-10">
        <h1 className="library-title text-5xl">
          Welcome to My Digital Library
        </h1>
      </div>

      {/* Left Wall */}
      <div className="bookshelf-wall left space-y-8">
        {leftShelves.map((shelf) => (
          <ShelfUnit key={shelf.id} shelf={shelf} position="left" />
        ))}
      </div>

      {/* Center Wall */}
      <div className="bookshelf-wall center space-y-4">
        {centerShelves.map((shelf) => (
          <ShelfUnit key={shelf.id} shelf={shelf} position="center" />
        ))}
      </div>

      {/* Right Wall */}
      <div className="bookshelf-wall right space-y-8">
        {rightShelves.map((shelf) => (
          <ShelfUnit key={shelf.id} shelf={shelf} position="right" />
        ))}
      </div>
    </div>
  );
}
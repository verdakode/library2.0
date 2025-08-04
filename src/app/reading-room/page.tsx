"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/paths";
import { SHELF_BOOKS } from "@/data/books";
import { BookSpine } from "@/components/shared/BookSpine";
import { Book } from "@/components/shared/Book";

export default function ReadingRoom() {
  const router = useRouter();
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [tiltX, setTiltX] = useState<number>(0);
  const [tiltY, setTiltY] = useState<number>(0);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [showPermissionButton, setShowPermissionButton] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const orientationRef = useRef<boolean>(false);

  // Prevent hydration mismatch by ensuring client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleBookClick = (bookId: string) => {
    setSelectedBook(bookId);
  };

  const handleCloseBook = () => {
    setSelectedBook(null);
  };

  useEffect(() => {
    if (!isClient) return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (orientationRef.current) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
    };
  }, [isClient]);

  useEffect(() => {
    if (!isClient || !isMobile) return;
    
    // Setup motion sensing for mobile devices
    checkOrientationPermission();
  }, [isClient, isMobile, checkOrientationPermission]);

  const checkOrientationPermission = async () => {
    if (typeof DeviceOrientationEvent !== 'undefined') {
      // Check if we're on iOS and need permission
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isIOS && 'requestPermission' in DeviceOrientationEvent) {
        setShowPermissionButton(true);
      } else {
        // Android and older iOS devices
        startOrientationTracking();
      }
    }
  };

  const requestOrientationPermission = async () => {
    try {
      // Modern iOS devices
      if ('requestPermission' in DeviceOrientationEvent) {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          setPermissionGranted(true);
          setShowPermissionButton(false);
          startOrientationTracking();
        }
      }
    } catch (error) {
      console.error('Error requesting orientation permission:', error);
      // Fallback: try to start tracking anyway
      startOrientationTracking();
    }
  };

  const startOrientationTracking = () => {
    if (typeof DeviceOrientationEvent !== 'undefined') {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
      orientationRef.current = true;
      setPermissionGranted(true);
    }
  };

  const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
    if (event.beta !== null && event.gamma !== null) {
      // beta: front-to-back motion (-180 to 180)
      // gamma: left-to-right motion (-90 to 90)
      setTiltX(event.beta);
      setTiltY(event.gamma);
    }
  };

  // Find the selected book
  const currentBook = selectedBook
    ? Object.values(SHELF_BOOKS)
        .flat()
        .find((book) => book.id === selectedBook)
    : null;

  // Calculate which bookcase to show based on tilt
  const getVisibleBookcase = () => {
    if (!isMobile || !permissionGranted) return 'center';
    
    // Use gamma (left-right tilt) to determine visible bookcase
    if (tiltY < -15) return 'left';  // Tilt left to see left bookcase
    if (tiltY > 15) return 'right';  // Tilt right to see right bookcase
    return 'center'; // Default center bookcase
  };

  // Split books into three bookcases
  const bookEntries = Object.entries(SHELF_BOOKS);
  const booksPerCase = Math.ceil(bookEntries.length / 3);
  const leftBooks = bookEntries.slice(0, booksPerCase);
  const centerBooks = bookEntries.slice(booksPerCase, booksPerCase * 2);
  const rightBooks = bookEntries.slice(booksPerCase * 2);

  const visibleBookcase = getVisibleBookcase();
  
  const getCurrentBooks = () => {
    switch (visibleBookcase) {
      case 'left': return leftBooks;
      case 'right': return rightBooks;
      default: return centerBooks;
    }
  };

  if (currentBook) {
    return (
      <Book
        title={currentBook.title}
        content={currentBook.content}
        onClose={handleCloseBook}
      />
    );
  }

  return (
    <div className="library-room" data-tilt-x={tiltX} data-tilt-y={tiltY} data-bookcase={visibleBookcase}>
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

      {/* Permission button for iOS */}
      {showPermissionButton && (
        <button
          onClick={requestOrientationPermission}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    px-6 py-3 bg-[#2B1810] text-[#F5E6D3] rounded-lg
                    hover:bg-[#5E3023] transition-colors z-50
                    shadow-lg border-2 border-[#F5E6D3]"
        >
          Enable Motion Controls
        </button>
      )}

      {/* Tilt indicator for mobile */}
      {isMobile && permissionGranted && (
        <div className="tilt-indicator">
          <div className="tilt-display">
            <span>Tilt: {visibleBookcase.toUpperCase()}</span>
            <div className="tilt-bars">
              <div 
                className="tilt-bar left" 
                style={{ opacity: visibleBookcase === 'left' ? 1 : 0.3 }} 
              />
              <div 
                className="tilt-bar center" 
                style={{ opacity: visibleBookcase === 'center' ? 1 : 0.3 }} 
              />
              <div 
                className="tilt-bar right" 
                style={{ opacity: visibleBookcase === 'right' ? 1 : 0.3 }} 
              />
            </div>
          </div>
        </div>
      )}

      {/* 3D Bookcase Container */}
      <div className="bookcase-container">
        {/* Left Bookcase */}
        <div className={`bookcase bookcase-left ${isMobile ? 'visible' : (visibleBookcase === 'left' ? 'visible' : '')}`}>
          <div className="bookshelf-wall">
            {leftBooks.map(([shelfId, books]) => (
              <div key={shelfId} className="bookshelf-unit">
                <div className="shelf-title">
                  <h2>{getShelfTitle(shelfId)}</h2>
                  <p>{getShelfDescription(shelfId)}</p>
                </div>
                <div className="book-row">
                  {books.map((book) => (
                    <BookSpine
                      key={book.id}
                      title={book.title}
                      color={book.color}
                      onClick={() => handleBookClick(book.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Bookcase */}
        <div className={`bookcase bookcase-center ${isMobile ? 'visible' : (visibleBookcase === 'center' ? 'visible' : '')}`}>
          <div className="bookshelf-wall">
            {centerBooks.map(([shelfId, books]) => (
              <div key={shelfId} className="bookshelf-unit">
                <div className="shelf-title">
                  <h2>{getShelfTitle(shelfId)}</h2>
                  <p>{getShelfDescription(shelfId)}</p>
                </div>
                <div className="book-row">
                  {books.map((book) => (
                    <BookSpine
                      key={book.id}
                      title={book.title}
                      color={book.color}
                      onClick={() => handleBookClick(book.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Bookcase */}
        <div className={`bookcase bookcase-right ${isMobile ? 'visible' : (visibleBookcase === 'right' ? 'visible' : '')}`}>
          <div className="bookshelf-wall">
            {rightBooks.map(([shelfId, books]) => (
              <div key={shelfId} className="bookshelf-unit">
                <div className="shelf-title">
                  <h2>{getShelfTitle(shelfId)}</h2>
                  <p>{getShelfDescription(shelfId)}</p>
                </div>
                <div className="book-row">
                  {books.map((book) => (
                    <BookSpine
                      key={book.id}
                      title={book.title}
                      color={book.color}
                      onClick={() => handleBookClick(book.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getShelfTitle(shelfId: string): string {
  const titles: { [key: string]: string } = {
    "000": "Computer Science & Information",
    "100": "Philosophy & Psychology",
    "200": "Religion & Theology",
    "300": "Social Sciences",
    "400": "Language & Linguistics",
    "500": "Pure Sciences",
    "600": "Applied Sciences & Technology",
    "700": "Arts & Recreation",
    "800": "Literature & Rhetoric",
    "900": "History & Geography",
  };
  return titles[shelfId] || `Section ${shelfId}`;
}

function getShelfDescription(shelfId: string): string {
  const descriptions: { [key: string]: string } = {
    "000": "Knowledge & information systems",
    "100": "Thought, behavior & mental processes",
    "200": "Belief systems & spiritual practices",
    "300": "Society, culture & human interaction",
    "400": "Communication & expression",
    "500": "Mathematics, physics & natural sciences",
    "600": "Engineering, medicine & practical applications",
    "700": "Creative expression & entertainment",
    "800": "Written works & language arts",
    "900": "Past events & places",
  };
  return descriptions[shelfId] || `Dewey Decimal ${shelfId}`;
} 

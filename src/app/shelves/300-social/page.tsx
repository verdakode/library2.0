import React from "react";
import { ShelfSection } from "@/components/shared/ShelfSection";

const guestbookEntries = [
  { id: "1", title: "January 2024", color: "bg-rose-600" },
  { id: "2", title: "February 2024", color: "bg-rose-700" },
  // More entries will be added dynamically
];

const connections = [
  { id: "1", title: "Friends", color: "bg-pink-600" },
  { id: "2", title: "Family", color: "bg-pink-700" },
  { id: "3", title: "Colleagues", color: "bg-pink-800" },
];

export default function SocialShelf() {
  const handleBookClick = (bookId: string) => {
    // This will be implemented to show the book's content
    console.log("Opening book:", bookId);
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-amber-900">Social Connections</h1>
        <p className="text-amber-800 mt-2">
          A space for visitors to leave their mark and for tracking social connections.
        </p>
      </header>

      <div className="space-y-12">
        <ShelfSection title="Guestbook" books={guestbookEntries} onBookClick={handleBookClick} />

        <ShelfSection title="Connections" books={connections} onBookClick={handleBookClick} />
      </div>
    </div>
  );
}

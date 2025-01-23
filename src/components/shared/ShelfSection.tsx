"use client";

import React from "react";
import { BookSpine } from "./BookSpine";

interface Book {
  id: string;
  title: string;
  color?: string;
}

interface ShelfSectionProps {
  title: string;
  books: Book[];
  onBookClick: (bookId: string) => void;
}

export const ShelfSection: React.FC<ShelfSectionProps> = ({ title, books, onBookClick }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-amber-900 mb-4">{title}</h2>
      <div className="bg-amber-100 p-4 rounded-lg min-h-[200px]">
        <div className="flex gap-2 items-end">
          {books.map((book) => (
            <BookSpine
              key={book.id}
              title={book.title}
              color={book.color}
              onClick={() => onBookClick(book.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { BookSpine } from "@/components/shared/BookSpine";
import { Book } from "@/components/shared/Book";

interface BookData {
  id: string;
  title: string;
  author: string;
  color: string;
  content: string;
}

const books: BookData[] = [
  {
    id: "1",
    title: "The Art of Reading",
    author: "Verda K.",
    color: "bg-rose-700",
    content: `
      # The Art of Reading

      Reading is not just about consuming words; it's about experiencing new worlds, 
      perspectives, and ideas. Here are some thoughts on making the most of your reading journey:

      ## Finding Your Reading Style

      Everyone has their own way of connecting with books. Some prefer to read in short bursts, 
      while others like to immerse themselves for hours. The key is to find what works for you.

      ## Creating Reading Rituals

      - Choose a comfortable reading spot
      - Set aside dedicated reading time
      - Keep a reading journal
      - Join or start a book club

      ## Making Books Your Own

      Don't be afraid to interact with your books:
      - Highlight meaningful passages
      - Write notes in the margins
      - Dog-ear important pages
      - Use sticky notes for quick reference
    `,
  },
  {
    id: "2",
    title: "Book Notes: 2024",
    author: "Verda K.",
    color: "bg-rose-800",
    content: "A collection of thoughts and reflections on books read in 2024...",
  },
  // Add more books as needed
];

export default function LiteratureShelf() {
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);

  return (
    <div className="min-h-screen">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-amber-900">Literature & Reading</h1>
        <p className="text-amber-800 mt-2">
          A collection of book notes, reading reflections, and literary explorations.
        </p>
      </header>

      <div className="bg-amber-100 p-8 rounded-lg min-h-[300px]">
        <div className="flex gap-4 items-end">
          {books.map((book) => (
            <BookSpine
              key={book.id}
              title={book.title}
              author={book.author}
              color={book.color}
              onClick={() => setSelectedBook(book)}
            />
          ))}
        </div>
      </div>

      {selectedBook && (
        <Book
          title={selectedBook.title}
          author={selectedBook.author}
          content={
            <div
              dangerouslySetInnerHTML={{
                __html: require("marked").parse(selectedBook.content),
              }}
            />
          }
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}

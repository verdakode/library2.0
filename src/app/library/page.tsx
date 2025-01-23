import React from "react";
import Link from "next/link";

const bookshelves = [
  {
    id: "000",
    name: "Computer Science & Digital Projects",
    description: "Current and past programming projects, technical documentation",
    color: "bg-blue-700",
  },
  {
    id: "100",
    name: "Personal Philosophy & Growth",
    description: "Life events, personal milestones, reflections",
    color: "bg-purple-700",
  },
  {
    id: "200",
    name: "Tools & Techniques",
    description: "Useful hacks, tools, and methods I've learned",
    color: "bg-green-700",
  },
  {
    id: "300",
    name: "Health & Wellness",
    description: "Physical health tracking, fitness journey",
    color: "bg-red-700",
  },
  {
    id: "400",
    name: "Media Library",
    description: "Books, movies, music, and other media I've consumed",
    color: "bg-yellow-600",
  },
  {
    id: "500",
    name: "Science & Research",
    description: "Scientific interests and research projects",
    color: "bg-cyan-600",
  },
  {
    id: "600",
    name: "Creative Works",
    description: "Art, writing, and other creative projects",
    color: "bg-pink-600",
  },
  {
    id: "700",
    name: "Digital Garden",
    description: "Blog posts, thoughts, and ideas",
    color: "bg-emerald-600",
  },
  {
    id: "800",
    name: "Community",
    description: "Guestbook and community interactions",
    color: "bg-orange-600",
  },
  {
    id: "900",
    name: "Archives",
    description: "Historical records and memories",
    color: "bg-violet-600",
  },
];

export default function Library() {
  return (
    <main className="min-h-screen bg-amber-50 p-8">
      <h1 className="text-4xl font-bold text-amber-900 mb-8 text-center">Personal Library</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {bookshelves.map((shelf) => (
          <Link
            key={shelf.id}
            href={`/library/${shelf.id}`}
            className={`${shelf.color} text-white p-6 rounded-lg shadow-lg 
                      hover:scale-105 transition-transform duration-300
                      flex flex-col gap-2`}
          >
            <div className="flex items-start justify-between">
              <h2 className="text-2xl font-semibold">{shelf.name}</h2>
              <span className="text-white/80 text-sm">{shelf.id}</span>
            </div>
            <p className="text-white/90">{shelf.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

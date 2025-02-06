"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function ReadingRoom() {
  const router = useRouter();

  return (
    <div className="reading-room">
      {/* Back button */}
      <button
        onClick={() => router.push('/entrance')}
        className="fixed top-4 left-4 px-4 py-2 bg-[#2B1810] text-[#F5E6D3] rounded-lg 
                  hover:bg-[#5E3023] transition-colors z-50
                  shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
      >
        ← Back to Entrance
      </button>

      {/* Room lighting effect */}
      <div className="room-lighting" />

      {/* Wooden floor */}
      <div className="wooden-floor" />

      {/* Reading Area */}
      <div className="reading-area">
        {/* Reading Nooks */}
        <div className="reading-nook left">
          <div className="armchair" />
          <div className="side-table">
            <div className="table-lamp" />
            <div className="book-stack" />
          </div>
        </div>

        <div className="reading-nook center">
          <div className="sofa" />
          <div className="coffee-table">
            <div className="table-decor" />
          </div>
          <div className="floor-lamp" />
        </div>

        <div className="reading-nook right">
          <div className="armchair" />
          <div className="side-table">
            <div className="table-lamp" />
            <div className="book-stack" />
          </div>
        </div>

        {/* Fireplace */}
        <div className="fireplace">
          <div className="mantel" />
          <div className="fire-glow" />
        </div>
      </div>
    </div>
  );
} 
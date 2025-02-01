"use client";

import React from "react";

export default function ReadingRoom() {
  return (
    <div className="reading-room">
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
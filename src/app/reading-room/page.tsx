"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/paths";

export default function ReadingRoom() {
  const router = useRouter();

  return (
    <div className="reading-room">
      {/* Back button */}
      <button
        onClick={() => router.push(ROUTES.ENTRANCE)}
        className="fixed top-4 left-4 px-4 py-2 bg-[#2B1810] text-[#F5E6D3] rounded-lg 
                  hover:bg-[#5E3023] transition-colors z-50
                  shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
      >
        ← Back to Entrance
      </button>

      <div className="construction-notice">
        <h1>🚧 Under Construction 🚧</h1>
        <p>We&apos;re creating a mueseam for you.</p>
        <p>Please check back soon!</p>
      </div>
    </div>
  );
} 
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative w-full h-full">
      {/* Left Door Clickable Area */}
      <div 
        className="door-clickable-area left"
        onClick={() => router.push('/library-room')}
        role="button"
        aria-label="Open left door"
      />
      
      {/* Right Door Clickable Area */}
      <div 
        className="door-clickable-area right"
        onClick={() => router.push('/library-room')}
        role="button"
        aria-label="Open right door"
      />

      {/* Door Image */}
      <Image
        src="/library-entrance.png"
        alt="Library Entrance"
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
    </div>
  );
}

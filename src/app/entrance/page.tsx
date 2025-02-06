"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Head from 'next/head';

interface DoorProps {
  title: string;
  route: string;
  position: "left" | "center" | "right";
  isOpen?: boolean;
  onClick?: () => void;
}

const Door = ({ title, route, position, isOpen = false, onClick }: DoorProps) => {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = React.useState(false);

  const handleEnter = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    setTimeout(() => {
      router.push(route);
    }, 1000);

    // Reset states
    return () => {
      setIsAnimating(false);
    };
  };

  React.useEffect(() => {
    return () => {
      setIsAnimating(false);
    };
  }, []);

  const doorClass = {
    left: "left-door",
    center: "center-door",
    right: "right-door",
  }[position];

  return (
    <div 
      className={`door-container ${doorClass} ${isOpen ? 'door-open' : ''}`}
      onClick={onClick || handleEnter}
    >
      <div className="door">
        <div className="door-handle" />
        <div className="door-panel" />
      </div>
      <div className="door-title">{title}</div>
    </div>
  );
};

export default function Entrance() {
  const router = useRouter();
  const [leftDoorOpen, setLeftDoorOpen] = React.useState(false);
  const [centerDoorOpen, setCenterDoorOpen] = React.useState(false);
  const [rightDoorOpen, setRightDoorOpen] = React.useState(false);

  const handleLeftDoor = () => {
    setLeftDoorOpen(true);
    setTimeout(() => {
      router.push('/art-room');
    }, 1000);
  };

  const handleCenterDoor = () => {
    setCenterDoorOpen(true);
    setTimeout(() => {
      router.push('/library-room');
    }, 1000);
  };

  const handleRightDoor = () => {
    setRightDoorOpen(true);
    setTimeout(() => {
      router.push('/reading-room');
    }, 1000);
  };

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Cormorant+Garamond:ital,wght@0,400;1,500&display=swap" rel="stylesheet" />
      </Head>
      <div className="entrance-room">
        {/* Room lighting effect */}
        <div className="room-lighting" />

        {/* Manual clickable areas for mobile */}
        <div 
          className="door-clickable-area left"
          onClick={handleLeftDoor}
        />
        <div 
          className="door-clickable-area center"
          onClick={handleCenterDoor}
        />
        <div 
          className="door-clickable-area right"
          onClick={handleRightDoor}
        />

        {/* Hallway Structure */}
        <div className="hallway">
          <div className="hallway-wall left" />
          <div className="hallway-wall right" />
          <div className="hallway-wall back" />
          <div className="hallway-floor" />
          <div className="hallway-ceiling" />

          {/* Welcome Text */}
          <div className="welcome-text">
            <h1>The Quantum Libris</h1>
            <p>Reading Between the Lines</p>
          </div>

          {/* Three Doors */}
          <Door title="Art Gallery" route="/art-room" position="left" isOpen={leftDoorOpen} onClick={handleLeftDoor} />
          <Door title="Library" route="/library-room" position="center" isOpen={centerDoorOpen} onClick={handleCenterDoor} />
          <Door title="Reading Room" route="/reading-room" position="right" isOpen={rightDoorOpen} onClick={handleRightDoor} />
        </div>
      </div>
    </>
  );
}

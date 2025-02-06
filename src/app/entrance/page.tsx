"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isAnimating) return;
    if (onClick) {
      onClick();
      return;
    }
    
    setIsAnimating(true);
    const door = document.querySelector(`.${position}-door`);
    door?.classList.add('door-open');

    setTimeout(() => {
      router.push(route);
    }, 1000);
  };

  const doorClass = {
    left: "left-door",
    center: "center-door",
    right: "right-door",
  }[position];

  return (
    <button 
      className={`door-container ${doorClass} ${isOpen ? 'door-open' : ''}`}
      onClick={handleClick}
      style={{ border: 'none', background: 'none', padding: 0 }}
      aria-label={title}
    >
      <div className="door">
        <div className="door-handle" />
        <div className="door-panel" />
      </div>
      <div className="door-title">{title}</div>
    </button>
  );
};

export default function Entrance() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [doorAreas, setDoorAreas] = useState<{[key: string]: DOMRect | null}>({
    left: null,
    center: null,
    right: null
  });
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const doorsRef = useRef<{[key: string]: HTMLDivElement | null}>({
    left: null,
    center: null,
    right: null
  });
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();

    const updateDoorAreas = () => {
      // Get all corner points of each door to find the actual screen space
      const computeDoorArea = (door: HTMLDivElement | null) => {
        if (!door) return null;

        // Get the door's DOM rect
        const rect = door.getBoundingClientRect();
        
        // Add padding for mobile to make hitboxes easier to tap
        const padding = isMobile ? 20 : 0;

        // For the center door, make the hitbox larger and closer to the screen
        if (door.classList.contains('center-door')) {
          return new DOMRect(
            rect.left - padding,
            rect.top - padding,
            rect.width + (padding * 2),
            rect.height + (padding * 2)
          );
        }

        // For side doors, adjust based on their rotation
        const isLeft = door.classList.contains('left-door');
        const isRight = door.classList.contains('right-door');
        
        if (isLeft) {
          return new DOMRect(
            rect.left - padding,
            rect.top - padding,
            rect.width + (padding * 2),
            rect.height + (padding * 2)
          );
        }

        if (isRight) {
          return new DOMRect(
            rect.left - padding,
            rect.top - padding,
            rect.width + (padding * 2),
            rect.height + (padding * 2)
          );
        }

        return rect;
      };

      requestAnimationFrame(() => {
        setDoorAreas({
          left: computeDoorArea(doorsRef.current.left),
          center: computeDoorArea(doorsRef.current.center),
          right: computeDoorArea(doorsRef.current.right)
        });
      });
    };

    // Initial computation
    updateDoorAreas();

    // Update on resize
    window.addEventListener('resize', () => {
      checkMobile();
      updateDoorAreas();
    });
    
    // Create a ResizeObserver to watch for any size/position changes
    observerRef.current = new ResizeObserver(updateDoorAreas);
    
    // Observe each door
    Object.values(doorsRef.current).forEach(door => {
      if (door) {
        observerRef.current?.observe(door);
      }
    });

    // Update a few times after initial render to account for any layout shifts
    const timeouts = [100, 300, 500, 1000].map(delay => 
      setTimeout(updateDoorAreas, delay)
    );

    return () => {
      window.removeEventListener('resize', updateDoorAreas);
      timeouts.forEach(timeout => clearTimeout(timeout));
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isMobile]);

  const handleDoorClick = (route: string, doorClass: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const door = document.querySelector(`.${doorClass}`);
    door?.classList.add('door-open');

    setTimeout(() => {
      router.push(route);
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

          {/* Clickable overlays based on computed areas */}
          {doorAreas.left && (
            <button 
              className="door-hitbox"
              onClick={() => handleDoorClick('/art-room', 'left-door')}
              aria-label="Art Gallery Door"
              style={{
                position: 'fixed',
                left: doorAreas.left.left + 'px',
                top: doorAreas.left.top + 'px',
                width: doorAreas.left.width + 'px',
                height: doorAreas.left.height + 'px',
                zIndex: 9997,
                background: 'rgba(255, 0, 0, 0.2)', // Temporary visible hitbox
                border: '2px solid red',
                cursor: 'pointer',
                pointerEvents: 'all',
                touchAction: 'manipulation'
              }}
            />
          )}
          {doorAreas.center && (
            <button 
              className="door-hitbox"
              onClick={() => handleDoorClick('/library', 'center-door')}
              aria-label="Library Door"
              style={{
                position: 'fixed',
                left: doorAreas.center.left + 'px',
                top: doorAreas.center.top + 'px',
                width: doorAreas.center.width + 'px',
                height: doorAreas.center.height + 'px',
                zIndex: 9999,
                background: 'rgba(0, 255, 0, 0.2)', // Temporary visible hitbox
                border: '2px solid green',
                cursor: 'pointer',
                pointerEvents: 'all',
                touchAction: 'manipulation'
              }}
            />
          )}
          {doorAreas.right && (
            <button 
              className="door-hitbox"
              onClick={() => handleDoorClick('/reading-room', 'right-door')}
              aria-label="Reading Room Door"
              style={{
                position: 'fixed',
                left: doorAreas.right.left + 'px',
                top: doorAreas.right.top + 'px',
                width: doorAreas.right.width + 'px',
                height: doorAreas.right.height + 'px',
                zIndex: 9998,
                background: 'rgba(0, 0, 255, 0.2)', // Temporary visible hitbox
                border: '2px solid blue',
                cursor: 'pointer',
                pointerEvents: 'all',
                touchAction: 'manipulation'
              }}
            />
          )}

          {/* Visual door elements */}
          <div className="door-container left-door" ref={el => { doorsRef.current.left = el }}>
            <div className="door">
              <div className="door-handle" />
              <div className="door-panel" />
            </div>
            <div className="door-title">Art Gallery</div>
          </div>

          <div className="door-container center-door" ref={el => { doorsRef.current.center = el }}>
            <div className="door">
              <div className="door-handle" />
              <div className="door-panel" />
            </div>
            <div className="door-title">Library</div>
          </div>

          <div className="door-container right-door" ref={el => { doorsRef.current.right = el }}>
            <div className="door">
              <div className="door-handle" />
              <div className="door-panel" />
            </div>
            <div className="door-title">Reading Room</div>
          </div>
        </div>
      </div>
    </>
  );
}

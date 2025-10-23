"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";
import { ROUTES } from "@/lib/constants/paths";
import { BREAKPOINTS, Z_INDEX } from "@/lib/constants/theme";
import LoadingTransition from "@/components/shared/LoadingTransition";

export default function Entrance() {
  const [isAnimating, setIsAnimating] = useState(false);
  const breakpoint = useBreakpoint();
  const router = useRouter();

  const isMobile = breakpoint === 'mobile' || breakpoint === 'tablet';
  const isSmallMobile = breakpoint === 'mobile';

  const handleDoorClick = (route: string, doorClass: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const door = document.querySelector(`.${doorClass}`);
    door?.classList.add('door-open');

    setTimeout(() => {
      router.push(route);
    }, 300);
  };

  return (
    <div className="entrance-room">
      <LoadingTransition isVisible={isAnimating} />
      {/* Room lighting effect */}
      <div className="room-lighting" />

      {/* Mobile Safari Specific Hitboxes */}
      <div className="safari-mobile-hitboxes" style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'row',
        zIndex: 99999,
        pointerEvents: 'all',
        touchAction: 'manipulation'
      }}>
        <button
          onClick={() => handleDoorClick(ROUTES.ART_ROOM, 'left-door')}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            height: '100%',
            WebkitTapHighlightColor: 'transparent'
          }}
          aria-label="Art Gallery Door"
        />
        <button
          onClick={() => handleDoorClick(ROUTES.LIBRARY_ROOM, 'center-door')}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            height: '100%',
            WebkitTapHighlightColor: 'transparent'
          }}
          aria-label="Library Door"
        />
        <button
          onClick={() => handleDoorClick(ROUTES.READING_ROOM, 'right-door')}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            height: '100%',
            WebkitTapHighlightColor: 'transparent'
          }}
          aria-label="Verda's Story Room Door"
        />
      </div>

      {/* Hallway Structure */}
      <div className="hallway">
        <div className="hallway-wall left" />
        <div className="hallway-wall right" />
        <div className="hallway-wall back" />
        <div className="hallway-floor" />
        <div className="hallway-ceiling" />

        {/* Welcome Text */}
        <div className="welcome-text">
          <h1>Quantum Libris</h1>
          <p>Reading Between the Lines</p>
        </div>

        {/* Visual door elements */}
        <div className="door-container left-door" onClick={() => handleDoorClick(ROUTES.ART_ROOM, 'left-door')} style={{ pointerEvents: 'auto', willChange: 'transform' }}>
          <div className="door">
            <div className="door-handle" />
            <div className="door-panel" />
          </div>
          <div className="door-title">Art Gallery</div>
        </div>

        <div className="door-container center-door" onClick={() => handleDoorClick(ROUTES.LIBRARY_ROOM, 'center-door')} style={{ 
          pointerEvents: 'auto',
          WebkitTransformStyle: 'preserve-3d',
          WebkitBackfaceVisibility: 'hidden',
          willChange: 'transform'
        }}>
          <div className="door">
            <div className="door-handle" />
            <div className="door-panel" />
          </div>
          <div className="door-title">The Library</div>
        </div>

        <div className="door-container right-door" onClick={() => handleDoorClick(ROUTES.READING_ROOM, 'right-door')} style={{ pointerEvents: 'auto', willChange: 'transform' }}>
          <div className="door">
            <div className="door-handle" />
            <div className="door-panel" />
          </div>
          <div className="door-title">Verda&apos;s Story Room</div>
        </div>

        {/* Fixed position hitboxes */}
        <button 
          className="door-hitbox"
          onClick={() => handleDoorClick(ROUTES.ART_ROOM, 'left-door')}
          aria-label="Art Gallery Door"
          style={{
            position: 'absolute',
            left: isSmallMobile ? '-35%' : (isMobile ? '-15%' : '-30%'),
            top: '45%',
            width: isSmallMobile ? '180px' : (isMobile ? '220px' : '350px'),
            height: isSmallMobile ? '320px' : (isMobile ? '380px' : '600px'),
            transform: isSmallMobile ? 
              'translate(-50%, -50%) rotateY(70deg) translateZ(200px)' :
              (isMobile ? 
                'translate(-50%, -50%) rotateY(75deg) translateZ(300px)' :
                'translate(-50%, -50%) rotateY(89deg) translateZ(700px)'
              ),
            zIndex: Z_INDEX.DOOR_LEFT,
            cursor: 'pointer',
            pointerEvents: 'all',
            touchAction: 'manipulation',
            WebkitTransformStyle: 'preserve-3d',
            WebkitBackfaceVisibility: 'hidden',
            willChange: 'transform'
          }}
        />

        <button 
          className="door-hitbox"
          onClick={() => handleDoorClick(ROUTES.LIBRARY_ROOM, 'center-door')}
          aria-label="Library Door"
          style={{
            position: 'absolute',
            left: '50%',
            top: '45%',
            width: isSmallMobile ? '220px' : (isMobile ? '280px' : '500px'),
            height: isSmallMobile ? '380px' : (isMobile ? '450px' : '850px'),
            transform: isSmallMobile ? 
              'translate(-50%, -57%) translateZ(-200px)' :
              (isMobile ? 
                'translate(-50%, -57%) translateZ(-300px)' :
                'translate(-50%, -57%) translateZ(-1500px)'
              ),
            zIndex: Z_INDEX.DOOR_CENTER,
            cursor: 'pointer',
            pointerEvents: 'all',
            touchAction: 'manipulation',
            WebkitTransformStyle: 'preserve-3d',
            WebkitBackfaceVisibility: 'hidden',
            willChange: 'transform',
            WebkitTransform: isSmallMobile ? 
              'translate(-50%, -57%) translateZ(-200px)' :
              (isMobile ? 
                'translate(-50%, -57%) translateZ(-300px)' :
                'translate(-50%, -57%) translateZ(-1500px)'
              )
          }}
        />

        <button 
          className="door-hitbox"
          onClick={() => handleDoorClick(ROUTES.READING_ROOM, 'right-door')}
          aria-label="Verda's Story Room Door"
          style={{
            position: 'absolute',
            left: isSmallMobile ? '95%' : (isMobile ? '100%' : '90%'),
            top: '45%',
            width: isSmallMobile ? '180px' : (isMobile ? '220px' : '350px'),
            height: isSmallMobile ? '320px' : (isMobile ? '380px' : '600px'),
            transform: isSmallMobile ? 
              'translate(-50%, -50%) rotateY(-75deg) translateZ(20px)' :
              (isMobile ? 
                'translate(-50%, -50%) rotateY(-88deg) translateZ(25px)' :
                'translate(-50%, -50%) rotateY(-88deg) translateZ(49px)'
              ),
            zIndex: Z_INDEX.DOOR_RIGHT,
            cursor: 'pointer',
            pointerEvents: 'all',
            touchAction: 'manipulation',
            WebkitTransformStyle: 'preserve-3d',
            WebkitBackfaceVisibility: 'hidden',
            willChange: 'transform'
          }}
        />
      </div>
    </div>
  );
}

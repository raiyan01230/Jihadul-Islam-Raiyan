import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isEnabled, setIsEnabled] = useState(true);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Detect mobile/touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsEnabled(false);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    // Listen for hovering over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.classList.contains('interactive-hover')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    // Smooth trail lag (easing)
    const animateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      requestRef.current = requestAnimationFrame(animateTrail);
    };

    requestRef.current = requestAnimationFrame(animateTrail);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [position, isEnabled]);

  if (!isEnabled || isHidden) return null;

  return (
    <>
      {/* Outer Glow Indicator */}
      <div
        id="custom-cursor-glow"
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-400/50 pointer-events-none z-50 transition-transform duration-200 ease-out -translate-x-1/2 -translate-y-1/2 mix-blend-screen bg-cyan-500/5"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 2.0 : 1})`,
        }}
      />
      {/* Core Dot */}
      <div
        id="custom-cursor-dot"
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-cyan-400 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out mix-blend-screen"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 0.5 : 1})`,
        }}
      />
    </>
  );
}

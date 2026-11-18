import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  color: string;
  size: number;
}

export default function ThreeDBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Generate 3D Particles
    const particleCount = 120;
    const particles: Particle[] = [];
    const colors = ['rgba(6, 182, 212, 0.5)', 'rgba(168, 85, 247, 0.4)', 'rgba(16, 185, 129, 0.3)'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 2000,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2 + 1,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates around the center
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      setMouse((prev) => ({
        ...prev,
        targetX: x * 0.4,
        targetY: y * 0.4,
      }));
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Easing mouse movement
    let currentMouseX = 0;
    let currentMouseY = 0;
    let angleX = 0.001;
    let angleY = 0.001;

    const render = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.08)'; // Keep trailing effect for glowing look
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse easing
      currentMouseX += (mouse.targetX - currentMouseX) * 0.05;
      currentMouseY += (mouse.targetY - currentMouseY) * 0.05;

      // Dynamic rotation angles based on mouse
      const rotY = (currentMouseX * 0.00005) + angleY;
      const rotX = (currentMouseY * 0.00005) + angleX;

      // Rotation matrix values
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Draw starry nodes
      particles.forEach((p) => {
        // Rotate around Y axis
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        // Rotate around X axis
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        // Apply mouse displacement / Parallax depth
        const depthFactor = 800 / (800 + z2);
        
        // 3D Perspective Projection
        const screenX = width / 2 + x1 * depthFactor;
        const screenY = height / 2 + y2 * depthFactor;

        // Keep inside bounds (wrap around coordinates)
        p.z -= 1.5; // Move towards camera (zoom-in space warp effect)
        if (p.z <= -800) {
          p.z = 1200; // Reset back to distance
          p.x = (Math.random() - 0.5) * 1600;
          p.y = (Math.random() - 0.5) * 1600;
        }

        if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height && z2 > -750) {
          // Draw particle
          ctx.beginPath();
          const radius = Math.max(0.5, p.size * depthFactor * 1.5);
          ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
          
          // Outer glow
          ctx.shadowBlur = radius * 3;
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
          ctx.fill();
        }
      });

      // Draw subtle network grid lines between nearby nodes
      ctx.shadowBlur = 0; // Reset shadow for efficiency
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.025)';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i += 3) {
        const p1 = particles[i];
        const p2 = particles[(i + 1) % particles.length];

        const df1 = 800 / (800 + p1.z);
        const df2 = 800 / (800 + p2.z);

        const x1 = width / 2 + p1.x * df1;
        const y1 = height / 2 + p1.y * df1;
        const x2 = width / 2 + p2.x * df2;
        const y2 = height / 2 + p2.y * df2;

        const distance = Math.hypot(x1 - x2, y1 - y2);
        if (distance < 120 && p1.z > -400 && p2.z > -400) {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      // Constantly apply very slow auto-rotation
      angleX += 0.0002;
      angleY += 0.0003;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouse.targetX, mouse.targetY]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
}

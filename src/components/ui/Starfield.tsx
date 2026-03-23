"use client";

import React, { useEffect, useRef } from "react";

const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; radius: number; speed: number; opacity: number; opacitySpeed: number }[] = [];

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const numStars = (canvas.width * canvas.height) / 3500;
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.1 + 0.3,
          speed: Math.random() * 0.15 + 0.05,
          opacity: Math.random(),
          opacitySpeed: (Math.random() * 0.02) - 0.01
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";
      
      stars.forEach(star => {
        star.y -= star.speed;
        
        star.opacity += star.opacitySpeed;
        if (star.opacity <= 0.1 || star.opacity >= 1) {
          star.opacitySpeed = -star.opacitySpeed;
        }

        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }

        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  );
};

export default Starfield;

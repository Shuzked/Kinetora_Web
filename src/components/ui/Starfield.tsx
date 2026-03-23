"use client";

import React, { useEffect, useRef } from "react";

const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {


    const canvas = canvasRef.current;
    if (!canvas) return;

    let isVisible = false;
    let fallbackFrameId: number;
    let fallbackStars: any[] = [];
    let worker: Worker | null = null;
    let observer: IntersectionObserver;

    if ('OffscreenCanvas' in window && 'transferControlToOffscreen' in canvas) {
      // 🚀 OPTIMIZACIÓN EXTREMA: Web Worker para renderizado OffscreenCanvas
      // Saca el 100% de la carga del Canvas fuera del hilo principal de React/UI.
      const workerCode = `
        let ctx;
        let canvas;
        let stars = [];
        let isVisible = false;
        let animationFrameId;

        const initStars = (width, height) => {
          stars = [];
          const numStars = (width * height) / 8000;
          for (let i = 0; i < numStars; i++) {
              stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.1 + 0.3,
                speed: Math.random() * 0.15 + 0.05,
                opacity: Math.random(),
                opacitySpeed: (Math.random() * 0.02) - 0.01
              });
          }
        };

        const animate = () => {
          if (!isVisible || !ctx) return;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#ffffff";
          stars.forEach(star => {
            star.opacity += star.opacitySpeed;
            if (star.opacity <= 0.1 || star.opacity >= 1) {
              star.opacitySpeed = -star.opacitySpeed;
            }
            ctx.globalAlpha = star.opacity;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
          });
          animationFrameId = requestAnimationFrame(animate);
        };

        self.onmessage = (e) => {
          if (e.data.type === 'init') {
            canvas = e.data.canvas;
            ctx = canvas.getContext('2d');
            canvas.width = e.data.width;
            canvas.height = e.data.height;
            initStars(canvas.width, canvas.height);
          } else if (e.data.type === 'resize') {
            if (!canvas) return;
            canvas.width = e.data.width;
            canvas.height = e.data.height;
            initStars(canvas.width, canvas.height);
          } else if (e.data.type === 'visibility') {
            isVisible = e.data.isVisible;
            if (isVisible) {
               if (animationFrameId) cancelAnimationFrame(animationFrameId);
               animate();
            } else {
               if (animationFrameId) cancelAnimationFrame(animationFrameId);
            }
          }
        };
      `;
      
      const blob = new Blob([workerCode], { type: 'application/javascript' });
      worker = new Worker(URL.createObjectURL(blob));
      
      const offscreen = (canvas as any).transferControlToOffscreen();
      worker.postMessage({ type: 'init', canvas: offscreen, width: canvas.parentElement?.clientWidth, height: canvas.parentElement?.clientHeight }, [offscreen]);

      const handleResize = () => {
        if (!canvas.parentElement) return;
        worker?.postMessage({ type: 'resize', width: canvas.parentElement.clientWidth, height: canvas.parentElement.clientHeight });
      };

      window.addEventListener("resize", handleResize, { passive: true });

      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          worker?.postMessage({ type: 'visibility', isVisible: entry.isIntersecting });
        });
      });
      observer.observe(canvas);

      return () => {
        window.removeEventListener("resize", handleResize);
        observer.disconnect();
        worker?.terminate();
      };
    } else {
      // 🍂 FALLBACK: Dispositivos ultra antiguos sin soporte OffscreenCanvas (iOS 16.3 e inferiores)
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const resize = () => {
        if (!canvas.parentElement) return;
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        initStars();
      };

      const initStars = () => {
        fallbackStars = [];
        const numStars = (canvas.width * canvas.height) / 8000;
        for (let i = 0; i < numStars; i++) {
          fallbackStars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.1 + 0.3,
            opacity: Math.random(),
            opacitySpeed: (Math.random() * 0.02) - 0.01
          });
        }
      };

      const animate = () => {
        if (!isVisible) return; 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        
        fallbackStars.forEach(star => {
          star.opacity += star.opacitySpeed;
          if (star.opacity <= 0.1 || star.opacity >= 1) {
            star.opacitySpeed = -star.opacitySpeed;
          }
          ctx.globalAlpha = star.opacity;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        fallbackFrameId = requestAnimationFrame(animate);
      };

      window.addEventListener("resize", resize, { passive: true });
      resize();

      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            animate();
          } else {
            cancelAnimationFrame(fallbackFrameId);
          }
        });
      });
      observer.observe(canvas);

      return () => {
        window.removeEventListener("resize", resize);
        cancelAnimationFrame(fallbackFrameId);
        observer.disconnect();
      };
    }
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

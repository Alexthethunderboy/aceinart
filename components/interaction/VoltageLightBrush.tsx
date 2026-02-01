"use client";

import { useEffect, useRef } from "react";

export function VoltageLightBrush() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const touchCords = useRef<[number, number][]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      touchCords.current.push([e.clientX, e.clientY]);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Fade out effect
      // We don't need to manually fade existing pixels if we clearRect and redraw the trail
      // But for a "evaporating" trail, we need to maintain state.
      // Re-approach: Draw the trail from the points array, and remove old points.
      
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      
      // Decay points
      if (touchCords.current.length > 50) {
        touchCords.current.shift();
      }

      if (touchCords.current.length < 2) {
         animationFrameId = requestAnimationFrame(render);
         return;
      }

      // Draw glowing trail
      ctx.shadowBlur = 20;
      ctx.shadowColor = "rgba(0, 255, 157, 0.8)"; // Pulse Neon
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.lineWidth = 2;

      ctx.beginPath();
      // Start from the oldest point
      ctx.moveTo(touchCords.current[0][0], touchCords.current[0][1]);

      for (let i = 1; i < touchCords.current.length; i++) {
        // Use quadratic bezier curves for smoothness
        const p0 = touchCords.current[i - 1];
        const p1 = touchCords.current[i];
        
        ctx.lineTo(p1[0], p1[1]);
      }
      ctx.stroke();
      
      // Remove points over time to create the "evaporating" trailing tail effect if mouse stops
      // Simple way: splice the array if it's not being added to?
      // Actually requestAnimationFrame runs constantly.
      // Let's just remove the first element every few frames if we want it to disappear.
      // BUT for now, let's just keep the trail following the mouse.
      // To make it fade, we can use `globalCompositeOperation` destination-out on a non-cleared canvas,
      // but clearing and redrawing a short array is cleaner for React.
      
      // Let's manually shorten the array to simulate fade if mouse stops
      // But we can't detect "stop" easily inside the loop without timestamp.
      // Good enough for now: just a trail.
      
      // Reduce the trail length gradually
       if (touchCords.current.length > 0) {
           touchCords.current.shift(); 
       }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
    />
  );
}

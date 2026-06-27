"use client";

import { useEffect, useRef } from "react";

export function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Mouse interactivity
    const mouse = { x: width / 2, y: height / 2, active: false };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Node setup
    const numNodes = 120;
    const maxDistance = 180;
    const nodes: { x: number; y: number; z: number; vx: number; vy: number; vz: number }[] = [];

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * 1000 - 500,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        vz: (Math.random() - 0.5) * 1.5,
      });
    }

    // 3D Projection & Rendering
    let angleX = 0;
    let angleY = 0;
    const fl = 800; // Focal length

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Auto rotation
      angleX += 0.001;
      angleY += 0.002;

      // Mouse influence on rotation
      const targetAngleX = mouse.active ? (mouse.y - height / 2) * 0.00005 : 0;
      const targetAngleY = mouse.active ? (mouse.x - width / 2) * 0.00005 : 0;
      angleX += targetAngleX;
      angleY += targetAngleY;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const projectedNodes: { x: number; y: number; scale: number; opacity: number }[] = [];

      nodes.forEach((node) => {
        // Move
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        // Bounce boundaries
        if (node.x > width || node.x < -width) node.vx *= -1;
        if (node.y > height || node.y < -height) node.vy *= -1;
        if (node.z > 500 || node.z < -500) node.vz *= -1;

        // 3D Rotation
        // Y-axis rotation
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;
        
        // X-axis rotation
        const y1 = node.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sinX;

        // Perspective projection
        const scale = fl / (fl + z2);
        const x2 = x1 * scale + width / 2;
        const y2 = y1 * scale + height / 2;

        const opacity = Math.max(0, Math.min(1, scale * 0.8));

        projectedNodes.push({ x: x2, y: y2, scale, opacity });
      });

      // Draw Lines
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const p1 = projectedNodes[i];
          const p2 = projectedNodes[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const opacity = (1 - dist / maxDistance) * (p1.opacity * p2.opacity);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Mix Purple and Gold based on distance/index
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, `rgba(157, 78, 221, ${opacity * 1.0})`); // Purple
            gradient.addColorStop(1, `rgba(255, 215, 0, ${opacity * 0.9})`); // Gold
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = Math.max(0.2, p1.scale * 1.5);
            ctx.stroke();
          }
        }
      }

      // Draw Nodes
      projectedNodes.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, p.scale * 2), 0, Math.PI * 2);
        // Alternate colors for nodes
        const color = i % 3 === 0 ? `rgba(255, 215, 0, ${p.opacity * 1.2})` : `rgba(157, 78, 221, ${p.opacity * 1.2})`;
        ctx.fillStyle = color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden bg-background">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-100"
        style={{ mixBlendMode: 'screen' }}
      />
      {/* Background blur layer over the canvas for ambient effect */}
      <div className="absolute inset-0 backdrop-blur-[6px] pointer-events-none" />
      {/* Noise Overlay Texture for "Tactile" feel */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay pointer-events-none" />
    </div>
  );
}

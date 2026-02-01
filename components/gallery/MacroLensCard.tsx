"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MacroLensCardProps {
  imageUrl: string;
  alt: string;
  className?: string;
}

export function MacroLensCard({ imageUrl, alt, className }: MacroLensCardProps) {
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <div 
        ref={ref}
        className={cn("relative overflow-hidden group cursor-zoom-in rounded-xl border border-white/10 bg-black", className)}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={handleMouseMove}
    >
        {/* Helper text */}
        <div className="absolute top-4 left-4 z-20 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-mono tracking-widest text-white/70 pointer-events-none border border-white/10">
            MACRO LENS ACTIVE
        </div>

        <div className="relative w-full h-full min-h-[400px]">
            <Image
                src={imageUrl}
                alt={alt}
                fill
                className="object-cover transition-transform duration-200 ease-out"
                style={{
                    transformOrigin: `${position.x}% ${position.y}%`,
                    transform: zoom ? "scale(2.5)" : "scale(1)",
                }}
            />
        </div>
        
        {/* Crosshair Overlay when zoomed */}
        <div className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-200 z-10 flex items-center justify-center",
            zoom ? "opacity-100" : "opacity-0"
        )}>
            <div className="w-full h-[1px] bg-white/20 absolute top-1/2 -translate-y-1/2" />
            <div className="h-full w-[1px] bg-white/20 absolute left-1/2 -translate-x-1/2" />
            <div className="w-20 h-20 border border-white/40 rounded-full" />
        </div>
    </div>
  );
}

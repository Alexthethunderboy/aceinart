"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  href?: string;
  gradient?: boolean;
}

export function BentoCard({ 
  children, 
  className, 
  title, 
  subtitle, 
  href,
  gradient = false 
}: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    x.set(clientX - left);
    y.set(clientY - top);
  }

  const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  const CardContent = (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/5 bg-black/40 backdrop-blur-xl transition-all duration-500",
        "hover:border-primary/50 hover:shadow-[0_0_30px_rgba(157,78,221,0.25)]",
        className
      )}
    >
      {/* Hover Gradient Effect - Tracking Cursor */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={style}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 opacity-30" />
      </motion.div>

      {/* Content */}
      <div className="relative h-full z-10 p-1">
        {children}
        
        {(title || subtitle) && (
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent pt-12">
                {title && <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300 drop-shadow-md">{title}</h3>}
                {subtitle && <p className="text-sm font-light text-white/60 group-hover:text-white/80 transition-colors duration-300">{subtitle}</p>}
            </div>
        )}
      </div>
      
      {/* Static Border Overlay for subtle depth */}
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/5 group-hover:ring-primary/20 transition-all duration-500" />
      
      {/* Corner Accents */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-3xl" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-3xl" />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block w-full h-full transition-transform duration-300 hover:scale-[1.01]">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}

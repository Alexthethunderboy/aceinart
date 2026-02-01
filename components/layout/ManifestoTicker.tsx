"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ManifestoItem {
  _id: string;
  text: string;
  type: string;
}

interface ManifestoTickerProps {
  items: ManifestoItem[];
  className?: string;
}

export function ManifestoTicker({ items, className }: ManifestoTickerProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className={cn("relative w-full overflow-hidden border-y border-white/5 py-3 sm:py-4 bg-black/60 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)]", className)}>
      {/* Neon Lines Top/Bottom */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <motion.div
        className="flex whitespace-nowrap items-center"
        animate={{ x: [0, -1000] }} // simple logic for now, dependent on width
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30, // slow speed
        }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => ( // Repeat items plenty
          <div key={`${item._id}-${i}`} className="mx-6 sm:mx-12 flex items-center gap-2 sm:gap-3 text-[10px] sm:text-sm font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/80 group cursor-default">
            <span className={cn(
                "h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full shadow-[0_0_8px_currentColor] transition-all duration-300 group-hover:scale-150",
                item.type === 'quote' && "bg-primary text-primary",
                item.type === 'news' && "bg-accent text-accent", 
                item.type === 'exhibition' && "bg-secondary text-secondary"
            )} />
            <span className="group-hover:text-white transition-colors duration-300 drop-shadow-sm">{item.text}</span>
          </div>
        ))}
      </motion.div>
      
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />
    </div>
  );
}

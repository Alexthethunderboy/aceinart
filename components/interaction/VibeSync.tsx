"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Music } from "lucide-react";

export function VibeSync() {
  const [isPlaying, setIsPlaying] = useState(true); // Mock state
  
  // Mock equalizer bars
  const bars = [1, 2, 3, 4];

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-2 bg-black/80 backdrop-blur-md rounded-full border border-white/10 shadow-2xl">
      <div className="flex items-end gap-[2px] h-4">
        {bars.map((bar) => (
          <motion.div
            key={bar}
            className="w-1 bg-primary rounded-t-sm"
            animate={{
              height: isPlaying ? [4, 12, 6, 16, 8] : 4,
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: bar * 0.1,
            }}
          />
        ))}
      </div>
      
      <div className="text-xs font-mono uppercase tracking-widest text-white/80">
        <span className="opacity-50 mr-2">ON DECK:</span>
        <span className="text-white">Massive Attack</span>
      </div>
      
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="ml-2 w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <Music size={12} className={isPlaying ? "text-primary" : "text-white/50"} />
      </button>
    </div>
  );
}

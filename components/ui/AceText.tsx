"use client";

import { cn } from "@/lib/utils";

interface AceTextProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "hero";
}

export function AceText({ className, size = "md" }: AceTextProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    hero: "text-5xl sm:text-6xl md:text-8xl lg:text-9xl",
  };

  return (
    <span className={cn("inline-flex items-baseline font-display tracking-tight", sizeClasses[size], className)}>
      <span className="font-black text-neon-pink drop-shadow-[0_0_8px_rgba(255,0,128,0.6)]">A</span>
      <span className="font-light">ce</span>
      <span className="font-black text-neon-blue drop-shadow-[0_0_8px_rgba(0,128,255,0.6)]">I</span>
      <span className="font-light">n</span>
      <span className="font-black text-neon-purple drop-shadow-[0_0_8px_rgba(128,0,255,0.6)]">A</span>
      <span className="font-light">rt</span>
    </span>
  );
}

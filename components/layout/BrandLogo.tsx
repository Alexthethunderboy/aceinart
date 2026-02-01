"use client";

import { cn } from "@/lib/utils";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";
import Link from "next/link";

import { Settings } from "@/lib/types";

interface BrandLogoProps {
  settings?: Settings;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "hero";
}

export function BrandLogo({ settings, className, size = "md" }: BrandLogoProps) {
  const sizeClasses = {
    sm: "w-8",
    md: "w-12",
    lg: "w-16",
    xl: "w-24",
    hero: "w-48 sm:w-64 md:w-80 lg:w-[400px]", // Placeholder size
  };

  const logo = settings?.logo;

  const content = logo ? (
     <div className={cn("relative transition-all duration-300", sizeClasses[size], className)}>
         <Image 
           src={urlForImage(logo).url()} 
           alt="AceInArt Logo"
           width={800}
           height={400}
           className="object-contain w-full h-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:drop-shadow-[0_0_25px_rgba(255,0,128,0.5)] transition-all duration-500"
           priority
         />
     </div>
  ) : (
    <div className={cn("relative flex items-center justify-center font-display font-black tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]", className)}>
        {/* We can reuse the AceText component logic here if we want text fallback, OR a graphic placeholder */}
        {/* User asked for a "placeholder for it" since logo is being made. Let's make a graphic placeholder. */}
        
        <svg viewBox="0 0 400 120" className={cn("w-full h-auto fill-current", sizeClasses[size])}>
            <defs>
               <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
               </filter>
            </defs>
            
            {/* Placeholder Text Graphic */}
             <text x="50%" y="80" textAnchor="middle" fontSize="80" fontWeight="900" fontFamily="sans-serif" letterSpacing="4">
                <tspan fill="#FF0080" filter="url(#neon-glow)">A</tspan>
                <tspan fill="white" fontWeight="300">ce</tspan>
                <tspan fill="#0080FF" filter="url(#neon-glow)">I</tspan>
                <tspan fill="white" fontWeight="300">n</tspan>
                <tspan fill="#8000FF" filter="url(#neon-glow)">A</tspan>
                <tspan fill="white" fontWeight="300">rt</tspan>
             </text>
        </svg>
    </div>
  );

  return (
    <Link href="/" className="block cursor-pointer hover:opacity-90 transition-opacity">
      {content}
    </Link>
  );
}

"use client";

import { motion } from "framer-motion";
import { Mail, Instagram, Facebook } from "lucide-react";

// Custom X Icon since it might not be in all lucide versions or we want a specific look
const XIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4 4l11.733 16h6.267l-11.733 -16z" className="opacity-0" /> {/* Spacer/Shape */}
    <path d="M4 4l16 16" />
    <path d="M4 20l16 -16" />
  </svg>
);

const socialLinks = [
  { 
    icon: Instagram, 
    href: "https://instagram.com/aceinart", 
    label: "Instagram",
    color: "group-hover:text-[#E1306C] group-hover:drop-shadow-[0_0_10px_#E1306C]"
  },
  { 
    icon: XIcon, 
    href: "https://twitter.com/aceinart", 
    label: "X",
    color: "group-hover:text-white group-hover:drop-shadow-[0_0_10px_white]"
  },
  { 
    icon: Facebook, 
    href: "https://facebook.com/aceinart", 
    label: "Facebook",
    color: "group-hover:text-[#1877F2] group-hover:drop-shadow-[0_0_10px_#1877F2]"
  },
  { 
    icon: Mail, 
    href: "mailto:hello@aceinart.com", 
    label: "Email",
    color: "group-hover:text-[#EA4335] group-hover:drop-shadow-[0_0_10px_#EA4335]"
  },
];

export function SocialDock() {
  return (
    <motion.div
      initial={{ y: 100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ delay: 1, duration: 0.8, ease: "backOut" }}
      className="fixed bottom-6 left-1/2 z-50 flex items-center gap-3 sm:gap-6 px-5 sm:px-8 py-3 sm:py-4 bg-black/80 backdrop-blur-xl border border-primary/50 rounded-full shadow-[0_0_20px_rgba(157,78,221,0.4),0_0_40px_rgba(157,78,221,0.2)] max-w-[95vw]"
    >
      <div className="flex items-center gap-3 sm:pr-6 sm:border-r border-white/10 sm:mr-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] font-mono tracking-widest text-white/80 uppercase whitespace-nowrap hidden sm:block">
            Open for Work
          </span>
      </div>

      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center transition-transform hover:scale-125 duration-300"
        >
          <link.icon className={`w-6 h-6 text-white/60 transition-all duration-300 ${link.color}`} />
          
          {/* Tooltip */}
          <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 border border-white/10 text-white text-[10px] uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {link.label}
          </span>
          
          {/* Glow dot */}
          <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ${link.color.replace('text', 'bg')}`} />
        </a>
      ))}
    </motion.div>
  );
}

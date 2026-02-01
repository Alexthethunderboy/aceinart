"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";

interface ProcessPulseProps {
  items: any[]; // Sanity image objects
  className?: string;
}

export function ProcessPulse({ items, className }: ProcessPulseProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className={className}>
      <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6 pl-4 border-l-2 border-primary">
        Process Lineage
      </h3>
      
      <div className="relative flex items-center gap-12 overflow-x-auto pb-8 pt-4 px-4 scrollbar-hide">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -z-10" />

        {items.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative flex-none group"
          >
            {/* Node Point */}
            <div className="absolute top-1/2 -left-6 w-2 h-2 rounded-full bg-primary/50 shadow-[0_0_10px_var(--primary)]" />
            
            <div className="relative w-48 aspect-video rounded-md overflow-hidden border border-white/10 group-hover:border-primary/50 transition-colors bg-card">
              <Image
                src={urlForImage(img).width(300).height(200).url()}
                alt={`Process step ${i + 1}`}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            
            <div className="mt-2 text-[10px] font-mono text-muted-foreground text-center">
              NODE_0{i + 1}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

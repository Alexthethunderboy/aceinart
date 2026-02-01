"use client";

import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

import { urlForImage } from "@/lib/sanity/image";
import { Settings, AboutPage } from "@/lib/types";

interface AboutSectionProps {
  data: AboutPage;
  settings: Settings;
}

export function AboutSection({ data, settings }: AboutSectionProps) {
  // Fallback data if Sanity data isn't provided/complete
  const bio = data?.mainContent || [
    {
      _type: 'block',
      _key: 'block1',
      children: [{ _type: 'span', _key: 'span1', text: "I'm Achilihu Chinedu Emmanuel, a creative technologist and visual artist based in Lagos, Nigeria. My work exists at the intersection of art, design, and technology—where pixels become poetry and code transforms into canvas." }]
    },
    {
      _type: 'block',
      _key: 'block2',
      children: [{ _type: 'span', _key: 'span2', text: "Through digital mediums, I explore themes of identity, culture, and the human experience in our increasingly connected world. Each piece is an experiment, a question posed in color and form, inviting viewers to pause and reflect." }]
    }
  ];

  const philosophyItems = data?.philosophyItems || [
    "Design with intention, create with passion",
    "Embrace the chaos, find the beauty",
    "Every project tells a story",
    "Push boundaries, break conventions"
  ];

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Column: Image/Visual */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
             {/* Placeholder for artist image if available in settings or hardcoded */}
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-black flex items-center justify-center">
                 <span className="text-white/20 font-display text-4xl font-black rotate-90 tracking-widest">ARTIST</span>
              </div>
              
              {/* Prioritize artistImage, fallback to ogImage */}
              {(settings?.artistImage || settings?.ogImage) && (
                 <div 
                   className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-overlay" 
                   style={{ 
                     backgroundImage: `url(${
                       settings.artistImage 
                         ? urlForImage(settings.artistImage).url() 
                         : settings.ogImage 
                           ? urlForImage(settings.ogImage).url() 
                           : ''
                     })` 
                   }} 
                 />
              )}
              {/* Note: settings.ogImage is an object too usually in Sanity image fields, so urlForImage might be needed there too if not pre-processed. 
                  However, standard sanity query for simple fields might differ. Assuming similar handling or raw URL string if it was pre-processed in loader.
                  Actually, checking previous usage: settings.ogImage was passed to urlForImage in layout metadata but used directly in background image url() in previous implementation? 
                  Previous implementation: style={{ backgroundImage: `url(${settings.ogImage})` }}.
                  Let's safely assume we should Try to use urlForImage if it is an object.
              */}
              
              {/* Overlay elements */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10">
                 <h3 className="text-white font-bold text-lg">
                    <span className="text-neon-pink drop-shadow-[0_0_8px_rgba(255,0,128,0.6)]">A</span>chilihu{" "}
                    <span className="text-neon-blue drop-shadow-[0_0_8px_rgba(0,128,255,0.6)]">C</span>hinedu{" "}
                    <span className="text-neon-purple drop-shadow-[0_0_8px_rgba(128,0,255,0.6)]">E</span>mmanuel
                 </h3>
                 <p className="text-primary text-xs tracking-wider uppercase">Creative Technologist</p>
              </div>
           </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl" />
          <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-secondary/30 rounded-br-3xl" />
        </motion.div>

        {/* Right Column: Content */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-10"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-6 text-white uppercase">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">The Artist</span>
            </h2>
            <div className="prose prose-lg prose-invert text-muted-foreground leading-relaxed">
              <PortableText value={bio} />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-mono text-primary uppercase tracking-widest flex items-center gap-3">
              <span className="w-8 h-[1px] bg-primary" /> Philosophy
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {philosophyItems.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-sm md:text-base text-white/80">
                  <span className="text-accent mt-1">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="pt-8 border-t border-white/10">
             <div className="flex flex-wrap gap-4">
                <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs font-mono text-white/60">
                   LAGOS, NIGERIA
                </div>
                 <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs font-mono text-white/60">
                   DIGITAL ART
                </div>
                 <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs font-mono text-white/60">
                   WEB DEVELOPMENT
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

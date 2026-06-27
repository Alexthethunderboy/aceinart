"use client"

import { motion, AnimatePresence } from "framer-motion"
import { PortableText } from "@portabletext/react"
import { urlForImage } from "@/lib/sanity/image"

import { HomeHeroUI } from "../home/HomeHeroUI"

interface AboutOverlayProps {
  isOpen: boolean
  onClose: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  aboutData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  homeData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings: any
}

export function AboutOverlay({ isOpen, onClose, aboutData, homeData, settings }: AboutOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Side Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[500px] z-[110] bg-black border-l border-primary/20 shadow-2xl flex flex-col"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 z-20 bg-black/50 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center border border-white/10"
            >
              ✕
            </button>
            
            <div className="flex-1 relative z-10 overflow-y-auto custom-scrollbar">
              <div className="pb-16 pt-8">
                <HomeHeroUI layout="sidebar" homeData={homeData} settings={settings} />
                
                {/* Rich Bio Section (From AboutSection) */}
                <div className="px-8 md:px-12 lg:px-16 mt-12 space-y-12">
                  
                  {/* Artist Card */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-black flex items-center justify-center">
                       <span className="text-white/20 font-display text-4xl font-black rotate-90 tracking-widest">ARTIST</span>
                    </div>
                    
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
                    
                    <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10">
                       <h3 className="text-white font-bold text-lg">
                          <span className="text-neon-pink drop-shadow-[0_0_8px_rgba(255,0,128,0.6)]">A</span>chilihu{" "}
                          <span className="text-neon-blue drop-shadow-[0_0_8px_rgba(0,128,255,0.6)]">C</span>hinedu{" "}
                          <span className="text-neon-purple drop-shadow-[0_0_8px_rgba(128,0,255,0.6)]">E</span>mmanuel
                       </h3>
                       <p className="text-primary text-xs tracking-wider uppercase">Creative Technologist</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <h2 className="text-3xl font-display font-black tracking-tight mb-6 text-white uppercase">
                      About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">The Artist</span>
                    </h2>
                    <div className="prose prose-invert text-muted-foreground leading-relaxed">
                      {aboutData?.mainContent ? (
                        <PortableText value={aboutData.mainContent} />
                      ) : (
                        <>
                          <p>I&apos;m Achilihu Chinedu Emmanuel, a creative technologist and visual artist based in Lagos, Nigeria. My work exists at the intersection of art, design, and technology—where pixels become poetry and code transforms into canvas.</p>
                          <p>Through digital mediums, I explore themes of identity, culture, and the human experience in our increasingly connected world. Each piece is an experiment, a question posed in color and form, inviting viewers to pause and reflect.</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Philosophy */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-mono text-primary uppercase tracking-widest flex items-center gap-3">
                      <span className="w-8 h-[1px] bg-primary" /> Philosophy
                    </h3>
                    <ul className="grid grid-cols-1 gap-4">
                      {(aboutData?.philosophyItems || [
                        "Design with intention, create with passion",
                        "Embrace the chaos, find the beauty",
                        "Every project tells a story",
                        "Push boundaries, break conventions"
                      ]).map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                          <span className="text-accent mt-1">✦</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="pt-8 border-t border-white/10 pb-8">
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
                  
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

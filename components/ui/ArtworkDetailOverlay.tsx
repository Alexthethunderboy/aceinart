"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Artwork } from "@/lib/types"
import { urlForImage } from "@/lib/sanity/image"
import { LightboxModal } from "@/components/ui/LightboxModal"
import { useState } from "react"

interface ArtworkDetailOverlayProps {
  artwork: Artwork | null
  onClose: () => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ArtworkDetailOverlay({ artwork, onClose }: any) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md pointer-events-auto"
          onClick={onClose}
        >
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full max-w-4xl bg-black/80 border border-primary/30 rounded-xl overflow-hidden shadow-2xl"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={(e: any) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 h-[70vh] md:h-[60vh]">
              {/* Left Side: Empty space or simplified view since 3D handles the image mostly, 
                  but we might want to show the image here if we zoomed in 3D to just the model, 
                  for now let's keep the image visible to be safe */}
              <div className="bg-muted/10 flex flex-col p-4 border-b md:border-b-0 md:border-r border-primary/20 relative overflow-y-auto custom-scrollbar">
                {/* Collect all media into a single array, falling back to mainImage or mockUrl if gallery is empty */}
                {(() => {
                  const hasGallery = artwork.gallery && artwork.gallery.length > 0;
                  const mediaList = hasGallery 
                    ? artwork.gallery! 
                    : (artwork.mainImage || artwork.mockUrl ? [{
                        ...artwork.mainImage,
                        _type: 'image',
                        _key: 'main',
                        assetUrl: artwork.mockUrl || undefined,
                        asset: artwork.mainImage?.asset,
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      } as any] : []);
                  
                  if (mediaList.length === 0) {
                    return (
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-primary font-mono text-xs tracking-[0.2em] opacity-50 uppercase rotate-[-90deg] hidden md:block">
                            {artwork.category?.title || "Artwork"}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <>
                      <div className="grid grid-cols-1 gap-4 w-full h-fit">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {mediaList.map((item: any, index: number) => {
                          const isVideo = item._type === 'file';
                          const src = item.assetUrl || item.mockUrl || (item.asset ? urlForImage(item).width(800).url() : "");
                          
                          return (
                            <div 
                              key={item._key || index} 
                              className="relative w-full aspect-square md:aspect-auto md:h-64 lg:h-80 bg-black/50 border border-white/5 overflow-hidden group cursor-pointer"
                              onClick={() => {
                                setLightboxIndex(index);
                                setIsLightboxOpen(true);
                              }}
                            >
                              {isVideo ? (
                                <video 
                                  src={src} 
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                  muted
                                  loop
                                  onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                                  onMouseOut={(e) => (e.target as HTMLVideoElement).pause()}
                                />
                              ) : (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img 
                                  src={src} 
                                  alt={item.alt || artwork.title}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                              )}
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center">
                                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs tracking-widest bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                                  {isVideo ? "PLAY VIDEO" : "ENLARGE"}
                                </span>
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      <LightboxModal 
                        isOpen={isLightboxOpen}
                        onClose={() => setIsLightboxOpen(false)}
                        mediaList={mediaList}
                        initialIndex={lightboxIndex}
                      />
                    </>
                  );
                })()}
              </div>
              
              <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col justify-center">
                <button 
                   onClick={onClose}
                   className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2"
                >
                  ✕
                </button>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">
                  {artwork.title}
                </h2>
                <div className="text-primary font-mono text-xs tracking-widest mb-8 uppercase">
                  {artwork.year || "2024"}
                </div>
                
                <div className="prose prose-invert prose-p:text-muted-foreground prose-p:leading-relaxed text-sm md:text-base">
                  {artwork.description ? (
                    <p>{artwork.description}</p>
                  ) : (
                    <p>No description available.</p>
                  )}
                </div>

                <div className="mt-10 pt-6 border-t border-white/10 flex gap-4">
                  <a 
                    href={`/curated/${artwork.slug?.current}`}
                    className="px-6 py-3 bg-primary text-black font-bold text-sm tracking-wider hover:bg-white transition-colors rounded-sm"
                  >
                    VIEW ARCHIVE
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

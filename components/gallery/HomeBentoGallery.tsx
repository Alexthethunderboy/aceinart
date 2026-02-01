"use client"

import { Artwork } from "@/lib/types"
import { BentoGrid } from "@/components/layout/BentoGrid"
import { BentoCard } from "@/components/layout/BentoCard"
import { useGalleryFilters } from "@/hooks/use-gallery-filters"
import { filterArtwork } from "@/lib/filter-utils"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { urlForImage } from "@/lib/sanity/image"

export function HomeBentoGallery({ initialArtworks }: { initialArtworks: Artwork[] }) {
  const { activeFilters } = useGalleryFilters()
  
  // Filter artwork
  const filtered = filterArtwork(initialArtworks, activeFilters, true)

  return (
    <div className="w-full min-h-screen p-4 md:p-8 relative z-10">
       <BentoGrid className="auto-rows-[minmax(280px,auto)]">
          <AnimatePresence mode="popLayout">
            {filtered.map((art, i) => {
              // Grid span logic (Simple pattern based on index)
              // 0: Large Hero (md:col-span-2 md:row-span-2)
              // 3, 7: Wide (md:col-span-2)
              // 4: Tall (md:row-span-2) - BentoCard doesn't support row-span easily without grid-row start, 
              // but standard CSS grid auto-placement handles it if we use classes.
              
              let spanClass = ""
              if (i === 0) spanClass = "md:col-span-2 md:row-span-2"
              else if (i === 3 || i === 6) spanClass = "md:col-span-2"
              else if (i === 4) spanClass = "md:row-span-2"

              return (
                <motion.div
                    key={art._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className={spanClass}
                >
                    <BentoCard
                        href={`/work/${art.slug.current}`}
                        title={art.title}
                        subtitle={`${art.year} • ${art.medium}`}
                        className="h-full min-h-[280px]"
                    >
                         {(() => {
                           const mockUrl = art.mockUrl;
                           const hasValidImage = art.mainImage && art.mainImage.asset && art.mainImage.asset._ref && !art.mainImage.asset._ref.includes('mock');
                           
                           if (mockUrl) {
                             return (
                               <Image
                                 src={mockUrl}
                                 alt={art.title}
                                 fill
                                 className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                 sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
                               />
                             );
                           } else if (hasValidImage) {
                             return (
                               <Image
                                 src={urlForImage(art.mainImage).width(800).height(i===0 ? 800 : 600).url()}
                                 alt={art.title}
                                 fill
                                 className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                 sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
                               />
                             );
                           } else {
                             return (
                               <div className="w-full h-full bg-black/20 flex flex-col items-center justify-center text-muted-foreground/50 gap-2">
                                 <span className="font-mono text-xs tracking-[0.3em] text-destructive animate-pulse">NO SIGNAL</span>
                                 <div className="h-px w-12 bg-destructive/50" />
                               </div>
                             );
                           }
                         })()}
                    </BentoCard>
                </motion.div>
              )
            })}
          </AnimatePresence>
          
          {filtered.length === 0 && (
            <div className="col-span-full h-80 flex flex-col items-center justify-center text-muted-foreground">
               <p className="font-mono text-xl">ARCHIVE EMPTY</p>
               <button onClick={() => window.location.reload()} className="mt-4 underline decoration-primary">RESET SENSORS</button>
            </div>
          )}
       </BentoGrid>
    </div>
  )
}

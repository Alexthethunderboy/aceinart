import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { urlForImage } from "@/lib/sanity/image"
import { Artwork } from "@/lib/types"

export function ArtworkCard({ artwork }: { artwork: Artwork }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative w-full mb-8 break-inside-avoid"
    >
      <Link href={`/work/${artwork.slug.current}`}>
        <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500 bg-card">
            {/* Image Container */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                {artwork.mainImage ? (
                  <Image 
                    src={urlForImage(artwork.mainImage).width(800).height(1067).url()} 
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}
                
                {/* View Detail Overlay */}
                <div className="absolute top-4 right-4 bg-background/90 text-foreground px-3 py-1 text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm shadow-sm backdrop-blur-sm">
                   View Detail
                </div>
            </div>

            {/* Caption Area */}
            <div className="p-4 bg-card text-card-foreground">
                <h3 className="text-lg font-sans font-bold leading-tight group-hover:text-primary transition-colors">
                  {artwork.title}
                </h3>
                <div className="flex justify-between items-center mt-2 text-sm opacity-60 font-mono">
                   <span>{artwork.year}</span>
                   <span>{artwork.medium}</span>
                </div>
            </div>
        </div>
      </Link>
    </motion.div>
  )
}

import Link from "next/link"
import { notFound } from "next/navigation"
import { client } from "@/lib/sanity/client"
import { artworkBySlugQuery } from "@/lib/sanity/queries"
import { urlForImage } from "@/lib/sanity/image"
import { Metadata, ResolvingMetadata } from "next"
import { ArrowLeft } from "lucide-react"
import { ArtistNote } from "@/components/gallery/Detail/ArtistNote"
import { ProcessPulse } from "@/components/gallery/ProcessPulse"
import { ArtworkCard } from "@/components/gallery/ArtworkCard"
import { MacroLensCard } from "@/components/gallery/MacroLensCard"
import { CreativeDNARadar } from "@/components/gallery/CreativeDNARadar"
import { Artwork } from "@/lib/types"

export const revalidate = 10;

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params
  const art: Artwork = await client.fetch(artworkBySlugQuery, { slug })

  if (!art) {
    return {
      title: 'Artwork Not Found | Ace-in-art',
    }
  }

  const previousImages = (await parent).openGraph?.images || []
  const ogImage = art.mainImage 
    ? urlForImage(art.mainImage).width(1200).height(630).url() 
    : previousImages[0]

  return {
    title: `${art.title} | Ace-in-art`,
    description: art.artistNote || `View ${art.title} by Ace-in-art.`,
    openGraph: {
      title: art.title,
      description: art.artistNote || `View ${art.title} by Ace-in-art.`,
      images: [ogImage, ...previousImages],
    },
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const art: Artwork = await client.fetch(artworkBySlugQuery, { slug })

  if (!art) {
    notFound()
  }

  const imageUrl = art.mainImage ? urlForImage(art.mainImage).width(1200).url() : ''

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
       {/* Sticky Image Column */}
       <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative md:sticky top-0 bg-gray-100 dark:bg-black/50 flex items-center justify-center overflow-hidden p-8 border-r border-white/5">
          <Link href="/" className="absolute top-8 left-8 z-30 flex items-center gap-2 text-sm uppercase tracking-widest hover:underline mix-blend-difference text-white">
             <ArrowLeft size={16} /> Back
          </Link>
          
          <div className="relative w-full max-w-xl aspect-[3/4] shadow-2xl bg-black group">
             {/* Macro Lens Card replaces static image/lightbox */}
             {art.mainImage && (
                <MacroLensCard imageUrl={imageUrl} alt={art.title} className="w-full h-full border-none" />
             )}
             
             {/* Note Overlay */}
             {art.artistNote && <ArtistNote note={art.artistNote} />}
          </div>
       </div>

       {/* Scrollable Content Column */}
       <div className="w-full md:w-1/2 min-h-screen bg-canvas dark:bg-black transition-colors duration-700 p-8 md:p-24 flex flex-col justify-center">
          <div className="max-w-md w-full">
             <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-4 text-white uppercase">{art.title}</h1>
             
             <div className="flex gap-8 text-sm font-mono opacity-60 mb-8 border-b border-white/20 pb-4 text-white">
                <span>{art.year}</span>
                <span>{art.medium}</span>
                {art.category && (
                  <span className="uppercase tracking-widest text-xs border border-white/40 px-2 py-0.5 rounded-full">{art.category.title}</span>
                )}
             </div>

             {/* Creative DNA Radar */}
             {art.creativeDNA && (
                <div className="mb-12 p-6 border border-white/5 bg-white/5 rounded-xl">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Creative DNA Code</h3>
                    <CreativeDNARadar data={art.creativeDNA} className="w-full h-48" />
                </div>
             )}

             <div className="prose dark:prose-invert font-light text-lg mb-12 whitespace-pre-line text-white/80">
                {art.description || "No description provided for this artwork."}
             </div>

             <ProcessPulse items={art.progress || []} className="mb-12" />
             
             {/* Related Works */}
             {art.related && art.related.length > 0 && (
               <div className="mt-12 pt-12 border-t border-dashed border-white/20">
                  <h3 className="font-sans font-bold text-lg mb-8 opacity-60 text-white">
                    More in {art.category?.title || 'this category'}
                  </h3>
                  <div className="grid grid-cols-1 gap-8">
                    {/* Reuse home layout loop style? No, simple stack is fine for sidebar feel or grid */}
                    {art.related.map((relatedArt: Artwork) => (
                      <ArtworkCard key={relatedArt._id} artwork={relatedArt} />
                    ))}
                  </div>
               </div>
             )}
          </div>
       </div>
    </div>
  )
}

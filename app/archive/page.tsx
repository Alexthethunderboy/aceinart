import { FilterBuilder } from "@/components/gallery/FilterBuilder"
import { SpatialGalleryCanvas } from "@/components/gallery/SpatialGalleryCanvas"
import { GeometricSkeleton } from "@/components/ui/GeometricSkeleton"
import { Suspense } from "react"
import { client } from "@/lib/sanity/client"
import { filtersQuery, artworksQuery, settingsQuery } from "@/lib/sanity/queries"
import { BrandLogo } from "@/components/layout/BrandLogo"
import { MOCK_ARTWORKS, MOCK_FILTERS } from "@/lib/mock-data"

export default async function ArchivePage() {
  const [fetchedFilters, fetchedSettings] = await Promise.all([
    client.fetch(filtersQuery).catch(() => null),
    client.fetch(settingsQuery).catch(() => null),
  ])

  const filters = fetchedFilters || MOCK_FILTERS
  const settings = fetchedSettings || {}
  
  return (
    <div className="flex flex-col min-h-screen pb-20 relative overflow-x-hidden">
      {/* Archive Header */}
      <header className="relative z-10 pt-20 sm:pt-28 md:pt-32 pb-12 md:pb-16 px-4 sm:px-6 text-center">
        <div className="mb-6 flex justify-center">
          <BrandLogo settings={settings} size="sm" className="opacity-80 hover:opacity-100" />
        </div>

        <div className="inline-block border border-accent/50 text-accent px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-mono tracking-[0.15em] sm:tracking-[0.2em] mb-8 sm:mb-10 animate-fade-in backdrop-blur-xl bg-black/40 shadow-[0_0_15px_rgba(217,4,142,0.3)]">
          Full Collection
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter mb-6 sm:mb-8 leading-none uppercase text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-pulse-slow drop-shadow-[0_0_20px_rgba(217,4,142,0.5)]">Archive</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-light max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed px-4">
          A curated collection of visual experiments, digital explorations, and creative expressions.
        </p>
      </header>

      {/* Filters and Gallery */}
      <Suspense fallback={
         <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 md:p-8">
            <GeometricSkeleton className="h-[280px] md:col-span-2 md:row-span-2" />
            <GeometricSkeleton className="h-[280px]" />
            <GeometricSkeleton className="h-[280px]" />
            <GeometricSkeleton className="h-[280px] md:col-span-2" />
         </div>
      }>
         <FilterBuilder initialMediums={filters?.mediums || []} />
         <GalleryWrapper />
      </Suspense>
    </div>
  );
}

async function GalleryWrapper() {
  const artworks = await client.fetch(artworksQuery).catch(() => [])
  const data = artworks.length > 0 ? artworks : MOCK_ARTWORKS
  return <SpatialGalleryCanvas artworks={data} />
}

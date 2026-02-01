import { HomeBentoGallery } from "@/components/gallery/HomeBentoGallery"
import { ManifestoTicker } from "@/components/layout/ManifestoTicker"
import { GeometricSkeleton } from "@/components/ui/GeometricSkeleton"
import { Suspense } from "react"
import { client } from "@/lib/sanity/client"
import { homeQuery, filtersQuery, artworksQuery, settingsQuery, manifestoQuery, aboutQuery } from "@/lib/sanity/queries"
import { BrandLogo } from "@/components/layout/BrandLogo";
import { AboutSection } from "@/components/home/AboutSection";

import { MOCK_ARTWORKS, MOCK_FILTERS, MOCK_HOME_DATA, MOCK_MANIFESTO } from "@/lib/mock-data"

export default async function Home() {
  const [fetchedHomeData, fetchedFilters, fetchedSettings, fetchedManifesto, fetchedAboutData] = await Promise.all([
    client.fetch(homeQuery).catch(() => null),
    client.fetch(filtersQuery).catch(() => null),
    client.fetch(settingsQuery).catch(() => null),
    client.fetch(manifestoQuery).catch(() => null),
    client.fetch(aboutQuery).catch(() => null),
  ])

  const homeData = fetchedHomeData || MOCK_HOME_DATA
  const filters = fetchedFilters || MOCK_FILTERS
  const settings = fetchedSettings || {}
  const manifesto = fetchedManifesto?.length > 0 ? fetchedManifesto : MOCK_MANIFESTO
  
  return (
    <div className="flex flex-col min-h-screen pb-20 relative overflow-x-hidden">
      {/* Header / Intro */}
      {/* Header / Intro */}
      <header className="relative z-10 pt-20 sm:pt-28 md:pt-32 pb-12 md:pb-16 px-4 sm:px-6 text-center">
        {homeData?.heroLabel && (
          <div className="inline-block border border-primary/50 text-primary px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-mono tracking-[0.15em] sm:tracking-[0.2em] mb-8 sm:mb-10 animate-fade-in backdrop-blur-xl bg-black/40 shadow-[0_0_15px_rgba(157,78,221,0.3)]">
             {homeData.heroLabel}
          </div>
        )}
         <div className="mb-6 sm:mb-8 flex justify-center">
            <BrandLogo settings={settings} size="hero" />
         </div>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-light max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed mix-blend-plus-lighter">
          {homeData?.heroSubtitle || "Experimental interfaces and raw artistic chaos."}
        </p>
        <div className="flex justify-center relative z-20 px-4">
           <a href="/archive" className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-transparent overflow-hidden rounded-sm transition-all duration-300 hover:scale-105">
             <div className="absolute inset-0 w-full h-full bg-primary/10 group-hover:bg-primary/30 backdrop-blur-md border border-primary/50 transition-all duration-300 rounded-sm"></div>
             <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             <span className="relative text-primary group-hover:text-white transition-colors duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] font-black tracking-[0.2em] text-sm">
               EXPLORE DNA
             </span>
           </a>
        </div>
      </header>

      <AboutSection data={fetchedAboutData} settings={settings} />

      {/* Manifesto Ticker */}
      <div className="mb-12 relative z-20">
          <ManifestoTicker items={manifesto} />
      </div>
      
      <Suspense fallback={
         <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 md:p-8">
            <GeometricSkeleton className="h-[280px] md:col-span-2 md:row-span-2" />
            <GeometricSkeleton className="h-[280px]" />
            <GeometricSkeleton className="h-[280px]" />
            <GeometricSkeleton className="h-[280px] md:col-span-2" />
         </div>
      }>
         <GalleryWrapper />
      </Suspense>
    </div>
  );
}

async function GalleryWrapper() {
  const artworks = await client.fetch(artworksQuery).catch(() => [])
  const data = artworks.length > 0 ? artworks : MOCK_ARTWORKS
  return <HomeBentoGallery initialArtworks={data} />
}

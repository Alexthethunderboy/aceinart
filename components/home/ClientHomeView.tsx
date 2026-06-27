"use client"
import React from "react"

import { useIsMobile } from "@/hooks/use-mobile"
import { ImmersiveScene } from "@/components/gallery/ImmersiveScene"
import { ManifestoTicker } from "@/components/layout/ManifestoTicker"
import { AboutSection } from "@/components/home/AboutSection"
import { SpatialGalleryCanvas } from "@/components/gallery/SpatialGalleryCanvas"
import { HomeHeroUI } from "./HomeHeroUI"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ClientHomeView({ homeData, settings, manifesto, aboutData, artworks }: any) {
  const isMobile = useIsMobile()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Return a consistent skeleton for SSR and first client render
  if (!mounted || isMobile === undefined) {
    return <div className="min-h-screen bg-black w-full" style={{ backgroundColor: '#000000' }} />
  }

  if (isMobile) {
    return (
      <div className="flex flex-col min-h-screen pb-20 relative overflow-x-hidden">
        <HomeHeroUI layout="mobile" homeData={homeData} settings={settings} />

        <AboutSection data={aboutData} settings={settings} />

        <div className="mb-12 relative z-20">
            <ManifestoTicker items={manifesto} />
        </div>
        
        <div className="p-4 md:p-8">
           <SpatialGalleryCanvas artworks={artworks} />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-screen overflow-hidden relative" style={{ backgroundColor: '#000000' }}>
       <ImmersiveScene 
          artworks={artworks} 
          homeData={homeData} 
          settings={settings} 
          manifesto={manifesto} 
          aboutData={aboutData} 
       />
    </div>
  )
}

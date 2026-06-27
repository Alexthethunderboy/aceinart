import React from "react";
import { BrandLogo } from "@/components/layout/BrandLogo";

interface HomeHeroUIProps {
  layout: "mobile" | "sidebar";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  homeData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings: any;
}

export function HomeHeroUI({ layout, homeData, settings }: HomeHeroUIProps) {
  const isSidebar = layout === "sidebar";

  return (
    <div className={`relative z-10 flex flex-col w-full ${isSidebar ? 'items-start text-left h-full justify-center px-8 md:px-12 lg:px-16' : 'items-center text-center pt-20 sm:pt-28 md:pt-32 pb-12 md:pb-16 px-4 sm:px-6'}`}>
      {homeData?.heroLabel && (
        <div className={`inline-block border border-primary/50 text-primary px-5 sm:px-8 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-mono tracking-[0.2em] mb-10 sm:mb-12 animate-fade-in backdrop-blur-xl bg-black/40 shadow-[0_0_15px_rgba(157,78,221,0.3)] ${isSidebar ? 'mb-8' : ''}`}>
           {homeData.heroLabel}
        </div>
      )}
      <div className={`mb-8 sm:mb-10 flex w-full ${isSidebar ? 'justify-start' : 'justify-center'}`}>
         <BrandLogo settings={settings} size="hero" />
      </div>
      <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light max-w-2xl mb-12 sm:mb-16 leading-relaxed mix-blend-plus-lighter ${isSidebar ? 'mx-0 text-left' : 'mx-auto'}`}>
        {homeData?.heroSubtitle || "Experimental interfaces and raw artistic chaos."}
      </p>
      <div className={`flex w-full relative z-20 ${isSidebar ? 'justify-start' : 'justify-center'}`}>
         <a href="/archive" className={`w-full sm:w-auto group relative px-6 sm:px-12 py-5 sm:py-6 bg-transparent overflow-hidden rounded-sm transition-all duration-300 flex items-center justify-center border border-primary/50`}>
           <div className="absolute inset-0 w-full h-full bg-primary/10 group-hover:bg-primary/30 backdrop-blur-md transition-all duration-300 rounded-sm"></div>
           <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
           <span className="relative text-accent group-hover:text-white transition-colors duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] font-black tracking-[0.2em] text-base sm:text-lg">
             {homeData?.primaryCTA?.label || "ARCHIVE"}
           </span>
         </a>
      </div>
    </div>
  );
}

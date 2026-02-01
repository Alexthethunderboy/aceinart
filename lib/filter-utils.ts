import { type Artwork } from "@/lib/types" // Need to define types

export type ActiveFilters = {
  medium: string | null
  mood: string | null
  color: string | null
}

export function filterArtwork(
  allArt: Artwork[], 
  activeFilters: ActiveFilters,
  isVulnerable: boolean
): Artwork[] {
  return allArt.filter((art) => {
    // 1. Vulnerability Check
    const vulnerabilityLevel = art.vulnerabilityLevel || 10
    if (!isVulnerable && vulnerabilityLevel <= 5) {
      return false // Hide raw work if mode is off
    }

    // 2. Medium Filter
    if (activeFilters.medium && art.medium) {
       // Handle if medium is array or string. Assuming string for simple equality or includes
       const artMedium = Array.isArray(art.medium) ? art.medium : [art.medium]
       if (!artMedium.some((m: string) => m.toLowerCase() === activeFilters.medium?.toLowerCase())) {
         return false
       }
    }

    // 3. Mood Filter
    if (activeFilters.mood && art.mood) {
      if (art.mood.toLowerCase() !== activeFilters.mood.toLowerCase()) {
        return false
      }
    }

    // 4. Color/Palette Filter - Removed placeholder

    return true
  })
}

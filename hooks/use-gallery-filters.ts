"use client"

import { useQueryState, parseAsString } from 'nuqs'

export function useGalleryFilters() {
  const [medium, setMedium] = useQueryState('medium', parseAsString)
  const [mood, setMood] = useQueryState('mood', parseAsString)
  
  // Helper to clear all
  const clearFilters = () => {
    setMedium(null)
    setMood(null)
  }

  return {
    medium,
    setMedium,
    mood,
    setMood,
    clearFilters,
    activeFilters: { medium, mood, color: null } // Color not yet in URL for this demo
  }
}

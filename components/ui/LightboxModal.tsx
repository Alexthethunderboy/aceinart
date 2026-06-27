"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GalleryItem } from "@/lib/types"
import { urlForImage } from "@/lib/sanity/image"

interface LightboxModalProps {
  isOpen: boolean
  onClose: () => void
  mediaList: GalleryItem[]
  initialIndex?: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function LightboxModal({ isOpen, onClose, mediaList, initialIndex = 0 }: any) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  // Sync state if initialIndex changes when opening
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentIndex(initialIndex)
    }
  }, [isOpen, initialIndex])

  // Handle keyboard navigation
  const showNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % mediaList.length)
  }, [mediaList.length])

  const showPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length)
  }, [mediaList.length])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") showNext()
      if (e.key === "ArrowLeft") showPrev()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, showNext, showPrev])

  const renderMedia = (item: GalleryItem) => {
    if (item._type === "file" && item.assetUrl) {
      return (
        <video 
          src={item.assetUrl} 
          controls 
          autoPlay 
          loop 
          className="max-h-full max-w-full object-contain shadow-2xl"
        />
      )
    }

    // Default to Image handling
    // If it's a mockUrl from our mock data or full sanity image
    const typedItem = item as GalleryItem & { mockUrl?: string };
    const src = typedItem.assetUrl || typedItem.mockUrl || urlForImage(typedItem as never).width(2000).url()
    
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={item.alt || "Artwork preview"}
        className="max-h-full max-w-full object-contain shadow-2xl"
      />
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
          onClick={onClose}
        >
          {/* Close button */}
          <button 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={(e: any) => { e.stopPropagation(); onClose(); }}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 z-10 bg-black/50 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center border border-white/10"
          >
            ✕
          </button>

          {/* Previous Button */}
          {mediaList.length > 1 && (
            <button 
              onClick={showPrev}
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 z-10 hover:bg-white/5 rounded-full"
            >
              ←
            </button>
          )}

          {/* Main Media Content */}
          <div 
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking on media
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full h-full flex items-center justify-center"
              >
                 {mediaList[currentIndex] && renderMedia(mediaList[currentIndex])}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Button */}
          {mediaList.length > 1 && (
            <button 
              onClick={showNext}
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 z-10 hover:bg-white/5 rounded-full"
            >
              →
            </button>
          )}

          {/* Pagination Counter */}
          {mediaList.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 font-mono text-xs tracking-widest bg-black/50 px-4 py-2 rounded-full border border-white/10">
              {currentIndex + 1} / {mediaList.length}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

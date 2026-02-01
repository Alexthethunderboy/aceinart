"use client"
import { motion, AnimatePresence } from "framer-motion"

export function ArtistNote({ note }: { note?: string }) {
  if (!note) return null

  return (
    <AnimatePresence>
      <motion.div
         initial={{ opacity: 0, rotate: -5, x: -10 }}
         animate={{ opacity: 1, rotate: -2, x: 0 }}
         exit={{ opacity: 0 }}
         className="absolute -top-12 -left-8 md:-left-16 z-20 max-w-[200px] pointer-events-none"
      >
        <div className="bg-tape-yellow text-ink shadow-md p-4 rotate-2 transform font-hand text-lg leading-tight relative rounded-sm">
           <div className="absolute top-0 left-1/2 -mt-2 w-4 h-4 bg-black/10 rounded-full blur-[2px]" />
           “{note}”
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

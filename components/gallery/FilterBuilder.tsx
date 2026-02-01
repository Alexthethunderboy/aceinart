"use client"

import { useGalleryFilters } from "@/hooks/use-gallery-filters"
import { cn } from "@/lib/utils"

interface FilterBuilderProps {
  initialMediums: string[]
}

export function FilterBuilder({ initialMediums }: FilterBuilderProps) {
  const { medium, setMedium, clearFilters } = useGalleryFilters()

  return (
    <div className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/10 dark:bg-black/10 py-4 px-4 md:px-8 border-b border-white/5 transition-all">
       <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap gap-2 text-sm font-light">
             <span className="opacity-50 mr-2 flex items-center">MEDIUM:</span>
             {initialMediums.map(m => (
               <button
                 key={m}
                 onClick={() => setMedium(medium === m ? null : m)}
                 className={cn(
                   "px-2 py-1 rounded-sm border-b transition-all duration-300 relative",
                   medium === m 
                     ? "border-pencil-red text-pencil-red font-medium" 
                     : "border-transparent text-ink/70 hover:text-ink hover:underline"
                 )}
               >
                 {m}
               </button>
             ))}
          </div>
          
          {medium && (
             <button 
               onClick={() => clearFilters()}
               className="ml-auto text-xs font-mono text-destructive underline hover:opacity-80"
             >
               CLEAR ALL
             </button>
          )}
       </div>
    </div>
  )
}

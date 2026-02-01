import { PasswordGate } from "@/components/admin/PasswordGate"
import { ArtworkCard } from "@/components/gallery/ArtworkCard"
// import { client } from "@/lib/sanity/client" 

// Mock Fetcher
async function getExhibition(slug: string) {
  return {
    title: "The Blue Period",
    password: "ACE",
    artworks: [
      { _id: '1', title: 'Work A', slug: {current: 'a'}, mainImage: '', year: '2024', medium: 'Digital', vulnerabilityLevel: 10 },
      { _id: '2', title: 'Work B', slug: {current: 'b'}, mainImage: '', year: '2024', medium: 'Digital', vulnerabilityLevel: 10 },
      { _id: '3', title: 'Work C', slug: {current: 'c'}, mainImage: '', year: '2024', medium: 'Digital', vulnerabilityLevel: 10 },
    ]
  }
}

export default async function ExhibitionPage({ params }: { params: { slug: string } }) {
  const exhibition = await getExhibition(params.slug)

  return (
    <PasswordGate correctPassword={exhibition.password}>
      <div className="h-screen w-full overflow-x-auto overflow-y-hidden bg-canvas text-ink flex items-center px-12 md:px-24">
         <div className="fixed top-12 left-12 z-10">
            <h1 className="text-xl uppercase tracking-widest font-bold">{exhibition.title}</h1>
            <p className="text-xs opacity-50">Curated Exhibition</p>
         </div>

         {/* Gallery Wall - Horizontal Scroll Container */}
         <div className="flex gap-24 h-[60vh] items-center min-w-max">
            {exhibition.artworks.map((art) => (
              <div key={art._id} className="relative aspect-[3/4] h-full shadow-lg bg-white p-4">
                 <div className="w-full h-full bg-gray-200" /> {/* Placeholder Image */}
                 <div className="mt-4">
                    <p className="font-bold">{art.title}</p>
                 </div>
              </div>
            ))}
         </div>
         
         <div className="ml-24 opacity-20 pr-24">END OF SHOW</div>
      </div>
    </PasswordGate>
  )
}

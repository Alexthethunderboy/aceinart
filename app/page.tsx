import { Suspense } from "react"
import { client } from "@/lib/sanity/client"
import { homeQuery, filtersQuery, artworksQuery, settingsQuery, manifestoQuery, aboutQuery } from "@/lib/sanity/queries"
import { MOCK_ARTWORKS, MOCK_HOME_DATA, MOCK_MANIFESTO } from "@/lib/mock-data"
import { ClientHomeView } from "@/components/home/ClientHomeView"
export const revalidate = 10;

export default async function Home() {
  const [fetchedHomeData, _fetchedFilters, fetchedSettings, fetchedManifesto, fetchedAboutData, fetchedArtworks] = await Promise.all([
    client.fetch(homeQuery).catch(() => null),
    client.fetch(filtersQuery).catch(() => null),
    client.fetch(settingsQuery).catch(() => null),
    client.fetch(manifestoQuery).catch(() => null),
    client.fetch(aboutQuery).catch(() => null),
    client.fetch(artworksQuery).catch(() => [])
  ])

  const homeData = fetchedHomeData || MOCK_HOME_DATA
  const settings = fetchedSettings || {}
  const manifesto = fetchedManifesto?.length > 0 ? fetchedManifesto : MOCK_MANIFESTO
  const artworks = fetchedArtworks?.length > 0 ? fetchedArtworks : MOCK_ARTWORKS
  
  return (
    <ClientHomeView 
      homeData={homeData} 
      settings={settings} 
      manifesto={manifesto} 
      aboutData={fetchedAboutData}
      artworks={artworks} 
    />
  );
}

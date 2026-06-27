import Link from "next/link"
import { client } from "@/lib/sanity/client"
import { aboutQuery, settingsQuery } from "@/lib/sanity/queries"
import { PortableText } from "@portabletext/react"

export const revalidate = 10;

export default async function AboutPage() {
  const [fetchedAboutData, fetchedSettings] = await Promise.all([
    client.fetch(aboutQuery).catch(() => null),
    client.fetch(settingsQuery).catch(() => null)
  ])

  // Mock data for about page
  const mockAboutData = {
    title: "About Ace-in-art",
    subtitle: "Creative Technologist & Visual Artist",
    mainContent: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "I'm Achilihu Chinedu Emmanuel, a creative technologist and visual artist based in Lagos, Nigeria. My work exists at the intersection of art, design, and technology—where pixels become poetry and code transforms into canvas." }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Through digital mediums, I explore themes of identity, culture, and the human experience in our increasingly connected world. Each piece is an experiment, a question posed in color and form, inviting viewers to pause and reflect." }]
      }
    ],
    philosophyTitle: "Creative Philosophy",
    philosophyItems: [
      "Design with intention, create with passion",
      "Embrace the chaos, find the beauty",
      "Every project tells a story",
      "Push boundaries, break conventions"
    ],
    ctaTitle: "Let's Create Together",
    ctaDescription: "Whether you have a project in mind or just want to chat about art and design, I'd love to hear from you.",
    ctaButtonLabel: "Get in Touch"
  }

  const aboutData = fetchedAboutData || mockAboutData
  const settings = fetchedSettings || {}

  return (
    <div className="min-h-screen bg-canvas text-ink p-8 md:p-24 transition-colors duration-700 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <header className="mb-20 text-center">
           <h1 className="text-5xl md:text-7xl font-sans font-black tracking-tight mb-6 uppercase">
             {aboutData.title?.split(' ').slice(0, -1).join(' ')} <span className="text-primary">{aboutData.title?.split(' ').slice(-1)}</span>
           </h1>
           {aboutData.subtitle && (
             <p className="font-mono text-base md:text-lg opacity-60 uppercase tracking-widest bg-secondary/10 inline-block px-4 py-2 rounded-lg">
               {aboutData.subtitle}
             </p>
           )}
        </header>

        <section className="prose prose-lg prose-invert mb-24 font-normal leading-loose text-foreground">
           <div className="space-y-6">
              <PortableText value={aboutData.mainContent} />
           </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t-2 border-dashed border-border pt-16">
           <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
              <h3 className="font-sans text-2xl font-black mb-6 text-primary">{aboutData.philosophyTitle || "MY PHILOSOPHY"}</h3>
              <ul className="space-y-4 text-lg font-medium text-card-foreground">
                 {aboutData.philosophyItems?.map((item: string, index: number) => (
                   <li key={index} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-secondary" /> {item}
                   </li>
                 ))}
              </ul>
           </div>
           
           <div className="flex flex-col justify-center items-start">
              <h3 className="font-sans text-2xl font-black mb-6 text-foreground">{aboutData.ctaTitle || "WANNA TALK?"}</h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {aboutData.ctaDescription}
              </p>
              <a href={settings?.email ? `mailto:${settings.email}` : "mailto:hello@aceinart.com"} className="btn-primary w-full md:w-auto text-center">
                {aboutData.ctaButtonLabel || "SAY HELLO"}
              </a>
           </div>
        </div>
        
        <div className="mt-32 text-center">
           <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
              <span>←</span> BACK TO THE CHAOS
           </Link>
        </div>
      </div>
    </div>
  )
}

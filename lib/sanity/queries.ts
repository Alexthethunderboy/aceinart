import { groq } from "next-sanity";

export const manifestoQuery = groq`*[_type == "manifestoItem" && active == true] {
  _id,
  text,
  type
}`

export const artworksQuery = groq`*[_type == "artwork"] | order(year desc) {
  _id,
  title,
  slug,
  mainImage,
  year,
  medium,
  vulnerabilityLevel,
  description,
  mood,
  artistNote,
  category->{
    title,
    slug
  }
}`;

export const artworkBySlugQuery = groq`*[_type == "artwork" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  year,
  medium,
  vulnerabilityLevel,
  description,
  mood,
  artistNote,
  accentColor,
  creativeDNA,
  progress,
  category->{
    title,
    slug
  },
  "related": *[_type == "artwork" && category._ref == ^.category._ref && _id != ^._id] | order(_createdAt desc) [0...3] {
    _id,
    title,
    slug,
    mainImage,
    year
  }
}`;

export const artworkSlugsQuery = groq`*[_type == "artwork" && defined(slug.current)][].slug.current`;

export const settingsQuery = groq`*[_type == "settings"][0] {
  title,
  description,
  ogImage,
  logo,
  artistImage,
  email,
  socialLinks
}`;

export const homeQuery = groq`*[_type == "homePage"][0] {
  heroLabel,
  heroTitle,
  heroSubtitle,
  primaryCTA,
  secondaryCTA
}`;

export const aboutQuery = groq`*[_type == "aboutPage"][0] {
  title,
  subtitle,
  mainContent,
  philosophyTitle,
  philosophyItems,
  ctaTitle,
  ctaDescription,
  ctaButtonLabel
}`;

export const filtersQuery = groq`{
  "moods": array::unique(*[_type == "artwork" && defined(mood)].mood),
  "mediums": array::unique(*[_type == "artwork" && defined(medium)].medium)
}`;

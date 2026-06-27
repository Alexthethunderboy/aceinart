export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface Settings {
    title?: string
    description?: string
    ogImage?: SanityImage
    email?: string
    socialLinks?: {
        platform: string
        url: string
    }[]
    logo?: SanityImage
    artistImage?: SanityImage
}

export interface GalleryItem {
  _type: 'image' | 'file'
  _key: string
  asset: {
    _ref: string
    _type: 'reference'
  }
  assetUrl?: string // populated by our GROQ query
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface Artwork {
  _id: string
  title: string
  slug: { current: string }
  mainImage: SanityImage
  gallery?: GalleryItem[]
  year: string
  medium: string
  vulnerabilityLevel: number
  description?: string
  artistNote?: string
  mood?: string
  category?: {
    title: string
    slug: { current: string }
  }
  progress?: SanityImage[]
  related?: Artwork[]
  accentColor?: string
  creativeDNA?: {
    medium: number
    complexity: number
    emotion: number
    abstraction: number
  }
  mockUrl?: string
}

import { PortableTextBlock } from "sanity";

export interface AboutPage {
  mainContent?: PortableTextBlock[] 
  philosophyItems?: string[]
}

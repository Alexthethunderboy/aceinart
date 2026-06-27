export const MOCK_HOME_DATA = {
  heroLabel: "Portfolio & Archive",
  heroTitle: "Ace-in-art",
  heroSubtitle: "Experimental interfaces and raw artistic chaos.",
  primaryCTA: {
    label: "ARCHIVE",
    link: "/archive"
  },
  secondaryCTA: {
    label: "GET IN TOUCH",
    link: "mailto:hello@aceinart.com"
  }
};

export const MOCK_MANIFESTO = [
  { _id: "1", text: "Every pixel tells a story", type: "quote" },
  { _id: "2", text: "New series: Neon Dreams launching soon", type: "news" },
  { _id: "3", text: "Creating from Lagos, Nigeria", type: "location" },
  { _id: "4", text: "Art is the bridge between chaos and meaning", type: "quote" },
  { _id: "5", text: "Currently exploring: Abstract portraiture", type: "news" }
];

export const MOCK_FILTERS = {
  moods: ["Neon", "Dark", "Glitch", "Cyber", "Organic"],
  mediums: ["Digital", "3D Render", "Photography", "Code", "Interactive"]
};

export const MOCK_ARTWORKS = [
  {
    _id: "art1",
    title: "Neon Genesis",
    year: "2025",
    medium: "Digital Painting",
    slug: { current: "neon-genesis" },
    mockUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop" 
  },
  {
    _id: "art2",
    title: "Fractured Realities",
    year: "2024",
    medium: "Generative Art",
    slug: { current: "fractured-realities" },
    mockUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop"
  },
  {
    _id: "art3",
    title: "Urban Dreamscape",
    year: "2025",
    medium: "3D Illustration",
    slug: { current: "urban-dreamscape" },
    mockUrl: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop"
  },
  {
    _id: "art4",
    title: "Void Gazing",
    year: "2023",
    medium: "Photography",
    slug: { current: "void-gazing" },
    mockUrl: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2674&auto=format&fit=crop"
  },
  {
    _id: "art5",
    title: "Data in Motion",
    year: "2025",
    medium: "Interactive Installation",
    slug: { current: "data-in-motion" },
    mockUrl: "https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=2698&auto=format&fit=crop"
  },
  {
    _id: "art6",
    title: "Shattered Perspectives",
    year: "2024",
    medium: "Mixed Media Collage",
    slug: { current: "shattered-perspectives" },
    mockUrl: "https://images.unsplash.com/photo-1492551557933-34265f7af79e?q=80&w=2670&auto=format&fit=crop"
  },
  {
    _id: "art7",
    title: "The Core",
    year: "2025",
    medium: "Digital Sculpture",
    slug: { current: "the-core" },
    mockUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop"
  }
];

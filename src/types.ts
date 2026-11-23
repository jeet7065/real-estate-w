export interface Property {
  id: string
  name: string
  tagline: string
  category: 'Commercial' | 'Residential' | 'Mixed-Use' | 'Retail'
  location: string
  city: string
  priceFrom: string
  area: string
  status: 'Ready for Fit-Out' | 'Under Development' | 'Completed' | 'Pre-Launch'
  architect: string
  completionYear: string
  image: string
  exteriorImage: string
  interiorImage: string
  heroImage: string
  description: string
  highlights: string[]
  specs: {
    label: string
    value: string
  }[]
  features: string[]
}

export interface GalleryItem {
  id: string
  title: string
  category: 'Exterior' | 'Interior' | 'Landscape' | 'Lobby' | 'Facade'
  property: string
  location: string
  image: string
  aspect: 'tall' | 'wide' | 'square'
  dimensions?: string
}

export interface StatItem {
  number: number
  suffix: string
  label: string
  description: string
}

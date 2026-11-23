import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMotionValue } from 'motion/react'
import {
  ContainerAnimated,
  ContainerScroll,
  ContainerStagger,
  ContainerSticky,
  GalleryCol,
  GalleryContainer,
} from '@/components/ui/animated-gallery'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, Compass, Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { TypewriterHeading } from '@/components/ui/scroll-reveal'

gsap.registerPlugin(ScrollTrigger)

interface GalleryItemData {
  id: string
  title: string
  category: string
  property: string
  location: string
  image: string
  dimensions: string
}

const GALLERY_COL_1: GalleryItemData[] = [
  {
    id: 'gal-1',
    title: 'The Meridian Sky Glaze',
    category: 'Exterior',
    property: 'The Meridian',
    location: 'Golf Course Road, Gurugram',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
    dimensions: '42 Storeys Low-E Glass Curtain',
  },
  {
    id: 'gal-5',
    title: 'Parametric Louver Fin Geometry',
    category: 'Facade',
    property: 'The Meridian',
    location: 'Exterior Detail',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=85',
    dimensions: 'Bioclimatic Solar Deflection Array',
  },
  {
    id: 'gal-7',
    title: 'Sculptural Corporate Monolith',
    category: 'Exterior',
    property: 'The Pinnacle Towers',
    location: 'NCR Financial Corridor',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
    dimensions: 'Grade-A Institutional Landmark',
  },
  {
    id: 'gal-8',
    title: 'Linear Granite Portal Framing',
    category: 'Exterior',
    property: 'The Meridian Tower',
    location: 'Entrance Colonnade',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=85',
    dimensions: 'Imported Flamed Granite & Bronze',
  },
]

const GALLERY_COL_2: GalleryItemData[] = [
  {
    id: 'gal-2',
    title: 'The Aurelia Sky Mansion Living Salon',
    category: 'Interior',
    property: 'The Aurelia',
    location: 'DLF Phase 5',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    dimensions: 'Floor-to-Ceiling Aravali Views',
  },
  {
    id: 'gal-9',
    title: 'Private Sky Infinity Observatory',
    category: 'Penthouse',
    property: 'The Solaris Penthouses',
    location: 'Level 50 Rooftop Deck',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
    dimensions: 'Heated Glass-Bottom Skyline Pool',
  },
  {
    id: 'gal-10',
    title: 'Cantilevered Sunset Terrace',
    category: 'Interior',
    property: 'The Aurelia Triplex',
    location: 'Sector 29 Luxury Enclave',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    dimensions: '3,200 sq.ft. Private Entertaining Deck',
  },
  {
    id: 'gal-11',
    title: 'Italian Travertine Master Bath Salon',
    category: 'Interior',
    property: 'The Aurelia Sky Residence',
    location: 'DLF Phase 5',
    image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=85',
    dimensions: 'Bookmatched Calacatta Marble & Hansgrohe',
  },
]

const GALLERY_COL_3: GalleryItemData[] = [
  {
    id: 'gal-3',
    title: 'Triple-Height Grand Travertine Lobby',
    category: 'Lobby',
    property: 'The Horizon',
    location: 'Cyber City',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85',
    dimensions: 'Italian Travertine & Cast Bronze',
  },
  {
    id: 'gal-4',
    title: 'Boulevard Promenade & Cascades',
    category: 'Landscape',
    property: 'The Grand Boulevard',
    location: 'High-Street District',
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=1200&q=85',
    dimensions: '4.5 Acres Curated Water Plaza',
  },
  {
    id: 'gal-12',
    title: 'Column-Free Corporate Headquarters',
    category: 'Interior',
    property: 'The Horizon Tower B',
    location: 'Cyber City Innovation Hub',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85',
    dimensions: '34,000 sq.ft. Column-Free Plate',
  },
  {
    id: 'gal-13',
    title: 'Nocturnal Skyline Illumination',
    category: 'Exterior',
    property: 'The Solaris Sky Tower',
    location: 'Sector 29 Luxury Enclave',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=85',
    dimensions: 'Integrated Bioluminescent Facade',
  },
]

const ALL_GALLERY_ITEMS = [...GALLERY_COL_1, ...GALLERY_COL_2, ...GALLERY_COL_3]

interface ArchitecturalGalleryProps {
  onOpenEnquiry?: (propertyTitle?: string) => void
}

export const ArchitecturalGallery: React.FC<ArchitecturalGalleryProps> = ({ onOpenEnquiry }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const progress = useMotionValue(0)
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItemData | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=250%',
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progress.set(self.progress)
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [progress])

  const handleNextLightbox = () => {
    if (!activeLightboxItem) return
    const currentIndex = ALL_GALLERY_ITEMS.findIndex((i) => i.id === activeLightboxItem.id)
    const nextIndex = (currentIndex + 1) % ALL_GALLERY_ITEMS.length
    setActiveLightboxItem(ALL_GALLERY_ITEMS[nextIndex])
  }

  const handlePrevLightbox = () => {
    if (!activeLightboxItem) return
    const currentIndex = ALL_GALLERY_ITEMS.findIndex((i) => i.id === activeLightboxItem.id)
    const prevIndex = (currentIndex - 1 + ALL_GALLERY_ITEMS.length) % ALL_GALLERY_ITEMS.length
    setActiveLightboxItem(ALL_GALLERY_ITEMS[prevIndex])
  }

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full h-screen min-h-screen bg-luxury-warmIvory text-luxury-charcoal overflow-hidden flex flex-col justify-start"
      style={{ backgroundColor: '#F8F5EF' }}
    >
      {/* Editorial Header with Stagger Animation */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-6 sm:pt-8 pb-2 shrink-0">
        <ContainerStagger>
          <ContainerAnimated className="inline-flex items-center gap-2 mb-2 sm:mb-2.5">
            <span className="w-2 h-2 rounded-full bg-luxury-gold animate-pulse" />
            <span className="text-luxury-gold font-manrope text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase">
              Visual Archive • 3D Architectural Perspectives
            </span>
          </ContainerAnimated>

          <ContainerAnimated>
            <TypewriterHeading
              text="Sculpting Skylines."
              highlight="Curating Landmarks."
              className="font-manrope text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-luxury-charcoal leading-[1.12]"
              highlightClassName="font-playfair italic font-normal text-luxury-gold"
            />
          </ContainerAnimated>

          <ContainerAnimated className="my-2 max-w-2xl mx-auto hidden sm:block">
            <p className="font-dmsans text-luxury-muted text-xs sm:text-sm leading-relaxed">
              Immerse yourself in our architectural portfolio. From Grade-A corporate towers to
              bespoke triplex penthouses, each development is engineered to command lasting metropolitan
              prestige and institutional longevity.
            </p>
          </ContainerAnimated>

          <ContainerAnimated className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
            <Button
              onClick={() => onOpenEnquiry?.('Visual Archive — Private Consultation')}
              className="rounded-full bg-luxury-gold hover:bg-luxury-bronze text-white font-manrope text-[11px] sm:text-xs font-semibold tracking-[0.14em] uppercase h-9 sm:h-10 px-5 sm:px-6 shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Request Private Walkthrough</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                const devSection = document.getElementById('developments')
                if (devSection) devSection.scrollIntoView({ behavior: 'smooth' })
              }}
              className="rounded-full bg-white/90 hover:bg-white border-luxury-border hover:border-luxury-gold text-luxury-charcoal font-manrope text-[11px] sm:text-xs font-semibold tracking-[0.14em] uppercase h-9 sm:h-10 px-5 sm:px-6 transition-colors shadow-sm"
            >
              Explore Portfolio
            </Button>
          </ContainerAnimated>
        </ContainerStagger>
      </div>

      {/* Luxury Golden Atmospheric Glow */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-[50vh] w-full"
        style={{
          background: 'radial-gradient(circle at 50% 20%, rgba(216, 144, 49, 0.15), rgba(248, 245, 239, 0) 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* 3D Perspective Scroll Container */}
      <div className="relative flex-1 w-full overflow-hidden pb-4 min-h-0">
        <ContainerScroll progress={progress} className="relative h-full w-full min-h-0">
          <ContainerSticky className="h-full w-full min-h-0 overflow-hidden flex items-center justify-center">
            <GalleryContainer className="max-w-7xl mx-auto px-4 sm:px-8 h-full w-full">
            {/* Column 1: Exterior Landmarks & Facades */}
            <GalleryCol yRange={['-12%', '4%']} className="-mt-4">
              {GALLERY_COL_1.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveLightboxItem(item)}
                  className="group relative rounded-2xl overflow-hidden bg-luxury-charcoal cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-black/5"
                >
                  <img
                    className="aspect-video sm:aspect-[16/11] block h-auto max-h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Hover expand badge */}
                  <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Maximize2 className="w-3.5 h-3.5 text-luxury-gold" />
                  </div>

                  {/* Caption Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 text-white transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-luxury-gold text-white font-manrope text-[9px] uppercase tracking-wider rounded-full font-semibold">
                        {item.category}
                      </span>
                      <span className="text-white/80 font-dmsans text-[11px] truncate">
                        {item.property}
                      </span>
                    </div>
                    <h4 className="font-manrope text-sm sm:text-base font-bold text-white tracking-wide truncate">
                      {item.title}
                    </h4>
                    <p className="text-[10px] font-dmsans text-luxury-softGold mt-0.5 truncate">
                      {item.dimensions}
                    </p>
                  </div>
                </div>
              ))}
            </GalleryCol>

            {/* Column 2: Ultra-Luxury Interiors & Sky Mansions */}
            <GalleryCol className="mt-[-42%] sm:mt-[-35%]" yRange={['18%', '4%']}>
              {GALLERY_COL_2.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveLightboxItem(item)}
                  className="group relative rounded-2xl overflow-hidden bg-luxury-charcoal cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-black/5"
                >
                  <img
                    className="aspect-video sm:aspect-[16/11] block h-auto max-h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Hover expand badge */}
                  <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Maximize2 className="w-3.5 h-3.5 text-luxury-gold" />
                  </div>

                  {/* Caption Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 text-white transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-luxury-gold text-white font-manrope text-[9px] uppercase tracking-wider rounded-full font-semibold">
                        {item.category}
                      </span>
                      <span className="text-white/80 font-dmsans text-[11px] truncate">
                        {item.property}
                      </span>
                    </div>
                    <h4 className="font-manrope text-sm sm:text-base font-bold text-white tracking-wide truncate">
                      {item.title}
                    </h4>
                    <p className="text-[10px] font-dmsans text-luxury-softGold mt-0.5 truncate">
                      {item.dimensions}
                    </p>
                  </div>
                </div>
              ))}
            </GalleryCol>

            {/* Column 3: Lobbies, Atriums & Nocturnal Skylines */}
            <GalleryCol yRange={['-12%', '4%']} className="-mt-4">
              {GALLERY_COL_3.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveLightboxItem(item)}
                  className="group relative rounded-2xl overflow-hidden bg-luxury-charcoal cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-black/5"
                >
                  <img
                    className="aspect-video sm:aspect-[16/11] block h-auto max-h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Hover expand badge */}
                  <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Maximize2 className="w-3.5 h-3.5 text-luxury-gold" />
                  </div>

                  {/* Caption Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 text-white transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-luxury-gold text-white font-manrope text-[9px] uppercase tracking-wider rounded-full font-semibold">
                        {item.category}
                      </span>
                      <span className="text-white/80 font-dmsans text-[11px] truncate">
                        {item.property}
                      </span>
                    </div>
                    <h4 className="font-manrope text-sm sm:text-base font-bold text-white tracking-wide truncate">
                      {item.title}
                    </h4>
                    <p className="text-[10px] font-dmsans text-luxury-softGold mt-0.5 truncate">
                      {item.dimensions}
                    </p>
                  </div>
                </div>
              ))}
            </GalleryCol>
          </GalleryContainer>
        </ContainerSticky>
      </ContainerScroll>
      </div>

      {/* Full-Screen Lightbox Modal */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveLightboxItem(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Close Fullscreen View"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lightbox Image */}
            <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black">
              <img
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />

              {/* Prev / Next controls */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrevLightbox()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-luxury-gold transition-colors"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleNextLightbox()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-luxury-gold transition-colors"
                aria-label="Next Image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Caption */}
            <div className="w-full mt-4 flex items-center justify-between text-white px-2">
              <div>
                <h4 className="font-manrope text-xl font-bold">
                  {activeLightboxItem.title}
                </h4>
                <p className="font-dmsans text-sm text-white/70">
                  {activeLightboxItem.property} • {activeLightboxItem.location}
                </p>
              </div>
              <span className="px-3.5 py-1 bg-luxury-gold text-white font-manrope text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm">
                {activeLightboxItem.dimensions || activeLightboxItem.category}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

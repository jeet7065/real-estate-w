import React, { useRef, useEffect, useState } from 'react'
import { ArrowUpRight, MapPin, Building, Sparkles, ChevronRight, Check } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROPERTIES } from '../data/properties'
import { Property } from '../types'

gsap.registerPlugin(ScrollTrigger)

interface PortfolioShowcaseProps {
  onSelectProperty: (property: Property) => void
  onOpenEnquiry: (propertyTitle?: string) => void
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({
  onSelectProperty,
  onOpenEnquiry,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeProperty = PROPERTIES[activeIndex]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current
      if (!container) return

      // Pin the section while scrolling through each of the properties
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: () => `+=${PROPERTIES.length * 90}%`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Calculate which property is currently active based on vertical scroll progress
          const count = PROPERTIES.length
          const idx = Math.min(Math.floor(self.progress * count), count - 1)
          setActiveIndex(idx)
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="relative w-full h-screen min-h-screen bg-luxury-warmIvory text-luxury-charcoal overflow-hidden flex flex-col justify-between py-8 md:py-12"
      style={{ backgroundColor: '#F8F5EF' }}
    >
      {/* Background Subtle Luxury Architectural Lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#252525_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Top Header Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-luxury-border">
          <div>
            <div className="inline-flex items-center gap-2 text-luxury-gold text-xs font-manrope font-semibold tracking-[0.25em] uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-luxury-gold" />
              <span>Curated Portfolio • Split-Screen Scroll Experience</span>
            </div>
            <h2 className="font-manrope text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-luxury-charcoal">
              The Masterpiece{' '}
              <span className="font-playfair italic font-normal text-luxury-gold">
                Collection.
              </span>
            </h2>
          </div>

          {/* Quick Property Jump Indicator Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {PROPERTIES.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActiveIndex(idx)}
                className={`px-3 py-1 text-xs font-manrope rounded-full transition-all duration-300 flex items-center gap-1 ${
                  activeIndex === idx
                    ? 'bg-luxury-gold text-white shadow-sm font-semibold'
                    : 'bg-white/80 hover:bg-white text-luxury-charcoal/70 border border-luxury-border/60'
                }`}
                title={p.name}
              >
                <span>0{idx + 1}</span>
                <span className="hidden xl:inline text-[11px] font-normal truncate max-w-[90px]">
                  {p.name.replace('The ', '')}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Split-Screen Container: Left Photo & Right Information */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full my-auto flex-1 flex flex-col lg:flex-row items-center gap-8 lg:gap-14 py-4">
        {/* LEFT SIDE: Large Architectural Photo Stack (Changes smoothly on scroll) */}
        <div className="relative w-full lg:w-1/2 aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] max-h-[62vh] rounded-2xl overflow-hidden bg-luxury-charcoal border border-luxury-border shadow-2xl group">
          {PROPERTIES.map((property, idx) => {
            const isActive = activeIndex === idx
            return (
              <div
                key={property.id}
                className={`absolute inset-0 transition-all duration-700 ease-out will-change-[opacity,transform] ${
                  isActive
                    ? 'opacity-100 scale-100 z-10'
                    : 'opacity-0 scale-105 pointer-events-none z-0'
                }`}
              >
                <img
                  src={property.exteriorImage || property.image}
                  alt={property.name}
                  loading={idx < 2 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />

                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

                {/* Floating Photo Badges */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <span className="px-3 py-1 bg-luxury-gold text-white font-manrope text-[11px] font-semibold tracking-wider uppercase rounded-full shadow-sm">
                    {property.category}
                  </span>
                  <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/15 text-white font-manrope text-[10px] font-semibold tracking-wider uppercase rounded-full">
                    {property.status}
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/15 text-luxury-softGold font-manrope text-xs font-semibold rounded-full">
                    0{idx + 1} / 0{PROPERTIES.length}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between text-white">
                  <div>
                    <p className="text-white/80 font-dmsans text-xs flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-luxury-gold" />
                      <span>{property.location}, {property.city}</span>
                    </p>
                    <p className="font-manrope text-xl sm:text-2xl font-bold text-white mt-1">
                      {property.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-white/60 block">
                      Price Guidance
                    </span>
                    <span className="font-manrope font-bold text-base sm:text-lg text-luxury-gold">
                      From {property.priceFrom}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* RIGHT SIDE: Information of Active Property (Animates smoothly on scroll) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl border border-luxury-border shadow-[0_12px_40px_rgba(0,0,0,0.04)] relative overflow-hidden">
            {/* Project Index & Progress Indicator */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-luxury-border">
              <div className="flex items-center gap-2">
                <span className="font-manrope text-xs font-bold text-luxury-gold tracking-widest uppercase">
                  Project 0{activeIndex + 1} of 0{PROPERTIES.length}
                </span>
                <span className="w-1 h-1 rounded-full bg-luxury-gold" />
                <span className="text-xs font-dmsans text-luxury-muted">
                  {activeProperty.category} Landmark
                </span>
              </div>
              <span className="text-xs font-dmsans font-semibold text-luxury-charcoal">
                Handover: {activeProperty.completionYear}
              </span>
            </div>

            {/* Tagline */}
            <p className="font-playfair italic text-luxury-gold text-sm sm:text-base mb-1.5 transition-all duration-300">
              {activeProperty.tagline}
            </p>

            {/* Title */}
            <h3 className="font-manrope text-2xl sm:text-3xl lg:text-4xl font-bold text-luxury-charcoal tracking-tight mb-4 transition-all duration-300">
              {activeProperty.name}
            </h3>

            {/* Description */}
            <p className="font-dmsans text-luxury-muted text-sm sm:text-base leading-relaxed mb-6 line-clamp-3 transition-all duration-300">
              {activeProperty.description}
            </p>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-luxury-lightGrey border border-luxury-border/70 mb-6">
              <div>
                <span className="text-[10px] font-manrope uppercase text-luxury-muted tracking-wider block">
                  Scale / Area
                </span>
                <span className="font-manrope text-xs sm:text-sm font-bold text-luxury-charcoal mt-0.5 block">
                  {activeProperty.area}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-manrope uppercase text-luxury-muted tracking-wider block">
                  Architectural Studio
                </span>
                <span className="font-manrope text-xs sm:text-sm font-bold text-luxury-charcoal mt-0.5 block truncate">
                  {activeProperty.architect}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-manrope uppercase text-luxury-muted tracking-wider block">
                  Development Status
                </span>
                <span className="font-manrope text-xs sm:text-sm font-bold text-luxury-gold mt-0.5 block">
                  {activeProperty.status}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-manrope uppercase text-luxury-muted tracking-wider block">
                  Target Price
                </span>
                <span className="font-manrope text-xs sm:text-sm font-bold text-luxury-charcoal mt-0.5 block">
                  {activeProperty.priceFrom}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => onSelectProperty(activeProperty)}
                className="flex-1 py-3 px-5 rounded-full bg-luxury-gold hover:bg-luxury-bronze text-white font-manrope text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-sm transform hover:-translate-y-0.5"
              >
                <span>View Architectural Blueprint</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onOpenEnquiry(activeProperty.name)}
                className="py-3 px-5 rounded-full bg-white hover:bg-luxury-ivory text-luxury-charcoal border border-luxury-border hover:border-luxury-gold font-manrope text-xs font-semibold tracking-[0.14em] uppercase transition-colors text-center"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Progress Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-2">
        <div className="flex items-center justify-between text-xs font-dmsans text-luxury-muted pb-1">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
            <span>Scroll down to reveal next landmark in portfolio</span>
          </span>
          <span className="font-manrope font-semibold text-luxury-charcoal">
            {Math.round(((activeIndex + 1) / PROPERTIES.length) * 100)}% Traversed
          </span>
        </div>
        <div className="w-full h-[2.5px] bg-luxury-border rounded-full overflow-hidden">
          <div
            className="h-full bg-luxury-gold transition-all duration-500 ease-out"
            style={{ width: `${((activeIndex + 1) / PROPERTIES.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  )
}

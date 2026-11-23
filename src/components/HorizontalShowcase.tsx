import React, { useRef, useEffect } from 'react'
import { ArrowUpRight, MapPin, Building, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROPERTIES } from '../data/properties'
import { Property } from '../types'

gsap.registerPlugin(ScrollTrigger)

interface HorizontalShowcaseProps {
  onSelectProperty: (property: Property) => void
  onOpenEnquiry: (propertyTitle?: string) => void
}

export const HorizontalShowcase: React.FC<HorizontalShowcaseProps> = ({
  onSelectProperty,
  onOpenEnquiry,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      if (!track) return

      // Calculate the horizontal scroll amount
      const totalWidth = track.scrollWidth
      const viewportWidth = window.innerWidth
      const xDist = totalWidth - viewportWidth

      if (xDist > 0) {
        gsap.to(track, {
          x: () => -xDist,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: () => `+=${xDist * 1.2}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="horizontal-showcase"
      ref={containerRef}
      className="relative w-full bg-luxury-warmIvory text-luxury-charcoal overflow-hidden min-h-screen flex flex-col justify-center py-16"
      style={{ backgroundColor: '#F8F5EF' }}
    >
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-luxury-gold text-xs font-manrope font-semibold tracking-[0.25em] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-luxury-gold" />
            <span>Immersive Horizontal Gallery</span>
          </div>
          <h2 className="font-manrope text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-luxury-charcoal">
            The Masterpiece{' '}
            <span className="font-playfair italic font-normal text-luxury-gold">
              Collection.
            </span>
          </h2>
        </div>
        <p className="font-dmsans text-luxury-muted text-sm max-w-md">
          Scroll downward to traverse our signature high-rise towers, curated retail boulevards, and
          sky mansions.
        </p>
      </div>

      {/* Horizontal Moving Track */}
      <div className="relative w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-8 md:gap-12 pl-6 md:pl-16 pr-16 md:pr-24 will-change-transform py-4"
        >
          {PROPERTIES.map((property, idx) => (
            <div
              key={property.id}
              className="flex-shrink-0 w-[85vw] sm:w-[540px] md:w-[620px] rounded-2xl bg-white border border-luxury-border shadow-[0_12px_40px_rgba(0,0,0,0.05)] overflow-hidden group flex flex-col"
            >
              {/* Image banner */}
              <div className="relative h-[280px] sm:h-[340px] w-full overflow-hidden bg-luxury-charcoal">
                <img
                  src={property.exteriorImage || property.image}
                  alt={property.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 bg-luxury-gold text-white font-manrope text-[11px] font-semibold tracking-wider uppercase rounded-full">
                    0{idx + 1} / 0{PROPERTIES.length}
                  </span>
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white font-manrope text-[11px] font-medium tracking-wider uppercase rounded-full">
                    {property.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between">
                  <div>
                    <p className="text-white/80 font-dmsans text-xs flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-luxury-gold" />
                      {property.location}
                    </p>
                    <h3 className="font-manrope text-2xl sm:text-3xl font-bold text-white mt-1">
                      {property.name}
                    </h3>
                  </div>
                  <span className="text-luxury-softGold font-manrope font-semibold text-sm">
                    {property.priceFrom}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <p className="font-playfair italic text-sm text-luxury-gold mb-2">
                    {property.tagline}
                  </p>
                  <p className="font-dmsans text-luxury-muted text-sm leading-relaxed mb-6">
                    {property.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6 bg-luxury-lightGrey p-4 rounded-xl border border-luxury-border/60">
                    {property.specs.slice(0, 2).map((s) => (
                      <div key={s.label}>
                        <span className="text-[10px] font-manrope uppercase text-luxury-muted block">
                          {s.label}
                        </span>
                        <span className="font-manrope text-xs font-bold text-luxury-charcoal">
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-luxury-border">
                  <button
                    onClick={() => onSelectProperty(property)}
                    className="flex-1 py-3 px-5 rounded-full bg-luxury-gold hover:bg-luxury-bronze text-white font-manrope text-xs font-semibold tracking-[0.14em] uppercase transition-colors flex items-center justify-center gap-2"
                  >
                    <span>View Architectural Blueprint</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onOpenEnquiry(property.name)}
                    className="py-3 px-5 rounded-full bg-luxury-lightGrey hover:bg-luxury-border text-luxury-charcoal font-manrope text-xs font-semibold tracking-[0.14em] uppercase transition-colors"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import React, { useRef, useEffect, useState } from 'react'
import { ArrowUpRight, MapPin, Building2, Check, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Property } from '../types'
import { PROPERTIES } from '../data/properties'

gsap.registerPlugin(ScrollTrigger)

interface FeaturedDevelopmentsProps {
  onSelectProperty: (property: Property) => void
  onOpenEnquiry: (propertyTitle?: string) => void
}

export const FeaturedDevelopments: React.FC<FeaturedDevelopmentsProps> = ({
  onSelectProperty,
  onOpenEnquiry,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState<'All' | 'Commercial' | 'Residential' | 'Retail' | 'Mixed-Use'>('All')
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )

  // Touch swipe handling for mobile
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  // Filter properties based on category
  const filteredProperties =
    activeCategory === 'All'
      ? PROPERTIES
      : PROPERTIES.filter((p) => p.category === activeCategory)

  // Ensure activeIndex is within bounds of filtered list
  const safeIndex = Math.min(activeIndex, Math.max(0, filteredProperties.length - 1))
  const currentProperty = filteredProperties[safeIndex] || PROPERTIES[0]

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Desktop only: Pin section while scrolling through properties
  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const container = containerRef.current
      if (!container) return

      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: () => `+=${Math.max(filteredProperties.length, 3) * 85}%`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const count = filteredProperties.length
          if (count <= 1) return
          const idx = Math.min(Math.floor(self.progress * count), count - 1)
          setActiveIndex(idx)
        },
      })
    })

    return () => mm.revert()
  }, [filteredProperties.length])

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredProperties.length - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev < filteredProperties.length - 1 ? prev + 1 : 0))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current
    if (distance > 50) {
      handleNext()
    } else if (distance < -50) {
      handlePrev()
    }
  }

  return (
    <section
      id="developments"
      ref={containerRef}
      className={`relative w-full bg-luxury-warmIvory text-luxury-charcoal overflow-hidden flex flex-col justify-between ${
        isMobile ? 'py-10 px-4' : 'min-h-screen py-3 sm:py-6 md:py-10'
      }`}
      style={{ backgroundColor: '#F8F5EF' }}
    >
      {/* Dynamic Keyframes for Fast Eye-Catching Floating Blobs */}
      <style>{`
        @keyframes blob-float-1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(140px, -90px) scale(1.35); }
          66% { transform: translate(-100px, 110px) scale(0.85); }
        }
        @keyframes blob-float-2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(-150px, 115px) scale(1.38); }
          66% { transform: translate(120px, -85px) scale(0.86); }
        }
        @keyframes blob-float-3 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(120px, 130px) scale(1.32); }
          66% { transform: translate(-130px, -95px) scale(0.88); }
        }
        @keyframes blob-float-4 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(-130px, -120px) scale(1.35); }
          66% { transform: translate(140px, 95px) scale(0.85); }
        }
      `}</style>

      {/* 1. Soft Architectural Hairline Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* 2. Floating & Pulsing Blobs in Specified Palette (#FE4F1B, #754d15, #D89031) */}
      {/* Blob 1: #D89031 Luxury Gold */}
      <div
        className="pointer-events-none absolute -top-12 left-[10%] w-[520px] h-[520px] rounded-full z-0 opacity-85"
        style={{
          background: 'radial-gradient(circle, #D89031 0%, rgba(216, 144, 49, 0.7) 45%, rgba(216, 144, 49, 0) 70%)',
          filter: 'blur(55px)',
          animation: 'blob-float-1 5.5s ease-in-out infinite',
        }}
      />

      {/* Blob 2: #FE4F1B Fiery Vermilion */}
      <div
        className="pointer-events-none absolute top-[15%] -right-16 w-[500px] h-[500px] rounded-full z-0 opacity-80"
        style={{
          background: 'radial-gradient(circle, #FE4F1B 0%, rgba(254, 79, 27, 0.7) 45%, rgba(254, 79, 27, 0) 70%)',
          filter: 'blur(60px)',
          animation: 'blob-float-2 6.5s ease-in-out infinite',
        }}
      />

      {/* Blob 3: #754d15 Deep Bronze Cognac */}
      <div
        className="pointer-events-none absolute -bottom-16 left-[18%] w-[540px] h-[540px] rounded-full z-0 opacity-85"
        style={{
          background: 'radial-gradient(circle, #754d15 0%, rgba(117, 77, 21, 0.7) 45%, rgba(117, 77, 21, 0) 70%)',
          filter: 'blur(60px)',
          animation: 'blob-float-3 7s ease-in-out infinite',
        }}
      />

      {/* Blob 4: Radiant Fusion (#FE4F1B & #D89031) */}
      <div
        className="pointer-events-none absolute bottom-[15%] right-[20%] w-[460px] h-[460px] rounded-full z-0 opacity-75"
        style={{
          background: 'radial-gradient(circle, #FE4F1B 0%, rgba(216, 144, 49, 0.75) 45%, rgba(216, 144, 49, 0) 70%)',
          filter: 'blur(55px)',
          animation: 'blob-float-4 6s ease-in-out infinite',
        }}
      />

      {/* Top Header & Category Filter Tabs */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-1">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-luxury-border">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-luxury-gold" />
              <span className="text-luxury-gold font-manrope text-xs font-semibold tracking-[0.25em] uppercase">
                Curated Portfolio
              </span>
            </div>
            <h2 className="font-manrope text-2xl sm:text-3xl md:text-4xl font-bold text-luxury-charcoal tracking-tight leading-tight">
              Featured{' '}
              <span className="font-playfair italic font-normal text-luxury-gold">
                Developments.
              </span>
            </h2>
            <p className="font-dmsans text-luxury-muted text-xs sm:text-sm mt-1 leading-relaxed hidden sm:block">
              Grade-A commercial skyscrapers and limited-edition residential sanctuaries conceived with
              sculptural ambition across India's most coveted corporate corridors.
            </p>
          </div>

          {/* Category Filter Tabs & Project Jump Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
            <div className="flex flex-wrap gap-1.5">
              {(['All', 'Commercial', 'Residential', 'Retail', 'Mixed-Use'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat)
                    setActiveIndex(0)
                  }}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-manrope font-semibold tracking-[0.12em] uppercase transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-luxury-gold text-white shadow-sm'
                      : 'bg-white text-luxury-charcoal/70 border border-luxury-border hover:bg-luxury-border/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick Project Numbers */}
            <div className="hidden md:flex items-center gap-1 bg-white/70 p-1 rounded-full border border-luxury-border">
              {filteredProperties.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-2.5 py-1 text-[11px] font-manrope rounded-full transition-all duration-200 ${
                    safeIndex === idx
                      ? 'bg-luxury-gold text-white font-bold'
                      : 'text-luxury-charcoal/60 hover:text-luxury-charcoal'
                  }`}
                  title={p.name}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Split-Screen Container: Left Photo & Right Information */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full my-auto flex-1 flex flex-col lg:flex-row items-center gap-4 sm:gap-6 lg:gap-12 py-2 sm:py-3"
      >
        {/* LEFT SIDE: Architectural Photo Stack */}
        <div className="relative w-full lg:w-1/2 aspect-[16/10] sm:aspect-[16/11] lg:aspect-[4/3] max-h-[34vh] sm:max-h-[42vh] lg:max-h-[60vh] rounded-2xl overflow-hidden bg-luxury-charcoal border border-luxury-border shadow-2xl group">
          {filteredProperties.map((property, idx) => {
            const isActive = safeIndex === idx
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

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25 pointer-events-none" />

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
                    0{idx + 1} / 0{filteredProperties.length}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between text-white">
                  <div>
                    <p className="text-white/80 font-dmsans text-xs flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-luxury-gold" />
                      <span>{property.location}, {property.city}</span>
                    </p>
                    <p className="font-manrope text-xl sm:text-2xl font-bold text-white mt-0.5">
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

        {/* RIGHT SIDE: Information of Active Property */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div
            className="bg-white/40 backdrop-blur-[10px] p-4 sm:p-7 lg:p-9 rounded-2xl border border-white/70 shadow-[0_16px_48px_rgba(0,0,0,0.08)] relative"
            style={{
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            {/* Project Index & Progress Indicator */}
            <div className="flex items-center justify-between mb-2 sm:mb-3 pb-2 sm:pb-3 border-b border-luxury-charcoal/15">
              <div className="flex items-center gap-2">
                <span className="font-manrope text-[11px] sm:text-xs font-bold text-luxury-gold tracking-widest uppercase">
                  Landmark 0{safeIndex + 1} of 0{filteredProperties.length}
                </span>
                <span className="w-1 h-1 rounded-full bg-luxury-gold" />
                <span className="text-[11px] sm:text-xs font-dmsans text-luxury-muted">
                  {currentProperty.category}
                </span>
              </div>
              <span className="text-[11px] sm:text-xs font-dmsans font-semibold text-luxury-charcoal">
                Handover: {currentProperty.completionYear}
              </span>
            </div>

            {/* Tagline */}
            <p className="font-playfair italic text-luxury-gold text-xs sm:text-sm lg:text-base mb-1 transition-all duration-300 font-medium">
              {currentProperty.tagline}
            </p>

            {/* Title */}
            <h3 className="font-manrope text-xl sm:text-3xl lg:text-4xl font-bold text-luxury-charcoal tracking-tight mb-2 sm:mb-3 transition-all duration-300">
              {currentProperty.name}
            </h3>

            {/* Description */}
            <p className="font-dmsans text-luxury-charcoal/80 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-5 line-clamp-2 sm:line-clamp-3 transition-all duration-300 font-medium">
              {currentProperty.description}
            </p>

            {/* Specifications Grid */}
            <div
              className="grid grid-cols-2 gap-2 sm:gap-2.5 p-2.5 sm:p-3.5 rounded-xl bg-white/40 backdrop-blur-[10px] border border-white/60 shadow-sm mb-3 sm:mb-5"
            >
              <div>
                <span className="text-[10px] font-manrope uppercase text-luxury-muted tracking-wider block">
                  Scale / Area
                </span>
                <span className="font-manrope text-xs sm:text-sm font-bold text-luxury-charcoal mt-0.5 block">
                  {currentProperty.area}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-manrope uppercase text-luxury-muted tracking-wider block">
                  Architectural Studio
                </span>
                <span className="font-manrope text-xs sm:text-sm font-bold text-luxury-charcoal mt-0.5 block truncate">
                  {currentProperty.architect}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-manrope uppercase text-luxury-muted tracking-wider block">
                  Development Status
                </span>
                <span className="font-manrope text-xs sm:text-sm font-bold text-luxury-gold mt-0.5 block">
                  {currentProperty.status}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-manrope uppercase text-luxury-muted tracking-wider block">
                  Target Price
                </span>
                <span className="font-manrope text-xs sm:text-sm font-bold text-luxury-charcoal mt-0.5 block">
                  {currentProperty.priceFrom}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                onClick={() => onSelectProperty(currentProperty)}
                className="flex-1 py-3 px-5 rounded-full bg-luxury-gold hover:bg-luxury-bronze text-white font-manrope text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>View Specifications</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onOpenEnquiry(currentProperty.name)}
                className="py-3 px-5 rounded-full bg-white hover:bg-white text-luxury-charcoal border border-luxury-border hover:border-luxury-gold font-manrope text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-300 text-center shadow-sm cursor-pointer"
              >
                Enquire
              </button>
            </div>
          </div>

          {/* ON MOBILE: Touch Carousel Controls (Previous / Dots / Next) */}
          {isMobile && (
            <div className="flex items-center justify-between gap-4 mt-3 pt-2">
              <button
                type="button"
                onClick={handlePrev}
                className="p-2 rounded-full bg-white border border-luxury-border shadow-sm text-luxury-charcoal hover:bg-luxury-gold hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95"
                aria-label="Previous development"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5">
                {filteredProperties.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      safeIndex === idx ? 'w-6 bg-luxury-gold' : 'w-2 bg-luxury-charcoal/25'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="p-2 rounded-full bg-white border border-luxury-border shadow-sm text-luxury-charcoal hover:bg-luxury-gold hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95"
                aria-label="Next development"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Scroll Progress Bar (Desktop only) */}
      {!isMobile && (
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-1">
          <div className="flex items-center justify-between text-[11px] font-dmsans text-luxury-muted pb-1">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
              <span>Scroll down to reveal next landmark in sequence</span>
            </span>
            <span className="font-manrope font-semibold text-luxury-charcoal">
              {Math.round(((safeIndex + 1) / filteredProperties.length) * 100)}% Traversed
            </span>
          </div>
          <div className="w-full h-[2.5px] bg-luxury-border rounded-full overflow-hidden">
            <div
              className="h-full bg-luxury-gold transition-all duration-500 ease-out"
              style={{ width: `${((safeIndex + 1) / filteredProperties.length) * 100}%` }}
            />
          </div>
        </div>
      )}
    </section>
  )
}

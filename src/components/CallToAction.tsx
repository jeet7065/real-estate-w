import React from 'react'
import { ArrowUpRight, Phone, Calendar } from 'lucide-react'
import { ScrollReveal, TypewriterHeading } from '@/components/ui/scroll-reveal'

interface CallToActionProps {
  onExploreClick: () => void
  onScheduleClick: () => void
}

export const CallToAction: React.FC<CallToActionProps> = ({
  onExploreClick,
  onScheduleClick,
}) => {
  return (
    <section className="relative w-full py-28 md:py-36 bg-luxury-charcoal text-white overflow-hidden">
      {/* Cinematic Architectural Background Image - Bright & Clearly Visible */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-85 transform scale-105 transition-transform duration-1000"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85")',
        }}
      />
      {/* Lighter subtle overlay so the architectural facade and details are clearly visible */}
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/45 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(216, 144, 49, 0.2) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        {/* Subtitle tag - Slides Down */}
        <ScrollReveal direction="down">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-manrope text-luxury-softGold uppercase tracking-[0.25em] mb-6 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
            <span>Private Advisory & Client Services</span>
          </div>
        </ScrollReveal>

        {/* Editorial Headline with Typing Effect */}
        <TypewriterHeading
          text="Your Next Landmark"
          highlight="Starts Here."
          className="font-manrope text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6 drop-shadow-lg"
          highlightClassName="font-playfair italic font-normal text-luxury-softGold drop-shadow"
        />

        {/* Supporting Statement - Slides from Bottom */}
        <ScrollReveal direction="up" delay={0.2}>
          <p className="font-dmsans text-lg sm:text-xl text-white/95 max-w-2xl leading-relaxed mb-10 drop-shadow-md">
            Let’s find a space that reflects your vision, prestige, and generational ambition.
            Our private advisory partners with leading corporate occupants and discerning family offices.
          </p>
        </ScrollReveal>

        {/* Dual Action Buttons - Slide from Left and Right */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <ScrollReveal direction="left" delay={0.25} className="w-full sm:w-auto">
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-luxury-gold hover:bg-luxury-bronze text-white font-manrope text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-300 shadow-[0_10px_30px_-5px_rgba(216,144,49,0.5)] flex items-center justify-center gap-3 transform hover:-translate-y-0.5"
            >
              <span>Explore Properties</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.25} className="w-full sm:w-auto">
            <button
              onClick={onScheduleClick}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/40 hover:border-white/70 text-white font-manrope text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-md"
            >
              <Calendar className="w-4 h-4 text-luxury-gold" />
              <span>Schedule a Consultation</span>
            </button>
          </ScrollReveal>
        </div>

        {/* Assurance badges - Pop Up */}
        <ScrollReveal direction="pop" delay={0.35}>
          <div className="mt-14 pt-8 border-t border-white/20 flex flex-wrap items-center justify-center gap-8 text-xs font-dmsans text-white/90 drop-shadow">
            <span>✓ Confidential HNI Advisory</span>
            <span>✓ Direct Developer Access</span>
            <span>✓ Bespoke Architectural Fit-Outs</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

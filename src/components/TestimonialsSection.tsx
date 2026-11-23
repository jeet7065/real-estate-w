import React from 'react'
import { AnimatedTestimonials, Testimonial } from '@/components/ui/animated-testimonials'
import { Sparkles, ShieldCheck, Award, Building, Quote } from 'lucide-react'
import { ScrollReveal, TypewriterHeading } from '@/components/ui/scroll-reveal'

const BLINKON_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Acquiring our sky residence at The Aurelia redefined our expectations of architectural integrity. The triple-height living volume, private observatory deck, and flawless acoustic separation create an oasis of serene permanence above the metropolis.",
    name: "Rajesh K. Singhania",
    designation: "Managing Director & CIO, Singhania Family Office • The Aurelia Penthouse Resident",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    quote:
      "BlinkOn delivered 220,000 square feet of column-free floor plates with seamless bioclimatic solar facades for our Asia-Pacific headquarters. The thermal efficiency and acoustic comfort have elevated our regional workforce satisfaction by forty percent.",
    name: "Elena Rostova",
    designation: "Global Head of Workplace Strategy, Vanguard Technologies • The Meridian Tower",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    quote:
      "In commercial real estate, execution precision is non-negotiable. BlinkOn's institutional discipline, LEED Platinum certified engineering, and punctual handover schedule establish them as North India's premier development authority.",
    name: "Devendra Nath Mehra",
    designation: "Chairman, Mehra Capital Holdings • Institutional Partner at The Pinnacle Towers",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  },
  {
    quote:
      "From the parametric bronze louvers to the bookmatched Italian travertine colonnades, BlinkOn crafts built environments that balance civic monumentality with intimate sensory luxury. Their attention to tectonic craft is world-class.",
    name: "Dr. Anya Sen",
    designation: "Principal Architect, Studio Tetrarch London • Architectural Design Advisory",
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
  },
  {
    quote:
      "The cantilevered sunset terrace and heated glass-bottom observatory pool at The Solaris represent masterclass structural engineering. It is not merely a high-value asset; it is an enduring multi-generational family legacy.",
    name: "Vikramaditya Oberoi",
    designation: "Founder & CEO, Horizon Ventures • Penthouse Resident at The Solaris",
    src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
  },
]

interface TestimonialsSectionProps {
  onOpenEnquiry?: (topic?: string) => void
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onOpenEnquiry }) => {
  return (
    <section
      id="testimonials"
      className="relative w-full bg-white text-luxury-charcoal py-24 sm:py-32 overflow-hidden border-t border-luxury-border/60"
    >
      {/* 1. Diagonal Architectural Hairline Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.05) 0, rgba(0, 0, 0, 0.05) 1px, transparent 1px, transparent 36px),
            repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.05) 0, rgba(0, 0, 0, 0.05) 1px, transparent 1px, transparent 36px)
          `,
        }}
      />

      {/* 2. Background Subtle Gradient & Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-40 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(216, 144, 49, 0.12) 0%, rgba(248, 245, 239, 0) 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <ScrollReveal direction="down">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-luxury-ivory border border-luxury-border mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-luxury-gold animate-pulse" />
              <span className="text-luxury-gold font-manrope text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase">
                Client Acclaim • Executive Endorsements
              </span>
            </div>
          </ScrollReveal>

          {/* Typing Effect Heading */}
          <TypewriterHeading
            text="Voices of Distinctive Ambition."
            highlight="Curating Confidence."
            className="font-manrope text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-luxury-charcoal leading-[1.15]"
            highlightClassName="font-playfair italic font-normal text-luxury-gold"
          />

          <ScrollReveal direction="up" delay={0.2}>
            <p className="mt-4 font-dmsans text-luxury-muted text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Discover firsthand accounts from institutional tenants, family office CIOs, and luxury
              residence owners who have partnered with BlinkOn to secure architectural landmarks.
            </p>
          </ScrollReveal>
        </div>

        {/* Animated Testimonials Interactive Component - Pops Up */}
        <ScrollReveal direction="pop" delay={0.2}>
          <div className="relative bg-luxury-ivory/60 rounded-3xl border border-luxury-border/80 shadow-xl backdrop-blur-sm p-4 sm:p-8">
            <div className="absolute top-6 right-8 text-luxury-gold/20 hidden md:block">
              <Quote className="w-20 h-20 rotate-180" />
            </div>

            <AnimatedTestimonials
              testimonials={BLINKON_TESTIMONIALS}
              autoplay={true}
              className="py-6 sm:py-10 max-w-5xl"
            />
          </div>
        </ScrollReveal>

        {/* Institutional Trust Badges - Dynamic Slide & Pop In */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-10 border-t border-luxury-border">
          <ScrollReveal direction="left" delay={0.1}>
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white border border-luxury-border/50 shadow-sm h-full">
              <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-manrope text-2xl font-bold text-luxury-charcoal">99.4%</span>
              <span className="font-dmsans text-xs text-luxury-muted mt-1 uppercase tracking-wider">
                Tenant Retention
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white border border-luxury-border/50 shadow-sm h-full">
              <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold mb-3">
                <Building className="w-5 h-5" />
              </div>
              <span className="font-manrope text-2xl font-bold text-luxury-charcoal">14.8M+</span>
              <span className="font-dmsans text-xs text-luxury-muted mt-1 uppercase tracking-wider">
                Sq.Ft. Delivered
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white border border-luxury-border/50 shadow-sm h-full">
              <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold mb-3">
                <Award className="w-5 h-5" />
              </div>
              <span className="font-manrope text-2xl font-bold text-luxury-charcoal">AA+</span>
              <span className="font-dmsans text-xs text-luxury-muted mt-1 uppercase tracking-wider">
                CRISIL Financial Rating
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.4}>
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white border border-luxury-border/50 shadow-sm h-full">
              <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-manrope text-2xl font-bold text-luxury-charcoal">₹1,850 Cr</span>
              <span className="font-dmsans text-xs text-luxury-muted mt-1 uppercase tracking-wider">
                Institutional Portfolio
              </span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

import React, { useRef, useEffect } from 'react'
import { ArrowUpRight, Compass, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GradientBars } from '@/components/ui/gradient-bars-background'
import { ScrollReveal, TypewriterHeading } from '@/components/ui/scroll-reveal'

gsap.registerPlugin(ScrollTrigger)

interface BrandStoryProps {
  onOpenEnquiry: () => void
}

export const BrandStory: React.FC<BrandStoryProps> = ({ onOpenEnquiry }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image subtle parallax
      gsap.to(imageRef.current, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="brand-story"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-white text-luxury-charcoal overflow-hidden border-t border-luxury-border/60"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div id="about" className="absolute -top-24" />
      <div id="about-us" className="absolute -top-24" />
      {/* 1. Subtle Architectural Grid in Luxury Gold */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(216, 144, 49, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(216, 144, 49, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* 2. Animated Gradient Bars Background in Fiery Orange (rgb(255, 60, 0)) */}
      <GradientBars
        numBars={15}
        gradientFrom="rgb(255, 60, 0)"
        gradientTo="rgba(255, 255, 255, 0)"
        animationDuration={2.2}
        className="opacity-90"
        minHeight={30}
        maxHeight={100}
        barBorderColor="rgba(255, 255, 255, 0.75)"
      />

      {/* 3. Luminous Bottom Radial Glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-72 z-0"
        style={{
          background: 'radial-gradient(ellipse at bottom, rgba(255, 60, 0, 0.25) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Split Layout: Editorial Architectural Photography + Brand Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Asymmetric Architectural Visual Frame */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="left" duration={0.8}>
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white bg-luxury-charcoal">
                <div
                  ref={imageRef}
                  className="aspect-[3/4] sm:aspect-[4/5] bg-cover bg-top will-change-transform"
                  style={{
                    backgroundImage: 'url("/about-us.jpg")',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-[11px] font-manrope uppercase tracking-[0.2em] text-luxury-softGold">
                    Visionary Leadership
                  </p>
                  <p className="font-manrope text-xl font-bold mt-1 text-white">
                    Sculpted for Generations.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Decorative Offset Ivory Framing Card - Pops Up */}
            <ScrollReveal direction="pop" delay={0.25} className="absolute -bottom-8 -right-8 w-48 sm:w-56 p-5 bg-white border border-luxury-border rounded-2xl shadow-xl z-20 hidden sm:block">
              <div className="flex items-center gap-2 text-luxury-gold text-xs font-manrope font-semibold tracking-wider uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
                <span>Excellence</span>
              </div>
              <p className="font-manrope text-xs text-luxury-charcoal font-medium leading-relaxed">
                Pioneering carbon-neutral structural engineering across NCR since 2010.
              </p>
            </ScrollReveal>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <ScrollReveal direction="down">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-luxury-ivory border border-luxury-border mb-5 w-fit shadow-sm">
                <span className="w-2 h-2 rounded-full bg-luxury-gold animate-pulse" />
                <span className="text-luxury-gold font-manrope text-xs font-semibold tracking-[0.25em] uppercase">
                  Brand Philosophy & Vision
                </span>
              </div>
            </ScrollReveal>

            {/* Headline with Typing Effect */}
            <TypewriterHeading
              text="Building Spaces."
              highlight="Creating Possibilities."
              className="font-manrope text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-luxury-charcoal leading-[1.12] mb-6"
              highlightClassName="font-playfair italic font-normal text-luxury-gold"
            />

            {/* Body - Slides from Right */}
            <ScrollReveal direction="right" delay={0.15}>
              <div className="space-y-4 font-dmsans text-luxury-muted text-base sm:text-lg leading-relaxed mb-8">
                <p>
                  At Blinkon Group, we believe that world-class architecture does not merely occupy land;
                  it reshapes skylines, inspires human potential, and commands lasting commercial prestige.
                </p>
                <p>
                  By harmonizing progressive engineering, bioclimatic glass facades, and generous public realms,
                  we curate Grade-A business headquarters and ultra-luxury sky residences that stand as
                  testaments to institutional craftsmanship.
                </p>
              </div>
            </ScrollReveal>

            {/* Pillar Bullets - Slide Up from Bottom */}
            <ScrollReveal direction="up" delay={0.25}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 pb-8 border-t border-luxury-border">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/80 border border-luxury-border shadow-sm backdrop-blur-sm">
                  <div className="w-5 h-5 rounded-full bg-luxury-gold/15 text-luxury-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold font-manrope">✓</span>
                  </div>
                  <div>
                    <h4 className="font-manrope text-sm font-bold text-luxury-charcoal">
                      Institutional Longevity
                    </h4>
                    <p className="font-dmsans text-xs text-luxury-muted mt-0.5">
                      Engineered to outlast market cycles with durable natural granites and low-E glass.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/80 border border-luxury-border shadow-sm backdrop-blur-sm">
                  <div className="w-5 h-5 rounded-full bg-luxury-gold/15 text-luxury-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold font-manrope">✓</span>
                  </div>
                  <div>
                    <h4 className="font-manrope text-sm font-bold text-luxury-charcoal">
                      Bespoke Customization
                    </h4>
                    <p className="font-dmsans text-xs text-luxury-muted mt-0.5">
                      Tailored spatial layouts designed in collaboration with private client design teams.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="pop" delay={0.3}>
              <div className="pt-2">
                <button
                  onClick={onOpenEnquiry}
                  className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-luxury-gold hover:bg-luxury-bronze text-white font-manrope text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <span>Schedule Private Briefing</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

import React from 'react'
import { MapPin, Compass, Cpu, Sparkles, ArrowUpRight } from 'lucide-react'
import { WHY_CHOOSE_US } from '../data/properties'
import { ScrollReveal, TypewriterHeading } from '@/components/ui/scroll-reveal'

export const WhyChooseUs: React.FC = () => {
  const icons = [MapPin, Compass, Cpu, Sparkles]

  return (
    <section id="why-us" className="w-full py-24 md:py-32 bg-white text-luxury-charcoal">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <ScrollReveal direction="down">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-luxury-gold" />
              <span className="text-luxury-gold font-manrope text-xs font-semibold tracking-[0.25em] uppercase">
                The Blinkon Standard
              </span>
            </div>
          </ScrollReveal>

          {/* Typing Effect Main Heading */}
          <TypewriterHeading
            text="Why Visionaries Choose"
            highlight="Blinkon Group."
            className="font-manrope text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-luxury-charcoal"
            highlightClassName="font-playfair italic font-normal text-luxury-gold"
          />

          <ScrollReveal direction="up" delay={0.2}>
            <p className="font-dmsans text-luxury-muted text-base md:text-lg mt-4 leading-relaxed">
              Every square meter of our developments is engineered with uncompromising devotion to
              architectural integrity, environmental stewardship, and enduring investment value.
            </p>
          </ScrollReveal>
        </div>

        {/* 4 Premium Feature Blocks with Dynamic Sliding & Pop Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_CHOOSE_US.map((item, idx) => {
            const IconComponent = icons[idx % icons.length]
            const dir = idx === 0 ? 'left' : idx === 1 ? 'pop' : idx === 2 ? 'up' : 'right'
            return (
              <ScrollReveal
                key={item.title}
                direction={dir}
                delay={idx * 0.12}
                className="h-full"
              >
                <div className="h-full group p-8 rounded-2xl bg-luxury-lightGrey border border-luxury-border/70 hover:border-luxury-gold/60 transition-all duration-500 hover:shadow-[0_12px_32px_rgba(0,0,0,0.05)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-manrope text-xs font-bold text-luxury-gold tracking-widest">
                        {item.number}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-white border border-luxury-border flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-white transition-colors duration-300">
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-manrope text-xl font-bold text-luxury-charcoal group-hover:text-luxury-gold transition-colors duration-300 mb-3">
                      {item.title}
                    </h3>

                    <p className="font-dmsans text-luxury-muted text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-luxury-border/60">
                    <span className="font-manrope text-[11px] font-semibold uppercase tracking-wider text-luxury-charcoal/80 block">
                      {item.metric}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

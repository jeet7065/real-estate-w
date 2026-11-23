import React, { useState, useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { FeaturedDevelopments } from './components/FeaturedDevelopments'
import { DroneToInterior } from './components/DroneToInterior'
import { BrandStory } from './components/BrandStory'
import { WhyChooseUs } from './components/WhyChooseUs'
import { DayToNightTransition } from './components/DayToNightTransition'
import { ArchitecturalGallery } from './components/ArchitecturalGallery'
import { TestimonialsSection } from './components/TestimonialsSection'
import { CallToAction } from './components/CallToAction'
import { ContactEnquiry } from './components/ContactEnquiry'
import { Footer } from './components/Footer'
import { PropertyModal } from './components/PropertyModal'
import { Property } from './types'

gsap.registerPlugin(ScrollTrigger)

export function App() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [enquiryProperty, setEnquiryProperty] = useState<string>('')
  const [isHeroScrubbing, setIsHeroScrubbing] = useState(false)

  // Initialize Lenis Smooth Scrolling and synchronize with GSAP ScrollTrigger
  useEffect(() => {
    // Respect user's prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tickerCallback)
    }
  }, [])

  const handleOpenEnquiry = (propertyTitle?: string) => {
    if (propertyTitle) {
      setEnquiryProperty(propertyTitle)
    }
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleExploreDevelopments = () => {
    const devSection = document.getElementById('developments')
    if (devSection) {
      devSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDiscoverVision = () => {
    const visionSection = document.getElementById('brand-story')
    if (visionSection) {
      visionSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-white text-luxury-charcoal flex flex-col font-dmsans antialiased">
      {/* Navigation Header - Apple style white transparent navbar */}
      <Navbar onOpenEnquiry={handleOpenEnquiry} hideNavbar={isHeroScrubbing} />

      <main className="flex-1 w-full">
        {/* 1. Cinematic Hero Section with Scroll Pinned Video Scrub */}
        <Hero
          onExploreClick={handleExploreDevelopments}
          onVisionClick={handleDiscoverVision}
          onScrubbingStateChange={setIsHeroScrubbing}
        />

        {/* 2. Featured Developments Section */}
        <FeaturedDevelopments
          onSelectProperty={(prop) => setSelectedProperty(prop)}
          onOpenEnquiry={handleOpenEnquiry}
        />

        {/* 3. Signature Feature: Drone to Interior Reveal */}
        <DroneToInterior onOpenEnquiry={handleOpenEnquiry} />

        {/* 4. Brand Story & Statistics Counter */}
        <BrandStory onOpenEnquiry={() => handleOpenEnquiry()} />

        {/* 6. Why Choose Us (Blinkon Standard) */}
        <WhyChooseUs />

        {/* 7. Living Architecture: 300-Frame Day-to-Night Metamorphosis */}
        <div id="day-to-night">
          <DayToNightTransition />
        </div>

        {/* 8. 3D Perspective Animated Architectural Gallery & Lightbox */}
        <ArchitecturalGallery onOpenEnquiry={handleOpenEnquiry} />

        {/* 9. Client Acclaim & Animated Executive Testimonials */}
        <TestimonialsSection onOpenEnquiry={handleOpenEnquiry} />

        {/* 10. Call To Action */}
        <CallToAction
          onExploreClick={handleExploreDevelopments}
          onScheduleClick={() => handleOpenEnquiry()}
        />

        {/* 10. Contact & Private Advisory Enquiry Form */}
        <ContactEnquiry preselectedProperty={enquiryProperty} />
      </main>

      {/* 11. Luxury Charcoal Footer */}
      <Footer />

      {/* Interactive Blueprint & Property Detail Modal */}
      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onOpenEnquiry={handleOpenEnquiry}
      />
    </div>
  )
}

export default App

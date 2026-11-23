import React, { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight, Compass } from 'lucide-react'

interface NavbarProps {
  onOpenEnquiry: (propertyTitle?: string) => void
  hideNavbar?: boolean
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry, hideNavbar = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isPastHero, setIsPastHero] = useState(false)

  // Track if we have scrolled past the hero section to adjust text/glass tone
  useEffect(() => {
    const handleScroll = () => {
      // If scrolled past the hero viewport (roughly window.innerHeight * 2.5), we are in light sections
      if (window.scrollY > window.innerHeight * 2.2) {
        setIsPastHero(true)
      } else {
        setIsPastHero(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const navLinks = [
    { name: 'Signature Reveal', href: '#signature-reveal' },
    { name: 'About Us', href: '#brand-story' },
    { name: 'Living Skyline', href: '#day-to-night' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Acclaim', href: '#testimonials' },
    { name: 'Advisory', href: '#contact' },
  ]

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out py-2 sm:py-2.5 ${
          hideNavbar
            ? '-translate-y-full opacity-0 pointer-events-none'
            : 'translate-y-0 opacity-100 pointer-events-auto'
        } ${
          isPastHero
            ? 'bg-white/88 backdrop-blur-2xl border-b border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
            : 'bg-white/40 backdrop-blur-2xl border-b border-white/50 shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
        } text-luxury-charcoal`}
        style={{
          backdropFilter: 'blur(24px) saturate(190%)',
          WebkitBackdropFilter: 'blur(24px) saturate(190%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-14 sm:h-16">
          {/* Brand Logo - Original Black Logo */}
          <a
            href="#"
            className="group flex items-center h-12 sm:h-14 focus:outline-none py-1"
            aria-label="BlinkOn Home"
          >
            <img
              src="/blinkon-logo.png"
              alt="BlinkOn - Committed to deliver promises"
              className="h-10 sm:h-12 md:h-14 w-auto max-w-[210px] sm:max-w-[260px] md:max-w-[300px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </a>

          {/* Desktop Nav Links - Crisp, highly visible like Apple */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-manrope text-[12.5px] tracking-[0.1em] uppercase transition-colors duration-200 relative py-1 group font-semibold text-luxury-charcoal hover:text-luxury-gold"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-luxury-gold transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => onOpenEnquiry()}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-luxury-gold hover:bg-luxury-bronze text-white font-manrope text-[11.5px] font-semibold tracking-[0.14em] uppercase transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Enquire Now</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 transition-colors focus:outline-none text-luxury-charcoal hover:text-luxury-gold"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl transition-all duration-500 lg:hidden flex flex-col justify-between p-6 sm:p-8 pt-20 sm:pt-24 overflow-y-auto max-h-screen ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col space-y-6">
          <div className="pb-2">
            <img
              src="/blinkon-logo.png"
              alt="BlinkOn"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>
          <p className="text-[11px] font-manrope uppercase tracking-[0.3em] text-luxury-gold font-semibold">
            Directory & Navigation
          </p>
          <div className="flex flex-col space-y-4">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-manrope text-2xl font-light tracking-wide text-luxury-charcoal hover:text-luxury-gold transition-colors flex items-center justify-between border-b border-luxury-border pb-3"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-5 h-5 text-luxury-gold" />
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-luxury-border">
          <div className="flex items-center gap-3 text-luxury-muted text-xs">
            <Compass className="w-4 h-4 text-luxury-gold" />
            <span>Cyber City & Golf Course Road, Gurugram</span>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false)
              onOpenEnquiry()
            }}
            className="w-full py-3.5 rounded-full bg-luxury-gold hover:bg-luxury-bronze text-white font-manrope text-xs font-semibold tracking-[0.16em] uppercase transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            <span>Request Private Consultation</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  )
}

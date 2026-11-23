import React, { useState } from 'react'
import { ArrowUpRight, Mail, Compass, Phone, ShieldCheck, Linkedin, Instagram, Twitter } from 'lucide-react'

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterEmail.trim()) {
      setSubscribed(true)
    }
  }

  return (
    <footer className="w-full bg-luxury-darkBg text-white border-t border-white/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Brand Intro (2 cols on lg) */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <a href="#" className="inline-block focus:outline-none" aria-label="BlinkOn Home">
                <img
                  src="/blinkon-logo-white.png"
                  alt="BlinkOn - Committed to deliver promises"
                  className="h-14 sm:h-16 md:h-20 w-auto max-w-[280px] sm:max-w-[340px] object-contain drop-shadow-sm"
                />
              </a>
            </div>

            <p className="font-dmsans text-white/70 text-sm max-w-sm leading-relaxed mb-6">
              Conceiving Grade-A commercial skyscrapers and ultra-luxury residential sanctuaries that
              redefine metropolitan skylines and institutional property values.
            </p>

            <div className="flex items-center gap-3 text-white/60">
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-luxury-gold hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-luxury-gold hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-luxury-gold hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Developments Column */}
          <div>
            <h4 className="font-manrope text-xs font-semibold uppercase tracking-[0.2em] text-luxury-softGold mb-5">
              Portfolio
            </h4>
            <ul className="space-y-3 font-dmsans text-sm text-white/70">
              <li>
                <a href="#developments" className="hover:text-luxury-gold transition-colors">
                  The Meridian (Commercial)
                </a>
              </li>
              <li>
                <a href="#developments" className="hover:text-luxury-gold transition-colors">
                  The Aurelia (Sky Mansions)
                </a>
              </li>
              <li>
                <a href="#developments" className="hover:text-luxury-gold transition-colors">
                  The Grand Boulevard (Retail)
                </a>
              </li>
              <li>
                <a href="#developments" className="hover:text-luxury-gold transition-colors">
                  The Horizon (Tech Campus)
                </a>
              </li>
              <li>
                <a href="#developments" className="hover:text-luxury-gold transition-colors">
                  The Solaris Penthouses
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-manrope text-xs font-semibold uppercase tracking-[0.2em] text-luxury-softGold mb-5">
              Enterprise
            </h4>
            <ul className="space-y-3 font-dmsans text-sm text-white/70">
              <li>
                <a href="#brand-story" className="hover:text-luxury-gold transition-colors">
                  Our Architectural Vision
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-luxury-gold transition-colors">
                  The Blinkon Standard
                </a>
              </li>
              <li>
                <a href="#signature-reveal" className="hover:text-luxury-gold transition-colors">
                  Drone-to-Interior Tech
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-luxury-gold transition-colors">
                  Visual Archive
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-luxury-gold transition-colors">
                  Private Client Office
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-manrope text-xs font-semibold uppercase tracking-[0.2em] text-luxury-softGold mb-5">
              Private Dispatch
            </h4>
            <p className="font-dmsans text-xs text-white/70 leading-relaxed mb-4">
              Receive confidential quarterly briefings on landmark pre-launches and institutional lease acquisitions.
            </p>
            {subscribed ? (
              <p className="text-xs text-luxury-gold font-manrope font-semibold">
                ✓ Briefing subscription activated.
              </p>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter executive email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-4 py-2.5 rounded-full bg-white/5 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-luxury-gold"
                />
                <button
                  type="submit"
                  className="py-2.5 px-4 rounded-full bg-luxury-gold hover:bg-luxury-bronze text-white font-manrope text-[11px] font-semibold uppercase tracking-wider transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-dmsans text-white/50">
          <p>© {new Date().getFullYear()} BLINKON GROUP. All rights reserved. World-Class Luxury Real Estate.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <a href="#" className="hover:text-white transition-colors">
              Terms & Conditions
            </a>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <a href="#" className="hover:text-white transition-colors">
              RERA Disclosures
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

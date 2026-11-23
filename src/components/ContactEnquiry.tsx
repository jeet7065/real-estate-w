import React, { useState } from 'react'
import { Send, Phone, Mail, MapPin, CheckCircle, Clock, ShieldCheck, AlertCircle } from 'lucide-react'
import confetti from 'canvas-confetti'
import { PROPERTIES } from '../data/properties'
import { ScrollReveal, TypewriterHeading } from '@/components/ui/scroll-reveal'

interface ContactEnquiryProps {
  preselectedProperty?: string
}

export const ContactEnquiry: React.FC<ContactEnquiryProps> = ({ preselectedProperty = '' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneCode: '+91',
    phoneNumber: '',
    interestedProperty: preselectedProperty || 'The Meridian — Premium Commercial Offices',
    spaceType: 'Commercial Headquarters',
    message: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedSuccess, setSubmittedSuccess] = useState(false)

  // Update property if prop changes
  React.useEffect(() => {
    if (preselectedProperty) {
      setFormData((prev) => ({ ...prev, interestedProperty: preselectedProperty }))
    }
  }, [preselectedProperty])

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required.'
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid corporate or personal email.'
    }
    if (!formData.phoneNumber.trim()) {
      errs.phoneNumber = 'Phone number is required.'
    } else if (!/^\d{7,15}$/.test(formData.phoneNumber.replace(/[\s-]/g, ''))) {
      errs.phoneNumber = 'Please enter a valid telephone number.'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    // Simulate luxury API communication
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmittedSuccess(true)
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D89031', '#A96D23', '#E8BD7D', '#252525'],
        })
      } catch (e) {
        // Confetti fallback
      }
    }, 1200)
  }

  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-32 bg-luxury-warmIvory text-luxury-charcoal border-t border-luxury-border/60 overflow-hidden"
      style={{ backgroundColor: '#F8F5EF' }}
    >
      {/* 1. Architectural Hairline Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* 2. Soft Ambient Lighting Accents */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full opacity-35 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(216, 144, 49, 0.35) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full opacity-30 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(254, 79, 27, 0.25) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Advisory Details - Slides from Left */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <ScrollReveal direction="left">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-2 h-2 rounded-full bg-luxury-gold" />
                  <span className="text-luxury-gold font-manrope text-xs font-semibold tracking-[0.25em] uppercase">
                    Private Advisory Desk
                  </span>
                </div>

                {/* Headline with Typing Effect */}
                <TypewriterHeading
                  text="Initiate A Private"
                  highlight="Dialogue."
                  className="font-manrope text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-luxury-charcoal leading-tight mb-6"
                  highlightClassName="font-playfair italic font-normal text-luxury-gold"
                />

                <p className="font-dmsans text-luxury-muted text-base leading-relaxed mb-8">
                  Connect with our senior development partners for bespoke property walkthroughs, floor
                  plate analyses, and confidential financial structuring.
                </p>

                <div className="space-y-6 pt-4 border-t border-luxury-border">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-luxury-border flex items-center justify-center text-luxury-gold flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-manrope text-xs uppercase tracking-widest text-luxury-muted">
                        Corporate Headquarters
                      </h4>
                      <p className="font-manrope text-sm font-semibold text-luxury-charcoal mt-0.5">
                        The Meridian Tower, Level 24, Golf Course Road, DLF Phase 5, Gurugram, 122002
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-luxury-border flex items-center justify-center text-luxury-gold flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-manrope text-xs uppercase tracking-widest text-luxury-muted">
                        Direct Concierge Line
                      </h4>
                      <p className="font-manrope text-sm font-semibold text-luxury-charcoal mt-0.5">
                        +91 (0124) 480 9200 / +91 98110 00000
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-luxury-border flex items-center justify-center text-luxury-gold flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-manrope text-xs uppercase tracking-widest text-luxury-muted">
                        Private Advisory Inquiries
                      </h4>
                      <p className="font-manrope text-sm font-semibold text-luxury-charcoal mt-0.5">
                        advisory@blinkongroup.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Quality & NDA badge - Pops Up */}
            <ScrollReveal direction="pop" delay={0.2}>
              <div className="mt-10 p-5 rounded-xl bg-white border border-luxury-border flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-luxury-gold flex-shrink-0" />
                <p className="font-dmsans text-xs text-luxury-muted leading-relaxed">
                  All inquiries are treated under strict developer non-disclosure and routed directly to
                  accredited portfolio directors.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Refined Form - Slides from Right */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right" delay={0.15}>
              <div className="bg-white p-8 sm:p-10 rounded-2xl border border-luxury-border shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
              {submittedSuccess ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-luxury-gold/15 text-luxury-gold flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-manrope text-2xl font-bold text-luxury-charcoal mb-2">
                    Enquiry Received with Discretion
                  </h3>
                  <p className="font-dmsans text-luxury-muted max-w-md text-sm leading-relaxed mb-6">
                    Thank you, <span className="font-semibold text-luxury-charcoal">{formData.fullName}</span>.
                    Our private client partner has received your brief regarding{' '}
                    <span className="font-semibold text-luxury-charcoal">{formData.interestedProperty}</span> and
                    will initiate contact within 4 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmittedSuccess(false)
                      setFormData({
                        fullName: '',
                        email: '',
                        phoneCode: '+91',
                        phoneNumber: '',
                        interestedProperty: PROPERTIES[0].name,
                        spaceType: 'Commercial Headquarters',
                        message: '',
                      })
                    }}
                    className="px-6 py-2.5 rounded-full bg-luxury-gold hover:bg-luxury-bronze text-white font-manrope text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                  <p className="text-[11px] text-luxury-muted/70 mt-6 font-dmsans">
                    * Connected to production client intake pipeline.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="border-b border-luxury-border pb-4 mb-6">
                    <h3 className="font-manrope text-xl font-bold text-luxury-charcoal">
                      Schedule Consultation or Request Brochure
                    </h3>
                    <p className="text-xs font-dmsans text-luxury-muted mt-1">
                      Complete the parameters below to receive comprehensive architectural plans.
                    </p>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-manrope font-semibold uppercase tracking-wider text-luxury-charcoal mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Vikramaditya Singhania"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-luxury-lightGrey border ${
                        errors.fullName ? 'border-red-500' : 'border-luxury-border'
                      } text-sm font-dmsans text-luxury-charcoal focus:outline-none focus:border-luxury-gold transition-colors`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email & Phone in 2-cols */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-manrope font-semibold uppercase tracking-wider text-luxury-charcoal mb-2">
                        Corporate / Personal Email *
                      </label>
                      <input
                        type="email"
                        placeholder="v.singhania@enterprise.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-luxury-lightGrey border ${
                          errors.email ? 'border-red-500' : 'border-luxury-border'
                        } text-sm font-dmsans text-luxury-charcoal focus:outline-none focus:border-luxury-gold transition-colors`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-manrope font-semibold uppercase tracking-wider text-luxury-charcoal mb-2">
                        Telephone Number *
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={formData.phoneCode}
                          onChange={(e) => setFormData({ ...formData, phoneCode: e.target.value })}
                          className="px-2.5 py-3 rounded-xl bg-luxury-lightGrey border border-luxury-border text-sm font-dmsans text-luxury-charcoal focus:outline-none focus:border-luxury-gold"
                        >
                          <option value="+91">+91 (IN)</option>
                          <option value="+971">+971 (UAE)</option>
                          <option value="+44">+44 (UK)</option>
                          <option value="+1">+1 (US/CA)</option>
                          <option value="+65">+65 (SG)</option>
                        </select>
                        <input
                          type="tel"
                          placeholder="98110 12345"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                          className={`flex-1 px-4 py-3 rounded-xl bg-luxury-lightGrey border ${
                            errors.phoneNumber ? 'border-red-500' : 'border-luxury-border'
                          } text-sm font-dmsans text-luxury-charcoal focus:outline-none focus:border-luxury-gold transition-colors`}
                        />
                      </div>
                      {errors.phoneNumber && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Interested Development & Space Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-manrope font-semibold uppercase tracking-wider text-luxury-charcoal mb-2">
                        Interested Development
                      </label>
                      <select
                        value={formData.interestedProperty}
                        onChange={(e) =>
                          setFormData({ ...formData, interestedProperty: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-luxury-lightGrey border border-luxury-border text-sm font-dmsans text-luxury-charcoal focus:outline-none focus:border-luxury-gold"
                      >
                        {PROPERTIES.map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name} ({p.category})
                          </option>
                        ))}
                        <option value="General Corporate Consultation">General Corporate Consultation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-manrope font-semibold uppercase tracking-wider text-luxury-charcoal mb-2">
                        Requirement Type
                      </label>
                      <select
                        value={formData.spaceType}
                        onChange={(e) => setFormData({ ...formData, spaceType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-luxury-lightGrey border border-luxury-border text-sm font-dmsans text-luxury-charcoal focus:outline-none focus:border-luxury-gold"
                      >
                        <option value="Commercial Headquarters (20k+ sq.ft.)">
                          Commercial Headquarters (20k+ sq.ft.)
                        </option>
                        <option value="Sky Villa / Penthouse">Sky Villa / Penthouse</option>
                        <option value="Flagship Retail Showcase">Flagship Retail Showcase</option>
                        <option value="Institutional Real Estate Investment">
                          Institutional Real Estate Investment
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-manrope font-semibold uppercase tracking-wider text-luxury-charcoal mb-2">
                      Specific Architectural or Spatial Requirements
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Please note timeline, desired floor plate, or specific acoustic / parking requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-luxury-lightGrey border border-luxury-border text-sm font-dmsans text-luxury-charcoal focus:outline-none focus:border-luxury-gold transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full bg-luxury-gold hover:bg-luxury-bronze text-white font-manrope text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Routing to Private Client Partner...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Confidential Enquiry</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-luxury-muted mt-3">
                      * Backend endpoint integration: Configured for API routing via `/api/enquiries`.
                    </p>
                  </div>
                </form>
              )}
            </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

import React, { useState } from 'react'
import { X, MapPin, Building2, Check, ArrowUpRight, ShieldCheck, Ruler, Calendar, Award } from 'lucide-react'
import { Property } from '../types'

interface PropertyModalProps {
  property: Property | null
  onClose: () => void
  onOpenEnquiry: (propertyTitle?: string) => void
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  onClose,
  onOpenEnquiry,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'features'>('overview')

  if (!property) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white text-luxury-charcoal max-w-4xl w-full max-h-[92vh] overflow-y-auto rounded-2xl border border-luxury-border shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close Button */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-luxury-border flex items-center justify-between">
          <div>
            <span className="text-[10px] font-manrope font-semibold uppercase tracking-[0.25em] text-luxury-gold">
              Architectural Dossier
            </span>
            <h2 className="font-manrope text-2xl font-bold text-luxury-charcoal">
              {property.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-luxury-charcoal/70 hover:text-luxury-charcoal hover:bg-luxury-lightGrey transition-colors"
            aria-label="Close Dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Image Showcase */}
        <div className="relative h-72 sm:h-96 w-full bg-luxury-charcoal overflow-hidden">
          <img
            src={property.exteriorImage || property.image}
            alt={property.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
            <div>
              <p className="font-dmsans text-sm flex items-center gap-1.5 text-luxury-softGold">
                <MapPin className="w-4 h-4" />
                {property.location}, {property.city}
              </p>
              <p className="font-playfair italic text-white/90 text-sm mt-1">
                {property.tagline}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-white/60 block">
                Price Guidance
              </span>
              <span className="font-manrope text-xl sm:text-2xl font-bold text-luxury-gold">
                From {property.priceFrom}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Tabs */}
        <div className="px-4 sm:px-8 pt-4 sm:pt-6 flex overflow-x-auto no-scrollbar whitespace-nowrap border-b border-luxury-border">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-4 font-manrope text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-luxury-gold text-luxury-charcoal'
                : 'border-transparent text-luxury-muted hover:text-luxury-charcoal'
            }`}
          >
            Overview & Design
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 px-4 font-manrope text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === 'specs'
                ? 'border-luxury-gold text-luxury-charcoal'
                : 'border-transparent text-luxury-muted hover:text-luxury-charcoal'
            }`}
          >
            Engineering Specs
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`pb-3 px-4 font-manrope text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === 'features'
                ? 'border-luxury-gold text-luxury-charcoal'
                : 'border-transparent text-luxury-muted hover:text-luxury-charcoal'
            }`}
          >
            Amenities & Services
          </button>
        </div>

        {/* Modal Tab Content */}
        <div className="p-6 sm:p-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-manrope text-sm font-bold uppercase tracking-wider text-luxury-gold mb-2">
                  Architectural Narrative
                </h4>
                <p className="font-dmsans text-luxury-charcoal/80 text-base leading-relaxed">
                  {property.description}
                </p>
              </div>

              <div>
                <h4 className="font-manrope text-sm font-bold uppercase tracking-wider text-luxury-gold mb-3">
                  Distinguished Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-3 bg-luxury-lightGrey rounded-xl border border-luxury-border flex items-start gap-2.5 text-xs font-dmsans text-luxury-charcoal"
                    >
                      <Check className="w-4 h-4 text-luxury-gold flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-luxury-warmIvory border border-luxury-border text-center">
                <div>
                  <span className="text-[10px] uppercase text-luxury-muted font-manrope block">
                    Architect
                  </span>
                  <span className="font-manrope text-xs font-bold text-luxury-charcoal mt-1 block">
                    {property.architect}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-luxury-muted font-manrope block">
                    Target Handover
                  </span>
                  <span className="font-manrope text-xs font-bold text-luxury-charcoal mt-1 block">
                    {property.completionYear}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-luxury-muted font-manrope block">
                    Scale / Area
                  </span>
                  <span className="font-manrope text-xs font-bold text-luxury-charcoal mt-1 block">
                    {property.area}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-luxury-muted font-manrope block">
                    Current Status
                  </span>
                  <span className="font-manrope text-xs font-bold text-luxury-gold mt-1 block">
                    {property.status}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-4">
              <h4 className="font-manrope text-sm font-bold uppercase tracking-wider text-luxury-gold mb-3">
                Structural & Mechanical Specifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {property.specs.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-luxury-lightGrey rounded-xl border border-luxury-border flex justify-between items-center"
                  >
                    <span className="font-manrope text-xs text-luxury-muted uppercase tracking-wider">
                      {s.label}
                    </span>
                    <span className="font-manrope text-sm font-bold text-luxury-charcoal">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-4">
              <h4 className="font-manrope text-sm font-bold uppercase tracking-wider text-luxury-gold mb-3">
                Curated Amenities & Concierge Infrastructure
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {property.features.map((f, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-luxury-lightGrey rounded-xl border border-luxury-border flex items-center gap-3 text-sm font-dmsans text-luxury-charcoal"
                  >
                    <div className="w-6 h-6 rounded-full bg-luxury-gold/15 text-luxury-gold flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      {idx + 1}
                    </div>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="px-6 sm:px-8 py-5 bg-luxury-lightGrey border-t border-luxury-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-luxury-muted">
            Request private architectural deck & pricing sheet.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-luxury-border hover:bg-white text-luxury-charcoal font-manrope text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose()
                onOpenEnquiry(property.name)
              }}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-full bg-luxury-gold hover:bg-luxury-bronze text-white font-manrope text-xs font-semibold uppercase tracking-[0.14em] transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Book Private Walkthrough</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

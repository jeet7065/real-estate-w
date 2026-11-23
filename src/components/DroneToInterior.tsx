import React, { useRef, useEffect, useState } from 'react'
import { Layers, Sliders, Play, Pause, ChevronRight, CheckCircle2, Radio, Compass, Building, Building2, Crosshair, ArrowUpRight, ShieldCheck } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFrameSequence } from '../hooks/useFrameSequence'

gsap.registerPlugin(ScrollTrigger)

interface DroneToInteriorProps {
  onOpenEnquiry: (propertyTitle?: string) => void
}

export const DroneToInterior: React.FC<DroneToInteriorProps> = ({ onOpenEnquiry }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isManualScrubbing, setIsManualScrubbing] = useState(false)

  // 397-frame video sequence from show-interior-frames folder (frame-0001.jpg to frame-0397.jpg)
  const {
    canvasRef,
    currentFrame,
    totalFrames,
    seekTo,
    seekToRatio,
    isPlaying,
    togglePlay,
  } = useFrameSequence({
    folder: 'show-interior-frames',
    totalFrames: 397,
    fileNamePrefix: 'frame-',
    padDigits: 4,
    initialFrame: 0,
  })

  // 4 Architectural Deconstruction Phases
  const stages = [
    {
      stage: 1,
      targetFrame: 0,
      title: 'Monolithic Tower Perspective',
      subtitle: 'Drone vantage over Gurugram’s commercial skyline',
      description: 'A 42-storey glass tower rising with architectural confidence, capturing golden daylight across its low-E acoustic facade.',
      badge: 'Altitude: 180m • Exterior Perspective',
      telemetry: {
        altitude: '180m',
        floor: 'Exterior Envelope',
        transparency: '0%',
        acoustic: '48 dB Triple Low-E',
        plate: '1.2M sq.ft. Monolith',
      },
    },
    {
      stage: 2,
      targetFrame: 120,
      title: 'Descent to Prime Corporate Suite',
      subtitle: 'Approaching the Level 32 corner suite',
      description: 'The camera descends smoothly along the vertical bronze-accented mullions, centering directly upon the corner executive boardroom and sky garden.',
      badge: 'Altitude: 110m • Floor 32 Approach',
      telemetry: {
        altitude: '110m',
        floor: 'Level 32 Approach',
        transparency: '28%',
        acoustic: '48 dB Isolation',
        plate: '34,000 sq.ft. Floor Plate',
      },
    },
    {
      stage: 3,
      targetFrame: 240,
      title: 'Selective Facade Transparency',
      subtitle: 'Glass curtain dissolves into full transparency',
      description: 'Through an engineered dissolution, the exterior architectural envelope reveals the warm oak, custom marble, and expansive daylight within.',
      badge: 'X-Ray Dissolve • Structural Core Preserved',
      telemetry: {
        altitude: '75m',
        floor: 'Level 32 Envelope',
        transparency: '75%',
        acoustic: 'Low-E Dissolved',
        plate: 'Column-Free Volume',
      },
    },
    {
      stage: 4,
      targetFrame: 375,
      title: 'Interior Executive Sky Sanctuary',
      subtitle: 'Step inside the completed corporate headquarters',
      description: 'Step into the column-free 3.8-meter ceiling volume featuring Italian furniture, private boardroom, biophilic planting, and unobstructed skyline horizons.',
      badge: 'Level 32 Interior • Fitted Corporate Suite',
      telemetry: {
        altitude: '45m',
        floor: 'Level 32 Interior Suite',
        transparency: '100%',
        acoustic: 'Active Internal IAQ',
        plate: '3.8m Finished Clear Ceiling',
      },
    },
  ]

  // Determine active stage based on current frame
  const currentStageIndex =
    currentFrame < 100 ? 0 : currentFrame < 210 ? 1 : currentFrame < 320 ? 2 : 3
  const activeStageData = stages[currentStageIndex]

  // Dynamic real-time calculations
  const altitude = Math.round(180 - (currentFrame / totalFrames) * 135)
  const transparencyPct = Math.min(100, Math.max(0, Math.round(((currentFrame - 140) / 200) * 100)))
  const currentProgressPct = Math.round(((currentFrame + 1) / totalFrames) * 100)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin section full-screen and connect vertical scroll to 300-frame video sequence scrubbing
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%',
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (!isManualScrubbing && !isPlaying) {
            seekToRatio(self.progress)
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isManualScrubbing, isPlaying, seekToRatio])

  return (
    <section
      id="signature-reveal"
      ref={sectionRef}
      className="relative w-full h-screen min-h-screen bg-black text-white overflow-hidden flex flex-col justify-between"
    >
      {/* 1. FULL-SCREEN 300-FRAME VIDEO CANVAS (EDGE TO EDGE) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0 will-change-transform"
      />

      {/* 2. TOP HUD BAR: Floating Frosted Translucent Island */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full pt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 sm:px-6 sm:py-3 rounded-full bg-white/20 backdrop-blur-2xl border border-white/35 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
          {/* Left Title */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-luxury-gold animate-ping" />
            <span className="text-[11px] font-manrope font-bold text-luxury-softGold uppercase tracking-[0.22em]">
              Deconstruct The Landmark
            </span>
          </div>

          {/* Phase Quick Jump Pills */}
          <div className="flex items-center gap-1 sm:gap-2">
            {stages.map((s, idx) => (
              <button
                key={s.stage}
                onClick={() => seekTo(s.targetFrame)}
                className={`px-3.5 py-1.5 text-xs font-manrope rounded-full transition-all duration-300 ${
                  currentStageIndex === idx
                    ? 'bg-luxury-gold text-white font-bold shadow-md scale-105'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                0{s.stage}
                <span className="hidden lg:inline ml-1 text-[11px] font-normal opacity-90">
                  {s.stage === 1 ? 'Vantage' : s.stage === 2 ? 'Descent' : s.stage === 3 ? 'Dissolve' : 'Sanctuary'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. CENTER / MIDDLE HUD OVERLAYS */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full my-auto flex flex-col lg:flex-row items-end lg:items-center justify-between gap-8 pointer-events-none">
        {/* Left Floating Mindblowing Frosted Hologram Card */}
        <div className="w-full max-w-lg pointer-events-auto">
          <div
            className="p-6 sm:p-8 rounded-2xl text-white shadow-[0_16px_40px_rgba(0,0,0,0.35)] border border-white/25 relative overflow-hidden transition-all duration-500"
            style={{
              background: 'rgba(10, 15, 25, 0.22)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            {/* Subtle Gold Corner Accents (Futuristic Architectural Blueprint look) */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-luxury-gold" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-luxury-gold" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-luxury-gold" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-luxury-gold" />

            {/* Header / Phase pill */}
            <div className="flex items-center justify-between text-xs font-manrope text-luxury-softGold uppercase tracking-widest mb-3 pb-2 border-b border-white/20">
              <span className="flex items-center gap-2 drop-shadow">
                <Radio className="w-3.5 h-3.5 text-luxury-gold animate-pulse" />
                Phase 0{activeStageData.stage} of 04
              </span>
              <span className="text-[11px] text-white/90 font-semibold drop-shadow">
                The Meridian Tower
              </span>
            </div>

            {/* Title & Subtitle */}
            <h3 className="font-manrope text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-1 drop-shadow-lg">
              {activeStageData.title}
            </h3>

            <p className="font-playfair italic text-luxury-softGold text-sm mb-4 drop-shadow">
              {activeStageData.subtitle}
            </p>

            <p className="font-dmsans text-white/90 text-xs sm:text-sm leading-relaxed mb-6 drop-shadow">
              {activeStageData.description}
            </p>

            {/* Architectural Specifications */}
            <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-white/10 backdrop-blur-[8px] border border-white/20 text-xs">
              <div>
                <span className="text-[10px] uppercase text-white/70 font-manrope block">
                  Structural Core
                </span>
                <span className="font-manrope text-xs font-bold text-white mt-0.5 block drop-shadow">
                  100% Reinforced
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-white/70 font-manrope block">
                  Finished Ceiling Height
                </span>
                <span className="font-manrope text-xs font-bold text-luxury-softGold mt-0.5 block drop-shadow">
                  3.8 Meters Clear
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-white/70 font-manrope block">
                  Acoustic Envelope
                </span>
                <span className="font-manrope text-xs font-bold text-white mt-0.5 block drop-shadow">
                  Triple Low-E
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-white/70 font-manrope block">
                  Floor Plate
                </span>
                <span className="font-manrope text-xs font-bold text-luxury-softGold mt-0.5 block drop-shadow">
                  Column-Free 34,000 sq.ft.
                </span>
              </div>
            </div>

            {/* Direct Consultation Action */}
            <div className="flex items-center justify-end pt-1">
              <button
                onClick={() => onOpenEnquiry('The Meridian — Level 32 Executive Suite')}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-luxury-gold hover:bg-luxury-bronze text-white font-manrope text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg transform hover:-translate-y-0.5"
              >
                <span>Enquire Level 32 Suite</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Architectural Scope Callout */}
        <div className="hidden lg:flex flex-col items-end gap-3 text-right">
          <div
            className="p-5 rounded-2xl border border-white/25 text-white shadow-xl max-w-xs"
            style={{
              background: 'rgba(10, 15, 25, 0.22)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <div className="flex items-center gap-2 text-luxury-gold text-xs font-manrope font-bold uppercase tracking-wider mb-1 drop-shadow">
              <Building2 className="w-4 h-4 text-luxury-gold" />
              <span>Level 32 Executive Plate</span>
            </div>
            <p className="text-xs text-white/90 font-dmsans leading-relaxed drop-shadow">
              34,000 sq.ft. column-free executive headquarters with wrap-around low-E acoustic glazing.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

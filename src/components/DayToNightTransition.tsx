import React, { useRef, useEffect, useState } from 'react'
import { Sun, Moon, Sparkles, Clock, Compass } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFrameSequence } from '../hooks/useFrameSequence'

gsap.registerPlugin(ScrollTrigger)

export const DayToNightTransition: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isManualScrubbing, setIsManualScrubbing] = useState(false)

  // 596-frame video sequence from night-transition-frames folder (frame-0001.webp to frame-0596.webp)
  const {
    canvasRef,
    currentFrame,
    totalFrames,
    seekTo,
    seekToRatio,
    isPlaying,
  } = useFrameSequence({
    folder: 'night-transition-frames',
    totalFrames: 596,
    fileNamePrefix: 'frame-',
    padDigits: 4,
    fileExtension: 'webp',
    initialFrame: 0,
  })

  // 5 Minimalist Time Milestones across the 596-frame sequence
  const timePresets = [
    {
      label: '08:30 AM',
      name: 'Morning Glow',
      subtitle: 'Diurnal solar capture & morning horizon',
      lighting: '120,000 Lumens • Peak Daylight',
      phase: 'Phase 01 — Natural Illumination',
      frame: 0,
      icon: Sun,
    },
    {
      label: '01:00 PM',
      name: 'Solar Zenith',
      subtitle: 'Infrared deflection & acoustic low-E glass',
      lighting: '74° Solar Altitude • LEED Platinum',
      phase: 'Phase 02 — High Noon Zenith',
      frame: 145,
      icon: Sun,
    },
    {
      label: '06:45 PM',
      name: 'Golden Sunset',
      subtitle: 'Amber reflections across the mountain range',
      lighting: 'Warm Ambient Glow • Metamorphosis',
      phase: 'Phase 03 — Golden Hour Metamorphosis',
      frame: 300,
      icon: Sparkles,
    },
    {
      label: '08:15 PM',
      name: 'Twilight Facade',
      subtitle: 'Bioluminescent LED light pipes activate',
      lighting: 'Automated Facade Array • 45% Output',
      phase: 'Phase 04 — Twilight Activation',
      frame: 445,
      icon: Moon,
    },
    {
      label: '11:00 PM',
      name: 'Nocturnal Skyline',
      subtitle: 'Nocturnal signature commanding the night horizon',
      lighting: '100% Architectural Presence • 24/7 Beacon',
      phase: 'Phase 05 — Nocturnal Icon',
      frame: 590,
      icon: Moon,
    },
  ]

  // Calculate current active milestone based on scrubbed frame
  const currentPresetIndex =
    currentFrame < 100
      ? 0
      : currentFrame < 230
      ? 1
      : currentFrame < 380
      ? 2
      : currentFrame < 520
      ? 3
      : 4

  const activePreset = timePresets[currentPresetIndex]

  // GSAP ScrollTrigger pinning and scrubbing full-screen
  useEffect(() => {
    const ctx = gsap.context(() => {
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
      ref={sectionRef}
      id="day-to-night"
      className="relative w-full h-screen min-h-screen bg-black text-white overflow-hidden flex flex-col justify-between py-6 sm:py-8"
    >
      {/* 1. FULL-SCREEN 300-FRAME VIDEO CANVAS (EDGE TO EDGE) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0 will-change-transform"
      />

      {/* 2. MINIMAL TOP FLOATING CONTROLS */}
      <div className="relative z-20 max-w-7xl mx-auto px-3 sm:px-8 w-full pt-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 p-2 sm:px-6 sm:py-2.5 rounded-2xl sm:rounded-full bg-white/75 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.15)] text-black">
          {/* Section Indicator */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-luxury-gold animate-ping" />
            <span className="text-[10px] sm:text-[11px] font-manrope font-bold text-black uppercase tracking-[0.16em] sm:tracking-[0.2em]">
              Diurnal to Nocturnal Metamorphosis
            </span>
          </div>

          {/* Time Navigation Pills */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto max-w-full pb-0.5 sm:pb-0">
            {timePresets.map((preset, idx) => {
              const Icon = preset.icon
              const isActive = currentPresetIndex === idx
              return (
                <button
                  key={preset.label}
                  onClick={() => seekTo(preset.frame)}
                  className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-manrope rounded-full transition-all duration-300 flex items-center gap-1 sm:gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-black text-white font-bold shadow-md scale-105'
                      : 'text-black/70 hover:text-black hover:bg-black/10'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{preset.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* 3. POP-UP CARDS: TIME FROM LEFT & RIGHT SIDE (BLACK COLOR TEXT, MINIMAL CONTENT) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full my-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-6 pointer-events-none">
        {/* LEFT SIDE POP-UP: Large Bold Black Time */}
        <div className="w-full sm:w-auto max-w-md pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`left-card-${currentPresetIndex}`}
              initial={{ x: -100, opacity: 0, scale: 0.92 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -100, opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/70 shadow-[0_20px_50px_rgba(0,0,0,0.22)] text-black"
            >
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-luxury-gold animate-pulse" />
                <span className="text-[11px] sm:text-xs font-manrope font-bold text-black/70 uppercase tracking-widest">
                  {activePreset.name}
                </span>
              </div>

              {/* Black Color Text Time */}
              <div className="text-3xl sm:text-5xl md:text-7xl font-manrope font-extrabold text-black tracking-tight leading-none my-0.5 sm:my-1">
                {activePreset.label}
              </div>

              <p className="text-[11px] sm:text-sm font-dmsans text-black/80 font-medium mt-1.5 sm:mt-3">
                {activePreset.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT SIDE POP-UP: Minimal Architectural Status in Black Text */}
        <div className="w-full sm:w-auto max-w-sm pointer-events-auto self-end md:self-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`right-card-${currentPresetIndex}`}
              initial={{ x: 100, opacity: 0, scale: 0.92 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 100, opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/70 shadow-[0_20px_50px_rgba(0,0,0,0.22)] text-black text-left md:text-right"
            >
              <span className="text-[10px] sm:text-[11px] font-manrope font-bold text-black/60 uppercase tracking-widest block mb-1">
                Solar Dynamic Architecture
              </span>

              <div className="text-base sm:text-xl md:text-2xl font-manrope font-bold text-black tracking-tight leading-snug">
                {activePreset.lighting}
              </div>

              <div className="inline-flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/10 text-black text-[11px] sm:text-xs font-manrope font-semibold">
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-luxury-gold" />
                <span>{activePreset.phase}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 4. BOTTOM MINIMAL PROGRESS BAR */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full pb-2">
        <div className="flex items-center justify-between text-xs font-manrope text-white/90 drop-shadow mb-2 font-semibold">
          <span>08:30 AM (Sunrise)</span>
          <span className="text-[11px] font-normal uppercase tracking-widest text-white/80">
            Scroll to progress through 24 hours
          </span>
          <span>11:00 PM (Night Horizon)</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-white/30 backdrop-blur-md overflow-hidden">
          <div
            className="h-full bg-luxury-gold transition-all duration-150 ease-out rounded-full"
            style={{ width: `${Math.round(((currentFrame + 1) / totalFrames) * 100)}%` }}
          />
        </div>
      </div>
    </section>
  )
}

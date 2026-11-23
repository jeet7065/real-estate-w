import React, { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Play, Pause } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFrameSequence } from '../hooks/useFrameSequence'

gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
  onExploreClick: () => void
  onVisionClick: () => void
  onScrubbingStateChange?: (isScrubbing: boolean) => void
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onVisionClick,
  onScrubbingStateChange,
}) => {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const bottomControlsRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )

  // 240-frame new video sequence from user's hero-frames folder (frame-0001.jpg to frame-0240.jpg)
  const {
    canvasRef,
    currentFrame,
    totalFrames,
    seekToRatio,
    isPlaying,
    setIsPlaying,
    togglePlay,
    handleResize,
  } = useFrameSequence({
    folder: 'hero-frames',
    totalFrames: 240,
    fileNamePrefix: 'frame-',
    padDigits: 4,
    initialFrame: 0,
  })

  // Detect Mobile Viewport
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setTimeout(handleResize, 50)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [handleResize])

  // Mobile: Auto-play frames smoothly when hero section is visible, pause when scrolled away
  useEffect(() => {
    if (!isMobile) return
    const el = heroRef.current
    if (!el || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsPlaying(true)
          } else {
            setIsPlaying(false)
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [isMobile, setIsPlaying])

  // GSAP Pinning, Direct Content Erase on Scroll & Scrubbing for Desktop (>= 768px)
  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: '+=250%',
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress

          // Scrub video frames
          if (!isPlaying) {
            seekToRatio(p)
          }

          // IMMEDIATELY erase hero content as scrolling starts
          const eraseFactor = Math.max(0, 1 - p * 12)
          const translateY = -p * 150

          if (contentRef.current) {
            contentRef.current.style.opacity = String(eraseFactor)
            contentRef.current.style.transform = `translateY(${translateY}px)`
            contentRef.current.style.pointerEvents = eraseFactor < 0.1 ? 'none' : 'auto'
            contentRef.current.style.visibility = eraseFactor <= 0 ? 'hidden' : 'visible'
          }

          if (bottomControlsRef.current) {
            bottomControlsRef.current.style.opacity = String(eraseFactor)
            bottomControlsRef.current.style.pointerEvents = eraseFactor < 0.1 ? 'none' : 'auto'
            bottomControlsRef.current.style.visibility = eraseFactor <= 0 ? 'hidden' : 'visible'
          }

          // Hide navbar when scrolling starts (p > 0.02), return when scrolling effect ends (p > 0.96)
          const isScrubbing = self.isActive && p > 0.02 && p < 0.96
          onScrubbingStateChange?.(isScrubbing)
        },
        onLeave: () => {
          onScrubbingStateChange?.(false)
        },
        onLeaveBack: () => {
          onScrubbingStateChange?.(false)
        },
      })
    })

    return () => mm.revert()
  }, [seekToRatio, isPlaying, onScrubbingStateChange])

  const scrollToNext = () => {
    const nextSection = document.getElementById('developments')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={heroRef}
      className={`relative w-full overflow-hidden bg-black ${
        isMobile
          ? 'min-h-screen flex flex-col justify-center pt-24 pb-12 px-4'
          : 'h-screen min-h-screen flex items-center justify-center'
      }`}
    >
      {/* On Desktop: Fullscreen background edge-to-edge canvas */}
      {!isMobile && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover will-change-transform z-0"
        />
      )}

      {/* Main Hero Editorial Content */}
      <div
        ref={contentRef}
        className="relative z-20 max-w-7xl mx-auto px-2 sm:px-6 md:px-12 w-full transition-all duration-300"
      >
        <div className="max-w-3xl">
          {/* Subtle Label / Tagline */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            <span className="h-[1.5px] w-8 sm:w-12 bg-luxury-gold shadow-sm" />
            <span className="text-luxury-softGold font-manrope text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase">
              Visionary Architectural Landmarks
            </span>
          </div>

          {/* Primary Editorial Headline with soft text shadow */}
          <h1 className="font-manrope text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-bold text-white tracking-tight leading-[1.1] sm:leading-[1.08] mb-3 sm:mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Where Architecture{' '}
            <span className="font-playfair italic font-normal text-luxury-softGold font-serif">
              Meets Ambition.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="font-dmsans text-sm sm:text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed mb-4 sm:mb-8 font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            Discover exceptional commercial and residential spaces designed for the next generation of
            visionary enterprises and extraordinary lifestyles.
          </p>

          {/* ON MOBILE ONLY: 16:9 Auto-Running Cinematic Video Player with Pause Button */}
          {isMobile && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.7)] my-5 bg-neutral-950">
              <canvas
                ref={canvasRef}
                className="w-full h-full object-cover"
              />

              {/* Top-Left Live Indicator */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-manrope text-white/90 shadow">
                <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-luxury-gold animate-pulse' : 'bg-white/40'}`} />
                <span className="font-semibold uppercase tracking-wider">
                  {isPlaying ? 'Auto-Running' : 'Paused'}
                </span>
              </div>

              {/* Bottom-Right Small Pause / Play Button */}
              <div className="absolute bottom-2.5 right-2.5 z-10">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause frames' : 'Play frames'}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/30 text-white shadow-lg text-[11px] font-manrope font-semibold transition-transform active:scale-95 cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3 h-3 text-luxury-gold fill-luxury-gold" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-luxury-gold fill-luxury-gold" />
                      <span>Play</span>
                    </>
                  )}
                </button>
              </div>

              {/* Bottom 2px Progress Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-10">
                <div
                  className="h-full bg-luxury-gold transition-all duration-75"
                  style={{ width: `${Math.round(((currentFrame + 1) / totalFrames) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 mb-6 sm:mb-12">
            <button
              onClick={onExploreClick}
              className="group px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-luxury-gold hover:bg-luxury-bronze text-white font-manrope text-xs sm:text-[13px] font-semibold tracking-[0.14em] sm:tracking-[0.16em] uppercase transition-all duration-300 shadow-[0_10px_30px_-5px_rgba(216,144,49,0.5)] flex items-center justify-center gap-2.5 sm:gap-3 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore Developments</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            <button
              onClick={onVisionClick}
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/40 hover:border-white/70 text-white font-manrope text-xs sm:text-[13px] font-semibold tracking-[0.14em] sm:tracking-[0.16em] uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Discover Our Vision</span>
            </button>
          </div>

          {/* Key Metric Highlights in Hero */}
          <div className="grid grid-cols-3 gap-3 sm:gap-10 pt-4 sm:pt-6 border-t border-white/25 max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            <div>
              <p className="font-manrope text-xl sm:text-3xl font-bold text-white tracking-tight">
                25<span className="text-luxury-gold">+</span>
              </p>
              <p className="text-white/80 text-[10px] sm:text-xs font-dmsans tracking-wider uppercase mt-0.5 sm:mt-1">
                Landmarks Delivered
              </p>
            </div>
            <div>
              <p className="font-manrope text-xl sm:text-3xl font-bold text-white tracking-tight">
                100<span className="text-luxury-gold">%</span>
              </p>
              <p className="text-white/80 text-[10px] sm:text-xs font-dmsans tracking-wider uppercase mt-0.5 sm:mt-1">
                Prime Metro Sites
              </p>
            </div>
            <div>
              <p className="font-manrope text-xl sm:text-3xl font-bold text-white tracking-tight">
                4.8<span className="text-luxury-gold">M</span>
              </p>
              <p className="text-white/80 text-[10px] sm:text-xs font-dmsans tracking-wider uppercase mt-0.5 sm:mt-1">
                Sq.Ft. Built Area
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Scroll Hint (Desktop only) */}
      {!isMobile && (
        <div
          ref={bottomControlsRef}
          className="absolute bottom-6 right-6 md:right-12 z-20 pointer-events-auto transition-all duration-300"
        >
          <button
            onClick={scrollToNext}
            className="flex items-center gap-2 text-white hover:text-luxury-gold transition-colors duration-300 bg-white/20 hover:bg-white/30 backdrop-blur-xl px-4 py-2 rounded-full border border-white/35 cursor-pointer text-[10px] uppercase font-manrope tracking-[0.2em] shadow-lg"
          >
            <span>Scroll Down</span>
            <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-bounce" />
          </button>
        </div>
      )}
    </section>
  )
}

import { useEffect, useRef, useState, useCallback } from 'react'

interface UseFrameSequenceOptions {
  folder: string
  totalFrames?: number
  initialFrame?: number
  fileNamePrefix?: string
  padDigits?: number
  fileExtension?: string
}

export function useFrameSequence({
  folder,
  totalFrames = 240,
  initialFrame = 0,
  fileNamePrefix,
  padDigits,
  fileExtension,
}: UseFrameSequenceOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(totalFrames).fill(null))
  const frameIndexRef = useRef<number>(initialFrame)
  const lastStateUpdateRef = useRef<number>(0)
  const [currentFrame, setCurrentFrame] = useState(initialFrame)
  const [isLoaded, setIsLoaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const lastDrawnFrameRef = useRef<number>(-1)
  const isPlayingRef = useRef<boolean>(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // Configure prefix and digit padding based on folder or explicit props
  const prefix =
    fileNamePrefix !== undefined
      ? fileNamePrefix
      : 'frame-'

  const digits =
    padDigits !== undefined
      ? padDigits
      : 4

  const ext =
    fileExtension !== undefined
      ? fileExtension
      : folder === 'night-transition-frames'
      ? 'webp'
      : 'jpg'

  const getFrameUrl = useCallback(
    (idx: number) => {
      const frameNum = Math.min(Math.max(1, idx + 1), totalFrames)
      const pad = String(frameNum).padStart(digits, '0')
      return `/sections-frames/${folder}/${prefix}${pad}.${ext}`
    },
    [folder, totalFrames, digits, prefix, ext]
  )

  // Draw image on canvas maintaining aspect ratio (cover) - pure GPU draw, no React re-render overhead
  const drawFrame = useCallback(
    (frameIdx: number, syncState = false) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d', { alpha: false })
      if (!ctx) return

      const clampedIdx = Math.min(Math.max(0, frameIdx), totalFrames - 1)
      frameIndexRef.current = clampedIdx
      let img = imagesRef.current[clampedIdx]

      // If current frame isn't loaded yet, find nearest loaded frame
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let offset = 1; offset < 25; offset++) {
          const prev = clampedIdx - offset
          if (prev >= 0 && imagesRef.current[prev]?.complete) {
            img = imagesRef.current[prev]
            break
          }
          const next = clampedIdx + offset
          if (next < totalFrames && imagesRef.current[next]?.complete) {
            img = imagesRef.current[next]
            break
          }
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) return

      const cw = canvas.width
      const ch = canvas.height
      const iw = img.naturalWidth
      const ih = img.naturalHeight

      // Cover calculation
      const r = Math.max(cw / iw, ch / ih)
      const nw = iw * r
      const nh = ih * r
      const cx = (cw - nw) * 0.5
      const cy = (ch - nh) * 0.5

      ctx.drawImage(img, cx, cy, nw, nh)
      lastDrawnFrameRef.current = clampedIdx

      if (syncState) {
        setCurrentFrame(clampedIdx)
      }
    },
    [totalFrames]
  )

  // Handle high-DPI canvas resizing (optimized capped DPR for mobile battery & performance)
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    // Cap DPR at 1.5 for silky smooth mobile performance
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    canvas.width = Math.floor(rect.width * dpr)
    canvas.height = Math.floor(rect.height * dpr)
    if (lastDrawnFrameRef.current >= 0) {
      drawFrame(lastDrawnFrameRef.current)
    }
  }, [drawFrame])

  // Preload frames progressively
  useEffect(() => {
    let active = true
    const cache = imagesRef.current

    // 1. Immediately load initial frame (Frame 1)
    const firstImg = new Image()
    firstImg.src = getFrameUrl(initialFrame)
    firstImg.onload = () => {
      if (!active) return
      cache[initialFrame] = firstImg
      setIsLoaded(true)
      handleResize()
      drawFrame(initialFrame)
    }

    // 2. Preload keyframes first (every 5th frame for fast responsiveness), then fill in
    const keyIndices: number[] = []
    for (let i = 0; i < totalFrames; i += 5) {
      if (i !== initialFrame) keyIndices.push(i)
    }
    const remainingIndices: number[] = []
    for (let i = 0; i < totalFrames; i++) {
      if (i % 5 !== 0 && i !== initialFrame) remainingIndices.push(i)
    }

    const loadBatch = (indices: number[], onDone?: () => void) => {
      let loaded = 0
      if (indices.length === 0) {
        onDone?.()
        return
      }

      indices.forEach((idx) => {
        const img = new Image()
        img.src = getFrameUrl(idx)
        img.onload = () => {
          if (!active) return
          cache[idx] = img
          loaded++
          setProgress(Math.floor((loaded / totalFrames) * 100))
          if (loaded === indices.length) {
            onDone?.()
          }
        }
        img.onerror = () => {
          loaded++
          if (loaded === indices.length) {
            onDone?.()
          }
        }
      })
    }

    // Load keyframes first, then remainder in idle time
    const startPreload = () => {
      if (!active) return
      loadBatch(keyIndices, () => {
        if ('requestIdleCallback' in window) {
          ;(window as any).requestIdleCallback(() => {
            if (active) loadBatch(remainingIndices)
          })
        } else {
          setTimeout(() => {
            if (active) loadBatch(remainingIndices)
          }, 150)
        }
      })
    }

    // High Performance: Only preload remaining frames when section approaches viewport
    // (Hero starts immediately; below-the-fold sequences wait until scrolled near)
    let observer: IntersectionObserver | null = null
    const canvas = canvasRef.current
    if (canvas && 'IntersectionObserver' in window && folder !== 'hero-frames') {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            startPreload()
            observer?.disconnect()
            observer = null
          }
        },
        { rootMargin: '600px 0px' }
      )
      observer.observe(canvas)
    } else {
      startPreload()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      active = false
      observer?.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [getFrameUrl, initialFrame, totalFrames, drawFrame, handleResize])

  // Auto-play state and controls
  const setPlayingState = useCallback((play: boolean | ((prev: boolean) => boolean)) => {
    setIsPlaying((prev) => {
      const next = typeof play === 'function' ? play(prev) : play
      isPlayingRef.current = next
      return next
    })
  }, [])

  const togglePlay = useCallback(() => {
    setPlayingState((prev) => !prev)
  }, [setPlayingState])

  useEffect(() => {
    if (!isPlaying) return

    let animId: number
    let lastTime = performance.now()
    // 30 FPS playback rate
    const fps = 30
    const interval = 1000 / fps

    const loop = (now: number) => {
      if (!isPlayingRef.current) return
      const delta = now - lastTime
      if (delta >= interval) {
        lastTime = now - (delta % interval)
        // Step dynamically so longer sequences (397 or 596 frames) play like a real video in ~7-9s
        const step = totalFrames > 350 ? 2 : 1
        const next = (frameIndexRef.current + step) % totalFrames
        frameIndexRef.current = next
        drawFrame(next, false)

        // Throttle React state update to ~8 times/sec so mobile CPU does not thrash with re-renders
        if (now - lastStateUpdateRef.current > 120) {
          lastStateUpdateRef.current = now
          setCurrentFrame(next)
        }
      }
      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animId)
  }, [isPlaying, totalFrames, drawFrame])

  // Scrub to specific frame (e.g. from ScrollTrigger or slider)
  const seekTo = useCallback(
    (frameIdx: number) => {
      const clamped = Math.min(Math.max(0, Math.round(frameIdx)), totalFrames - 1)
      frameIndexRef.current = clamped
      drawFrame(clamped, true)
    },
    [drawFrame, totalFrames]
  )

  const seekToRatio = useCallback(
    (ratio: number) => {
      const clampedRatio = Math.min(Math.max(0, ratio), 1)
      const targetFrame = Math.round(clampedRatio * (totalFrames - 1))
      frameIndexRef.current = targetFrame
      drawFrame(targetFrame, true)
    },
    [drawFrame, totalFrames]
  )

  return {
    canvasRef,
    currentFrame,
    totalFrames,
    isLoaded,
    progress,
    seekTo,
    seekToRatio,
    isPlaying,
    setIsPlaying: setPlayingState,
    togglePlay,
    handleResize,
  }
}

import React, { useState, useEffect } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

export type RevealDirection = 'left' | 'right' | 'up' | 'down' | 'pop'

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: RevealDirection
  delay?: number
  duration?: number
  className?: string
  distance?: number
  once?: boolean
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.65,
  className = '',
  distance = 50,
  once = true,
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left':
        return { x: -distance, y: 0, opacity: 0 }
      case 'right':
        return { x: distance, y: 0, opacity: 0 }
      case 'up':
        return { x: 0, y: distance, opacity: 0 }
      case 'down':
        return { x: 0, y: -distance, opacity: 0 }
      case 'pop':
        return { x: 0, y: distance * 0.5, scale: 0.88, opacity: 0 }
      default:
        return { x: 0, y: distance, opacity: 0 }
    }
  }

  const getAnimatePosition = () => {
    return {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
    }
  }

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={getAnimatePosition()}
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface TypewriterHeadingProps {
  text: string
  highlight?: string
  className?: string
  highlightClassName?: string
  as?: 'h1' | 'h2' | 'h3'
  delay?: number
}

export const TypewriterHeading: React.FC<TypewriterHeadingProps> = ({
  text,
  highlight,
  className = '',
  highlightClassName = '',
  as = 'h2',
  delay = 0.1,
}) => {
  const ref = React.useRef<HTMLHeadingElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const mainWords = text.split(' ')
  const highlightWords = highlight ? highlight.split(' ') : []

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  }

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  }

  const Component = motion[as]

  return (
    <Component
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {/* Main Text Words */}
      {mainWords.map((word, wIdx) => (
        <span key={`main-${wIdx}`} className="inline-block whitespace-nowrap mr-[0.28em]">
          {word.split('').map((char, cIdx) => (
            <motion.span
              key={`char-${cIdx}`}
              variants={letterVariants}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}

      {/* Highlight Text Words */}
      {highlightWords.length > 0 && (
        <span className={highlightClassName}>
          {highlightWords.map((word, wIdx) => (
            <span key={`hl-${wIdx}`} className="inline-block whitespace-nowrap mr-[0.28em]">
              {word.split('').map((char, cIdx) => (
                <motion.span
                  key={`hl-char-${cIdx}`}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </span>
      )}
    </Component>
  )
}

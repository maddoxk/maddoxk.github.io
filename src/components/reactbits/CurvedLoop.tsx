import React, { useEffect, useRef, useState } from 'react'

interface CurvedLoopProps {
  marqueeText?: string
  speed?: number
  curveAmount?: number
  interactive?: boolean
  className?: string
}

export default function CurvedLoop({
  marqueeText = 'MADDOX KRAPE • COMPUTER SCIENCE • ALGORITHMS & SIMULATIONS • AI AGENTS • ',
  speed = 1.0,
  curveAmount = 140,
  interactive = true,
  className = '',
}: CurvedLoopProps) {
  const [offset, setOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const textPathRef = useRef<SVGTextPathElement>(null)
  const singleTextLengthRef = useRef<number>(1000)

  const startXRef = useRef(0)
  const startOffsetRef = useRef(0)

  // Measure single text block length for seamless modulo wrapping
  useEffect(() => {
    if (textPathRef.current) {
      try {
        const totalLen = textPathRef.current.getComputedTextLength()
        if (totalLen > 0) {
          singleTextLengthRef.current = totalLen / 8 // Divided by 8 repeated blocks
        }
      } catch (e) {
        // Fallback
      }
    }
  }, [marqueeText])

  // RequestAnimationFrame for 60fps buttery smooth animation & seamless loop wrap
  useEffect(() => {
    let animId: number

    const step = () => {
      if (!isDragging) {
        setOffset((prev) => {
          const next = prev - speed * 0.8
          const chunkLen = singleTextLengthRef.current
          if (chunkLen > 0 && Math.abs(next) >= chunkLen) {
            return next % chunkLen // Modulo wrapping guarantees infinite non-disappearing loop
          }
          return next
        })
      }
      animId = requestAnimationFrame(step)
    }

    animId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animId)
  }, [speed, isDragging])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return
    setIsDragging(true)
    startXRef.current = e.clientX
    startOffsetRef.current = offset
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !interactive) return
    const delta = e.clientX - startXRef.current
    setOffset(startOffsetRef.current + delta * 1.5)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // 8 repeats guarantees full path coverage with no gap gaps
  const repeatedText = Array(8).fill(marqueeText).join(' ')

  return (
    <div
      className={`w-full overflow-hidden pointer-events-auto cursor-grab active:cursor-grabbing select-none ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <svg
        viewBox="0 0 1400 240"
        className="w-full h-auto overflow-visible opacity-35 hover:opacity-80 transition-opacity duration-500"
      >
        <path
          id="curved-path-span"
          d={`M -200 120 C 300 ${120 - curveAmount}, 1100 ${120 + curveAmount}, 1600 120`}
          fill="transparent"
          stroke="transparent"
        />
        <text className="font-mono text-xs uppercase tracking-[0.25em] fill-foreground font-semibold">
          <textPath
            ref={textPathRef}
            href="#curved-path-span"
            startOffset={`${offset}px`}
          >
            {repeatedText}
          </textPath>
        </text>
      </svg>
    </div>
  )
}

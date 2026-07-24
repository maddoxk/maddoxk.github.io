import React, { useEffect, useRef, useState } from 'react'

interface CurvedLoopProps {
  marqueeText?: string
  speed?: number
  curveAmount?: number
  direction?: 'left' | 'right'
  interactive?: boolean
  className?: string
}

export default function CurvedLoop({
  marqueeText = 'MADDOX KRAPE • SOFTWARE ENGINEER • COMPUTER SCIENCE • ALGORITHMS & SIMULATION ENGINE • AI AGENTS • ',
  speed = 1.2,
  curveAmount = 180,
  direction = 'left',
  interactive = true,
  className = '',
}: CurvedLoopProps) {
  const [offset, setOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef(0)
  const startOffsetRef = useRef(0)

  useEffect(() => {
    if (isDragging) return
    const interval = setInterval(() => {
      setOffset((prev) => (direction === 'left' ? prev + speed * 1.5 : prev - speed * 1.5))
    }, 16)
    return () => clearInterval(interval)
  }, [speed, direction, isDragging])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return
    setIsDragging(true)
    startXRef.current = e.clientX
    startOffsetRef.current = offset
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !interactive) return
    const delta = e.clientX - startXRef.current
    setOffset(startOffsetRef.current + delta * 2)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Create repeated text for infinite loop
  const repeatedText = `${marqueeText} ${marqueeText} ${marqueeText} ${marqueeText}`

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
        className="w-full h-auto overflow-visible opacity-30 hover:opacity-80 transition-opacity duration-500"
      >
        <path
          id="curved-path-span"
          d={`M -100 120 C 350 ${120 - curveAmount}, 1050 ${120 + curveAmount}, 1500 120`}
          fill="transparent"
          stroke="transparent"
        />
        <text className="font-mono text-xs uppercase tracking-[0.3em] fill-foreground font-semibold">
          <textPath
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

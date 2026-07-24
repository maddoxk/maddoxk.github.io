import React, { useEffect, useRef, useState } from 'react'

export interface CircularGalleryCardItem {
  title: string
  category: string
  description: string
  logoUrl: string
  accentColor?: string
  tags: string[]
}

interface CircularGalleryProps {
  items: CircularGalleryCardItem[]
  autoRotateSpeed?: number // ms interval between steps, default 3500ms
  className?: string
}

export default function CircularGallery({
  items,
  autoRotateSpeed = 3500,
  className = '',
}: CircularGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Automatic slow rotation timer
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length)
    }, autoRotateSpeed)

    return () => clearInterval(timer)
  }, [items.length, autoRotateSpeed, isPaused])

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-5xl mx-auto py-12 px-4 flex flex-col items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 3D Circular Ring Container with Perspective */}
      <div className="relative w-full h-[460px] flex items-center justify-center overflow-visible [perspective:1400px] [transform-style:preserve-3d]">
        {items.map((item, index) => {
          const total = items.length
          let offset = index - activeIndex
          if (offset > total / 2) offset -= total
          if (offset < -total / 2) offset += total

          const isCenter = offset === 0
          const absOffset = Math.abs(offset)

          // Increased ring radius & angular spacing to prevent text overlap
          const angle = (offset / total) * Math.PI * 1.8 // Wider arc spread
          const radius = 480 // Expanded 3D ring radius

          const translateX = Math.sin(angle) * radius
          const translateZ = Math.cos(angle) * radius - radius // Depth recession
          const rotateY = (angle * 180) / Math.PI

          const scale = isCenter ? 1.05 : Math.max(0.68, 1 - absOffset * 0.16)
          const opacity = isCenter ? 1 : Math.max(0.15, 0.7 - absOffset * 0.25)
          const zIndex = 30 - Math.round(absOffset * 10) // Strict depth layering

          return (
            <div
              key={item.title}
              onClick={() => setActiveIndex(index)}
              className={`absolute top-1/2 left-1/2 w-80 sm:w-96 rounded-2xl border p-7 backdrop-blur-2xl transition-all duration-700 ease-out cursor-pointer shadow-2xl ${
                isCenter
                  ? 'border-primary/60 bg-card/95 shadow-primary/10 ring-1 ring-primary/30'
                  : 'border-border/40 bg-card/60 hover:border-border/80'
              }`}
              style={{
                transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex,
              }}
            >
              {/* Header: Official Logo + Category */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-secondary/80 border border-border/50 p-2.5 flex items-center justify-center shrink-0 shadow-inner">
                  <img
                    src={item.logoUrl}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest border border-border/40 rounded-md px-2.5 py-1 bg-background/60">
                  {item.category}
                </span>
              </div>

              {/* Title & Personal Value / Purpose Description */}
              <h3 className="font-sans font-bold text-xl text-foreground mb-2 tracking-tight">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed mb-5 font-sans">
                {item.description}
              </p>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] bg-secondary/90 text-secondary-foreground rounded-md px-2.5 py-0.5 border border-border/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Manual Step Controls & Counter */}
      <div className="flex items-center justify-center gap-6 mt-4 relative z-40">
        <button
          onClick={handlePrev}
          className="p-2.5 rounded-full border border-border/50 bg-card/60 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all font-mono text-sm cursor-pointer"
          aria-label="Previous item"
        >
          ←
        </button>
        <div className="font-mono text-xs text-muted-foreground tracking-widest flex items-center gap-2">
          <span className="text-foreground font-semibold">{String(activeIndex + 1).padStart(2, '0')}</span>
          <span className="opacity-40">/</span>
          <span>{String(items.length).padStart(2, '0')}</span>
        </div>
        <button
          onClick={handleNext}
          className="p-2.5 rounded-full border border-border/50 bg-card/60 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all font-mono text-sm cursor-pointer"
          aria-label="Next item"
        >
          →
        </button>
      </div>
    </div>
  )
}

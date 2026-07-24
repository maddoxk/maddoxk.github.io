import React, { useState } from 'react'

export interface CircularGalleryItem {
  title: string
  category: string
  description: string
  icon: string
  tags: string[]
}

interface CircularGalleryProps {
  items: CircularGalleryItem[]
  className?: string
}

export default function CircularGallery({ items, className = '' }: CircularGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  return (
    <div className={`relative w-full max-w-4xl mx-auto py-10 px-4 ${className}`}>
      {/* Outer 3D circular arc layout */}
      <div className="relative min-h-[380px] flex items-center justify-center overflow-hidden">
        {items.map((item, index) => {
          const total = items.length
          // Offset relative to active index
          let offset = index - activeIndex
          if (offset > total / 2) offset -= total
          if (offset < -total / 2) offset += total

          const isCenter = offset === 0
          const absOffset = Math.abs(offset)

          // Calculate 3D circular transformation
          const rotateY = offset * 28 // degrees
          const translateX = offset * 220 // pixels
          const translateZ = -absOffset * 140 // depth
          const scale = isCenter ? 1 : Math.max(0.7, 1 - absOffset * 0.15)
          const opacity = isCenter ? 1 : Math.max(0.2, 0.7 - absOffset * 0.25)

          return (
            <div
              key={item.title}
              onClick={() => setActiveIndex(index)}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-80 rounded-2xl border p-6 backdrop-blur-xl transition-all duration-700 ease-out cursor-pointer shadow-xl select-none ${
                isCenter
                  ? 'border-primary/50 bg-card/80 shadow-primary/10 z-30'
                  : 'border-border/40 bg-card/30 z-10 hover:border-border/80'
              }`}
              style={{
                transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
              }}
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-3xl">{item.icon}</span>
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest border border-border/40 rounded px-2 py-0.5">
                  {item.category}
                </span>
              </div>
              <h3 className="font-sans font-bold text-xl text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed mb-4">{item.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] bg-secondary/80 text-secondary-foreground rounded px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Gallery Controls & Counter */}
      <div className="flex items-center justify-center gap-6 mt-6 relative z-40">
        <button
          onClick={handlePrev}
          className="p-2.5 rounded-full border border-border/50 bg-card/60 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all font-mono text-sm cursor-pointer"
          aria-label="Previous item"
        >
          ←
        </button>
        <div className="font-mono text-xs text-muted-foreground tracking-widest">
          {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
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

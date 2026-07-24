import React, { useState } from 'react'

export interface LogoItem {
  name: string
  iconUrl?: string
  node?: React.ReactNode
}

interface LogoLoopProps {
  logos: LogoItem[]
  speed?: number // px per sec / duration multiplier
  direction?: 'left' | 'right'
  hoverPause?: boolean
  className?: string
}

export default function LogoLoop({
  logos,
  direction = 'left',
  hoverPause = true,
  className = '',
}: LogoLoopProps) {
  const [isPaused, setIsPaused] = useState(false)

  // Duplicate list to achieve infinite seamless loop
  const loopItems = [...logos, ...logos, ...logos, ...logos]

  return (
    <div
      className={`relative w-full overflow-hidden py-4 select-none ${className}`}
      onMouseEnter={() => hoverPause && setIsPaused(true)}
      onMouseLeave={() => hoverPause && setIsPaused(false)}
    >
      {/* Left/Right Fade Out Vignette Masking */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Ticker Belt */}
      <div
        className={`flex items-center gap-6 w-max transition-all duration-300 ${
          isPaused ? '[animation-play-state:paused]' : ''
        }`}
        style={{
          animationName: 'logo-loop-scroll',
          animationDuration: '30s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {loopItems.map((item, idx) => (
          <div
            key={`${item.name}-${idx}`}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-border/50 bg-card/40 backdrop-blur-md hover:border-primary/50 hover:bg-card/70 hover:scale-105 transition-all duration-200 cursor-pointer group shrink-0"
          >
            {item.iconUrl ? (
              <img
                src={item.iconUrl}
                alt={item.name}
                className="w-5 h-5 object-contain group-hover:scale-110 transition-transform"
                onError={(e) => {
                  // Fallback to text icon badge if image fails
                  e.currentTarget.style.display = 'none'
                }}
              />
            ) : (
              item.node
            )}
            <span className="font-mono text-xs font-medium text-foreground tracking-wide">
              {item.name}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes logo-loop-scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

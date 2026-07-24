import React, { useState } from 'react'

interface TrueFocusProps {
  sentence?: string
  manualMode?: boolean
  blurAmount?: number
  borderColor?: string
  glowColor?: string
  className?: string
}

export default function TrueFocus({
  sentence = 'Engineering with Intention',
  manualMode = false,
  blurAmount = 4,
  borderColor = 'rgba(56, 189, 248, 0.8)',
  glowColor = 'rgba(56, 189, 248, 0.2)',
  className = '',
}: TrueFocusProps) {
  const words = sentence.split(' ')
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className={`relative inline-flex flex-wrap items-center gap-2 ${className}`}>
      {words.map((word, index) => {
        const isFocused = index === currentIndex
        return (
          <span
            key={index}
            onMouseEnter={() => setCurrentIndex(index)}
            className="relative cursor-pointer transition-all duration-300 px-1 py-0.5 rounded"
            style={{
              filter: isFocused ? 'blur(0px)' : `blur(${blurAmount}px)`,
              opacity: isFocused ? 1 : 0.45,
            }}
          >
            {word}
            {isFocused && (
              <span
                className="absolute inset-0 border border-primary/60 rounded shadow-sm transition-all duration-300 pointer-events-none"
                style={{
                  borderColor,
                  boxShadow: `0 0 12px ${glowColor}`,
                }}
              />
            )}
          </span>
        )
      })}
    </div>
  )
}

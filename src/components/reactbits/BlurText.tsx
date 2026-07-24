import React, { useEffect, useRef, useState } from 'react'

interface BlurTextProps {
  text: string
  delay?: number
  className?: string
  animateBy?: 'words' | 'letters'
  direction?: 'top' | 'bottom'
}

export default function BlurText({
  text,
  delay = 150,
  className = '',
  animateBy = 'words',
  direction = 'top',
}: BlurTextProps) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('')
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const getTransform = () => {
    return direction === 'top' ? 'translate3d(0,-20px,0)' : 'translate3d(0,20px,0)'
  }

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {elements.map((el, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-700 ease-out"
          style={{
            transitionDelay: `${i * delay}ms`,
            opacity: inView ? 1 : 0,
            filter: inView ? 'blur(0px)' : 'blur(10px)',
            transform: inView ? 'translate3d(0,0,0)' : getTransform(),
            marginRight: animateBy === 'words' && i < elements.length - 1 ? '0.25em' : '0em',
          }}
        >
          {el === ' ' ? '\u00A0' : el}
        </span>
      ))}
    </span>
  )
}

import { useEffect, useRef, useState } from 'react'

/**
 * One-shot in-view detector. Sets `inView` to true the first time the element
 * crosses `threshold` of viewport intersection, then disconnects. Returns
 * `{ ref, inView }` — attach `ref` to the element you care about.
 */
export function useInView<T extends Element = HTMLDivElement>(threshold = 0.3) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [threshold])
  return { ref, inView }
}

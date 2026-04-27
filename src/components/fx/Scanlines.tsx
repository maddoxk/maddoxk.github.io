export default function Scanlines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(0, 240, 255, 0.04) 2px, rgba(0, 240, 255, 0.04) 3px)',
        mixBlendMode: 'screen',
      }}
    />
  )
}

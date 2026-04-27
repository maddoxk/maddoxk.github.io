export default function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10">
      <div className="font-mono text-xs tracking-widest text-cyan-neon mb-2">
        &gt; {eyebrow}
      </div>
      <h2 className="font-display text-3xl md:text-5xl text-fg" style={{ textShadow: '0 0 20px rgba(0, 240, 255, 0.2)' }}>
        {title}
      </h2>
      <div className="mt-3 h-px bg-gradient-to-r from-cyan-neon via-magenta-neon to-transparent w-48" />
    </div>
  )
}

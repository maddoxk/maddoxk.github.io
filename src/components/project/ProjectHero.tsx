import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import GlitchText from '../fx/GlitchText'

export default function ProjectHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <header className="px-6 max-w-5xl mx-auto py-16 border-b border-[var(--border-panel)]">
      <Link to="/projects" className="inline-flex items-center gap-2 text-muted hover:text-cyan-neon font-mono text-sm mb-8 transition-colors">
        <ArrowLeft size={16} /> BACK_TO_ARCHIVE
      </Link>
      <div className="font-mono text-xs tracking-widest text-cyan-neon mb-4">
        &gt; {eyebrow}
      </div>
      <h1 className="font-display text-4xl md:text-6xl mb-4">
        <GlitchText text={title} as="span" />
      </h1>
      <p className="text-muted text-lg">{subtitle}</p>
    </header>
  )
}

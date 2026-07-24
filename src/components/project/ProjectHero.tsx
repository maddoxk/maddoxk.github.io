import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function ProjectHero({ eyebrow, title, subtitle, thumb }: { eyebrow: string; title: string; subtitle: string; thumb?: string }) {
  return (
    <header className="px-6 max-w-5xl mx-auto py-12 border-b border-border/40">
      <Link to="/projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to projects
      </Link>

      {thumb && (
        <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden rounded-xl bg-card border border-border/50 shadow-md mb-8">
          <img src={thumb} alt={title} className="w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        </div>
      )}

      <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-2">
        {eyebrow}
      </span>
      <h1 className="font-sans font-bold text-3xl sm:text-5xl tracking-tight text-foreground mb-3">
        {title}
      </h1>
      <p className="text-muted-foreground text-lg max-w-2xl">{subtitle}</p>
    </header>
  )
}

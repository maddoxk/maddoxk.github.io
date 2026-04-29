import { useState } from 'react'
import ProjectCard from '@/components/project/ProjectCard'
import GlitchText from '@/components/fx/GlitchText'
import { PROJECTS, type ProjectCategory } from '@/data/projects'

type Filter = 'all' | ProjectCategory
const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'ALL' },
  { key: 'simulation', label: 'SIMULATION' },
  { key: 'algorithm', label: 'ALGORITHMS' },
  { key: 'dataviz', label: 'DATA_VIZ' },
]

export default function Projects() {
  const [f, setF] = useState<Filter>('all')
  const items = f === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === f)
  return (
    <div className="px-6 max-w-7xl mx-auto py-16">
      <div className="font-mono text-xs tracking-widest text-cyan-neon mb-4">
        &gt; PROJECTS.dir
      </div>
      <h1 className="font-display text-4xl md:text-6xl mb-10">
        <GlitchText text="ARCHIVE" as="span" />
      </h1>

      <div className="flex flex-wrap gap-2 mb-10">
        {FILTERS.map(x => {
          const active = f === x.key
          return (
            <button
              key={x.key}
              data-cursor="hover"
              onClick={() => setF(x.key)}
              className={`px-4 py-2 font-mono text-sm tracking-widest transition-all border ${
                active
                  ? 'text-cyan-neon border-cyan-neon glow-cyan'
                  : 'text-muted border-[var(--border-panel)] hover:text-cyan-neon hover:border-cyan-neon'
              }`}
              style={active ? { boxShadow: 'var(--glow-cyan-sm)' } : undefined}
            >
              {x.label}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(p => <ProjectCard key={p.slug} project={p} />)}
      </div>

      {items.length === 0 && (
        <div className="text-muted font-mono mt-10">&gt; NO_RECORDS_FOUND</div>
      )}
    </div>
  )
}

import { Link } from 'react-router-dom'
import Tilt from 'react-parallax-tilt'
import type { Project } from '@/data/projects'
import { ArrowUpRight } from 'lucide-react'

const ACCENT: Record<Project['accent'], string> = {
  cyan: 'var(--neon-cyan)',
  magenta: 'var(--neon-magenta)',
  violet: 'var(--neon-violet)',
  amber: 'var(--neon-amber)',
}

export default function ProjectCard({ project }: { project: Project }) {
  const color = ACCENT[project.accent]
  return (
    <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} glareEnable glareMaxOpacity={0.1} scale={1.02} transitionSpeed={1500}>
      <Link
        to={project.href}
        data-cursor="hover"
        className="group relative block panel cyber-border overflow-hidden h-full"
        style={{ borderColor: color }}
      >
        <div className="relative aspect-video overflow-hidden bg-deep">
          {project.thumb ? (
            <img
              src={project.thumb}
              alt=""
              className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-sm" style={{ color }}>
              &gt; NO_SIGNAL
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-void)] via-transparent to-transparent" />
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-display text-lg tracking-wider" style={{ color }}>
              {project.title}
            </h3>
            <ArrowUpRight size={18} style={{ color }} className="flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-muted text-sm">{project.tagline}</p>
          <div className="mt-4 font-mono text-[10px] tracking-widest opacity-60" style={{ color }}>
            // {project.category.toUpperCase()}
          </div>
        </div>
      </Link>
    </Tilt>
  )
}

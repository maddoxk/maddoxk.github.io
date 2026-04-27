import { useEffect, useState } from 'react'
import GlitchText from '@/components/fx/GlitchText'
import SectionHeading from '@/components/ui/SectionHeading'
import NeonButton from '@/components/ui/NeonButton'
import ProjectCard from '@/components/project/ProjectCard'
import StatsHUD from '@/components/ui/StatsHUD'
import { PROJECTS } from '@/data/projects'
import { SKILLS } from '@/data/skills'
import { Github, Mail } from 'lucide-react'

const TAGLINES = ['PROBLEM_SOLVER', 'DEVELOPER', 'STUDENT', 'DEBUGGER', 'COLLABORATOR']

function CyclingTagline() {
  const [i, setI] = useState(0)
  const [txt, setTxt] = useState('')
  const [phase, setPhase] = useState<'typing' | 'holding' | 'erasing'>('typing')

  useEffect(() => {
    const target = TAGLINES[i]
    if (phase === 'typing') {
      if (txt.length < target.length) {
        const t = setTimeout(() => setTxt(target.slice(0, txt.length + 1)), 70)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('erasing'), 1400)
        return () => clearTimeout(t)
      }
    }
    if (phase === 'erasing') {
      if (txt.length > 0) {
        const t = setTimeout(() => setTxt(txt.slice(0, -1)), 35)
        return () => clearTimeout(t)
      } else {
        setPhase('typing')
        setI((i + 1) % TAGLINES.length)
      }
    }
  }, [txt, phase, i])

  return (
    <span className="text-cyan-neon font-mono">
      {txt}
      <span className="inline-block w-2 h-5 bg-cyan-neon ml-1 animate-pulse" />
    </span>
  )
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[85vh] flex flex-col justify-center px-6 max-w-7xl mx-auto">
        <div className="font-mono text-xs tracking-widest text-cyan-neon mb-4">
          &gt; INITIALIZING_IDENTITY
        </div>
        <h1 className="font-display text-5xl md:text-8xl mb-6" style={{ textShadow: 'var(--glow-cyan-md)' }}>
          <GlitchText text="MADDOX KRAPE" as="span" />
        </h1>
        <div className="text-xl md:text-2xl mb-8">
          &gt; ROLE: <CyclingTagline />
        </div>
        <p className="max-w-2xl text-muted text-lg mb-10">
          Digital portfolio. Years of software engineering across simulation, algorithms,
          and data visualization. Always looking for the next interesting problem.
        </p>
        <div className="flex flex-wrap gap-4">
          <NeonButton to="/projects">&gt; VIEW_PROJECTS</NeonButton>
          <NeonButton to="/about" variant="magenta">&gt; ABOUT_ME</NeonButton>
        </div>
      </section>

      {/* About preview */}
      <section className="px-6 max-w-7xl mx-auto py-24">
        <SectionHeading eyebrow="PROFILE.dat" title="Who I Am" />
        <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start">
          <div className="relative">
            <img
              src="/images/profile.JPG"
              alt="Maddox Krape"
              className="w-48 h-48 object-cover cyber-border"
              style={{ borderColor: 'var(--neon-cyan)' }}
            />
          </div>
          <div>
            <p className="text-lg mb-4">
              Hey — I'm a developer and problem solver with a passion for creating solutions.
              Years of experience in software engineering across a variety of projects.
            </p>
            <p className="text-muted mb-6">
              I love brainstorming and solving complex problems, and I have a knack for finding
              innovative solutions. Constantly looking for new challenges and interesting opportunities.
            </p>
            <NeonButton to="/about">&gt; READ_MORE</NeonButton>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 max-w-7xl mx-auto py-16">
        <SectionHeading eyebrow="ACHIEVEMENTS.log" title="Stats" />
        <StatsHUD />
      </section>

      {/* Projects */}
      <section className="px-6 max-w-7xl mx-auto py-24">
        <SectionHeading eyebrow="PROJECTS.dir" title="Featured Work" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map(p => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </section>

      {/* Skills */}
      <section className="px-6 max-w-7xl mx-auto py-24">
        <SectionHeading eyebrow="STACK.sys" title="Tech Stack" />
        <div className="flex flex-wrap gap-3">
          {SKILLS.map(s => (
            <span key={s.name} className="panel px-4 py-2 font-mono text-sm text-cyan-neon border border-[var(--border-panel)]">
              {s.name}
            </span>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 max-w-7xl mx-auto py-24">
        <SectionHeading eyebrow="ESTABLISH_CONNECTION" title="Contact" />
        <div className="panel cyber-border p-8">
          <p className="text-lg mb-6">
            Want to work together, ask a question, or just say hi? Reach out.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://github.com/maddoxk" target="_blank" rel="noreferrer"
               className="flex items-center gap-2 text-cyan-neon hover:glow-cyan transition-all">
              <Github size={18} /> github.com/maddoxk
            </a>
            <a href="mailto:maddox.krape@gmail.com"
               className="flex items-center gap-2 text-cyan-neon hover:glow-cyan transition-all">
              <Mail size={18} /> maddox.krape@gmail.com
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

import SectionHeading from '@/components/ui/SectionHeading'
import ProjectCard from '@/components/project/ProjectCard'
import ExperienceSection from '@/components/ui/ExperienceSection'
import BlurText from '@/components/reactbits/BlurText'
import ShinyText from '@/components/reactbits/ShinyText'
import SpotlightCard from '@/components/reactbits/SpotlightCard'
import Particles from '@/components/reactbits/Particles'
import VariableProximity from '@/components/reactbits/VariableProximity'
import CircularGallery from '@/components/reactbits/CircularGallery'
import DitherBackground from '@/components/reactbits/DitherBackground'
import LogoLoop from '@/components/reactbits/LogoLoop'
import { PROJECTS } from '@/data/projects'
import { Github, Mail, ArrowRight, User, Briefcase, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { useRef } from 'react'

const TECH_LOGOS = [
  { name: 'TypeScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'JavaScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Python', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Go', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg' },
  { name: 'Rust', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg' },
  { name: 'C++', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Java', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Node.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Three.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg' },
  { name: 'Docker', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'PostgreSQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Git', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Linux', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
]

export default function Home() {
  const headingContainerRef = useRef<HTMLDivElement>(null)

  const scrollToContent = () => {
    const el = document.getElementById('background-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Hero with Dither Background & Transition */}
      <section className="min-h-[85vh] flex flex-col justify-between px-6 max-w-5xl mx-auto pt-16 pb-8 relative">
        {/* Full-width fixed/absolute Dither Canvas */}
        <div className="absolute inset-y-0 left-[calc(-50vw+50%)] right-[calc(-50vw+50%)] overflow-hidden pointer-events-none z-0">
          <DitherBackground className="opacity-25" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        
        {/* Particles Overlay */}
        <Particles particleCount={25} speed={0.3} />

        <div className="my-auto relative z-20">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-4 block">
            <ShinyText text="Software Engineer & Problem Solver" speed={4} />
          </span>

          <h1 className="font-sans font-bold text-4xl sm:text-6xl md:text-7xl tracking-tight text-foreground mb-6 leading-[1.08]">
            <BlurText text="Hi, I'm Maddox Krape." delay={120} animateBy="words" direction="top" />
          </h1>

          <p className="max-w-2xl text-muted-foreground text-lg sm:text-xl leading-relaxed mb-10 font-sans">
            I build interactive 3D simulations, optimized algorithm engines, and data visualization tools. Focused on clarity, efficiency, and thoughtful design.
          </p>

          <div className="flex flex-wrap gap-3 items-center">
            <Button size="lg" asChild className="gap-2">
              <Link to="/projects">
                View Selected Work <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild className="gap-2">
              <Link to="/about">
                <User className="w-4 h-4" /> More About Me
              </Link>
            </Button>
          </div>
        </div>

        {/* Animated Floating Scroll Down Arrow */}
        <div className="flex justify-center pt-8 relative z-20">
          <button
            onClick={scrollToContent}
            aria-label="Scroll to content"
            className="p-3 rounded-full border border-border/50 bg-card/40 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300 animate-bounce cursor-pointer group"
          >
            <ChevronDown className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </section>

      {/* About Preview */}
      <section id="background-section" className="px-6 max-w-5xl mx-auto py-20 border-t border-border/40">
        <div ref={headingContainerRef} className="mb-8 relative cursor-pointer">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-2">
            Background
          </span>
          <h2 className="text-3xl font-bold text-foreground">
            <VariableProximity
              label="Engineering with Intention"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={headingContainerRef}
              radius={100}
              falloff="linear"
            />
          </h2>
        </div>
        <SpotlightCard className="overflow-hidden">
          <CardContent className="p-8 md:p-10 grid md:grid-cols-[auto_1fr] gap-8 items-center">
            <img
              src="/images/profile.jpeg"
              alt="Maddox Krape"
              className="w-40 h-40 rounded-lg object-cover border border-border shadow-sm mx-auto md:mx-0"
            />
            <div>
              <p className="text-foreground text-lg font-medium leading-relaxed mb-3">
                Building reliable software requires a balance of analytical precision and thoughtful user experience.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                Over the past several years, I've designed physics simulation engines, written compression and search algorithms, 
                and created responsive analytics dashboards. I value code that is easy to reason about and built to last.
              </p>
              <Button variant="secondary" asChild className="gap-2">
                <Link to="/about">
                  Read Full Profile <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </SpotlightCard>
      </section>

      {/* Experience & Education */}
      <section className="px-6 max-w-5xl mx-auto py-16 border-t border-border/40">
        <SectionHeading eyebrow="Experience & Education" title="Key Highlights" />
        <ExperienceSection />
      </section>

      {/* Featured Projects */}
      <section className="px-6 max-w-5xl mx-auto py-20 border-t border-border/40">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <SectionHeading eyebrow="Selected Work" title="Featured Projects" />
          <Button variant="outline" asChild className="w-fit gap-2">
            <Link to="/projects">
              All Projects <Briefcase className="w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.slice(0, 6).map(p => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </section>

      {/* Tools & AI Workflows Circular Gallery */}
      <section className="px-6 max-w-5xl mx-auto py-16 border-t border-border/40 overflow-hidden">
        <SectionHeading
          eyebrow="Stack & Workflows"
          title="Tools & AI Agent Architectures"
        />

        <CircularGallery
          autoRotateSpeed={3500}
          items={[
            {
              title: 'React 18 & Vite',
              category: 'Frontend Core',
              description: 'I value React for its component composability and declarative state model, enabling instant UI feedback and clean architecture.',
              logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
              tags: ['React 18', 'Vite', 'TypeScript', 'Tailwind'],
            },
            {
              title: 'Autonomous AI Agents',
              category: 'Agentic Workflows',
              description: 'I build multi-agent systems with specialized subagents and task loops to solve complex multi-step reasoning problems autonomously.',
              logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
              tags: ['Agentic Workflows', 'Subagents', 'Task Execution'],
            },
            {
              title: 'Transformers.js & RAG',
              category: 'Client-Side AI',
              description: 'I favor local client-side vector embeddings for privacy, zero-latency similarity search, and offline AI retrieval pipelines.',
              logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
              tags: ['ONNX Runtime', 'Vector Search', 'RAG'],
            },
            {
              title: 'Go Microservices',
              category: 'Backend Architecture',
              description: 'I rely on Go for its concurrency primitives (goroutines/channels) and rapid compile times when engineering double-entry payment ledgers.',
              logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg',
              tags: ['Go 1.25', 'SQLite', 'Double-Entry', 'ISO-20022'],
            },
            {
              title: 'Rust & Tokio Async',
              category: 'Systems & Concurrency',
              description: 'I value Rust for memory safety without garbage collection and Tokio worker pools for reliable, high-throughput task queues.',
              logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg',
              tags: ['Rust', 'Tokio', 'Axum', 'Async Workers'],
            },
            {
              title: 'Python Quant ML',
              category: 'Data & Forecasting',
              description: 'I use Python for vectorized backtesting engines and stats-arbitrage research due to its rich ecosystem in numerical computing.',
              logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
              tags: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn'],
            },
          ]}
        />
      </section>

      {/* Tech Stack Logo Loop */}
      <section className="px-6 max-w-5xl mx-auto py-16 border-t border-border/40">
        <SectionHeading eyebrow="Toolkit" title="Technologies & Skills" />
        <LogoLoop logos={TECH_LOGOS} direction="left" hoverPause={true} />
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 max-w-5xl mx-auto py-20 border-t border-border/40">
        <Card className="bg-card/40 border-border/50 backdrop-blur-md p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
            Get in touch
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto mb-8">
            Whether you'd like to collaborate on a project or simply connect, my inbox is always open.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild className="gap-2">
              <a href="mailto:maddox.krape@gmail.com">
                <Mail className="w-4 h-4" /> maddox.krape@gmail.com
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2">
              <a href="https://github.com/maddoxk" target="_blank" rel="noreferrer">
                <Github className="w-4 h-4" /> GitHub
              </a>
            </Button>
          </div>
        </Card>
      </section>
    </>
  )
}

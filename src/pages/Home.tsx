import SectionHeading from '@/components/ui/SectionHeading'
import ProjectCard from '@/components/project/ProjectCard'
import ExperienceSection from '@/components/ui/ExperienceSection'
import BlurText from '@/components/reactbits/BlurText'
import ShinyText from '@/components/reactbits/ShinyText'
import SpotlightCard from '@/components/reactbits/SpotlightCard'
import Particles from '@/components/reactbits/Particles'
import TrueFocus from '@/components/reactbits/TrueFocus'
import CircularGallery from '@/components/reactbits/CircularGallery'
import DitherBackground from '@/components/reactbits/DitherBackground'
import { PROJECTS } from '@/data/projects'
import { SKILLS } from '@/data/skills'
import { Github, Mail, ArrowRight, Code2, User, Briefcase, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'

export default function Home() {
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
        <div className="mb-8">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-2">
            Background
          </span>
          <h2 className="text-3xl font-bold text-foreground">
            <TrueFocus sentence="Engineering with Intention" blurAmount={3} />
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

        <div className="h-[480px] sm:h-[540px] relative my-6 w-full rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md overflow-hidden">
          <CircularGallery
            bend={3}
            textColor="#e2e8f0"
            borderRadius={0.06}
            scrollSpeed={2}
            scrollEase={0.05}
            items={[
              { image: '/images/fullstack_ai_rag_chat.jpg', text: 'React & Vite UI' },
              { image: '/images/search_algorithms.jpg', text: 'Autonomous AI Agents' },
              { image: '/images/fullstack_ai_rag_chat.jpg', text: 'Transformers.js RAG' },
              { image: '/images/backend_job_queue.jpg', text: 'Go Ledgers & APIs' },
              { image: '/images/backend_job_queue.jpg', text: 'Rust Tokio Worker Queue' },
              { image: '/images/search_algorithms.jpg', text: 'Python ML Backtester' },
            ]}
          />
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 max-w-5xl mx-auto py-20 border-t border-border/40">
        <SectionHeading eyebrow="Toolkit" title="Technologies & Skills" />
        <div className="flex flex-wrap gap-2">
          {SKILLS.map(s => (
            <Badge key={s.name} variant="secondary" className="px-3 py-1 text-xs font-mono font-normal border border-border/50">
              <Code2 className="w-3 h-3 mr-1.5 text-muted-foreground" />
              {s.name}
            </Badge>
          ))}
        </div>
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

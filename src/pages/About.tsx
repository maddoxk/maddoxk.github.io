import SectionHeading from '@/components/ui/SectionHeading'
import ExperienceSection from '@/components/ui/ExperienceSection'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { ArrowRight, Trophy, BookOpen, Rocket, Terminal, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

const TIMELINE = [
  { year: '7+ yrs ago', title: 'First lines of code', body: 'Started tinkering with programming languages, problem solving, and building basic programs.', icon: Terminal },
  { year: 'College', title: 'Pursuing BS in Computer Science at DU', body: 'Enrolled as a Junior CS major at the University of Denver, deepening theoretical and practical foundations across algorithms, data structures, and software architecture.', icon: BookOpen },
  { year: 'Leadership', title: 'Treasurer at DU AI Club', body: 'Serving as Treasurer for the DU Artificial Intelligence Club, managing finances, organizing workshops, and supporting AI learning initiatives for students across campus.', icon: Users },
  { year: 'Projects', title: 'Simulation & algorithms', body: 'Built gravity simulators, FSM-driven elevators, Huffman compression engines, hash table experiments, and distributed task queues.', icon: Rocket },
  { year: 'Now', title: 'Modern Web & Systems Engineering', body: 'Exploring full-stack technologies, clean UI design systems, interactive web graphics, and high performance web applications.', icon: Trophy },
]

export default function About() {
  return (
    <div className="px-6 max-w-5xl mx-auto py-16 pt-20">
      <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-3">
        Developer Profile
      </span>
      <h1 className="font-sans font-bold text-4xl sm:text-5xl tracking-tight text-foreground mb-10">
        About Me
      </h1>

      <section className="mb-16">
        <Card className="bg-card/40 border-border/50 backdrop-blur-md overflow-hidden">
          <CardContent className="p-8 md:p-10 grid md:grid-cols-[240px_1fr] gap-10 items-start">
            <div className="relative group mx-auto md:mx-0">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-accent opacity-30 group-hover:opacity-75 blur-md transition duration-500" />
              <img
                src="/images/profile.jpeg"
                alt="Maddox Krape"
                className="relative w-60 h-60 rounded-xl object-cover border border-border shadow-xl"
              />
            </div>
            <div className="space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
              <p className="text-foreground font-medium">
                I'm a Junior Computer Science major pursuing a B.S. at the University of Denver (DU), actively involved as Treasurer for the DU AI Club.
              </p>
              <p>
                My background spans distributed backend systems, simulation engines (gravity, elevators), fundamental data structures & algorithms 
                (Huffman compression, hash tables, pathfinding visualizers), and client-side RAG search engines.
              </p>
              <p>
                When I'm not writing software, I compete in chess (1600+ ELO rating and growing), study system architecture, 
                and experiment with emerging web standards.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-16">
        <SectionHeading eyebrow="Experience & Education" title="Key Highlights" />
        <ExperienceSection />
      </section>

      <section className="mb-16">
        <SectionHeading eyebrow="Chronology" title="Interactive Journey" />
        <Card className="bg-card/40 border-border/50 backdrop-blur-md p-6 sm:p-8">
          <Accordion className="w-full">
            {TIMELINE.map((t, i) => {
              const Icon = t.icon
              return (
                <AccordionItem key={i} value={`item-${i}`} className="border-border/40">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-3 text-left">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-mono text-xs text-primary uppercase tracking-wider">{t.year}</div>
                        <div className="font-sans font-semibold text-lg text-foreground">{t.title}</div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-12 text-muted-foreground text-base">
                    {t.body}
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </Card>
      </section>

      <section>
        <Card className="bg-card/50 border-border/50 backdrop-blur-md p-8 relative overflow-hidden">
          <SectionHeading eyebrow="Current Focus" title="What I'm Working On" />
          <p className="text-muted-foreground text-lg mb-6">
            Currently focused on refining interactive web engineering, building rich UI design systems with Shadcn & Tailwind CSS, 
            and exploring high-performance web solutions.
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link to="/projects">
              Browse Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </Card>
      </section>
    </div>
  )
}
